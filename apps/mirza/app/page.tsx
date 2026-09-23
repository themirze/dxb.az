"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

// TODO: replace all placeholder content below with real resume details.

const socials = [
  { href: "mailto:hello@example.com", label: "Email", icon: Mail },
  { href: "https://github.com/", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/", label: "LinkedIn", icon: Linkedin },
];

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "SQL",
  "Docker",
  "AWS",
];

const experience = [
  {
    role: "Job Title",
    company: "Company Name",
    period: "20XX — Present",
    description: "One or two lines describing scope, impact, and key achievements in this role.",
  },
  {
    role: "Previous Job Title",
    company: "Previous Company",
    period: "20XX — 20XX",
    description: "One or two lines describing scope, impact, and key achievements in this role.",
  },
];

const projects = [
  {
    title: "Project One",
    description: "Short description of the project and the problem it solves.",
    href: "#",
  },
  {
    title: "Project Two",
    description: "Short description of the project and the problem it solves.",
    href: "#",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      {/* Hero */}
      <motion.section {...fadeUp} transition={{ duration: 0.5 }}>
        <p className="text-sm uppercase tracking-[0.3em] text-accent/80">Resume</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">
          Mirza {/* TODO: last name */}
        </h1>
        <p className="mt-3 text-xl text-white/60">Your Role / Title Here</p>
        <p className="mt-6 max-w-xl text-white/50">
          Short intro paragraph about who you are, what you do, and what you&apos;re
          currently focused on. Replace this placeholder with a real bio.
        </p>

        <div className="mt-8 flex gap-4">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors hover:border-accent/40 hover:text-white"
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
              {label}
            </a>
          ))}
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.05 }} className="mt-20">
        <h2 className="text-sm uppercase tracking-[0.3em] text-white/40">Skills</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-white/70"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.section>

      {/* Experience */}
      <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-20">
        <h2 className="text-sm uppercase tracking-[0.3em] text-white/40">Experience</h2>
        <div className="mt-6 space-y-8">
          {experience.map((job) => (
            <div key={job.role + job.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-medium">
                  {job.role} <span className="text-white/40">· {job.company}</span>
                </h3>
                <span className="text-sm text-white/40">{job.period}</span>
              </div>
              <p className="mt-1 max-w-xl text-white/50">{job.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Projects */}
      <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="mt-20">
        <h2 className="text-sm uppercase tracking-[0.3em] text-white/40">Projects</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-accent/40"
            >
              <div className="flex items-center gap-1.5">
                <h3 className="font-medium">{project.title}</h3>
                <ArrowUpRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </div>
              <p className="mt-1 text-sm text-white/50">{project.description}</p>
            </a>
          ))}
        </div>
      </motion.section>

      <footer className="mt-24 border-t border-white/10 pt-6 text-sm text-white/30">
        &copy; {new Date().getFullYear()} Mirza · part of{" "}
        <a href="https://dxb.az" className="hover:text-white/60">
          dxb.az
        </a>
      </footer>
    </main>
  );
}
