"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// ✅ Constant outside render
const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/projects" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

// ✅ NavLink component with displayName
const NavLinkComponent = ({ href, name, onClick }: { href: string; name: string; onClick?: () => void }) => (
  <motion.div whileHover={{ scale: 1.1 }} className="relative group">
    <Link href={href} onClick={onClick} className="text-gray-300 hover:text-white transition-colors">
      {name}
    </Link>
    <motion.span
      className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-yellow-400 to-pink-500 transition-all group-hover:w-full"
      layoutId="underline"
    />
  </motion.div>
);

export const NavLink = memo(NavLinkComponent);
NavLink.displayName = "NavLink";

// ✅ Navbar main component
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${isScrolled ? "bg-[#0d1117]/95 shadow-xl" : "bg-[#0d1117]/80"} backdrop-blur-xl`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white relative">
          <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent animate-glow">
            Ashik.dev
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-block px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-semibold hover:scale-105 transition-transform animate-glow"
        >
          Hire Me
        </Link>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all"
          whileHover={{
            scale: 1.2,
            rotate: 10,
            boxShadow: "0 0 20px #facc15, 0 0 30px #f43f5e",
          }}
          whileTap={{ scale: 0.9, rotate: -10 }}
        >
          {menuOpen ? <X size={28} className="text-yellow-400" /> : <Menu size={28} className="text-pink-400" />}
          <motion.span
            className="absolute inset-0 rounded-full border border-yellow-400/50"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0d1117]/95 backdrop-blur-xl border-t border-gray-800"
          >
            <div className="flex flex-col items-center py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} {...link} onClick={() => setMenuOpen(false)} />
              ))}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-semibold hover:scale-105 transition-transform animate-glow"
              >
                Hire Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow Animation */}
      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 8px #f43f5e, 0 0 16px #facc15;
          }
          50% {
            text-shadow: 0 0 12px #facc15, 0 0 24px #f43f5e;
          }
        }
        .animate-glow {
          animation: glow 2s infinite alternate;
        }
      `}</style>
    </motion.nav>
  );
}
