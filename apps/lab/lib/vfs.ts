// A tiny simulated Linux filesystem + command interpreter used by the
// "Linux Commands 2" lab. Nothing here touches a real shell — it only
// mutates a plain JS tree, so there is zero risk even for commands like `rm -rf`.

export interface VFile {
  type: "file";
  content: string;
}

export interface VDir {
  type: "dir";
  children: Record<string, VNode>;
}

export type VNode = VFile | VDir;

export function dir(children: Record<string, VNode> = {}): VDir {
  return { type: "dir", children };
}

export function file(content: string): VFile {
  return { type: "file", content };
}

export function cloneTree<T extends VNode>(node: T): T {
  if (node.type === "file") return { ...node } as T;
  const children: Record<string, VNode> = {};
  for (const [name, child] of Object.entries(node.children)) {
    children[name] = cloneTree(child);
  }
  return { type: "dir", children } as T;
}

function tokenize(raw: string): string[] {
  const tokens: string[] = [];
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) {
    tokens.push(m[1] ?? m[2] ?? m[3]);
  }
  return tokens;
}

export function resolvePath(cwd: string[], input: string): string[] {
  const abs = input.startsWith("/") || input.startsWith("~");
  const raw = input.replace(/^~/, "").split("/").filter(Boolean);
  const parts = abs ? raw : [...cwd, ...raw];
  const result: string[] = [];
  for (const p of parts) {
    if (p === ".") continue;
    if (p === "..") result.pop();
    else result.push(p);
  }
  return result;
}

export function getNode(root: VDir, path: string[]): VNode | null {
  let node: VNode = root;
  for (const seg of path) {
    if (node.type !== "dir" || !node.children[seg]) return null;
    node = node.children[seg];
  }
  return node;
}

function getParentDir(root: VDir, path: string[]): VDir | null {
  if (path.length === 0) return null;
  const parent = getNode(root, path.slice(0, -1));
  return parent && parent.type === "dir" ? parent : null;
}

export function pathExists(root: VDir, path: string[], kind?: "file" | "dir"): boolean {
  const n = getNode(root, path);
  if (!n) return false;
  return kind ? n.type === kind : true;
}

export function readFile(root: VDir, path: string[]): string | null {
  const n = getNode(root, path);
  return n && n.type === "file" ? n.content : null;
}

export function writeFile(root: VDir, path: string[], content: string, append: boolean): boolean {
  const name = path[path.length - 1];
  const parent = getParentDir(root, path);
  if (!name || !parent) return false;
  const existing = parent.children[name];
  if (existing && existing.type === "dir") return false;
  const prev = existing?.type === "file" ? existing.content : "";
  parent.children[name] = file(append && prev ? `${prev}\n${content}` : content);
  return true;
}

function fmtSize(n: number, human: boolean) {
  if (!human) return String(n);
  if (n < 1024) return `${n}B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}K`;
  return `${(n / 1024 / 1024).toFixed(1)}M`;
}

function listDir(node: VDir, flags: Set<string>): string[] {
  const names = Object.keys(node.children).filter((n) => flags.has("a") || !n.startsWith("."));
  names.sort((a, b) => a.localeCompare(b));
  if (flags.has("l") || flags.has("h")) {
    return names.map((n) => {
      const child = node.children[n];
      const isDir = child.type === "dir";
      const size = isDir ? Object.keys(child.children).length * 4096 : child.content.length;
      const perm = isDir ? "drwxr-xr-x" : "-rw-r--r--";
      return `${perm} 1 student student ${fmtSize(size, flags.has("h")).padStart(5)} Jan  1 00:00 ${n}${isDir ? "/" : ""}`;
    });
  }
  return names.map((n) => (node.children[n].type === "dir" ? `${n}/` : n));
}

function listRecursive(root: VDir, node: VDir, path: string[], flags: Set<string>, out: string[]) {
  out.push(`${path.length ? "./" + path.join("/") : "."}:`);
  out.push(...listDir(node, flags));
  for (const [name, child] of Object.entries(node.children)) {
    if (child.type === "dir") {
      out.push("");
      listRecursive(root, child, [...path, name], flags, out);
    }
  }
}

export interface ExecResult {
  output: string[];
  root: VDir;
  cwd: string[];
  clear?: boolean;
  /** Set when a bare `cat > file` / `cat >> file` needs multi-line stdin from the terminal UI. */
  awaitingInput?: { path: string[]; append: boolean };
}

