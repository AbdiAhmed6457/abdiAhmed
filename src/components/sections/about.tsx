"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Layers, Users, BookOpen, Laptop, Cpu } from "lucide-react";

function Card({
  icon: Icon,
  title,
  children,
  variant = "glass",
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  children: React.ReactNode;
  variant?: "glass" | "gold" | "slate" | "minimal";
}) {
  const base =
    "p-5 rounded-2xl shadow-lg border backdrop-blur-md transition transform-gpu hover:-translate-y-1 hover:scale-105 duration-300 ease-out";

  const variants = {
    glass: `${base} bg-white/6 border-white/10`,
    gold: `${base} bg-gradient-to-br from-yellow-50/6 via-yellow-50/4 to-yellow-50/2 border-yellow-400/20 relative overflow-hidden`,
    slate: `${base} bg-neutral-900/60 border-neutral-700/40`,
    minimal: "p-4 rounded-lg bg-transparent border border-dashed border-white/10",
  };

  return (
    <div className={variants[variant]}>
      {variant === "gold" && (
        <div className="absolute -top-6 -right-16 w-48 h-48 rounded-full opacity-10 bg-[var(--lux-gold)] blur-3xl pointer-events-none" />
      )}
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center bg-white/6">
          <Icon className="w-6 h-6" style={{ color: "var(--lux-gold)" }} />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-[var(--lux-ivory)]">{title}</h4>
          <div className="text-sm text-[var(--muted-foreground)] mt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-20 px-4 md:px-8 overflow-hidden">
      {/* === SPINNING BACKGROUND — ONLY ON LARGE DEVICES === */}
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-20 overflow-hidden hidden lg:block">
          <div className="spin-bg bg-cover bg-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]" style={{ backgroundImage: 'url(/newLanding.jpg)', filter: 'contrast(1.02) brightness(0.85)' }} />
        </div>

      {/* === MOBILE: Subtle luxury glow instead of spinning image === */}
      <div className="lg:hidden absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--lux-gold)]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--lux-gold-2)]/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--lux-gold)]/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-serif text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[var(--lux-gold)] to-[var(--lux-gold-2)]"
        >
          About
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-min">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card icon={Code} title="Experience" variant="glass">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--lux-gold)] text-black font-bold text-lg">
                    2y
                  </span>
                  <div>
                    <div className="font-medium text-[var(--lux-ivory)]">Full-Stack Developer</div>
                    <div className="text-xs opacity-80">2 years building production web & mobile apps</div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-sm font-semibold">Companies</div>
                  <ul className="mt-1 text-sm opacity-80 list-disc list-inside space-y-1">
                    <li>Feneto IoT Product</li>
                    <li>Allcan Development Center</li>
                    <li>Various production & client projects</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Working Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card icon={Users} title="Working Style" variant="minimal">
              Clear communicator — collaborative, documentation-driven, and obsessed with reliable, maintainable code.
            </Card>
          </motion.div>

          {/* Project Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card icon={Layers} title="Project Philosophy" variant="gold">
              I grow fastest through real products: shipping features, talking to users, fixing bugs in production, and owning the full cycle.
            </Card>
          </motion.div>

          {/* Big Center Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-3 flex justify-center my-12"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 max-w-4xl w-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url(/newLanding.jpg)",
                  filter: "contrast(1.05) brightness(0.88)",
                }}
              />
              <div className="relative h-96 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-end p-12 text-center">
                <h3 className="text-5xl md:text-7xl font-serif text-[var(--lux-ivory)] leading-tight">
                  Software Developer
                </h3>
                <p className="mt-4 text-xl md:text-2xl text-[var(--muted-foreground)]">
                  Frontend • Backend • Full-Stack
                </p>
              </div>
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Card icon={Users} title="Languages" variant="glass">
              <div className="flex flex-wrap gap-2">
                {["English — Fluent", "Amharic — Native", "Oromo — Native", "Arabic — Conversational"].map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1.5 rounded-full text-xs bg-white/8 text-[var(--lux-ivory)] border border-white/10"
                  >
                    {lang}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm opacity-80">
                Strong communication across teams and regions.
              </p>
            </Card>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Card icon={BookOpen} title="Education" variant="gold">
              <div className="text-sm space-y-2 opacity-90">
                <p>• B.Sc. Computer Science — Addis Ababa University (2022–2026 expected)</p>
                <p>• B.A. Management — Unity University (graduating 2025)</p>
                <p>• B.A. Public Administration — St. Mary’s University (completed)</p>
              </div>
            </Card>
          </motion.div>

          {/* Employment */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="md:col-span-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card icon={Laptop} title="Allcan Development Center" variant="slate">
                <div className="text-sm text-[var(--muted-foreground)]">
                  <div className="font-medium text-white/90">Sep 2024 – Oct 2025</div>
                  <p className="mt-2">
                    Led architecture, APIs, frontend + backend delivery, and production deployments with focus on observability.
                  </p>
                </div>
              </Card>

              <Card icon={Cpu} title="Feneto — System Development" variant="slate">
                <div className="text-sm text-[var(--muted-foreground)]">
                  <div className="font-medium text-white/90">Jan 2023 – Aug 2024</div>
                  <p className="mt-2">
                    Built full systems: backend pipelines, dashboards, integrations, CI/CD, and cloud deployments.
                  </p>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}