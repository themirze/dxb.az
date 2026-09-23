"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FlaskConical, UserRound } from "lucide-react";

const links = [
  {
    href: "https://mirza.dxb.az",
    title: "mirza.dxb.az",
    description: "Resume & portfolio",
    icon: UserRound,
  },
  {
    href: "https://lab.dxb.az",
    title: "lab.dxb.az",
    description: "Lab assignments for students",
    icon: FlaskConical,
  },
];

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(600px circle at 50% 20%, rgba(34,211,238,0.15), transparent 60%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/40">Welcome to</p>
        <h1 className="text-6xl font-semibold tracking-tight sm:text-7xl">
          dxb<span className="text-accent">.</span>az
        </h1>
        <p className="mx-auto mt-4 max-w-md text-balance text-white/60">
          Home base. Pick a destination below.
        </p>
      </motion.div>

      <div className="mt-14 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        {links.map(({ href, title, description, icon: Icon }, i) => (
          <motion.a
            key={href}
            href={href}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent/40 hover:bg-white/[0.06]"
          >
            <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
            <div className="mt-4 flex items-center gap-1.5">
              <h2 className="text-lg font-medium">{title}</h2>
              <ArrowUpRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
            </div>
            <p className="mt-1 text-sm text-white/50">{description}</p>
          </motion.a>
        ))}
      </div>

      <footer className="absolute bottom-6 text-xs text-white/30">
        &copy; {new Date().getFullYear()} dxb.az
      </footer>
    </main>
  );
}
