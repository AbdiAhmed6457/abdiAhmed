"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <header className="fixed top-4 left-0 right-0 z-50 px-4">
            <div className="container mx-auto">
                <div className="site-navbar flex h-14 items-center justify-between rounded-full px-4 py-2">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center space-x-3">
                            <Image src="/globe.svg" alt="logo" width={36} height={36} className="rounded-full" />
                            <span className="font-semibold tracking-tight text-(--lux-ivory)">Abdi Ahmed</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "transition-colors px-3 py-1 rounded-md",
                                        pathname === item.href ? "text-(--lux-ivory) bg-[rgba(201,161,91,0.06)]" : "text-(--muted-foreground) hover:text-(--lux-ivory)"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:block">
                            <ModeToggle />
                        </div>
                        <button
                            aria-expanded={isOpen}
                            aria-label="Toggle menu"
                            className="hamburger inline-flex items-center justify-center rounded-md p-2.5 text-(--muted-foreground) md:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
                        </button>
                    </div>
                </div>
                {/* Mobile Menu */}
                {isOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mobile-menu mt-3 md:hidden"
                    >
                        <div className="mobile-menu-panel lux-card">
                            <motion.ul initial="hidden" animate="show" variants={{
                                hidden: {},
                                show: { transition: { staggerChildren: 0.06 } }
                            }}>
                                {navItems.map((item) => (
                                    <motion.li key={item.name} variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "block rounded-md px-3 py-3 text-base font-medium w-full",
                                                pathname === item.href ? "bg-[rgba(201,161,91,0.06)] text-(--lux-ivory)" : "text-(--muted-foreground) hover:bg-[rgba(255,255,255,0.02)] hover:text-(--lux-ivory)"
                                            )}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                        <div className="mobile-cta-wrap">
                            <Link href="#contact" className="mobile-cta">Contact</Link>
                        </div>
                    </motion.nav>
                )}
            </div>
        </header>
    );
}
