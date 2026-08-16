"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";

const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 60);
    });
  }, [scrollY]);

  return (
    <motion.header
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12"
      style={{ height: "64px" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Glass background - appears on scroll */}
      <motion.div
        className="absolute inset-0 glass border-b border-white/[0.04]"
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Brand logo */}
      <Link href="/" className="relative z-10 flex items-center gap-2 group">
        <span className="w-8 h-8 rounded-lg bg-[#141414] border border-white/[0.1] group-hover:border-[#e8ff47]/50 flex items-center justify-center text-xs font-black text-[#e8ff47] transition-colors">
          EH
        </span>
        <span className="text-sm font-semibold text-[#eee] group-hover:text-white transition-colors hidden sm:inline-block">
          Erfan Hassan
        </span>
      </Link>

      {/* Nav links */}
      <nav className="relative z-10 flex items-center gap-6 md:gap-8">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            id={`nav-${link.label.toLowerCase()}`}
            className="text-sm text-[#888] hover:text-[#f0f0f0] transition-colors duration-200 font-medium tracking-wide"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}
