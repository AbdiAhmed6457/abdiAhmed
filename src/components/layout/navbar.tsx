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
    <header className="fixed top-4 left-0 right-0 z-50 px-2 sm:px-4">
      <div className="container mx-auto relative">

        {/* Hamburger */}
        <button
          aria-expanded={isOpen}
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
          className="hamburger fixed right-3 top-5 z-50 md:hidden inline-flex items-center justify-center rounded-md p-2.5 text-(--muted-foreground)"
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Main Navbar */}
        <div className="site-navbar flex h-14 items-center justify-between rounded-full px-3 sm:px-4 py-2 w-full">
          <div className="flex items-center gap-4 flex-1 min-w-0">

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[rgba(201,161,91,0.08)] flex items-center justify-center text-(--lux-ivory) font-semibold">
                AA
              </div>
              <span className="font-semibold tracking-tight text-(--lux-ivory) truncate hidden sm:inline-block">
                Abdi Ahmed
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
              {navItems.map((item) =>
                item.href.startsWith("http") ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("transition-colors px-3 py-1 rounded-md text-(--muted-foreground) hover:text-(--lux-ivory)")}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "transition-colors px-3 py-1 rounded-md",
                      pathname === item.href
                        ? "text-(--lux-ivory) bg-[rgba(201,161,91,0.06)]"
                        : "text-(--muted-foreground) hover:text-(--lux-ivory)"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Dark Mode Toggle */}
          <div className="hidden md:block">
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mobile-menu mt-3 md:hidden absolute left-0 right-0 top-full px-4"
          >
            <div className="mobile-menu-panel lux-card max-w-3xl mx-auto">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
              >
                {navItems.map((item) => (
                  <motion.li
                    key={item.name}
                    variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                  >
                    {item.href.startsWith("http") ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "block rounded-md px-3 py-3 text-base font-medium w-full text-(--muted-foreground) hover:bg-[rgba(255,255,255,0.02)] hover:text-(--lux-ivory)"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md px-3 py-3 text-base font-medium w-full",
                          pathname === item.href
                            ? "bg-[rgba(201,161,91,0.06)] text-(--lux-ivory)"
                            : "text-(--muted-foreground) hover:bg-[rgba(255,255,255,0.02)] hover:text-(--lux-ivory)"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <div className="mobile-cta-wrap">
              <a
                href="https://t.me/seatOfHonour"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-cta"
              >
                Contact
              </a>
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
}
