"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, Variants, easeOut } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Star = { top: string; left: string; size: number; duration: number; delay: number };
type Comet = { top: string; left: string; rotate: number; duration: number; delay: number };
type Particle = { x: number; y: number; size: number; blur: number; speed: number };

export default function HeroSection() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<Star[]>([]);
  const [comets, setComets] = useState<Comet[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  // ⭐ Generate all random elements on client-side only
  useEffect(() => {
    setStars(
      Array.from({ length: 120 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2,
        duration: 3 + Math.random() * 3,
        delay: Math.random() * 10,
      }))
    );

    setComets(
      Array.from({ length: 6 }, () => ({
        top: `${Math.random() * 80}%`,
        left: "-10%",
        rotate: Math.random() * 30 - 15,
        duration: 3 + Math.random() * 3,
        delay: Math.random() * 10,
      }))
    );

    setParticles(
      Array.from({ length: 60 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 2 + Math.random() * 4,
        blur: 1 + Math.random() * 3,
        speed: 0.05 + Math.random() * 0.1,
      }))
    );
  }, []);

  // Cursor tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Framer-motion variants
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.8, ease: easeOut },
    }),
  };

  return (
    <section className="relative h-screen w-full bg-gradient-to-b from-[#0d1117] via-[#1f1b24] to-[#0d1117] overflow-hidden flex items-center justify-center text-white">
      {/* Stars */}
      {stars.map((star, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-white/80 shadow-glow will-change-transform"
          style={{ width: star.size, height: star.size, top: star.top, left: star.left }}
          animate={{ opacity: [0.3, 1, 0.3], y: ["0%", "15%", "0%"] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Comets */}
      {comets.map((comet, idx) => (
        <motion.div
          key={idx}
          className="absolute w-1 h-1 bg-white/70 rounded-full shadow-glow will-change-transform"
          style={{ top: comet.top, left: comet.left }}
          animate={{ x: ["-10%", "110%"], rotate: comet.rotate, opacity: [0, 1, 0] }}
          transition={{ duration: comet.duration, delay: comet.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Cursor particles */}
      {particles.map((p, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-blue-400/50 will-change-transform"
          style={{ width: p.size, height: p.size, top: p.y, left: p.x, filter: `blur(${p.blur}px)` }}
          animate={{ x: cursor.x * p.speed + Math.random() * 10, y: cursor.y * p.speed + Math.random() * 10, opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 px-6">
        <div className="flex-1 text-center md:text-left">
          <motion.h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide" initial="hidden" animate="visible" custom={0} variants={textVariants}>
            Hi, I&apos;m <span className="text-blue-400">Ashik the Great</span>
          </motion.h1>
          <motion.p className="text-lg md:text-xl mb-6 text-gray-300" initial="hidden" animate="visible" custom={1} variants={textVariants}>
            I build <span className="text-white font-semibold">premium cosmic UI websites</span> with{" "}
            <span className="text-blue-400 font-bold">glowing neon effects</span>.
          </motion.p>
          <motion.div className="flex justify-center md:justify-start gap-4" initial="hidden" animate="visible" custom={2} variants={textVariants}>
            <Link href="/projects" className="px-6 py-3 bg-blue-600 rounded-lg text-white font-bold shadow-lg hover:scale-105 hover:shadow-blue-400/50 transition-transform duration-300">
              View Portfolio
            </Link>
            <Link href="/contact" className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg text-white font-semibold hover:scale-105 hover:bg-white/20 hover:shadow-yellow-400/50 transition-all duration-300">
              Hire Me
            </Link>
          </motion.div>
        </div>

        <div className="flex-1 max-w-md md:max-w-lg mx-auto relative">
          <motion.div className="relative rounded-3xl shadow-2xl border border-white/10" animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <Image src="/ashik.png" alt="Hero Illustration" width={500} height={500} className="rounded-3xl" priority />
            {["blue", "pink", "cyan"].map((color, idx) => (
              <motion.div key={idx} className={`absolute -inset-${8 + idx * 4} rounded-full border border-${color}-400/40`} animate={{ rotate: idx % 2 === 0 ? [0, 360] : [360, 0] }} transition={{ duration: 20 + idx * 10, repeat: Infinity, ease: "linear" }} />
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 10px #fff, 0 0 20px #00f, 0 0 30px #f0f, 0 0 40px #0ff;
        }
      `}</style>
    </section>
  );
}
