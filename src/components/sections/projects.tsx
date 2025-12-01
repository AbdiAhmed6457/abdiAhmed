"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ProjectModal from "@/components/ui/project-modal";

type Project = {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
    images?: string[];
    image?: string;
    className?: string;
};

const projects: Project[] = [
    {
        title: "JobPortal — MS Provide",
        description: "Full-stack Job Portal enabling companies to register and post roles, and fresh graduates to discover and apply via advanced filters. Includes role-based admin control panels for managing students and recruiters, application workflows, and reporting.",
        tags: ["Next.js", "React", "Node.js", "Postgres", "Docker", "AWS"],
        link: "#",
        github: "#",
        images: Array.from({ length: 10 }).map((_, i) => `/projects/jobPortal/jobPortal${i + 1}.png`),
        className: "md:col-span-2",
    },
    {
        title: "Muraja — Ustaz Student Platform",
        description:
            "A complete Ustaz (religious teacher) management platform where students discover and connect with Ustaz based on rating, language, location and schedule. Ustaz can manage students, assign tasks, share availability, message individuals, and view simplified analytics on their dashboard. Beautiful, responsive UI with focus on discoverability and trust.",
        tags: ["Next.js", "React", "Postgres", "Realtime"],
        link: "#",
        github: "#",
        images: Array.from({ length: 6 }).map((_, i) => `/projects/muraja/muraja${i === 0 ? "" : i}.png`),
        className: "md:col-span-2",
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
        title: "JobPortal — MS Provide",
        description: "Full-stack Job Portal enabling companies to register and post roles, and fresh graduates to discover and apply via advanced filters. Includes role-based admin control panels for managing students and recruiters, application workflows, and reporting.",
        tags: ["Next.js", "React", "Node.js", "Postgres", "Docker", "AWS"],
        link: "#",
        github: "#",
        images: Array.from({ length: 10 }).map((_, i) => `/projects/jobPortal/jobPortal${i + 1}.png`),
        className: "md:col-span-2",
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
    const [active, setActive] = useState<Project | null>(null);

    const openProject = (project: typeof projects[number]) => {
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
                            <div className="w-full p-3">
                                <div className="overflow-hidden rounded-xl bg-[rgba(255,255,255,0.02)]">
                                    <Image
                                        src={project.images?.[0] || project.image || "/landing-page.jpg"}
                                        alt={project.title}
                                        width={1200}
                                        height={800}
                                        className="object-cover w-full h-56 sm:h-72 md:h-80 transition-transform duration-500 group-hover:scale-105 object-center"
                                    />
                                </div>
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
                <ProjectModal open={open} onClose={close} title={active?.title} description={active?.description} image={active?.image} images={active?.images || []} tags={active?.tags} />
            </motion.div>
        </section>
    );
}
