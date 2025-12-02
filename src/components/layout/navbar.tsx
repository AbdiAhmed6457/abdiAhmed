"use client";

import * as React from "react";
import Link from "next/link";
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
  { name: "Contact", href: "https://t.me/seatOfHonour" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
  <header className="site-navbar fixed inset-x-0 top-4 z-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Main Navbar Bar */}
        <div className="relative flex h-14 items-center justify-between rounded-full bg-[var(--card)]/60 backdrop-blur-xl border border-white/10 px-5 sm:px-6 shadow-xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[rgba(201,161,91,0.12)] flex items-center justify-center text-[var(--lux-gold)] font-bold text-sm">
              AA
            </div>
            <span className="font-semibold text-[var(--lux-ivory)] hidden sm:block">
              Abdi Ahmed
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) =>
              item.href.startsWith("http") ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-[var(--muted-foreground)] hover:text-[var(--lux-ivory)] hover:bg-white/5 transition-all"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-full transition-all",
                    pathname === item.href || (pathname === "/" && item.href === "/")
                      ? "bg-[rgba(201,161,91,0.12)] text-[var(--lux-gold)] font-medium"
                      : "text-[var(--muted-foreground)] hover:text-[var(--lux-ivory)] hover:bg-white/5"
                  )}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="ml-4">
              <ModeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button — NEVER overflows */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hamburger md:hidden p-2 rounded-full text-[var(--muted-foreground)] hover:bg-white/10 transition-all"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu — Perfectly contained */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-4 top-full mt-3 md:hidden"
          >
            <div className="rounded-3xl bg-[var(--card)]/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
              <nav className="p-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {item.href.startsWith("http") ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="block px-5 py-4 text-lg font-medium text-[var(--lux-ivory)] hover:bg-white/5 rounded-xl transition-all"
                      >
                        {item.name} →
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block px-5 py-4 text-lg font-medium rounded-xl transition-all",
                          pathname === item.href
                            ? "bg-[rgba(201,161,91,0.12)] text-[var(--lux-gold)]"
                            : "text-[var(--muted-foreground)] hover:bg-white/5 hover:text-[var(--lux-ivory)]"
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
                <div className="pt-4 pb-2 px-5">
                  <ModeToggle />
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}