"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function About() {
    return (
        <section id="about" className="container mx-auto py-24 px-4 md:px-8">
            <div className="grid gap-12 md:grid-cols-2 items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98, x: -30 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="lux-card rounded-2xl"
                >
                    <div className="relative rounded-xl overflow-hidden aspect-4/5 bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-700">
                        <div className="absolute inset-0 bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-700" />
                        <div className="absolute inset-0">
                            <Image
                                src="/image-one.jpg"
                                alt="Portrait"
                                fill
                                sizes="(max-width: 640px) 90vw, 400px"
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="absolute bottom-4 left-4">
                            <span className="inline-block px-3 py-1 text-sm font-medium text-black bg-(--lux-gold) rounded-full">Lead Engineer</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="space-y-6"
                >
                    <h2 className="text-4xl sm:text-5xl font-serif tracking-tight">
                        About
                    </h2>
                    <div className="gold-border inline-block rounded-lg">
                        <div className="lux-card p-6">
                            <p className="text-lg leading-relaxed text-(--muted-foreground)">
                                I'm a software developer specializing in building scalable, high-performance web applications. I work across the stack — delivering polished frontends, robust backends and thoughtfully designed APIs. My focus is reliability, developer experience, and measurable impact.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 pt-3">
                        <div>
                            <h3 className="text-xl font-semibold">5+</h3>
                            <p className="text-sm text-(--muted-foreground)">Years Experience</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">50+</h3>
                            <p className="text-sm text-(--muted-foreground)">Projects Completed</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
