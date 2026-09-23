"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { ui } from "@/lib/i18n";
import { linuxTasks } from "@/data/linux-tasks";
import TaskCard from "@/components/TaskCard";

const SOLVED_KEY = "lab-linux-solved";
const HINTS_KEY = "lab-linux-hints-revealed";
const HINT_BUDGET = 3;

export default function LinuxCommandsPage() {
  const { lang } = useLanguage();
  const t = ui[lang];

  const [solved, setSolved] = useState<number[]>([]);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);

  useEffect(() => {
    try {
      setSolved(JSON.parse(localStorage.getItem(SOLVED_KEY) ?? "[]"));
      setRevealedHints(JSON.parse(localStorage.getItem(HINTS_KEY) ?? "[]"));
    } catch {
      // ignore corrupted local storage
    }
  }, []);

  const markSolved = (id: number) => {
    setSolved((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem(SOLVED_KEY, JSON.stringify(next));
      return next;
    });
  };

  const revealHint = (id: number) => {
    setRevealedHints((prev) => {
      if (prev.includes(id) || prev.length >= HINT_BUDGET) return prev;
      const next = [...prev, id];
      localStorage.setItem(HINTS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const hintsLeft = HINT_BUDGET - revealedHints.length;
  const progress = Math.round((solved.length / linuxTasks.length) * 100);

  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link href="/" className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70">
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          {t.backToLabs}
        </Link>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Linux Commands<span className="text-accent">_</span>
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[180px]">
            <div className="flex justify-between text-xs text-white/40">
              <span>{t.progress}</span>
              <span>
                {solved.length}/{linuxTasks.length}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/50">
            <Lightbulb className="h-3.5 w-3.5" strokeWidth={1.5} />
            {hintsLeft}/{HINT_BUDGET} {t.hintsLeft}
          </div>
        </div>
      </motion.section>

      <section className="mt-10 space-y-4">
        {linuxTasks.map((task, i) => (
          <TaskCard
            key={task.id}
            task={task}
            lang={lang}
            index={i}
            solved={solved.includes(task.id)}
            onSolved={() => markSolved(task.id)}
            hintRevealed={revealedHints.includes(task.id)}
            hintsLeft={hintsLeft}
            onRevealHint={() => revealHint(task.id)}
          />
        ))}
      </section>
    </main>
  );
}
