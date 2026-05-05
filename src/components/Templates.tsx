"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/providers";
import { translations as tr, t } from "@/lib/i18n";

type Template = {
  titleKey: keyof typeof tr.templates;
  descKey:  keyof typeof tr.templates;
  tags:     string[];
  color:    string;
  available: boolean;
  // demoUrl: string; // Uncomment and add your URL once live
};

const templates: Template[] = [
  {
    titleKey:  "t1_title",
    descKey:   "t1_desc",
    tags:      ["Next.js", "Tailwind", "Framer Motion"],
    color:     "#a78bfa",
    available: true,
    // demoUrl: "https://barber.sandnesproductions.no",
  },
  {
    titleKey:  "t2_title",
    descKey:   "t2_desc",
    tags:      ["Next.js", "Stripe", "PostgreSQL"],
    color:     "#60a5fa",
    available: false,
    // demoUrl: "https://shop.sandnesproductions.no",
  },
  {
    titleKey:  "t3_title",
    descKey:   "t3_desc",
    tags:      ["Next.js", "Tailwind", "Google Maps"],
    color:     "#f97316",
    available: false,
    // demoUrl: "https://restaurant.sandnesproductions.no",
  },
  {
    titleKey:  "t4_title",
    descKey:   "t4_desc",
    tags:      ["Next.js", "Tailwind", "Booking"],
    color:     "#f472b6",
    available: false,
    // demoUrl: "https://salon.sandnesproductions.no",
  },
  {
    titleKey:  "t5_title",
    descKey:   "t5_desc",
    tags:      ["Next.js", "Tailwind", "Framer Motion"],
    color:     "#4ade80",
    available: false,
    // demoUrl: "https://gym.sandnesproductions.no",
  },
  {
    titleKey:  "t6_title",
    descKey:   "t6_desc",
    tags:      ["Next.js", "Tailwind", "Gallery"],
    color:     "#fbbf24",
    available: false,
    // demoUrl: "https://photo.sandnesproductions.no",
  },
];

const icons: Record<string, string> = {
  t1_title: "✂️",
  t2_title: "🛍️",
  t3_title: "🍕",
  t4_title: "💆",
  t5_title: "🏋️",
  t6_title: "📸",
};

// ─── Template card ────────────────────────────────────────────────────────────