export function execCommand(inRoot: VDir, cwd: string[], raw: string): ExecResult {
  const trimmed = raw.trim();
  if (!trimmed) return { output: [], root: inRoot, cwd };

  const tokens = tokenize(trimmed);
  const cmd = tokens[0];
  const args = tokens.slice(1);
  const root = cloneTree(inRoot);

  const flags = new Set<string>();
  const positional: string[] = [];
  for (const a of args) {
    if (a.startsWith("-") && a !== "-") {
      for (const c of a.slice(1)) flags.add(c);
    } else {
      positional.push(a);
    }
  }

  const err = (msg: string): ExecResult => ({ output: [msg], root: inRoot, cwd });

  switch (cmd) {
    case "clear":
      return { output: [], root: inRoot, cwd, clear: true };

    case "whoami":
      return { output: ["student"], root: inRoot, cwd };

    case "pwd":
      return { output: [`~/${cwd.join("/")}`], root: inRoot, cwd };

    case "help":
      return {
        output: [
          "Available commands:",
          "ls [-a -l -R -t -h]   cd   pwd   cat [file...] [>|>> target]",
          "mkdir [-p]   touch   rm [-r -f]   rmdir [-p]",
          "mv [-i]   cp [-r]   echo \"text\" [> | >>] file   wc -l   whoami   clear",
        ],
        root: inRoot,
        cwd,
      };

    case "ls": {
      const target = positional[0] ? resolvePath(cwd, positional[0]) : cwd;
      const node = getNode(root, target);
      if (!node) return err(`ls: cannot access '${positional[0]}': No such file or directory`);
      if (node.type !== "dir") return { output: [positional[0] ?? ""], root: inRoot, cwd };
      if (flags.has("R")) {
        const out: string[] = [];
        listRecursive(root, node, target, flags, out);
        return { output: out, root: inRoot, cwd };
      }
      return { output: listDir(node, flags), root: inRoot, cwd };
    }

    case "cd": {
      const dest = positional[0] ? resolvePath(cwd, positional[0]) : [];
      if (positional[0] === undefined || positional[0] === "~") return { output: [], root: inRoot, cwd: [] };
      const node = getNode(root, dest);
      if (!node) return err(`cd: ${positional[0]}: No such file or directory`);
      if (node.type !== "dir") return err(`cd: ${positional[0]}: Not a directory`);
      return { output: [], root: inRoot, cwd: dest };
    }

    case "cat": {
      const redirectIdx = args.findIndex((a) => a === ">" || a === ">>");
      if (redirectIdx === -1) {
        if (positional.length === 0) return err("cat: missing file operand");
        const out: string[] = [];
        for (const f of positional) {
          const content = readFile(root, resolvePath(cwd, f));
          if (content === null) out.push(`cat: ${f}: No such file or directory`);
          else out.push(content);
        }
        return { output: out, root: inRoot, cwd };
      }
      const append = args[redirectIdx] === ">>";
      const targetArg = args[redirectIdx + 1];
      if (!targetArg) return err("cat: missing redirection target");
      const sources = args.slice(0, redirectIdx).filter((a) => !a.startsWith("-"));
      const targetPath = resolvePath(cwd, targetArg);
      if (sources.length === 0) {
        return { output: [], root: inRoot, cwd, awaitingInput: { path: targetPath, append } };
      }
      const merged = sources
        .map((f) => readFile(root, resolvePath(cwd, f)))
        .filter((c): c is string => c !== null)
        .join("\n");
      writeFile(root, targetPath, merged, append);
      return { output: [], root, cwd };
    }

    case "mkdir": {
      if (positional.length === 0) return err("mkdir: missing operand");
      for (const p of positional) {
        const segs = resolvePath(cwd, p);
        if (flags.has("p")) {
          let node: VDir = root;
          for (const seg of segs) {
            const next = node.children[seg];
            if (!next) node.children[seg] = dir();
            else if (next.type !== "dir") return err(`mkdir: cannot create directory '${p}': File exists`);
            node = node.children[seg] as VDir;
          }
        } else {
          const parent = getParentDir(root, segs);
          const name = segs[segs.length - 1];
          if (!parent) return err(`mkdir: cannot create directory '${p}': No such file or directory`);
          if (parent.children[name]) return err(`mkdir: cannot create directory '${p}': File exists`);
          parent.children[name] = dir();
        }
      }
      return { output: [], root, cwd };
    }

    case "touch": {
      if (positional.length === 0) return err("touch: missing operand");
      for (const p of positional) {
        const segs = resolvePath(cwd, p);
        const parent = getParentDir(root, segs);
        const name = segs[segs.length - 1];
        if (!parent) return err(`touch: cannot touch '${p}': No such file or directory`);
        if (!parent.children[name]) parent.children[name] = file("");
      }
      return { output: [], root, cwd };
    }

    case "rm": {
      if (positional.length === 0) return err("rm: missing operand");
      const recursive = flags.has("r") || flags.has("R");
      const force = flags.has("f");
      for (const p of positional) {
        const segs = resolvePath(cwd, p);
        const node = getNode(root, segs);
        if (!node) {
          if (!force) return err(`rm: cannot remove '${p}': No such file or directory`);
          continue;
        }
        if (node.type === "dir" && !recursive) return err(`rm: cannot remove '${p}': Is a directory`);
        const parent = getParentDir(root, segs);
        if (parent) delete parent.children[segs[segs.length - 1]];
      }
      return { output: [], root, cwd };
    }

    case "rmdir": {
      if (positional.length === 0) return err("rmdir: missing operand");
      for (const p of positional) {
        let segs = resolvePath(cwd, p);
        while (segs.length > 0) {
          const node = getNode(root, segs);
          if (!node) return err(`rmdir: failed to remove '${p}': No such file or directory`);
          if (node.type !== "dir") return err(`rmdir: failed to remove '${p}': Not a directory`);
          if (Object.keys(node.children).length > 0) {
            if (segs.length === resolvePath(cwd, p).length) return err(`rmdir: failed to remove '${p}': Directory not empty`);
            break;
          }
          const parent = getParentDir(root, segs);
          if (parent) delete parent.children[segs[segs.length - 1]];
          if (!flags.has("p")) break;
          segs = segs.slice(0, -1);
        }
      }
      return { output: [], root, cwd };
    }

    case "mv":
    case "cp": {
      if (positional.length < 2) return err(`${cmd}: missing file operand`);
      const srcSegs = resolvePath(cwd, positional[0]);
      let dstSegs = resolvePath(cwd, positional[1]);
      const srcNode = getNode(root, srcSegs);
      if (!srcNode) return err(`${cmd}: cannot stat '${positional[0]}': No such file or directory`);
      if (cmd === "cp" && srcNode.type === "dir" && !flags.has("r") && !flags.has("R")) {
        return err(`cp: -r not specified; omitting directory '${positional[0]}'`);
      }
      const dstNode = getNode(root, dstSegs);
      if (dstNode && dstNode.type === "dir") dstSegs = [...dstSegs, srcSegs[srcSegs.length - 1]];
      const dstParent = getParentDir(root, dstSegs);
      if (!dstParent) return err(`${cmd}: cannot create '${positional[1]}': No such file or directory`);
      const copy = cloneTree(srcNode);
      dstParent.children[dstSegs[dstSegs.length - 1]] = copy;
      if (cmd === "mv") {
        const srcParent = getParentDir(root, srcSegs);
        if (srcParent) delete srcParent.children[srcSegs[srcSegs.length - 1]];
      }
      return { output: [], root, cwd };
    }

    case "echo": {
      const redirectIdx = args.findIndex((a) => a === ">" || a === ">>");
      const text = (redirectIdx === -1 ? args : args.slice(0, redirectIdx)).join(" ");
      if (redirectIdx === -1) return { output: [text], root: inRoot, cwd };
      const append = args[redirectIdx] === ">>";
      const targetArg = args[redirectIdx + 1];
      if (!targetArg) return err("echo: missing redirection target");
      writeFile(root, resolvePath(cwd, targetArg), text, append);
      return { output: [], root, cwd };
    }

    case "wc": {
      if (positional.length === 0) return err("wc: missing operand");
      const out: string[] = [];
      for (const f of positional) {
        const content = readFile(root, resolvePath(cwd, f));
        if (content === null) {
          out.push(`wc: ${f}: No such file or directory`);
          continue;
        }
        const lines = content === "" ? 0 : content.split("\n").length;
        out.push(`${lines} ${f}`);
      }
      return { output: out, root: inRoot, cwd };
    }

    default:
      return err(`bash: ${cmd}: command not found`);
  }
}
