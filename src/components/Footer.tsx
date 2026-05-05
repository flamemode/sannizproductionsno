"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useLanguage } from "@/components/providers";
import { translations as tr, t } from "@/lib/i18n";

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isSnow       = !mounted || resolvedTheme === "snow";
  const accent       = isSnow ? "#60a5fa" : "#f59e0b";
  const dividerColor = isSnow ? "rgba(96,165,250,0.1)"  : "rgba(245,158,11,0.12)";
  const footerBg     = isSnow ? "rgba(6,13,31,0.8)"     : "rgba(224,242,254,0.8)";

  const year = new Date().getFullYear();

  const navLinks = [
    { label: t(tr.nav.home, lang),     href: "#home" },
    { label: t(tr.nav.about, lang),    href: "#about" },
    { label: t(tr.nav.projects, lang), href: "#projects" },
    { label: t(tr.nav.contact, lang),  href: "#contact" },
  ];

  return (
    <footer
      className="relative"
      style={{
        borderTop: `1px solid ${dividerColor}`,
        background: footerBg,
        backdropFilter: "blur(14px)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* ── Logo ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Image
              src="/SPlogo.png"
              alt="Sandnes Productions"
              width={120}
              height={36}
              className="object-contain"
              style={{
                filter: isSnow
                  ? "brightness(1.1) drop-shadow(0 0 4px rgba(96,165,250,0.2))"
                  : "brightness(0.95)",
              }}
            />
          </motion.div>

          {/* ── Nav links ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium transition-colors"
                style={{
                  color: "var(--fg-muted)",
                  fontFamily: "var(--font-jakarta)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* ── Tagline + lang toggle ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-end gap-2"
          >
            <p
              className="text-xs"
              style={{
                color: "var(--fg-muted)",
                fontFamily: "var(--font-jakarta)",
              }}
            >
              © {year} Sandnes Productions —{" "}
              {t(tr.footer.tagline, lang)}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-xs">{isSnow ? "❄️" : "☀️"}</span>
              <button
                onClick={toggleLang}
                className="text-xs font-semibold transition-colors"
                style={{
                  color: "var(--fg-muted)",
                  fontFamily: "var(--font-jakarta)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
              >
                {lang === "no" ? "🇳🇴 Norsk" : "🇬🇧 English"}
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </footer>
  );
}