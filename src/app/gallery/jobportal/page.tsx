"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const IMAGES = Array.from({ length: 10 }).map((_, i) => `/projects/jobPortal/jobPortal${i + 1}.png`);

export default function JobPortalGallery() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % IMAGES.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 text-white flex flex-col">
      <header className="flex items-center justify-between p-4">
        <div className="text-lg font-semibold">JobPortal — Screenshots</div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm opacity-80 hover:opacity-100">Close</Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="relative w-full max-w-5xl h-[70vh] sm:h-[80vh]">
          <motion.div key={IMAGES[index]} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="absolute inset-0">
            <Image src={IMAGES[index]} alt={`JobPortal ${index + 1}`} fill className="object-contain" priority sizes="(max-width: 1024px) 100vw, 60vw" />
          </motion.div>

          <button aria-label="Previous" onClick={() => setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length)} className="absolute left-4 top-1/2 -translate-y-1/2 lux-btn lux-ghost">◀</button>
          <button aria-label="Next" onClick={() => setIndex((i) => (i + 1) % IMAGES.length)} className="absolute right-4 top-1/2 -translate-y-1/2 lux-btn lux-ghost">▶</button>
        </div>
      </main>

      <footer className="p-4">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {IMAGES.map((src, i) => (
            <button key={src} onClick={() => setIndex(i)} className={`w-20 h-12 overflow-hidden rounded-md border ${i === index ? "border-(--lux-gold)" : "border-white/10"}`}>
              <Image src={src} alt={`thumb-${i}`} width={160} height={90} className="object-cover w-full h-full" />
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
