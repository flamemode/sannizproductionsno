"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { Language } from "@/lib/i18n";

// ─── Language context ────────────────────────────────────────────────────────

type LanguageContextType = {
  lang: Language;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "no",
  toggleLang: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("no");

  // Persist language choice across page reloads
  useEffect(() => {
    const stored = localStorage.getItem("sp-lang") as Language | null;
    if (stored === "no" || stored === "en") setLang(stored);
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next: Language = prev === "no" ? "en" : "no";
      localStorage.setItem("sp-lang", next);
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─── Combined providers ───────────────────────────────────────────────────────

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="snow"
      themes={["snow", "sunny"]}
      disableTransitionOnChange={false}
    >
      <LanguageProvider>{children}</LanguageProvider>
    </NextThemesProvider>
  );
}