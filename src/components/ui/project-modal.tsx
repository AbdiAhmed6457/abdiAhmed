"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  image?: string;
  images?: string[];
  tags?: string[];
};

export default function ProjectModal({ open, onClose, title, description, image, images = [], tags = [] }: Props) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const hasGallery = images && images.length > 0;

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  // autoplay with pause on hover/focus
  const intervalRef = React.useRef<number | null>(null);
  React.useEffect(() => {
    if (!hasGallery) return;
    if (paused) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 2200);
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [hasGallery, images.length, paused]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal>
      <motion.div
        className="modal-card"
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden">
            {hasGallery ? (
              <div
                className="relative h-full w-full"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <motion.div key={images[index]} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative h-full w-full">
                  <Image src={images[index]} alt={`${title} ${index + 1}`} fill className="object-cover" sizes="100vw" />
                </motion.div>

                <button onClick={prev} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 lux-btn lux-ghost">◀</button>
                <button onClick={next} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 lux-btn lux-ghost">▶</button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onMouseEnter={() => {
                        setPaused(true);
                        setIndex(i);
                      }}
                      onFocus={() => setPaused(true)}
                      onBlur={() => setPaused(false)}
                      onMouseLeave={() => setPaused(false)}
                      aria-label={`Show image ${i + 1}`}
                      className={`w-2 h-2 rounded-full ${i === index ? "bg-(--lux-gold)" : "bg-white/30"}`}
                    />
                  ))}
                </div>
              </div>
            ) : image ? (
              <Image src={image} alt={title || "project"} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            ) : (
              <div className="bg-[rgba(255,255,255,0.02)] w-full h-full" />
            )}
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-(--muted-foreground) mb-4">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((t) => (
                <span key={t} className="inline-flex items-center rounded-md bg-[rgba(255,255,255,0.03)] px-2 py-1 text-xs font-medium text-(--muted-foreground)">{t}</span>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={onClose} className="lux-btn lux-ghost">Close</button>
              <a href="#" className="lux-btn lux-cta">Visit</a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
