"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/projectsData";
import type { Project } from "@/lib/projectsData";

export function Projects() {
  return (
    <section id="projects" className="relative py-24 overflow-hidden bg-[var(--lux-background)]">
      {/* Luxury background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--lux-gold)]/5 via-transparent to-[var(--lux-gold)]/3" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--lux-gold)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--lux-gold-2)]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--lux-gold)] via-[var(--lux-gold-2)] to-[var(--lux-gold)]">
              Built to Ship
            </span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto">
            Real products. Real users. Real scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cover = project.images?.[0] || project.image || "/projects/muraja/muraja0.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.12 }}
      whileHover={{ y: -16, scale: 1.02 }}
      className="group relative"
    >
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 via-white/2 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-[var(--lux-gold)]/30 transition-all duration-500">
        {/* Floating gold orbs */}
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[var(--lux-gold)]/20 blur-3xl group-hover:bg-[var(--lux-gold-2)]/30 transition-all duration-1000" />
        <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-[var(--lux-gold-2)]/20 blur-3xl group-hover:bg-[var(--lux-gold)]/30 transition-all duration-1000" />

        {/* Screenshot with elegant frame */}
        <div className="relative p-8 md:p-12">
          <div className="relative mx-auto w-full max-w-lg">
            {/* Elegant device-like frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-8 ring-white/10 ring-offset-8 ring-offset-transparent">
              {/* Inner shadow + reflection */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 z-10 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/20 to-transparent z-10 pointer-events-none" />

              {/* Actual screenshot */}
              <div className="aspect-video relative bg-black/50">
                <img
                  src={cover}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Subtle floating animation */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[var(--lux-gold)]/10 to-transparent blur-xl opacity-60 -z-10"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 p-8 pt-0 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--lux-ivory)] mb-3">
            {project.title}
          </h3>

          <p className="text-[var(--muted-foreground)] text-base md:text-lg leading-relaxed mb-6 max-w-xl mx-auto hidden md:block">
            {project.description}
          </p>
          <p className="text-[var(--muted-foreground)] text-base leading-relaxed mb-6 md:hidden">
            {project.description.length > 130 ? project.description.slice(0, 120) + "…" : project.description}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full text-xs md:text-sm font-medium bg-white/10 border border-[var(--lux-gold)]/30 text-[var(--lux-gold)] backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition-all hover:scale-110 border border-white/10">
                <Github className="w-5 h-5 text-[var(--lux-gold)]" />
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                className="px-7 py-3 rounded-full bg-gradient-to-r from-[var(--lux-gold)] to-[var(--lux-gold-2)] text-black font-bold hover:scale-105 transition-all shadow-lg">
                View Live <ExternalLink className="inline ml-2 w-4 h-4" />
              </a>
            )}
            <Link href={`/gallery/${project.slug}`}
              className="text-[var(--lux-gold)] hover:text-[var(--lux-gold-2)] font-medium flex items-center gap-2 underline underline-offset-4">
              Full Gallery <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}