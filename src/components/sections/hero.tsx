"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden px-4 md:px-8 w-full">

            {/* BACKGROUND LAYERS */}
            <div className="absolute inset-0 -z-40 overflow-hidden">
                <Image
                    src="/newLanding.jpg"
                    alt="textured background"
                    fill
                    className="object-cover object-top opacity-20 blur-sm"
                    priority
                />
            </div>

            {/* removed globe decorative image to avoid visual clutter and overflow */}

            {/* FIXED SVG — wrapped to avoid overflow */}
            <div className="absolute inset-0 -z-20 w-full overflow-hidden pointer-events-none">
                <svg
                    className="tech-network w-full h-full"
                    viewBox="0 0 1200 700"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="g1" x1="0" x2="1">
                            <stop offset="0" stopColor="var(--lux-gold)" />
                            <stop offset="1" stopColor="var(--lux-gold-2)" />
                        </linearGradient>
                    </defs>

                    <g className="tech-edges" stroke="url(#g1)">
                        <line x1="150" y1="120" x2="420" y2="80" />
                        <line x1="420" y1="80" x2="780" y2="140" />
                        <line x1="780" y1="140" x2="1050" y2="90" />
                        <line x1="220" y1="320" x2="520" y2="360" />
                        <line x1="520" y1="360" x2="880" y2="300" />
                    </g>

                    <g className="tech-nodes">
                        <circle cx="150" cy="120" r="4" />
                        <circle cx="420" cy="80" r="5" />
                        <circle cx="780" cy="140" r="4.5" />
                        <circle cx="1050" cy="90" r="3.5" />
                        <circle cx="220" cy="320" r="4" />
                        <circle cx="520" cy="360" r="5" />
                        <circle cx="880" cy="300" r="4" />
                    </g>
                </svg>
            </div>

            {/* HERO CONTENT */}
            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-4xl mx-auto grid grid-cols-1 items-center text-center gap-6 px-4 md:px-0"
            >

                {/* Avatar */}
                <div className="flex justify-center">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 
                                    rounded-full ring-4 ring-[rgba(201,161,91,0.12)] overflow-hidden shadow-2xl">
                        <Image
                            src="/abdi.jpg"
                            alt="Abdi Ahmed"
                            fill
                            className="object-cover object-top"
                            priority
                        />
                    </div>
                </div>

                {/* TEXT */}
                <div className="space-y-6 md:space-y-8 w-full overflow-hidden">

                    <div className="inline-flex items-center rounded-full bg-[rgba(201,161,91,0.08)] px-3 py-1 text-xs font-medium text-(--lux-ivory)">
                        <span className="h-2 w-2 rounded-full bg-(--lux-gold) mr-2 animate-pulse"></span>
                        Open to roles — Freelance & Full-time
                    </div>

                    <h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight 
                                   bg-clip-text text-transparent"
                        style={{
                            backgroundImage: "linear-gradient(180deg, var(--lux-ivory), rgba(246,239,230,0.75))"
                        }}
                    >
                        Software Developer
                        <span className="block text-(--lux-gold) text-base md:text-lg mt-2">
                            Frontend • Backend
                        </span>
                    </h1>

                    <p className="max-w-xl md:max-w-2xl mx-auto text-base md:text-lg text-(--muted-foreground)">
                        I build production web applications using React, JavaScript, Next.js, Node, TypeScript,
                        Python, Java, and C++. I focus on performance, reliability, and clean developer experience.
                    </p>

                    {/* BUTTONS */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2 mb-16 md:mb-28 w-full">
                        <Link href="#projects" className="lux-btn lux-cta w-full sm:w-auto">
                            Projects
                            <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>

                        <a
                            href="https://t.me/seatOfHonour"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lux-btn lux-ghost w-full sm:w-auto"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
