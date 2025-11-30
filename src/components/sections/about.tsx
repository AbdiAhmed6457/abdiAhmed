"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Laptop, Cpu, Code, Globe, BookOpen, Users } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
};

function Card({ icon: Icon, title, children, className = "", iconStyle = {} }: any) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className={`lux-card p-5 rounded-2xl shadow-lg ${className}`}
        >
            <div className="flex items-start gap-4">
                <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-white/5">
                    <Icon size={20} style={iconStyle} />
                </div>
                <div className="flex-1">
                    <h4 className="text-lg font-semibold">{title}</h4>
                    <div className="mt-1 text-sm text-(--muted-foreground)">{children}</div>
                </div>
            </div>
        </motion.div>
    );
}

export function About() {
    return (
        <section id="about" className="relative container mx-auto py-16 px-4 md:px-8">
            <div className="absolute inset-0 pointer-events-none">
                <div className="spin-bg opacity-10" />
            </div>

            <div className="relative grid gap-6 md:grid-cols-3 md:grid-rows-3 auto-rows-min grid-flow-dense">
                <div className="md:col-span-1 md:row-span-3">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, x: -20 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="rounded-2xl overflow-hidden lux-card"
                    >
                        <div className="relative aspect-4/5 bg-neutral-900">
                            <Image
                                src="/abdi.jpg"
                                alt="Abdi Ahmed"
                                fill
                                sizes="(max-width: 640px) 90vw, 400px"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>

                <div className="md:col-span-2 md:row-span-1">
                    <h2 className="text-4xl sm:text-5xl font-serif tracking-tight">About</h2>
                    <p className="mt-4 text-lg text-(--muted-foreground) max-w-2xl">
                        I'm a Software Developer focused on building product-driven projects that
                        solve real problems. I prefer learning through shipping: every project
                        teaches me practical architecture, testing, and collaboration.
                    </p>
                </div>

                <div className="md:col-span-1">
                    <Card
                        icon={Code}
                        title="Project"
                        iconStyle={{ color: 'var(--lux-gold)' }}
                    >
                        I learn by building real products — small, focused projects that
                        improve over time and ship measurable value.
                    </Card>
                </div>

                <div className="md:col-span-1">
                    <Card icon={Users} title="Languages" iconStyle={{ color: 'var(--lux-gold)' }}>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 text-sm rounded-full bg-white/5">JavaScript</span>
                            <span className="px-3 py-1 text-sm rounded-full bg-white/5">TypeScript</span>
                            <span className="px-3 py-1 text-sm rounded-full bg-white/5">Python</span>
                            <span className="px-3 py-1 text-sm rounded-full bg-white/5">Go</span>
                        </div>
                    </Card>
                </div>

                <div className="md:col-span-1 md:mr-8 lg:mr-12">
                    <Card icon={Laptop} title="Allcan" iconStyle={{ color: 'var(--lux-gold)' }}>
                        Senior Software Developer — built internal tooling and frontend
                        experiences. Focus on performance and DX.
                    </Card>
                </div>

                <div className="md:col-span-1 md:mr-8 lg:mr-12">
                    <Card icon={Cpu} title="Feneto" iconStyle={{ color: 'var(--lux-gold)' }}>
                        Backend Engineer — services and platform work. Improved reliability and
                        observability.
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <Card icon={BookOpen} title="Education" iconStyle={{ color: 'var(--lux-gold)' }}>
                        Bachelor of Management — Unity University (graduating)
                        <br />
                        Bachelor of Public Administration — St. Mary's University
                        <br />
                        Studied Computer Science — Addis Ababa University
                    </Card>
                </div>
            </div>
        </section>
    );
}
