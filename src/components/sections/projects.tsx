"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProjectModal from "@/components/ui/project-modal";

const projects = [
    {
        title: "E-Commerce Platform",
        description: "Built a scalable e-commerce platform with server-side rendering, inventory pipelines, and Stripe integration.",
        tags: ["Next.js", "TypeScript", "Postgres"],
        link: "#",
        github: "#",
        image: "/image-one.jpg",
        className: "md:col-span-2",
    },
    {
        title: "Team Collaboration Tool",
        description: "Realtime collaboration and task workflows with websockets, offline support and robust sync.",
        tags: ["React", "WebSocket", "Redis"],
        link: "#",
        github: "#",
        image: "/image-two.jpg",
        className: "md:col-span-1",
    },
    {
        title: "AI Content Platform",
        description: "SaaS product integrating LLMs for content automation with careful prompt engineering and rate limiting.",
        tags: ["OpenAI", "Node.js", "TypeScript"],
        link: "#",
        github: "#",
        image: "/image-three.jpg",
        className: "md:col-span-1",
    },
    {
        title: "Finance Dashboard",
        description: "Data-driven dashboards with realtime charts and secure data pipelines for financial insights.",
        tags: ["D3.js", "Next.js", "Supabase"],
        link: "#",
        github: "#",
        image: "/landing-page.jpg",
        className: "md:col-span-2",
    },
];

export function Projects() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<any>(null);

    const openProject = (project: any) => {
        setActive(project);
        setOpen(true);
    };

    const close = () => setOpen(false);

    return (
        <section id="projects" className="container mx-auto py-20 px-4 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
            >
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Work</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A selection of projects that demonstrate my ability to solve complex problems.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.08 }}
                            className={`group relative overflow-hidden rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-(--lux-ivory) transition-all hover:shadow-lg ${project.className}`}
                            onClick={() => openProject(project)}
                        >
                            <div className="aspect-video w-full overflow-hidden">
                                <Image
                                    src={project.image || "/landing-page.jpg"}
                                    alt={project.title}
                                    width={1200}
                                    height={675}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-semibold text-(--lux-ivory)">{project.title}</h3>
                                    <div className="flex gap-3">
                                        <span className="text-(--muted-foreground)"><Github className="h-5 w-5" /></span>
                                        <span className="text-(--muted-foreground)"><ArrowUpRight className="h-5 w-5" /></span>
                                    </div>
                                </div>
                                <p className="text-(--muted-foreground) mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center rounded-md bg-[rgba(255,255,255,0.03)] px-2 py-1 text-xs font-medium text-(--muted-foreground)"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <ProjectModal open={open} onClose={close} title={active?.title} description={active?.description} image={active?.image} tags={active?.tags} />
            </motion.div>
        </section>
    );
}
