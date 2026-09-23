"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, MapPin, GraduationCap, Download } from "lucide-react";

const socials = [
  { href: "mailto:contact.mirze@gmail.com", label: "Email", icon: Mail },
  { href: "tel:+48506437611", label: "+48 506 437 611", icon: Phone },
  { href: "https://github.com/themirze", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/themirze", label: "LinkedIn", icon: Linkedin },
];

const skillGroups = [
  {
    title: "Programming & Scripting",
    items: ["Python", "JavaScript", "Node.js", "Bash", "Shell Scripting", "SQL", "JSON", "Excel VBA"],
  },
  {
    title: "Data Analytics & BI",
    items: [
      "Excel",
      "Power BI",
      "Tableau",
      "Google Analytics 4",
      "Google Tag Manager",
      "Google Ads",
      "Data Visualization",
      "Data Automation",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "GitHub Actions",
      "CI/CD",
      "Terraform",
      "Ansible",
      "Linux",
    ],
  },
  {
    title: "Development & Web",
    items: ["HTML5", "CSS/Sass", "React", "Node.js", "Bootstrap", "WordPress", "REST APIs", "Postman"],
  },
  {
    title: "Security & Testing",
    items: ["Kali Linux", "Burp Suite", "Metasploit", "Vulnerability Assessment", "CTF", "Security Testing"],
  },
  {
    title: "Tools & Platforms",
    items: ["Git", "GitHub", "Jira", "Trello", "Figma", "Salesforce", "SAP FICO", "Merchant Center"],
  },
];

const softSkills = [
  "Communication",
  "Teamwork",
  "Adaptability",
  "Problem-Solving",
  "Leadership",
  "Time Management",
  "Critical Thinking",
  "Attention to Detail",
];

const experience = [
  {
    role: "Data Analytics",
    company: "Bolt Food",
    location: "Krakow",
    period: "Jul 2027 — Present",
    bullets: [
      "Analyze and maintain Bolt Food merchant and product data across countries where Bolt Food operates.",
      "Manage merchant onboarding, including new store creation, product setup, pricing, stock, and promotional updates.",
      "Monitor and update product and inventory information to ensure accurate and reliable data across the platform.",
      "Support data-driven operational processes by identifying and resolving data inconsistencies and merchant information issues.",
      "Work with large-scale datasets and multiple data sources to maintain accurate and up-to-date marketplace information.",
    ],
  },
  {
    role: "Senior Process Executive — Google Account",
    company: "Cognizant",
    location: "Krakow, Poland",
    period: "Mar 2022 — Jun 2026",
    bullets: [
      "Optimized data processes for lead generation, increasing qualified leads by 25% and reducing processing time by 40% through automation.",
      "Improved Web Streams plugin integration across hybrid and native components, increasing performance and functionality by 50%.",
      "Developed funnel reporting using GA4 and Universal Analytics, improving user-journey analysis, data accuracy, and reporting.",
      "Automated product data extraction via APIs and XML, reducing manual Merchant Center data entry by 35%.",
    ],
  },
  {
    role: "Data Analyst",
    company: "Kapital Bank OJS",
    location: "Baku, Azerbaijan",
    period: "Nov 2020 — Apr 2021",
    bullets: [
      "Improved data collection and cleansing processes, increasing data accuracy and efficiency by 25%.",
      "Applied statistical analysis techniques to identify insights and improve analytical accuracy by 30%.",
      "Developed data visualizations that improved understanding of key business metrics by 40%.",
      "Enhanced monitoring and reporting processes, increasing reporting quality and frequency by 15%.",
    ],
  },
  {
    role: "CTF Security Specialist",
    company: "Synoverge Technologies",
    location: "Ahmedabad, India",
    period: "May 2017 — Oct 2018",
    bullets: [
      "Participated in CTF competitions, demonstrating practical expertise in cybersecurity and vulnerability assessment.",
      "Supervised security specialists in identifying and analyzing system vulnerabilities.",
      "Collaborated with US-based clients on security projects, contributing to a 40% increase in business partnerships and client satisfaction.",
    ],
  },
];

const education = [
  {
    degree: "PhD / Doc. — AI-Integrated Emergency Response System",
    school: "WSB University (Poland)",
    period: "Mar 2024 — Present",
  },
  {
    degree: "Master in Computer Science",
    school: "WSB University (Poland)",
    period: "Sep 2021 — Jul 2023",
  },
  {
    degree: "Bachelor of Technology — Computer Science",
    school: "Technical University (Azerbaijan)",
    period: "Jul 2017 — May 2021",
  },
];

const languages = [
  { name: "Azerbaijani", level: "Native" },
  { name: "Turkish", level: "Native" },
  { name: "English", level: "C1 / Advanced" },
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
          Mirzagha Aliyev
        </h1>
        <p className="mt-3 text-xl text-white/60">Data & Analytics Professional</p>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-white/40">
          <MapPin className="h-4 w-4" strokeWidth={1.5} />
          Krakow, Poland
        </p>
        <p className="mt-6 max-w-xl text-white/50">
          Data analyst with hands-on experience across marketplace operations,
          growth analytics, and cloud/security tooling — spanning roles at Bolt
          Food, Cognizant (Google account), and Kapital Bank, with an earlier
          background in cybersecurity and CTF competitions.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <Download className="h-4 w-4" strokeWidth={1.5} />
            Download CV
          </a>
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

      {/* Experience */}
      <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-20">
        <h2 className="text-sm uppercase tracking-[0.3em] text-white/40">Experience</h2>
        <div className="mt-6 space-y-10">
          {experience.map((job) => (
            <div key={job.role + job.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-medium">
                  {job.role} <span className="text-white/40">· {job.company}</span>
                </h3>
                <span className="text-sm text-white/40">{job.period}</span>
              </div>
              <p className="text-sm text-white/30">{job.location}</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-4 text-white/50">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Education */}
      <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="mt-20">
        <h2 className="text-sm uppercase tracking-[0.3em] text-white/40">Education</h2>
        <div className="mt-6 space-y-5">
          {education.map((edu) => (
            <div key={edu.degree} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <div className="flex items-start gap-2">
                <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                <div>
                  <h3 className="font-medium">{edu.degree}</h3>
                  <p className="text-sm text-white/40">{edu.school}</p>
                </div>
              </div>
              <span className="text-sm text-white/40">{edu.period}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="mt-20">
        <h2 className="text-sm uppercase tracking-[0.3em] text-white/40">Skills</h2>
        <div className="mt-6 space-y-5">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-medium text-white/60">{group.title}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-white/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-6 text-sm font-medium text-white/60">Soft Skills</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {softSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-accent/20 bg-accent/[0.06] px-3 py-1 text-sm text-white/70"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.section>

      {/* Languages */}
      <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.25 }} className="mt-20">
        <h2 className="text-sm uppercase tracking-[0.3em] text-white/40">Languages</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2"
            >
              <p className="font-medium">{lang.name}</p>
              <p className="text-sm text-white/40">{lang.level}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <footer className="mt-24 border-t border-white/10 pt-6 text-sm text-white/30">
        &copy; {new Date().getFullYear()} Mirzagha Aliyev · part of{" "}
        <a href="https://dxb.az" className="hover:text-white/60">
          dxb.az
        </a>
      </footer>
    </main>
  );
}
