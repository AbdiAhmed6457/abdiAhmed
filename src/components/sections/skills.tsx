"use client";

import { motion } from "framer-motion";
import React from "react";

type SkillGroup = {
    id: string;
    label: string;
    angle: number; // degrees for needle
    years: number; // experience in years
    items: string[];
};

const GROUPS: SkillGroup[] = [
    { id: "frontend", label: "Frontend", angle: 40, years: 2, items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { id: "backend", label: "Backend", angle: 140, years: 2, items: ["Node.js", "Express", "Postgres", "Prisma"] },
    { id: "devops", label: "DevOps", angle: 90, years: 0.5, items: ["Docker", "AWS"] },
    { id: "mobile", label: "Mobile", angle: 320, years: 0.5, items: ["Flutter", "React Native"] },
];

function Gauge({ angle, years }: { angle: number; years: number }) {
    const pct = Math.min(1, years / 5);
    const r = 36;
    const circumference = 2 * Math.PI * r;
    const dash = circumference * pct;

    const display = years < 1 ? "<1y" : `${Math.round(years)}y`;

    return (
        <div className="w-36 h-36 relative">
            <svg viewBox="0 0 100 100" className="w-36 h-36">
                <defs>
                    <linearGradient id="g" x1="0" x2="1">
                        <stop offset="0%" stopColor="var(--lux-gold)" />
                        <stop offset="100%" stopColor="rgba(201,161,91,0.6)" />
                    </linearGradient>
                </defs>
                <g transform="translate(50,50)">
                    <circle r={r} fill="transparent" stroke="rgba(255,255,255,0.04)" strokeWidth={8} />
                    <motion.circle
                        r={r}
                        fill="transparent"
                        stroke="url(#g)"
                        strokeWidth={8}
                        strokeLinecap="round"
                        strokeDasharray={`${dash} ${circumference - dash}`}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: circumference - dash }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        transform="rotate(-90)"
                    />

                    <motion.g initial={{ rotate: -90 }} animate={{ rotate: angle }} style={{ transformOrigin: "50% 50%" }}>
                        <rect x="-1" y="-2" width="2" height="38" rx="1" fill="var(--lux-gold)" />
                        <circle r="3" fill="var(--lux-gold)" />
                    </motion.g>
                </g>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-sm font-semibold text-(--lux-ivory)">{display}</div>
                <div className="text-xs text-(--muted-foreground)">experience</div>
            </div>
        </div>
    );
}

export function Skills() {
    return (
        <section id="skills" className="container mx-auto pt-24 pb-20 px-4 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ willChange: "transform, opacity" }}
            >
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
                                className="group lux-card p-8 flex flex-col items-center text-center backdrop-blur-md relative"
                                style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}
                            >
                                <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.32 }} className="-mt-2">
                                    <Gauge angle={g.angle} years={g.years} />
                                </motion.div>

                                {/* Tooltip */}
                                <div className="tooltip" aria-hidden>
                                    Angle: {g.angle}° • {g.years < 1 ? "<1y" : `${g.years}y`} • {g.items.join(', ')}
                                </div>

                                <h3 className="mt-4 text-lg font-light text-(--lux-ivory)">{g.label}</h3>

                                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: i * 0.05 }} className="mt-3 text-sm text-(--muted-foreground)">
                                    {g.items.map((it) => (
                                        <span key={it} className="inline-block px-3 py-1 mr-2 mb-2 rounded-full bg-white/6 text-xs">{it}</span>
                                    ))}
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
