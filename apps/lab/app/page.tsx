"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Terminal } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { ui } from "@/lib/i18n";

// TODO: replace placeholder labs with the real assignments handed out to students.

const labs = [
  {
    href: "/linux-commands",
    az: { title: "Linux Əmrləri", description: "20 tapşırıq: fayl sistemi əmrlərini öyrən və sına." },
    en: { title: "Linux Commands", description: "20 tasks covering core filesystem commands." },
    status: "open" as const,
  },
  {
    href: "/linux-commands-2",
    az: { title: "Linux Əmrləri 2", description: "10 tapşırıq: virtual terminalda qovluqları araşdır, şifrələri tap." },
    en: { title: "Linux Commands 2", description: "10 tasks: explore folders in a virtual terminal and find hidden passwords." },
    status: "open" as const,
  },
  {
    href: "#",
    az: { title: "Lab 3 — Tezliklə", description: "Yeni tapşırıq tezliklə əlavə olunacaq." },
    en: { title: "Lab 3 — Coming soon", description: "A new assignment will be added soon." },
    status: "upcoming" as const,
  },
];

const statusColor: Record<string, string> = {
  open: "text-accent border-accent/40",
  upcoming: "text-yellow-400 border-yellow-400/40",
  closed: "text-white/40 border-white/20",
};

export default function Home() {
  const { lang } = useLanguage();
  const t = ui[lang];

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
        {labs.map((lab, i) => (
          <motion.a
            key={lab.href + lab.en.title}
            href={lab.href}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            className="group flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-accent/40"
          >
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-medium">{lab[lang].title}</h2>
                <span
                  className={`rounded-full border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide ${statusColor[lab.status]}`}
                >
                  {lab.status === "open" ? t.openLab : t.comingSoon}
                </span>
              </div>
              <p className="mt-1 text-sm text-white/50">{lab[lang].description}</p>
            </div>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
          </motion.a>
        ))}
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
