"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Bug, Terminal } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { ui } from "@/lib/i18n";

// TODO: replace placeholder groups with the real assignments handed out to students.

const groups = [
  {
    icon: Terminal,
    az: { title: "Linux", description: "Fayl sistemi və terminal əmrləri üzrə tapşırıqlar." },
    en: { title: "Linux", description: "Assignments covering the filesystem and terminal commands." },
    status: "open" as const,
    subLabs: [
      { href: "/linux-commands", az: "Linux Əmrləri", en: "Linux Commands" },
      { href: "/linux-commands-2", az: "Linux Əmrləri 2", en: "Linux Commands 2" },
    ],
  },
  {
    icon: Bug,
    az: { title: "Burp Suite", description: "Veb təhlükəsizlik testləri üzrə tapşırıqlar." },
    en: { title: "Burp Suite", description: "Web security testing assignments." },
    status: "upcoming" as const,
    subLabs: [],
  },
];

export default function Home() {
  const { lang } = useLanguage();
  const t = ui[lang];
  const [toastFor, setToastFor] = useState<number | null>(null);

  const clickUpcoming = (i: number) => {
    setToastFor(i);
    setTimeout(() => setToastFor((cur) => (cur === i ? null : cur)), 2200);
  };

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
          Labs<span className="text-accent">_</span>
        </h1>
        <p className="mt-6 max-w-xl text-white/50">{t.labsTagline}</p>
      </motion.section>

      <section className="mt-16 space-y-4">
        {groups.map((group, i) => {
          const Icon = group.icon;
          const isOpen = group.status === "open";
          return (
            <motion.div
              key={group.en.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <button
                onClick={() => !isOpen && clickUpcoming(i)}
                className={`flex w-full items-start justify-between gap-4 text-left ${isOpen ? "cursor-default" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-accent">
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-medium">{group[lang].title}</h2>
                      <span
                        className={`rounded-full border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide ${
                          isOpen ? "text-accent border-accent/40" : "text-yellow-400 border-yellow-400/40"
                        }`}
                      >
                        {isOpen ? t.openLab : t.comingSoon}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-white/50">{group[lang].description}</p>
                  </div>
                </div>
                {!isOpen && <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-white/30" />}
              </button>

              {isOpen && group.subLabs.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 pl-12">
                  {group.subLabs.map((sub) => (
                    <a
                      key={sub.href}
                      href={sub.href}
                      className="group flex items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/70 transition-colors hover:border-accent/40 hover:text-white"
                    >
                      {sub[lang]}
                      <ArrowUpRight className="h-3.5 w-3.5 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                    </a>
                  ))}
                </div>
              )}

              {!isOpen && toastFor === i && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 pl-12 text-xs text-yellow-400/80"
                >
                  {t.comingSoonToast}
                </motion.p>
              )}
            </motion.div>
          );
        })}
      </section>

      <footer className="mt-24 border-t border-white/10 pt-6 font-mono text-sm text-white/30">
        &copy; {new Date().getFullYear()} · part of{" "}
        <a href="https://dxb.az" className="hover:text-white/60">
          dxb.az
        </a>
      </footer>
    </main>
  );
}

