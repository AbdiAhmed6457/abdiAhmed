"use client";

import { motion } from "framer-motion";

const skills = {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    Backend: ["Node.js", "Express", "Postgres", "Redis", "GraphQL", "Prisma"],
    DevOps: ["Docker", "Kubernetes", "AWS", "CI/CD", "Monitoring"],
};

export function Skills() {
    return (
        <section id="skills" className="container mx-auto py-20 px-4 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
            >
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Technical Arsenal</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        I constantly explore new technologies to find the best tools for the job.
                        Here is my current tech stack.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {Object.entries(skills).map(([category, items], index) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.08 }}
                            className="lux-card p-6"
                        >
                            <h3 className="mb-4 text-xl font-semibold text-(--lux-ivory)">{category}</h3>
                            <div className="flex flex-wrap gap-3">
                                {items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="inline-flex items-center rounded-md bg-[rgba(255,255,255,0.03)] px-3 py-1 text-sm font-medium text-(--muted-foreground)"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
