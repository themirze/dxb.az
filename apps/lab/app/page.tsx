"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Terminal } from "lucide-react";

// TODO: replace placeholder experiments with real projects.

const experiments = [
  {
    title: "Experiment One",
    description: "Short description of what this experiment explores or builds.",
    status: "live",
    href: "#",
  },
  {
    title: "Experiment Two",
    description: "Short description of what this experiment explores or builds.",
    status: "beta",
    href: "#",
  },
  {
    title: "Experiment Three",
    description: "Short description of what this experiment explores or builds.",
    status: "archived",
    href: "#",
  },
];

const statusColor: Record<string, string> = {
  live: "text-accent border-accent/40",
  beta: "text-yellow-400 border-yellow-400/40",
  archived: "text-white/40 border-white/20",
};

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 font-mono text-sm text-accent/80">
          <Terminal className="h-4 w-4" strokeWidth={1.5} />
          <span>lab.dxb.az</span>
        </div>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">
          The Lab<span className="text-accent">_</span>
        </h1>
        <p className="mt-6 max-w-xl text-white/50">
          A running log of experiments, prototypes, and side projects — some
          polished, some held together with duct tape.
        </p>
      </motion.section>

      <section className="mt-16 space-y-4">
        {experiments.map((exp, i) => (
          <motion.a
            key={exp.title}
            href={exp.href}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            className="group flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-accent/40"
          >
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-medium">{exp.title}</h2>
                <span
                  className={`rounded-full border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide ${statusColor[exp.status]}`}
                >
                  {exp.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-white/50">{exp.description}</p>
            </div>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
          </motion.a>
        ))}
      </section>

      <footer className="mt-24 border-t border-white/10 pt-6 font-mono text-sm text-white/30">
        &copy; {new Date().getFullYear()} · part of{" "}
        <a href="https://dxb.az" className="hover:text-white/60">
          dxb.az
        </a>{" "}
        ·{" "}
        <a href="https://mirza.dxb.az" className="hover:text-white/60">
          mirza.dxb.az
        </a>
      </footer>
    </main>
  );
}
