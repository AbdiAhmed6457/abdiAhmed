"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Layers, Users, Globe, BookOpen, Laptop, Cpu } from "lucide-react";

function Card({ icon, title, children, variant = "glass" }: { icon: any; title: string; children: React.ReactNode; variant?: string }) {
    const Icon = icon;
    const base = "p-5 rounded-2xl shadow-lg border backdrop-blur-md transition transform-gpu hover:-translate-y-1 hover:scale-105 duration-300 ease-out";
    const variants: Record<string, string> = {
        glass: base + " bg-white/6 border-white/10",
        gold: base + " bg-gradient-to-br from-yellow-50/6 via-yellow-50/4 to-yellow-50/2 border-yellow-400/20 relative overflow-hidden",
        slate: base + " bg-neutral-900/60 border-neutral-700/40",
        minimal: "p-4 rounded-lg bg-transparent border border-dashed border-white/10",
    };

    return (
        <div className={variants[variant] || variants.glass}>
                {variant === "gold" && (
                <div className="absolute -top-6 -right-16 w-48 h-48 rounded-full opacity-10 bg-[var(--lux-gold)] blur-3xl pointer-events-none" />
            )}
            <div className="flex items-start gap-4">
                    <div className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center bg-white/6">
                    <Icon className="w-6 h-6" style={{ color: 'var(--lux-gold)' }} />
                </div>
                <div>
                    <h4 className="text-lg font-semibold">{title}</h4>
                    <div className="text-sm text-[var(--muted-foreground)] mt-1">{children}</div>
                </div>
            </div>
        </div>
    );
}

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function About() {
    return (
        <section id="about" className="container mx-auto pt-12 pb-12 md:pt-16 md:pb-12 px-4 md:px-8 relative">
            <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
                <div className="spin-bg bg-cover bg-center w-full h-full" style={{ backgroundImage: 'url(/newLanding.jpg)', filter: 'contrast(1.02) brightness(0.85)' }} />
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif tracking-tight mb-8 text-center">About</h2>

            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={container}
                className="relative"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 items-start auto-rows-min grid-flow-dense">
                    {/* top-left */}
                    <motion.div initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.06 }} className="md:col-start-1 md:row-start-1">
                        <Card icon={Code} title="Experience" variant="glass">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--lux-gold)] text-black font-semibold">2y</span>
                                    <div>
                                        <div className="font-medium">Full-Stack Developer</div>
                                        <div className="text-xs text-[var(--muted-foreground)]">2 years of hands-on experience building and shipping web and mobile solutions.</div>
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <div className="text-sm font-semibold">Companies</div>
                                    <ul className="mt-1 text-sm text-[var(--muted-foreground)] list-disc list-inside">
                                        <li>Feneto IoT Product</li>
                                        <li>Allcan Development Center</li>
                                        <li>Contributions to various production systems and client projects</li>
                                    </ul>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* top-center */}
                    <motion.div initial={{ opacity: 0, y: -18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.09 }} className="md:col-start-2 md:row-start-1">
                        <Card icon={Users} title="Working Style" variant="minimal">
                            Clear Communicator — collaborative, documentation-minded, and focused on delivering reliable results.
                        </Card>
                    </motion.div>

                    {/* top-right */}
                    <motion.div initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.12 }} className="md:col-start-3 md:row-start-1">
                        <Card icon={Layers} title="Project" variant="gold">
                            I prefer learning and growing through real, product-driven projects — shipping features, iterating with users, and improving systems end-to-end. Real work teaches tooling, communication, and production thinking faster than isolated exercises.
                        </Card>
                    </motion.div>

                    {/* middle-left */}
                    {/* removed Availability & Boosts per request */}

                    {/* center big computer visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.18 }}
                        whileHover={{ scale: 1.02 }}
                        className="md:col-start-2 md:row-start-2 flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/8 transform-gpu">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: 'url(/newLanding.jpg)', filter: 'contrast(1.04) brightness(0.85)' }}
                            />
                            <div className="relative z-10 p-8 bg-linear-to-t from-black/40 to-transparent flex flex-col items-center justify-center text-center min-h-[90px] md:min-h-24 lg:min-h-36">
                                        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--lux-ivory)]">Software Developer</div>
                                        <div className="mt-2 text-sm sm:text-base md:text-lg text-[var(--muted-foreground)]">Frontend • Backend</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* middle-left: Languages (styled chips) */}
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.18 }} className="md:col-start-1 md:row-start-2">
                        <Card icon={Users} title="Languages" variant="glass">
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 rounded-full text-xs bg-white/6 text-[var(--lux-ivory)]">English — Fluent</span>
                                <span className="px-3 py-1 rounded-full text-xs bg-white/6 text-[var(--lux-ivory)]">Amharic — Native</span>
                                <span className="px-3 py-1 rounded-full text-xs bg-white/6 text-[var(--lux-ivory)]">Oromo — Native</span>
                                <span className="px-3 py-1 rounded-full text-xs bg-white/6 text-[var(--lux-ivory)]">Arabic — Conversational</span>
                            </div>
                            <div className="mt-2 text-sm text-[var(--muted-foreground)]">I leverage language skills to communicate with clients and cross-functional teams across the region.</div>
                        </Card>
                    </motion.div>

                    {/* removed Verifications per request */}

                    {/* middle-right: Education (with updated degrees) */}
                    <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.21 }} className="md:col-start-3 md:row-start-2">
                        <Card icon={BookOpen} title="Education" variant="gold">
                            <div className="text-sm text-(--muted-foreground)">
                                • Studied Computer Science — Addis Ababa University (2022–2026 expected) — strong technical foundation complementing management studies.<br />
                                • Bachelor of Management — Unity University (about to graduate this year).<br />
                                • Bachelor of Public Administration — St. Mary’s University (completed).
                            </div>
                        </Card>
                    </motion.div>

                    {/* bottom-right: Employment entries, expanded and more descriptive */}
                    <motion.div initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="md:col-start-2 md:col-end-4 md:row-start-3">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-12">
                            <div className="w-full md:w-80 max-w-md mx-auto">
                                <Card icon={Laptop} title="Allcan Development Center" variant="slate">
                                    <div className="text-base text-(--muted-foreground)">
                                        <div className="text-sm">September 2024 - October 2025</div>
                                        <p className="mt-2 text-base">Led delivery of multiple products: architecture, APIs, frontend and backend implementation, and production deployments. Emphasis on reliability and observability.</p>
                                    </div>
                                </Card>
                            </div>

                            <div className="w-full md:w-80 max-w-md mx-auto">
                                <Card icon={Cpu} title="Feneto — System Development" variant="slate">
                                    <div className="text-base text-(--muted-foreground)">
                                        <div className="text-sm">January 2023 - August 2024</div>
                                        <p className="mt-2 text-base">Built systems from beginning to end: backend pipelines, dashboards, integrations, and deployment.</p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
