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
    { id: "frontend", label: "Frontend", angle: 40, years: 4, items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { id: "backend", label: "Backend", angle: 140, years: 3, items: ["Node.js", "Express", "Postgres", "Prisma"] },
    { id: "devops", label: "DevOps", angle: 90, years: 2, items: ["Docker", "AWS"] },
    { id: "mobile", label: "Mobile", angle: 320, years: 2, items: ["Flutter", "React Native"] },
];

function Gauge({ angle, years }: { angle: number; years: number }) {
    // Map years to percentage (cap at 5 years)
    const pct = Math.min(1, years / 5);
    const circumference = 2 * Math.PI * 36; // r=36
    const dash = circumference * pct;

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
                    <circle r="36" fill="transparent" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
                    <circle r="36" fill="transparent" stroke="url(#g)" strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={`${dash} ${circumference - dash}`} transform="rotate(-90)" />
                    {/* needle */}
                    <g style={{ transform: `rotate(${angle}deg)` }}>
                        <rect x="-1" y="-2" width="2" height="38" rx="1" fill="var(--lux-gold)" />
                        <circle r="3" fill="var(--lux-gold)" />
                    </g>
                </g>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-sm font-semibold text-(--lux-ivory)">{years}y</div>
                <div className="text-xs text-(--muted-foreground)">experience</div>
            </div>
        </div>
    );
}

export function Skills() {
    return (
        <section id="skills" className="container mx-auto py-16 px-4 md:px-8">
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-serif tracking-tight">Skills & Focus</h2>
                    <p className="mt-2 text-sm text-(--muted-foreground) max-w-2xl mx-auto">Interactive breakdown showing angle (focus) and time (experience) across my main skill areas.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                    {GROUPS.map((g, i) => (
                        <motion.div key={g.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }} className="lux-card p-6 flex flex-col items-center text-center">
                            <div className="-mt-2">
                                <Gauge angle={g.angle} years={g.years} />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold">{g.label}</h3>
                            <div className="mt-2 text-sm text-(--muted-foreground)">
                                {g.items.map((it) => (
                                    <span key={it} className="inline-block px-2 py-1 mr-2 mb-2 rounded-full bg-white/6 text-xs">{it}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
