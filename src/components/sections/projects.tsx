"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
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
        images: [
            "/projects/muraja/muraja0.png",
            "/projects/muraja/muraja00.png",
            "/projects/muraja/muraja1.png",
            "/projects/muraja/muraja2.png",
            "/projects/muraja/muraja3.png",
            "/projects/muraja/muraja4.png",
            "/projects/muraja/muraja5.png",
        ],
        className: "md:col-span-2",
    },
   
   
    {
        title: "CheapDelala — Rental Listings Simplified",
        description:
            "An intuitive rental listings platform where owners post properties with full descriptions, photos and availability. Tenants can search by location, price and features, saving time and effort compared to offline searching.",
        tags: ["Next.js", "React", "Postgres"],
        link: "#",
        github: "#",
        images: ["/projects/others/cheapdelala.png"],
        className: "md:col-span-1",
    },
    {
        title: "Ecommerce — Amazon Clone",
        description: "An early learning ecommerce project modeled after Amazon: product listings, cart, checkout and order flow showcasing foundational ecommerce patterns.",
        tags: ["React", "Stripe", "Node.js"],
        link: "#",
        github: "#",
        images: ["/projects/others/ecommerce.png"],
        className: "md:col-span-1",
    },
    {
        title: "Personal Blog",
        description: "A lightweight personal blogging platform used to publish thoughts, tutorials and updates — includes markdown support and a simple CMS for quick posts.",
        tags: ["Next.js", "Markdown"],
        link: "#",
        github: "#",
        images: ["/projects/others/blog.png"],
        className: "md:col-span-1",
    },
    {
        title: "TheSocial — Mini Social Network",
        description: "A full-featured social network with authentication, posting, commenting, liking and scalable backend patterns — demonstrates end-to-end social features and moderation workflows.",
        tags: ["React", "WebSocket", "Node.js"],
        link: "#",
        github: "#",
        images: ["/projects/others/social.png"],
        className: "md:col-span-1",
    },
    
   
];

export function Projects() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<Project | null>(null);

    const openProject = (project: typeof projects[number]) => {
        setActive(project);
        setOpen(true);
    };

    const close = () => {
        setOpen(false);
        // after closing modal, scroll back to the top of the projects section
        setTimeout(() => {
            try {
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            } catch {
                // ignore in non-browser environments
            }
        }, 120);
    };

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

                <div className="flex flex-col gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.08 }}
                            className={`group relative overflow-hidden rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-(--lux-ivory) transition-all hover:shadow-lg mx-4 md:mx-8`}
                        >
                            <ProjectCard project={project} onOpen={() => openProject(project)} />
                        </motion.div>
                    ))}
                </div>
                <ProjectModal open={open} onClose={close} title={active?.title} description={active?.description} image={active?.image} images={active?.images || []} tags={active?.tags} />
            </motion.div>
        </section>
    );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
    const images = React.useMemo(() => (project.images && project.images.length ? project.images : project.image ? [project.image] : ["/landing-page.jpg"]), [project.images, project.image]);
    const [preview, setPreview] = useState(0);
    const [paused, setPaused] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!images || images.length <= 1) return;
        if (paused) return;
        const id = window.setInterval(() => {
            setPreview((i) => (i + 1) % images.length);
        }, 2600);
        return () => window.clearInterval(id);
    }, [images, paused]);

    return (
            <div className="w-full h-full cursor-pointer"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onClick={onOpen}
            ref={ref}
        >
            <div className="md:grid md:grid-cols-2 gap-0">
                <div className="p-3">
                    <div className="overflow-hidden rounded-xl bg-[rgba(255,255,255,0.02)] relative">
                        <Image
                            src={images[preview]}
                            alt={project.title}
                            width={1600}
                            height={900}
                            quality={90}
                            priority={preview === 0}
                            className="object-cover w-full h-64 sm:h-72 md:h-96 transition-transform duration-500 group-hover:scale-105 object-center"
                        />

                        {images.length > 1 && (
                            <>
                                <button
                                    aria-label="Prev"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPreview((i) => (i - 1 + images.length) % images.length);
                                    }}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 lux-btn lux-ghost"
                                >
                                    ◀
                                </button>
                                <button
                                    aria-label="Next"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPreview((i) => (i + 1) % images.length);
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 lux-btn lux-ghost"
                                >
                                    ▶
                                </button>

                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                                    {images.map((_, i) => (
                                        <button
                                            key={i}
                                            onMouseEnter={() => setPreview(i)}
                                            onFocus={() => setPreview(i)}
                                            onMouseDown={(e) => e.stopPropagation()}
                                            aria-label={`Show image ${i + 1}`}
                                            className={`w-2 h-2 rounded-full ${i === preview ? "bg-(--lux-gold)" : "bg-white/30"}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="p-6 flex flex-col justify-center">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-semibold text-(--lux-ivory)">{project.title}</h3>
                                    <div className="flex gap-3">
                                        <span className="text-(--muted-foreground)"><Github className="h-5 w-5" /></span>
                                        <a href={project.link || "#"} onClick={(e) => e.stopPropagation()} className="text-(--muted-foreground)"><ArrowUpRight className="h-5 w-5" /></a>
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

                    <div className="mt-4 flex items-center gap-3">
                        <button onClick={() => { onOpen(); }} className="lux-btn lux-ghost text-sm">Show all</button>
                        <span className="text-xs text-(--muted-foreground)">View full project images (opens inline)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
