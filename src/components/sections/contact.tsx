"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Message sent successfully!");
                (e.target as HTMLFormElement).reset();
            } else {
                alert("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="container mx-auto py-20 px-4 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mx-auto max-w-2xl"
                data-motion
            >
                <div className="text-center space-y-4 mb-10">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Contact</h2>
                    <p className="text-(--muted-foreground)">
                        Looking for a software developer to help build your product? I&apos;m available for freelance, contract, and full-time roles. Tell me about your project and I&apos;ll get back within 48 hours.
                    </p>
                </div>

                <div className="lux-card p-6 relative overflow-hidden">
                    <Image src="/globe.svg" alt="accent" width={160} height={160} className="absolute -right-8 -top-8 opacity-12 transform rotate-12" />
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1">
                                <label htmlFor="name" className="text-sm font-medium leading-none">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    required
                                    className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-(--muted-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--card-ring) focus-visible:ring-offset-2"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-(--muted-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--card-ring) focus-visible:ring-offset-2"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="message" className="text-sm font-medium leading-none">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-(--muted-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--card-ring) focus-visible:ring-offset-2"
                                placeholder="Tell me about your project..."
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="lux-btn lux-cta w-full items-center justify-center"
                        >
                            {isSubmitting ? (
                                "Sending..."
                            ) : (
                                <>
                                    Send Message
                                    <Send className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </section>
    );
}
