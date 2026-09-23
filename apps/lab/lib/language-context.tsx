"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "az" | "en";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const STORAGE_KEY = "lab-lang";

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("az");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "az" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle: () => setLang(lang === "az" ? "en" : "az") }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
