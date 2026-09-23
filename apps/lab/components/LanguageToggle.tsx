"use client";

import { useLanguage } from "@/lib/language-context";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="fixed right-4 top-4 z-50 flex overflow-hidden rounded-full border border-white/10 bg-black/60 font-mono text-xs backdrop-blur">
      {(["az", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1.5 uppercase transition-colors ${
            lang === l ? "bg-accent text-black" : "text-white/50 hover:text-white"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
