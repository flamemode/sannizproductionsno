"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/providers";
import { translations as tr, t } from "@/lib/i18n";

const skills = [
  { name: "Next.js",        level: 90 },
  { name: "React",          level: 92 },
  { name: "TypeScript",     level: 85 },
  { name: "Tailwind CSS",   level: 95 },
  { name: "Node.js",        level: 80 },
  { name: "Three.js",       level: 70 },
  { name: "Framer Motion",  level: 85 },
  { name: "Figma",          level: 75 },
];

const tools = [
  "VS Code", "Git & GitHub", "Vercel", "Netlify",
  "PostgreSQL", "Prisma", "REST APIs", "GraphQL",
];

// ─── Skill bar ────────────────────────────────────────────────────────────────

function SkillBar({
  name,
  level,
  index,
  accent,
  trackColor,
}: {
  name: string;
  level: number;
  index: number;
  accent: string;
  trackColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-1.5">
        <span
          className="text-sm font-medium"
          style={{ color: "var(--fg-primary)", fontFamily: "var(--font-jakarta)" }}
        >
          {name}
        </span>
        <span
          className="text-xs"
          style={{ color: "var(--fg-muted)", fontFamily: "var(--font-jakarta)" }}
        >
          {level}%
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: trackColor }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.07, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: accent }}
        />
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { resolvedTheme } = useTheme();
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isSnow     = !mounted || resolvedTheme === "snow";
  const accent     = isSnow ? "#60a5fa" : "#f59e0b";
  const accentSoft = isSnow ? "rgba(96,165,250,0.08)"  : "rgba(245,158,11,0.08)";
  const accentBorder = isSnow ? "rgba(96,165,250,0.2)" : "rgba(245,158,11,0.2)";
  const trackColor = isSnow ? "rgba(96,165,250,0.1)"   : "rgba(245,158,11,0.1)";
  const dividerColor = isSnow ? "rgba(96,165,250,0.12)" : "rgba(245,158,11,0.12)";
  const sectionBg  = isSnow ? "rgba(11,21,48,0.6)"     : "rgba(240,249,255,0.6)";

  return (
    <section id="about" className="py-24 relative">
      {/* Section tint */}
      <div
        className="absolute inset-0"
        style={{ background: sectionBg, backdropFilter: "blur(2px)" }}
      />
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}55, transparent)`,
        }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: accent, fontFamily: "var(--font-jakarta)" }}
          >
            {t(tr.about.section_label, lang)}
          </span>
          <h2
            className="mt-3 text-4xl font-extrabold"
            style={{ fontFamily: "var(--font-syne)", color: "var(--fg-primary)" }}
          >
            {t(tr.about.heading, lang)}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Bio ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >

            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--font-syne)", color: "var(--fg-primary)" }}
            >
              {t(tr.about.role, lang)}
            </h3>

            <div
              className="space-y-4 leading-relaxed text-sm"
              style={{ color: "var(--fg-secondary)", fontFamily: "var(--font-jakarta)" }}
            >
              <p>{t(tr.about.bio1, lang)}</p>
              <p>{t(tr.about.bio2, lang)}</p>
              <p>{t(tr.about.bio3, lang)}</p>
            </div>

            {/* Tool badges */}
            <div className="mt-8">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--fg-muted)", fontFamily: "var(--font-jakarta)" }}
              >
                {t(tr.about.tools_label, lang)}
              </p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      border: `1px solid ${accentBorder}`,
                      background: accentSoft,
                      color: "var(--fg-secondary)",
                      fontFamily: "var(--font-jakarta)",
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Skills ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ color: "var(--fg-muted)", fontFamily: "var(--font-jakarta)" }}
            >
              {t(tr.about.skills_label, lang)}
            </p>

            <div className="space-y-5">
              {skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  index={i}
                  accent={accent}
                  trackColor={trackColor}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}