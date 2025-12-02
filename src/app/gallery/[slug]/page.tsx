"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projectsData";

export default function GalleryPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const project = projects.find((p) => p.slug === slug);

    const images = project && project.images && project.images.length ? project.images : project && project.image ? [project.image] : ["/landing-page.jpg"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
            if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
            if (e.key === "Escape") window.location.href = "/#projects";
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [images.length]);

    if (!project) {
        return (
            <div className="container mx-auto py-20 px-4">
                <h2 className="text-2xl font-bold">Gallery not found</h2>
                <p className="mt-4">The requested project gallery could not be located.</p>
                <Link href="/#projects" className="mt-6 inline-block lux-btn lux-ghost">Back to projects</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-12 px-4">
            <div className="w-full max-w-5xl">
                <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                    <Image src={images[index]} alt={`${project.title} image ${index + 1}`} fill quality={90} priority className="object-contain" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-2">
                        <button onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)} className="lux-btn lux-ghost">Prev</button>
                        <button onClick={() => setIndex((i) => (i + 1) % images.length)} className="lux-btn lux-ghost">Next</button>
                    </div>
                    <Link href="/#projects" className="lux-btn lux-ghost">Back to projects</Link>
                </div>

                <div className="mt-4 flex gap-2 overflow-x-auto">
                    {images.map((src, i) => (
                        <button key={i} onClick={() => setIndex(i)} className={`relative w-24 h-14 rounded overflow-hidden ${i === index ? "ring-2 ring-(--lux-gold)" : ""}`}>
                            <Image src={src} alt={`thumb ${i + 1}`} fill className="object-cover" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
