"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Lightbulb } from "lucide-react";
import { ui } from "@/lib/i18n";
import type { Lang } from "@/lib/language-context";
import type { LinuxTask } from "@/data/linux-tasks";

const difficultyStyles: Record<LinuxTask["difficulty"], string> = {
  beginner: "text-emerald-400 border-emerald-400/40",
  easy: "text-teal-300 border-teal-300/40",
  medium: "text-yellow-400 border-yellow-400/40",
  hard: "text-orange-400 border-orange-400/40",
  extreme: "text-red-500 border-red-500/40",
};

// Only whitespace is normalized — Linux flags are case-sensitive (e.g. `-R` vs `-r`).
function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

interface Props {
  task: LinuxTask;
  lang: Lang;
  index: number;
  solved: boolean;
  onSolved: () => void;
  hintRevealed: boolean;
  hintsLeft: number;
  onRevealHint: () => void;
}

export default function TaskCard({ task, lang, index, solved, onSolved, hintRevealed, hintsLeft, onRevealHint }: Props) {
  const t = ui[lang];
  const content = task[lang];
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "incorrect">(solved ? "correct" : "idle");

  const check = () => {
    if (solved) return;
    const ok = task.answers.some((a) => normalize(a) === normalize(value));
    if (ok) {
      setStatus("correct");
      onSolved();
    } else {
      setStatus("incorrect");
    }
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

      <p className="mt-2 text-sm text-white/60">{content.question}</p>

      <div className="mt-4 overflow-hidden rounded-lg border border-white/10 bg-black/60">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3 py-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex items-center gap-2 px-3 py-2 font-mono text-sm">
          <span className="text-accent">student@lab:~$</span>
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            onKeyDown={(e) => e.key === "Enter" && check()}
            disabled={solved}
            placeholder={t.placeholder}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            className="flex-1 bg-transparent text-white/90 outline-none placeholder:text-white/20 disabled:opacity-50"
          />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          onClick={check}
          disabled={solved}
          className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-black transition-opacity disabled:opacity-40"
        >
          {solved ? t.solved : t.checkAnswer}
        </button>
        <button
          onClick={onRevealHint}
          disabled={hintRevealed || hintsLeft <= 0}
          className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/50 transition-colors hover:border-accent/40 disabled:opacity-30"
        >
          <Lightbulb className="h-3.5 w-3.5" strokeWidth={1.5} />
          {t.hint}
          {!hintRevealed && ` (${hintsLeft} ${t.hintsLeft})`}
        </button>
        {status === "correct" && <span className="text-xs text-accent">{t.correct}</span>}
        {status === "incorrect" && <span className="text-xs text-red-400">{t.incorrect}</span>}
      </div>

      {hintRevealed && (
        <p className="mt-3 rounded-lg bg-white/[0.03] px-3 py-2 text-xs text-white/50">💡 {content.hint}</p>
      )}
    </motion.div>
  );
}
