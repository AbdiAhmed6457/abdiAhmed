"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type SkillGroup = {
  id: string;
  label: string;
  angle: number; // degrees for needle
  years: number; // experience in years
  items: string[];
};

const GROUPS: SkillGroup[] = [
  { id: "frontend", label: "Frontend", angle: 40, years: 2, items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { id: "backend", label: "Backend", angle: 140, years: 2, items: ["Node.js", "Express", "Postgres", "Prisma", "Django", "MongoDB", "MySQL", "NoSQL"] },
  { id: "devops", label: "DevOps", angle: 90, years: 0.5, items: ["Docker", "AWS", "GitHub"] },
  { id: "mobile", label: "Mobile", angle: 320, years: 0.5, items: ["Flutter", "React Native"] },
];

function Gauge({ angle, years }: { angle: number; years: number }) {
  const pct = Math.min(1, years / 5);
  const r = 36;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * pct;
  const display = years < 1 ? "<1y" : `${Math.round(years)}y`;
  const percent = Math.round(pct * 100);

  const id = React.useId();
  const gradId = `g-skill-${id}`;

  return (
    <div className="w-36 h-36 relative">
      <svg viewBox="0 0 100 100" className="w-36 h-36" aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="0" x2="1">
            <stop offset="0%" stopColor="var(--lux-gold)" />
            <stop offset="100%" stopColor="rgba(201,161,91,0.6)" />
          </linearGradient>
        </defs>
        <g transform="translate(50,50)">
          <circle r={r} fill="transparent" stroke="rgba(255,255,255,0.04)" strokeWidth={8} />

          <motion.circle
            r={r}
            fill="transparent"
            stroke={`url(#${gradId})`}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${Math.max(1, circumference - dash)}`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: Math.max(0, circumference - dash) }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            transform="rotate(-90)"
          />

          <motion.g
            initial={{ rotate: -90 }}
            animate={{ rotate: angle }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "50% 50%" }}
          >
            <rect x="-1" y="-2" width="2" height="38" rx="1" fill="var(--lux-gold)" />
            <circle r="3" fill="var(--lux-gold)" />
          </motion.g>
        </g>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-2xl font-semibold text-(--lux-ivory)">{percent}%</div>
        <div className="text-xs text-(--muted-foreground)">{display}</div>
      </div>
    </div>
  );
}

function TechLogo({ name }: { name: string }) {
  // map common names to simpleicons slugs & preferred color (hex without #)
  const map: Record<string, { slug?: string; color?: string }> = {
    react: { slug: "react", color: "61DAFB" },
    "next.js": { slug: "nextdotjs", color: "000000" },
    typescript: { slug: "typescript", color: "3178C6" },
    "tailwind css": { slug: "tailwindcss", color: "06B6D4" },
    "tailwindcss": { slug: "tailwindcss", color: "06B6D4" },
    "framer motion": { slug: "framer", color: "0055FF" },
    node: { slug: "nodedotjs", color: "339933" },
    "node.js": { slug: "nodedotjs", color: "339933" },
    express: { slug: "express", color: "000000" },
    postgres: { slug: "postgresql", color: "4169E1" },
    prisma: { slug: "prisma", color: "0EA5A4" },
    django: { slug: "django", color: "092E20" },
    mongodb: { slug: "mongodb", color: "47A248" },
    mysql: { slug: "mysql", color: "4479A1" },
    nosql: {},
    docker: { slug: "docker", color: "2496ED" },
    aws: { slug: "amazonaws", color: "FF9900" },
    github: { slug: "github", color: "181717" },
    flutter: { slug: "flutter", color: "02569B" },
    "react native": { slug: "react", color: "61DAFB" },
  };

  const key = name.toLowerCase();
  const found = map[key] || {};

  const initials = name
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const imgSrc = found.slug ? `https://cdn.simpleicons.org/${found.slug}/${found.color || "000"}` : null;

  const id = React.useId();
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div
      className="tech-logo inline-flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(201,161,91,0.06)] text-(--lux-ivory) text-xs font-semibold relative overflow-hidden"
      tabIndex={0}
      aria-describedby={`tech-tooltip-${id}`}
    >
      {imgSrc ? (
        <>
          <Image
            src={imgSrc}
            alt={name}
            width={32}
            height={32}
            className={`w-8 h-8 object-contain transition-opacity ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(false)}
          />
          {!loaded && <span className="text-sm">{initials}</span>}
        </>
      ) : (
        <span className="text-sm">{initials}</span>
      )}

      <span id={`tech-tooltip-${id}`} className="logo-tooltip" role="status">{name}</span>
    </div>
  );
}

export function Skills() {
  const [liveMessage, setLiveMessage] = React.useState("");
  const [focusedId, setFocusedId] = React.useState<string | null>(null);
  return (
    <section id="skills" className="container mx-auto pt-24 pb-20 px-4 md:px-8">
      {/* Screen-reader live region for announcing focused skill details */}
      <span className="sr-only" aria-live="polite" id="skills-live">{liveMessage}</span>
      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ willChange: "transform, opacity" }}>
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-serif tracking-tight font-light">Skills & Focus</h2>
          <div className="h-0.5 w-24 mx-auto mt-4 rounded-full shimmer" />
          <p className="mt-4 text-sm text-(--muted-foreground) max-w-2xl mx-auto">Interactive breakdown showing angle (focus) and time (experience) across my main skill areas. Smooth motion, refined spacing, and subtle micro-interactions for a premium feel.</p>
        </div>

        <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            {GROUPS.map((g, i) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.035, y: -8 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 160, damping: 18, duration: 0.7, delay: i * 0.06 }}
                className="group lux-card p-8 flex flex-col items-center text-center backdrop-blur-md relative focus:outline-none focus-visible:shadow-[0_10px_40px_rgba(201,161,91,0.12)]"
                style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}
                tabIndex={0}
                role="button"
                aria-describedby={`skill-tooltip-${g.id}`}
                onFocus={() => {
                  setFocusedId(g.id);
                  setLiveMessage(`${g.label}: ${g.years < 1 ? '<1 year' : `${g.years} years`} — ${g.items.join(', ')}`);
                }}
                onBlur={() => {
                  setFocusedId((prev) => (prev === g.id ? null : prev));
                  setLiveMessage("");
                }}
              >
                <div className="card-3d w-full">
                  <div className="card-3d-inner">
                    <div className="card-3d-front">
                      {/* subtle gold glow behind card on hover/focus */}
                      <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" style={{ background: 'radial-gradient(400px 120px at 50% 10%, rgba(201,161,91,0.06), transparent 30%)' }} />
                      <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.32 }} className="-mt-2">
                        <Gauge angle={g.angle} years={g.years} />
                      </motion.div>

                      <div id={`skill-tooltip-${g.id}`} className="tooltip" role="status" aria-hidden={focusedId !== g.id}>
                        <strong className="mr-2">{g.label}</strong>
                        Angle: {g.angle}° • {g.years < 1 ? "<1y" : `${g.years}y`} • {g.items.join(", ")}
                      </div>

                      <h3 className="mt-4 text-lg font-light text-(--lux-ivory)">{g.label}</h3>

                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: i * 0.05 }} className="mt-3 text-sm text-(--muted-foreground) w-full">
                        <div className="flex flex-wrap justify-center">
                          {g.items.map((it) => (
                            <span key={it} className="inline-flex items-center px-3 py-1 mr-2 mb-2 rounded-full bg-white/6 text-xs border border-transparent" style={{ borderColor: 'rgba(255,255,255,0.03)' }}>
                              {it}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    <div className="card-3d-back lux-card p-6 flex flex-col items-center justify-center">
                      <div className="text-sm font-medium text-(--lux-ivory)">Technologies</div>
                      <div className="mt-3 flex gap-3 flex-wrap justify-center">
                        {g.items.map((it) => (
                          <div key={it} className="transform-gpu transition-all duration-400 hover:scale-110">
                            <TechLogo name={it} />
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 text-xs text-(--muted-foreground)">{g.years < 1 ? '<1y' : `${g.years}y`} experience</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
