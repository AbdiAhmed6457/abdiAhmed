"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  image?: string;
  tags?: string[];
};

export default function ProjectModal({ open, onClose, title, description, image, tags = [] }: Props) {
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
          <div className="relative h-56 md:h-64 w-full rounded-lg overflow-hidden">
            {image ? (
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
