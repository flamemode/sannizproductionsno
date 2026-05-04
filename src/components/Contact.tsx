"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "@/components/providers";
import { translations as tr, t } from "@/lib/i18n";

// ─── Schema (language-aware messages set at submit time) ──────────────────────

const schema = z.object({
  name:     z.string().min(2),
  email:    z.string().email(),
  business: z.string().optional(),
  budget:   z.string().min(1),
  message:  z.string().min(20),
});

type FormData = z.infer<typeof schema>;

const budgetOptions = [
  "Under €500",
  "€500 – €1 500",
  "€1 500 – €5 000",
  "€5 000+",
  "Vet ikke ennå / Not sure yet",
];

// ─── Shared input style helper ────────────────────────────────────────────────

function inputStyle(accent: string, isSnow: boolean) {
  return {
    background: isSnow ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
    border: `1px solid ${isSnow ? "rgba(96,165,250,0.15)" : "rgba(245,158,11,0.2)"}`,
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    color: "var(--fg-primary)",
    fontFamily: "var(--font-jakarta)",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
  } as React.CSSProperties;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-100px" });
  const { resolvedTheme } = useTheme();
  const { lang } = useLanguage();
  const [mounted, setMounted]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => setMounted(true), []);

  const isSnow       = !mounted || resolvedTheme === "snow";
  const accent       = isSnow ? "#60a5fa" : "#f59e0b";
  const sectionBg    = isSnow ? "rgba(11,21,48,0.65)"   : "rgba(240,249,255,0.6)";
  const cardBg       = isSnow ? "rgba(16,30,58,0.85)"   : "rgba(255,255,255,0.8)";
  const cardBorder   = isSnow ? "rgba(96,165,250,0.15)" : "rgba(245,158,11,0.2)";
  const accentSoft   = isSnow ? "rgba(96,165,250,0.08)" : "rgba(245,158,11,0.08)";
  const iconBg       = isSnow ? "rgba(96,165,250,0.1)"  : "rgba(245,158,11,0.1)";
  const iconBorder   = isSnow ? "rgba(96,165,250,0.2)"  : "rgba(245,158,11,0.2)";
  const dividerColor = isSnow ? "rgba(96,165,250,0.1)"  : "rgba(245,158,11,0.12)";
  const accentGlow   = isSnow
    ? "0 0 28px rgba(96,165,250,0.3)"
    : "0 0 28px rgba(245,158,11,0.3)";

  const { register, handleSubmit, formState: { errors }, reset } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    // TODO: wire up to Resend / EmailJS
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Form data:", data);
    setSubmitting(false);
    setSubmitted(true);
    reset();
  };

  const contactInfo = [
    {
      label: t(tr.contact.label_email, lang),
      value: "hei@sandnesproductions.no",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
    {
      label: t(tr.contact.label_location, lang),
      value: t(tr.contact.location_val, lang),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
    },
    {
      label: t(tr.contact.label_response, lang),
      value: t(tr.contact.response_val, lang),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="py-24 relative">
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
          className="text-center mb-16"
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: accent, fontFamily: "var(--font-jakarta)" }}
          >
            {t(tr.contact.section_label, lang)}
          </span>
          <h2
            className="mt-3 text-4xl font-extrabold"
            style={{ fontFamily: "var(--font-syne)", color: "var(--fg-primary)" }}
          >
            {t(tr.contact.heading, lang)}
          </h2>
          <p
            className="mt-4 max-w-lg mx-auto text-sm leading-relaxed"
            style={{ color: "var(--fg-secondary)", fontFamily: "var(--font-jakarta)" }}
          >
            {t(tr.contact.sub, lang)}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">

          {/* ── Sidebar ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: "var(--font-syne)", color: "var(--fg-primary)" }}
              >
                {t(tr.contact.sidebar_heading, lang)}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--fg-secondary)", fontFamily: "var(--font-jakarta)" }}
              >
                {t(tr.contact.sidebar_sub, lang)}
              </p>
            </div>

            {/* Info items */}
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: iconBg,
                      border: `1px solid ${iconBorder}`,
                      color: accent,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p
                      className="text-xs mb-0.5"
                      style={{ color: "var(--fg-muted)", fontFamily: "var(--font-jakarta)" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--fg-secondary)", fontFamily: "var(--font-jakarta)" }}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div
              className="pt-4"
              style={{ borderTop: `1px solid ${dividerColor}` }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--fg-muted)", fontFamily: "var(--font-jakarta)" }}
              >
                {t(tr.contact.find_online, lang)}
              </p>
              <div className="flex gap-3">
                {["GitHub", "LinkedIn"].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      border: `1px solid ${iconBorder}`,
                      color: "var(--fg-muted)",
                      fontFamily: "var(--font-jakarta)",
                      background: accentSoft,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = accent;
                      e.currentTarget.style.color = accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = iconBorder;
                      e.currentTarget.style.color = "var(--fg-muted)";
                    }}
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-16 rounded-2xl"
                style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-2xl"
                  style={{
                    background: "rgba(74,222,128,0.1)",
                    border: "1px solid rgba(74,222,128,0.3)",
                    color: "#4ade80",
                  }}
                >
                  ✓
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-syne)", color: "var(--fg-primary)" }}
                >
                  {t(tr.contact.success_heading, lang)}
                </h3>
                <p
                  className="text-sm max-w-xs"
                  style={{ color: "var(--fg-secondary)", fontFamily: "var(--font-jakarta)" }}
                >
                  {t(tr.contact.success_sub, lang)}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs font-semibold hover:underline"
                  style={{ color: accent, fontFamily: "var(--font-jakarta)" }}
                >
                  {t(tr.contact.success_again, lang)}
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-2xl p-8 space-y-5"
                style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
              >
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "var(--fg-muted)", fontFamily: "var(--font-jakarta)" }}
                    >
                      {t(tr.contact.field_name, lang)}
                    </label>
                    <input
                      {...register("name")}
                      placeholder={t(tr.contact.placeholder_name, lang)}
                      style={inputStyle(accent, isSnow)}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = accent;
                        e.currentTarget.style.background = isSnow
                          ? "rgba(96,165,250,0.06)"
                          : "rgba(245,158,11,0.06)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isSnow
                          ? "rgba(96,165,250,0.15)"
                          : "rgba(245,158,11,0.2)";
                        e.currentTarget.style.background = isSnow
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(0,0,0,0.03)";
                      }}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400 mt-1">
                        {t(tr.contact.err_name, lang)}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "var(--fg-muted)", fontFamily: "var(--font-jakarta)" }}
                    >
                      {t(tr.contact.field_email, lang)}
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder={t(tr.contact.placeholder_email, lang)}
                      style={inputStyle(accent, isSnow)}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = accent;
                        e.currentTarget.style.background = isSnow
                          ? "rgba(96,165,250,0.06)"
                          : "rgba(245,158,11,0.06)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isSnow
                          ? "rgba(96,165,250,0.15)"
                          : "rgba(245,158,11,0.2)";
                        e.currentTarget.style.background = isSnow
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(0,0,0,0.03)";
                      }}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 mt-1">
                        {t(tr.contact.err_email, lang)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Business + Budget */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "var(--fg-muted)", fontFamily: "var(--font-jakarta)" }}
                    >
                      {t(tr.contact.field_business, lang)}
                    </label>
                    <input
                      {...register("business")}
                      placeholder={t(tr.contact.placeholder_biz, lang)}
                      style={inputStyle(accent, isSnow)}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = accent;
                        e.currentTarget.style.background = isSnow
                          ? "rgba(96,165,250,0.06)"
                          : "rgba(245,158,11,0.06)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isSnow
                          ? "rgba(96,165,250,0.15)"
                          : "rgba(245,158,11,0.2)";
                        e.currentTarget.style.background = isSnow
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(0,0,0,0.03)";
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "var(--fg-muted)", fontFamily: "var(--font-jakarta)" }}
                    >
                      {t(tr.contact.field_budget, lang)}
                    </label>
                    <select
                      {...register("budget")}
                      style={{
                        ...inputStyle(accent, isSnow),
                        appearance: "none",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = accent;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isSnow
                          ? "rgba(96,165,250,0.15)"
                          : "rgba(245,158,11,0.2)";
                      }}
                    >
                      <option value="" style={{ background: isSnow ? "#0b1530" : "#f0f9ff" }}>
                        {t(tr.contact.budget_default, lang)}
                      </option>
                      {budgetOptions.map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          style={{ background: isSnow ? "#0b1530" : "#f0f9ff" }}
                        >
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.budget && (
                      <p className="text-xs text-red-400 mt-1">
                        {t(tr.contact.err_budget, lang)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: "var(--fg-muted)", fontFamily: "var(--font-jakarta)" }}
                  >
                    {t(tr.contact.field_message, lang)}
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder={t(tr.contact.placeholder_msg, lang)}
                    style={{ ...inputStyle(accent, isSnow), resize: "none" }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = accent;
                      e.currentTarget.style.background = isSnow
                        ? "rgba(96,165,250,0.06)"
                        : "rgba(245,158,11,0.06)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = isSnow
                        ? "rgba(96,165,250,0.15)"
                        : "rgba(245,158,11,0.2)";
                      e.currentTarget.style.background = isSnow
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(0,0,0,0.03)";
                    }}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400 mt-1">
                      {t(tr.contact.err_message, lang)}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: accent,
                    boxShadow: accentGlow,
                    fontFamily: "var(--font-jakarta)",
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting)
                      e.currentTarget.style.boxShadow = isSnow
                        ? "0 0 44px rgba(96,165,250,0.55)"
                        : "0 0 44px rgba(245,158,11,0.55)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = accentGlow;
                  }}
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t(tr.contact.sending, lang)}
                    </>
                  ) : (
                    t(tr.contact.send, lang)
                  )}
                </button>

                <p
                  className="text-center text-xs"
                  style={{ color: "var(--fg-muted)", fontFamily: "var(--font-jakarta)" }}
                >
                  {t(tr.contact.disclaimer, lang)}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}