function TemplateCard({
  template,
  index,
  cardBg,
  cardBorder,
  cardBorderHover,
  lang,
}: {
  template: Template;
  index: number;
  cardBg: string;
  cardBorder: string;
  cardBorderHover: string;
  lang: "no" | "en";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  const titleObj = tr.templates[template.titleKey] as { no: string; en: string };
  const descObj  = tr.templates[template.descKey]  as { no: string; en: string };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl p-6 overflow-hidden transition-all duration-300 flex flex-col"
      style={{
        background: cardBg,
        border: `1px solid ${hovered ? cardBorderHover : cardBorder}`,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 12px 40px ${template.color}22` : "none",
        opacity: template.available ? 1 : 0.75,
      }}
    >
      {/* Colour top strip */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-opacity duration-300"
        style={{ background: template.color, opacity: hovered ? 1 : 0.5 }}
      />

      {/* Glow orb */}
      <div
        className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl transition-opacity duration-500"
        style={{ background: template.color, opacity: hovered ? 0.1 : 0 }}
      />

      {/* Icon + badge row */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{icons[template.titleKey]}</span>
        {template.available ? (
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(74,222,128,0.12)",
              color: "#4ade80",
              border: "1px solid rgba(74,222,128,0.3)",
              fontFamily: "var(--font-jakarta)",
            }}
          >
            {t(tr.templates.badge_available, lang)}
          </span>
        ) : (
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(148,163,184,0.1)",
              color: "var(--fg-muted)",
              border: "1px solid rgba(148,163,184,0.2)",
              fontFamily: "var(--font-jakarta)",
            }}
          >
            {t(tr.templates.badge_soon, lang)}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className="text-lg font-bold mb-2"
        style={{ fontFamily: "var(--font-syne)", color: "var(--fg-primary)" }}
      >
        {t(titleObj, lang)}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-4 flex-1"
        style={{ color: "var(--fg-secondary)", fontFamily: "var(--font-jakarta)" }}
      >
        {t(descObj, lang)}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {template.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-md font-medium"
            style={{
              background: "rgba(128,128,128,0.08)",
              color: "var(--fg-muted)",
              border: "1px solid rgba(128,128,128,0.12)",
              fontFamily: "var(--font-jakarta)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Demo button — only shown when available */}
      {template.available && (
        <a
          // href={template.demoUrl} // Uncomment once live
          href="#contact"
          className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          style={{ color: template.color, fontFamily: "var(--font-jakarta)" }}
        >
          {t(tr.templates.demo_btn, lang)}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      )}
    </motion.div>
  );
}

// ─── How it works step ────────────────────────────────────────────────────────

function Step({
  number,
  title,
  desc,
  accent,
  cardBg,
  cardBorder,
}: {
  number: string;
  title: string;
  desc: string;
  accent: string;
  cardBg: string;
  cardBorder: string;
}) {
  return (
    <div
      className="flex gap-4 p-5 rounded-2xl"
      style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 text-white"
        style={{ background: accent, fontFamily: "var(--font-syne)" }}
      >
        {number}
      </div>
      <div>
        <p
          className="text-sm font-bold mb-1"
          style={{ color: "var(--fg-primary)", fontFamily: "var(--font-syne)" }}
        >
          {title}
        </p>
        <p
          className="text-xs leading-relaxed"
          style={{ color: "var(--fg-secondary)", fontFamily: "var(--font-jakarta)" }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Templates() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { resolvedTheme } = useTheme();
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isSnow          = !mounted || resolvedTheme === "snow";
  const accent          = isSnow ? "#60a5fa" : "#f59e0b";
  const sectionBg       = isSnow ? "rgba(6,13,31,0.6)"     : "rgba(224,242,254,0.5)";
  const cardBg          = isSnow ? "rgba(16,30,58,0.8)"    : "rgba(255,255,255,0.75)";
  const cardBorder      = isSnow ? "rgba(96,165,250,0.1)"  : "rgba(245,158,11,0.15)";
  const cardBorderHover = isSnow ? "rgba(96,165,250,0.35)" : "rgba(245,158,11,0.4)";

  return (
    <section id="projects" className="py-24 relative">
      <div
        className="absolute inset-0"
        style={{ background: sectionBg, backdropFilter: "blur(2px)" }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}55, transparent)`,
        }}
      />

      <div ref={sectionRef} className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: accent, fontFamily: "var(--font-jakarta)" }}
          >
            {t(tr.templates.section_label, lang)}
          </span>
          <h2
            className="mt-3 text-4xl font-extrabold"
            style={{ fontFamily: "var(--font-syne)", color: "var(--fg-primary)" }}
          >
            {t(tr.templates.heading, lang)}
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto text-sm leading-relaxed"
            style={{ color: "var(--fg-secondary)", fontFamily: "var(--font-jakarta)" }}
          >
            {t(tr.templates.sub, lang)}
          </p>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid sm:grid-cols-3 gap-4 mb-8"
        >
          <Step
            number="1"
            title={t(tr.templates.pitch1_title, lang)}
            desc={t(tr.templates.pitch1_desc, lang)}
            accent={accent}
            cardBg={cardBg}
            cardBorder={cardBorder}
          />
          <Step
            number="2"
            title={t(tr.templates.pitch2_title, lang)}
            desc={t(tr.templates.pitch2_desc, lang)}
            accent={accent}
            cardBg={cardBg}
            cardBorder={cardBorder}
          />
          <Step
            number="3"
            title={t(tr.templates.pitch3_title, lang)}
            desc={t(tr.templates.pitch3_desc, lang)}
            accent={accent}
            cardBg={cardBg}
            cardBorder={cardBorder}
          />
        </motion.div>

        {/* CMS callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl mb-10"
          style={{
            background: isSnow
              ? "rgba(96,165,250,0.07)"
              : "rgba(245,158,11,0.07)",
            border: `1px solid ${cardBorder}`,
          }}
        >
          <div
            className="text-3xl w-12 h-12 flex items-center justify-center rounded-xl shrink-0"
            style={{ background: isSnow ? "rgba(96,165,250,0.12)" : "rgba(245,158,11,0.12)" }}
          >
            ✏️
          </div>
          <div>
            <p
              className="font-bold text-sm mb-1"
              style={{ color: "var(--fg-primary)", fontFamily: "var(--font-syne)" }}
            >
              {t(tr.templates.cms_title, lang)}
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--fg-secondary)", fontFamily: "var(--font-jakarta)" }}
            >
              {t(tr.templates.cms_desc, lang)}
            </p>
          </div>
        </motion.div>

        {/* Template grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, i) => (
            <TemplateCard
              key={template.titleKey}
              template={template}
              index={i}
              cardBg={cardBg}
              cardBorder={cardBorder}
              cardBorderHover={cardBorderHover}
              lang={lang}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-xs mt-10"
          style={{ color: "var(--fg-muted)", fontFamily: "var(--font-jakarta)" }}
        >
          ✦ {t(tr.templates.tailored_note, lang)} ✦
        </motion.p>
      </div>
    </section>
  );
}