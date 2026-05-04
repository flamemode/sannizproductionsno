"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/providers";
import { translations as tr, t } from "@/lib/i18n";

type Category = "personal" | "client";

type Project = {
  titleKey: keyof typeof tr.projects;
  descKey:  keyof typeof tr.projects;
  tags:     string[];
  category: Category;
  color:    string;
  link?:    string;
};

const projects: Project[] = [
  {
    titleKey: "p1_title", descKey: "p1_desc",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    category: "client", color: "#f97316",
  },
  {
    titleKey: "p2_title", descKey: "p2_desc",
    tags: ["Next.js", "TypeScript", "Stripe"],
    category: "client", color: "#4ade80",
  },
  {
    titleKey: "p3_title", descKey: "p3_desc",
    tags: ["React", "TypeScript", "Prisma"],
    category: "personal", color: "#60a5fa",
  },
  {
    titleKey: "p4_title", descKey: "p4_desc",
    tags: ["Next.js", "Tailwind", "PostgreSQL"],
    category: "client", color: "#f472b6",
  },
  {
    titleKey: "p5_title", descKey: "p5_desc",
    tags: ["Three.js", "Framer Motion", "React"],
    category: "personal", color: "#a78bfa",
  },
  {
    titleKey: "p6_title", descKey: "p6_desc",
    tags: ["Next.js", "Tailwind", "Sanity CMS"],
    category: "client", color: "#fbbf24",
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  accent,
  cardBg,
  cardBorder,
  cardBorderHover,
  lang,
}: {
  project: Project;
  index: number;
  accent: string;
  cardBg: string;
  cardBorder: string;
  cardBorderHover: string;
  lang: "no" | "en";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  const titleObj = tr.projects[project.titleKey] as { no: string; en: string };
  const descObj  = tr.projects[project.descKey]  as { no: string; en: string };
  const badgeObj = project.category === "client"
    ? tr.projects.badge_client
    : tr.projects.badge_personal;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl p-6 overflow-hidden transition-all duration-300"
      style={{
        background: cardBg,
        border: `1px solid ${hovered ? cardBorderHover : cardBorder}`,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 12px 40px ${project.color}22` : "none",
      }}
    >
      {/* Colour top strip */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-opacity duration-300"
        style={{
          background: project.color,
          opacity: hovered ? 1 : 0.5,
        }}
      />
      {/* Glow orb on hover */}
      <div
        className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl transition-opacity duration-500"
        style={{
          background: project.color,
          opacity: hovered ? 0.12 : 0,
        }}
      />

      {/* Badge + link row */}
      <div className="flex items-start justify-between mb-4">
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: `${project.color}18`,
            color: project.color,
            border: `1px solid ${project.color}35`,
            fontFamily: "var(--font-jakarta)",
          }}
        >
          {t(badgeObj, lang)}
        </span>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View project"
            className="transition-colors"
            style={{ color: "var(--fg-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--fg-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--fg-muted)")
            }
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        )}
      </div>

      {/* Title */}
      <h3
        className="text-lg font-bold mb-2 transition-colors"
        style={{
          fontFamily: "var(--font-syne)",
          color: hovered ? "var(--fg-primary)" : "var(--fg-primary)",
        }}
      >
        {t(titleObj, lang)}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: "var(--fg-secondary)", fontFamily: "var(--font-jakarta)" }}
      >
        {t(descObj, lang)}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
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
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

type Filter = "all" | Category;

export default function Projects() {
  const [active, setActive] = useState<Filter>("all");
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { resolvedTheme } = useTheme();
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isSnow       = !mounted || resolvedTheme === "snow";
  const accent       = isSnow ? "#60a5fa" : "#f59e0b";
  const sectionBg    = isSnow ? "rgba(6,13,31,0.6)"    : "rgba(224,242,254,0.5)";
  const cardBg       = isSnow ? "rgba(16,30,58,0.8)"   : "rgba(255,255,255,0.75)";
  const cardBorder   = isSnow ? "rgba(96,165,250,0.1)" : "rgba(245,158,11,0.15)";
  const cardBorderHover = isSnow ? "rgba(96,165,250,0.35)" : "rgba(245,158,11,0.4)";
  const activePillBg = accent;
  const inactiveBorder = isSnow ? "rgba(96,165,250,0.2)" : "rgba(245,158,11,0.25)";

  const filters: { key: Filter; label: { no: string; en: string } }[] = [
    { key: "all",      label: tr.projects.filter_all },
    { key: "personal", label: tr.projects.filter_personal },
    { key: "client",   label: tr.projects.filter_client },
  ];

  const filtered = active === "all"
    ? projects
    : projects.filter((p) => p.category === active);

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
            {t(tr.projects.section_label, lang)}
          </span>
          <h2
            className="mt-3 text-4xl font-extrabold"
            style={{ fontFamily: "var(--font-syne)", color: "var(--fg-primary)" }}
          >
            {t(tr.projects.heading, lang)}
          </h2>
          <p
            className="mt-4 max-w-lg mx-auto text-sm leading-relaxed"
            style={{ color: "var(--fg-secondary)", fontFamily: "var(--font-jakarta)" }}
          >
            {t(tr.projects.sub, lang)}
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 mb-10"
        >
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                background: active === key ? activePillBg : "transparent",
                color: active === key ? "#fff" : "var(--fg-secondary)",
                border: `1px solid ${active === key ? "transparent" : inactiveBorder}`,
                boxShadow: active === key
                  ? `0 0 18px ${accent}55`
                  : "none",
                fontFamily: "var(--font-jakarta)",
              }}
            >
              {t(label, lang)}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.titleKey}
                project={project}
                index={i}
                accent={accent}
                cardBg={cardBg}
                cardBorder={cardBorder}
                cardBorderHover={cardBorderHover}
                lang={lang}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}