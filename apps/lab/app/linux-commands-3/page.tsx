"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { ui } from "@/lib/i18n";
import { linuxTasks3 } from "@/data/linux-tasks-3";
import TaskCard2 from "@/components/TaskCard2";

const SOLVED_KEY = "lab-linux3-solved-v1";

export default function LinuxCommands3Page() {
  const { lang } = useLanguage();
  const t = ui[lang];

  const [solved, setSolved] = useState<number[]>([]);

  useEffect(() => {
    try {
      setSolved(JSON.parse(localStorage.getItem(SOLVED_KEY) ?? "[]"));
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

  const unmarkSolved = (id: number) => {
    setSolved((prev) => {
      if (!prev.includes(id)) return prev;
      const next = prev.filter((x) => x !== id);
      localStorage.setItem(SOLVED_KEY, JSON.stringify(next));
      return next;
    });
  };

  const progress = Math.round((solved.length / linuxTasks3.length) * 100);

  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link href="/" className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70">
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          {t.backToLabs}
        </Link>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Linux Commands 3<span className="text-accent">_</span>
        </h1>

        <div className="mt-6 max-w-[220px]">
          <div className="flex justify-between text-xs text-white/40">
            <span>{t.progress}</span>
            <span>
              {solved.length}/{linuxTasks3.length}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </motion.section>

      <section className="mt-10 space-y-4">
        {linuxTasks3.map((task, i) => (
          <TaskCard2
            key={task.id}
            task={task}
            lang={lang}
            index={i}
            solved={solved.includes(task.id)}
            onSolved={() => markSolved(task.id)}
            onReset={() => unmarkSolved(task.id)}
          />
        ))}
      </section>
    </main>
  );
}
