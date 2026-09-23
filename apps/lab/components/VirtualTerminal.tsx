"use client";

import { useEffect, useRef, useState } from "react";
import { execCommand, writeFile, cloneTree, type VDir } from "@/lib/vfs";

interface Line {
  text: string;
  kind: "input" | "output";
}

interface Props {
  root: VDir;
  cwd: string[];
  onChange: (root: VDir, cwd: string[]) => void;
  disabled?: boolean;
  promptLabel?: string;
}

export default function VirtualTerminal({ root, cwd, onChange, disabled, promptLabel = "student@lab" }: Props) {
  const [lines, setLines] = useState<Line[]>([{ text: 'Type "help" to see the available commands.', kind: "output" }]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const [pending, setPending] = useState<{ path: string[]; append: boolean; buffer: string[] } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const prompt = `${promptLabel}:~/${cwd.join("/")}$`;

  const submit = () => {
    if (disabled) return;
    const raw = value;
    setValue("");

    if (pending) {
      if (raw.trim() === "EOF") {
        const newRoot = cloneTree(root);
        writeFile(newRoot, pending.path, pending.buffer.join("\n"), pending.append);
        setLines((l) => [...l, { text: `> ${raw}`, kind: "input" }]);
        setPending(null);
        onChange(newRoot, cwd);
      } else {
        setLines((l) => [...l, { text: `> ${raw}`, kind: "input" }]);
        setPending({ ...pending, buffer: [...pending.buffer, raw] });
      }
      return;
    }

    setLines((l) => [...l, { text: `${prompt} ${raw}`, kind: "input" }]);
    if (raw.trim().length > 0) {
      setHistory((h) => [...h, raw]);
      setHistoryIdx(null);
    }

    if (raw.trim() === "clear") {
      setLines([]);
      return;
    }
    if (raw.trim() === "history") {
      setLines((l) => [...l, ...history.map((h, i) => ({ text: `${i + 1}  ${h}`, kind: "output" as const }))]);
      return;
    }

    const result = execCommand(root, cwd, raw);
    if (result.awaitingInput) {
      setPending({ path: result.awaitingInput.path, append: result.awaitingInput.append, buffer: [] });
      setLines((l) => [...l, { text: "(type your text, finish with a line containing only EOF)", kind: "output" }]);
      return;
    }
    if (result.output.length > 0) {
      setLines((l) => [...l, ...result.output.map((text) => ({ text, kind: "output" as const }))]);
    }
    if (result.root !== root || result.cwd !== cwd) {
      onChange(result.root, result.cwd);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
      return;
    }
    if (pending) return;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = historyIdx === null ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === null) return;
      const next = historyIdx + 1;
      if (next >= history.length) {
        setHistoryIdx(null);
        setValue("");
      } else {
        setHistoryIdx(next);
        setValue(history[next]);
      }
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-black/80">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3 py-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
      </div>
      <div ref={scrollRef} className="max-h-72 overflow-y-auto px-3 py-2 font-mono text-xs leading-relaxed">
        {lines.map((l, i) => (
          <div key={i} className={l.kind === "input" ? "text-white/90" : "whitespace-pre-wrap text-white/50"}>
            {l.text}
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-accent">{pending ? ">" : prompt}</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={disabled}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            className="flex-1 bg-transparent text-white/90 outline-none disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
}
