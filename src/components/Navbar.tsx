"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/providers";
import { translations as tr, t } from "@/lib/i18n";

// ─── Flag SVGs ────────────────────────────────────────────────────────────────

function NorwayFlag() {
  return (
    <svg width="24" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="16" rx="2" fill="#EF2B2D" />
      <rect x="6" width="3" height="16" fill="white" />
      <rect y="6.5" width="22" height="3" fill="white" />
      <rect x="7" width="1.5" height="16" fill="#003680" />
      <rect y="7.25" width="22" height="1.5" fill="#003680" />
    </svg>
  );
}

function UKFlag() {
  return (
    <svg width="24" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="16" rx="2" fill="#012169" />
      <path d="M0 0L22 16M22 0L0 16" stroke="white" strokeWidth="3" />
      <path d="M0 0L22 16M22 0L0 16" stroke="#C8102E" strokeWidth="1.8" />
      <path d="M11 0V16M0 8H22" stroke="white" strokeWidth="4.5" />
      <path d="M11 0V16M0 8H22" stroke="#C8102E" strokeWidth="2.8" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isSnow = theme === "snow" || !mounted;

  const navLinks = [
    { label: t(tr.nav.home, lang),     href: "#home" },
    { label: t(tr.nav.about, lang),    href: "#about" },
    { label: t(tr.nav.projects, lang), href: "#projects" },
    { label: t(tr.nav.contact, lang),  href: "#contact" },
  ];

  // Theme-aware colour tokens
  const accentColor  = isSnow ? "#60a5fa" : "#f59e0b";
  const borderColor  = isSnow
    ? "rgba(96,165,250,0.15)"
    : "rgba(245,158,11,0.2)";
  const bgScrolled   = isSnow
    ? "rgba(6,13,31,0.88)"
    : "rgba(224,242,254,0.88)";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? {
              background: bgScrolled,
              backdropFilter: "blur(14px)",
              borderBottom: `1px solid ${borderColor}`,
              boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            }
          : {}
      }
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ── Logo ── */}
        <a href="#home" className="group flex items-center gap-2">
          <span
            className="text-2xl font-extrabold tracking-tight transition-colors"
            style={{
              fontFamily: "var(--font-syne)",
              color: accentColor,
            }}
          >
            Sandnes
          </span>
          <span
            className="text-sm font-medium transition-colors"
            style={{ color: "var(--fg-secondary)" }}
          >
            Productions
          </span>
        </a>

        {/* ── Desktop links ── */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-medium transition-colors group"
                style={{ color: "var(--fg-secondary)" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ background: accentColor }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* ── Right controls ── */}
        <div className="hidden md:flex items-center gap-3">

          {/* Weather toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(isSnow ? "sunny" : "snow")}
              aria-label="Toggle weather theme"
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all duration-200 hover:scale-110"
              style={{
                background: isSnow
                  ? "rgba(96,165,250,0.1)"
                  : "rgba(245,158,11,0.1)",
                border: `1px solid ${borderColor}`,
              }}
              title={isSnow ? "Switch to sunny" : "Switch to snow"}
            >
              {isSnow ? "☀️" : "❄️"}
            </button>
          )}

          {/* Language / flag toggle */}
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: isSnow
                ? "rgba(96,165,250,0.08)"
                : "rgba(245,158,11,0.08)",
              border: `1px solid ${borderColor}`,
              color: "var(--fg-secondary)",
            }}
            title={lang === "no" ? "Switch to English" : "Bytt til norsk"}
          >
            {lang === "no" ? <NorwayFlag /> : <UKFlag />}
            <span>{lang === "no" ? "NO" : "EN"}</span>
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200"
            style={{
              background: accentColor,
              boxShadow: `0 0 20px ${isSnow ? "rgba(96,165,250,0.35)" : "rgba(245,158,11,0.35)"}`,
            }}
          >
            {t(tr.nav.cta, lang)}
          </a>
        </div>

        {/* ── Mobile: controls + hamburger ── */}
        <div className="md:hidden flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(isSnow ? "sunny" : "snow")}
              aria-label="Toggle weather theme"
              className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
              style={{
                background: isSnow
                  ? "rgba(96,165,250,0.1)"
                  : "rgba(245,158,11,0.1)",
                border: `1px solid ${borderColor}`,
              }}
            >
              {isSnow ? "☀️" : "❄️"}
            </button>
          )}
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: isSnow
                ? "rgba(96,165,250,0.08)"
                : "rgba(245,158,11,0.08)",
              border: `1px solid ${borderColor}`,
            }}
          >
            {lang === "no" ? <NorwayFlag /> : <UKFlag />}
          </button>
          <button
            className="flex flex-col gap-1.5 p-2 ml-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  background: "var(--fg-primary)",
                  transform:
                    i === 0 && menuOpen ? "rotate(45deg) translateY(8px)"
                    : i === 1 && menuOpen ? "scaleX(0)"
                    : i === 2 && menuOpen ? "rotate(-45deg) translateY(-8px)"
                    : "none",
                  opacity: i === 1 && menuOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              background: isSnow
                ? "rgba(11,21,48,0.97)"
                : "rgba(240,249,255,0.97)",
              borderTop: `1px solid ${borderColor}`,
              backdropFilter: "blur(14px)",
            }}
          >
            <ul className="flex flex-col px-6 py-5 gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm font-medium py-1 transition-colors"
                    style={{ color: "var(--fg-secondary)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-white mt-1"
                  style={{ background: accentColor }}
                >
                  {t(tr.nav.cta, lang)}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}