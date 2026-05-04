"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Snowflake = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  char: string;
};

type Cloud = {
  id: number;
  top: number;
  left: number;
  scale: number;
  duration: number;
  delay: number;
};

// ─── Constants ───────────────────────────────────────────────────────────────

const SNOW_CHARS = ["❄", "❅", "❆", "✦", "·"];
const FLAKE_COUNT = 38;
const CLOUD_COUNT = 6;

// ─── Snow ─────────────────────────────────────────────────────────────────────

function SnowBackground() {
  const [flakes, setFlakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    setFlakes(
      Array.from({ length: FLAKE_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 14 + 8,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 12,
        sway: Math.random() * 1.8 + 0.6,
        char: SNOW_CHARS[Math.floor(Math.random() * SNOW_CHARS.length)],
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Night sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, #0d1f4a 0%, #060d1f 60%, #020810 100%)",
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
              animation: `pulse ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Aurora glow */}
      <div
        className="absolute top-0 left-0 right-0 h-64 opacity-20"
        style={{
          background:
            "linear-gradient(180deg, rgba(96,165,250,0.4) 0%, rgba(139,92,246,0.2) 50%, transparent 100%)",
          filter: "blur(40px)",
        }}
      />

      {/* Snowflakes */}
      {flakes.map((f) => (
        <span
          key={f.id}
          className="snowflake select-none"
          style={{
            left: `${f.left}%`,
            fontSize: `${f.size}px`,
            animationDuration: `${f.duration}s, ${f.sway}s`,
            animationDelay: `${f.delay}s, ${f.delay * 0.5}s`,
            opacity: 0.7,
          }}
        >
          {f.char}
        </span>
      ))}

      {/* Ground mist */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 opacity-30"
        style={{
          background:
            "linear-gradient(0deg, rgba(148,197,255,0.15) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

// ─── Sunny ───────────────────────────────────────────────────────────────────

function SunnyBackground() {
  const [clouds, setClouds] = useState<Cloud[]>([]);

  useEffect(() => {
    setClouds(
      Array.from({ length: CLOUD_COUNT }, (_, i) => ({
        id: i,
        top: Math.random() * 45 + 5,
        left: Math.random() * 90,
        scale: Math.random() * 0.6 + 0.7,
        duration: Math.random() * 8 + 10,
        delay: Math.random() * 6,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(175deg, #7dd3fc 0%, #bae6fd 35%, #e0f2fe 65%, #f0fdf4 100%)",
        }}
      />

      {/* Sun */}
      <div
        className="absolute"
        style={{
          top: "6%",
          right: "10%",
          width: 100,
          height: 100,
        }}
      >
        {/* Outer rays */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)",
            width: 180,
            height: 180,
            top: -40,
            left: -40,
            animation: "sun-pulse 4s ease-in-out infinite",
          }}
        />
        {/* Sun core */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, #fef08a 20%, #fbbf24 55%, #f59e0b 100%)",
            boxShadow:
              "0 0 40px 10px rgba(251,191,36,0.5), 0 0 80px 20px rgba(251,191,36,0.2)",
            animation: "sun-pulse 4s ease-in-out infinite",
          }}
        />
        {/* Ray lines */}
        <div
          className="absolute"
          style={{
            width: 160,
            height: 160,
            top: -30,
            left: -30,
            animation: "ray-spin 20s linear infinite",
            opacity: 0.25,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: 2,
                height: 28,
                background: "#fbbf24",
                borderRadius: 2,
                top: "50%",
                left: "50%",
                transformOrigin: "50% 80px",
                transform: `rotate(${i * 45}deg) translateY(-80px)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Clouds */}
      {clouds.map((c) => (
        <div
          key={c.id}
          className="absolute"
          style={{
            top: `${c.top}%`,
            left: `${c.left}%`,
            transform: `scale(${c.scale})`,
            animation: `${c.id % 2 === 0 ? "cloud-drift" : "cloud-drift-slow"} ${c.duration}s ease-in-out infinite`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <CloudShape />
        </div>
      ))}

      {/* Warm haze at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 opacity-40"
        style={{
          background:
            "linear-gradient(0deg, rgba(254,243,199,0.6) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

function CloudShape() {
  return (
    <svg
      width="160"
      height="70"
      viewBox="0 0 160 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 4px 12px rgba(186,230,253,0.5))" }}
    >
      <ellipse cx="80" cy="50" rx="70" ry="20" fill="white" fillOpacity="0.9" />
      <ellipse cx="55" cy="42" rx="32" ry="24" fill="white" fillOpacity="0.95" />
      <ellipse cx="95" cy="38" rx="38" ry="28" fill="white" fillOpacity="0.95" />
      <ellipse cx="120" cy="46" rx="24" ry="18" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function ThemeBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch — render nothing until mounted
  if (!mounted) return null;

  return resolvedTheme === "sunny" ? <SunnyBackground /> : <SnowBackground />;
}