"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, TerminalSquare } from "lucide-react";
import { ui } from "@/lib/i18n";
import type { Lang } from "@/lib/language-context";
import type { LinuxTask2 } from "@/data/linux-tasks-2";
import { cloneTree, getNode, type VDir } from "@/lib/vfs";
import VirtualTerminal from "./VirtualTerminal";

const difficultyStyles: Record<LinuxTask2["difficulty"], string> = {
  beginner: "text-emerald-400 border-emerald-400/40",
  easy: "text-teal-300 border-teal-300/40",
  medium: "text-yellow-400 border-yellow-400/40",
  hard: "text-orange-400 border-orange-400/40",
  extreme: "text-red-500 border-red-500/40",
};

function structureOk(task: LinuxTask2, root: VDir) {
  const required = (task.requiredPaths ?? []).every((rp) => {
    const node = getNode(root, rp.path);
    return !!node && node.type === rp.type;
  });
  const forbidden = (task.forbiddenPaths ?? []).every((fp) => !getNode(root, fp));
  return required && forbidden;
}

interface Props {
  task: LinuxTask2;
  lang: Lang;
  index: number;
  solved: boolean;
  onSolved: () => void;
}

export default function TaskCard2({ task, lang, index, solved, onSolved }: Props) {
  const t = ui[lang];
  const t2 = t.lab2;
  const content = task[lang];

  const [open, setOpen] = useState(false);
  const [root, setRoot] = useState<VDir>(() => cloneTree(task.filesystem));
  const [cwd, setCwd] = useState<string[]>([]);
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordOk, setPasswordOk] = useState(!task.password);
  const [passwordStatus, setPasswordStatus] = useState<"idle" | "correct" | "incorrect">("idle");

  const evaluate = (nextRoot: VDir, nextPasswordOk: boolean) => {
    if (solved) return;
    if (nextPasswordOk && structureOk(task, nextRoot)) onSolved();
  };

  const handleTerminalChange = (nextRoot: VDir, nextCwd: string[]) => {
    setRoot(nextRoot);
    setCwd(nextCwd);
    evaluate(nextRoot, passwordOk);
  };

  const submitPassword = () => {
    if (solved || !task.password) return;
    if (passwordValue.trim() === task.password) {
      setPasswordStatus("correct");
      setPasswordOk(true);
      evaluate(root, true);
    } else {
      setPasswordStatus("incorrect");
    }
  };

  const reset = () => {
    setRoot(cloneTree(task.filesystem));
    setCwd([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.6) }}
      className={`rounded-2xl border p-5 transition-colors ${
        solved ? "border-accent/40 bg-accent/[0.04]" : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-white/30">#{String(task.id).padStart(2, "0")}</span>
        <h3 className="font-medium">{content.title}</h3>
        <span
          className={`rounded-full border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide ${difficultyStyles[task.difficulty]}`}
        >
          {t.difficulty[task.difficulty]}
        </span>
        {solved && <Check className="h-4 w-4 text-accent" strokeWidth={2} />}
      </div>

      <p className="mt-2 text-sm text-white/60">{content.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60 transition-colors hover:border-accent/40"
        >
          <TerminalSquare className="h-3.5 w-3.5" strokeWidth={1.5} />
          {open ? t2.closeTerminal : t2.openTerminal}
        </button>
        {open && (
          <button
            onClick={reset}
            disabled={solved}
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/40 transition-colors hover:border-white/30 disabled:opacity-30"
          >
            {t2.reset}
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-3">
              <VirtualTerminal root={root} cwd={cwd} onChange={handleTerminalChange} disabled={solved} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {task.password ? (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <input
            value={passwordValue}
            onChange={(e) => {
              setPasswordValue(e.target.value);
              if (passwordStatus !== "idle") setPasswordStatus("idle");
            }}
            onKeyDown={(e) => e.key === "Enter" && submitPassword()}
            disabled={solved}
            placeholder={t2.passwordPlaceholder}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            className="flex-1 min-w-[180px] rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-sm text-white/90 outline-none placeholder:text-white/20 disabled:opacity-50"
          />
          <button
            onClick={submitPassword}
            disabled={solved}
            className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-black transition-opacity disabled:opacity-40"
          >
            {solved ? t.solved : t2.submit}
          </button>
          {passwordStatus === "correct" && !solved && <span className="text-xs text-accent">{t.correct}</span>}
          {passwordStatus === "incorrect" && <span className="text-xs text-red-400">{t.incorrect}</span>}
        </div>
      ) : (
        <p className="mt-3 text-xs text-white/30">{t2.noPassword}</p>
      )}

      {solved && <p className="mt-3 text-xs text-accent">✓ {t2.complete}</p>}
    </motion.div>
  );
}
