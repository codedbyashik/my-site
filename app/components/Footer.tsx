"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import Link from "next/link";

type Star = { x: number; y: number; size: number; speed: number; angle: number };

export default function Footer() {
  const [stars, setStars] = useState<Star[]>([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    const starCount = isMobile ? 30 : 80;
    const generatedStars: Star[] = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 1 + Math.random() * 2,
      speed: 0.5 + Math.random(),
      angle: Math.random() * 360,
    }));
    setStars(generatedStars);

    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isMobile]);

  return (
    <footer className="relative bg-gradient-to-t from-[#0d1117] to-[#111827] text-white overflow-hidden py-16">

      {/* Stars */}
      {stars.map((star, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-white/80 shadow-glow"
          style={{ width: star.size, height: star.size, top: star.y, left: star.x }}
          animate={{
            x: isMobile ? 0 : cursor.x / 60 + Math.sin(star.angle) * star.speed * 20,
            y: cursor.y / 60 + Math.cos(star.angle) * star.speed * 20,
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo / Brand */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
            Ashik.dev
          </h1>
          <p className="text-gray-400">
            Crafting cosmic UI websites with glowing neon vibes. Premium, interactive, and fully responsive.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-yellow-400 transition-colors">About</Link></li>
            <li><Link href="/services" className="hover:text-yellow-400 transition-colors">Services</Link></li>
            <li><Link href="/projects" className="hover:text-yellow-400 transition-colors">Projects</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p>Email: <a href="mailto:ashik@example.com" className="hover:text-yellow-400 transition-colors">ashik@example.com</a></p>
          <p>Phone: <a href="tel:+880123456789" className="hover:text-yellow-400 transition-colors">+880 123 456 789</a></p>
          <p>Location: Dhaka, Bangladesh</p>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
          <div className="flex gap-4">
            <Link href="https://facebook.com" target="_blank" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all">
              <FaFacebookF />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all">
              <FaTwitter />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all">
              <FaLinkedinIn />
            </Link>
            <Link href="https://github.com" target="_blank" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all">
              <FaGithub />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Ashik the Great. All rights reserved.
      </div>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 8px #facc15, 0 0 16px #f43f5e;
        }
      `}</style>
    </footer>
  );
}
