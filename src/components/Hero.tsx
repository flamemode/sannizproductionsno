"use client";

import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/providers";
import { translations as tr, t } from "@/lib/i18n";

const ComputerScene = dynamic(() => import("./ComputerScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="w-12 h-12 border-2 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: "var(--accent)" }}
      />
    </div>
  ),
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isSnow = !mounted || resolvedTheme === "snow";
  const accent      = isSnow ? "#60a5fa" : "#f59e0b";
  const accentSoft  = isSnow ? "rgba(96,165,250,0.12)"  : "rgba(245,158,11,0.12)";
  const accentBorder= isSnow ? "rgba(96,165,250,0.3)"   : "rgba(245,158,11,0.3)";
  const accentGlow  = isSnow
    ? "0 0 30px rgba(96,165,250,0.4)"
    : "0 0 30px rgba(245,158,11,0.4)";
  const accentGlowHover = isSnow
    ? "0 0 44px rgba(96,165,250,0.65)"
    : "0 0 44px rgba(245,158,11,0.65)";

  const stats = [
    { number: t(tr.hero.stat1_num, lang), label: t(tr.hero.stat1_label, lang) },
    { number: t(tr.hero.stat2_num, lang), label: t(tr.hero.stat2_label, lang) },
    { number: t(tr.hero.stat3_num, lang), label: t(tr.hero.stat3_label, lang) },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: text ── */}
          <div>
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{
                border: `1px solid ${accentBorder}`,
                background: accentSoft,
                color: accent,
                fontFamily: "var(--font-jakarta)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: isSnow ? "#4ade80" : "#22c55e" }}
              />
              {t(tr.hero.badge, lang)}
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
              style={{ fontFamily: "var(--font-syne)", color: "var(--fg-primary)" }}
            >
              {t(tr.hero.headline1, lang)}{" "}
              <span
  className="bg-clip-text text-transparent inline-block"
  style={{
    backgroundImage: isSnow
      ? "linear-gradient(90deg, #60a5fa, #a78bfa)"
      : "linear-gradient(90deg, #f59e0b, #ef4444)",
  }}
>
  {t(tr.hero.highlight, lang)}
</span>{" "}
              {t(tr.hero.headline2, lang)}
            </motion.h1>

            {/* Sub */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg leading-relaxed mb-8 max-w-lg"
              style={{
                color: "var(--fg-secondary)",
                fontFamily: "var(--font-jakarta)",
              }}
            >
              {t(tr.hero.sub, lang)}
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="px-7 py-3 rounded-full font-semibold text-white transition-all duration-200"
                style={{
                  background: accent,
                  boxShadow: accentGlow,
                  fontFamily: "var(--font-jakarta)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = accentGlowHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = accentGlow)
                }
              >
                {t(tr.hero.cta_primary, lang)}
              </a>
              <a
                href="#contact"
                className="px-7 py-3 rounded-full font-semibold transition-all duration-200"
                style={{
                  border: `1px solid ${accentBorder}`,
                  color: "var(--fg-secondary)",
                  fontFamily: "var(--font-jakarta)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accent;
                  e.currentTarget.style.color = accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = accentBorder;
                  e.currentTarget.style.color = "var(--fg-secondary)";
                }}
              >
                {t(tr.hero.cta_secondary, lang)}
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex gap-8 mt-12"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-2xl font-extrabold"
                    style={{
                      fontFamily: "var(--font-syne)",
                      color: accent,
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{
                      color: "var(--fg-muted)",
                      fontFamily: "var(--font-jakarta)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: 3D scene ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="h-[500px] lg:h-[600px] cursor-grab active:cursor-grabbing"
          >
            <ComputerScene />
          </motion.div>
        </div>

        {/* ── Scroll cue ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-xs"
            style={{
              color: "var(--fg-muted)",
              fontFamily: "var(--font-jakarta)",
            }}
          >
            {t(tr.hero.scroll, lang)}
          </span>
          <div
            className="w-5 h-8 rounded-full flex justify-center pt-1.5"
            style={{ border: `1px solid ${accentBorder}` }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full"
              style={{ background: accent }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}