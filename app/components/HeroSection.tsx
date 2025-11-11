"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, Variants, easeOut } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaDribbble } from "react-icons/fa";

function TypingText({ texts }: { texts: string[] }) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index === texts.length) return;

    const timeout = setTimeout(() => {
      const current = texts[index];
      if (!deleting) {
        setDisplayText(current.slice(0, subIndex + 1));
        setSubIndex(subIndex + 1);
        if (subIndex + 1 === current.length) setDeleting(true);
      } else {
        setDisplayText(current.slice(0, subIndex - 1));
        setSubIndex(subIndex - 1);
        if (subIndex - 1 === 0) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, deleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, texts]);

  return <span className="text-white font-semibold">{displayText}</span>;
}

type Star = { top: string; left: string; size: number; duration: number; delay: number };
type Comet = { top: string; left: string; rotate: number; duration: number; delay: number };

export default function HeroSection() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<Star[]>([]);
  const [comets, setComets] = useState<Comet[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const width = window.innerWidth;
    setIsMobile(width < 768);

    const starCount = width < 768 ? 15 : 100;
    const cometCount = width < 768 ? 0 : 5;

    setStars(
      Array.from({ length: starCount }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2,
        duration: 3 + Math.random() * 3,
        delay: Math.random() * 10,
      }))
    );

    setComets(
      Array.from({ length: cometCount }, () => ({
        top: `${Math.random() * 80}%`,
        left: "-10%",
        rotate: Math.random() * 30 - 15,
        duration: 3 + Math.random() * 3,
        delay: Math.random() * 10,
      }))
    );
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (!isMobile) window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, isMobile]);

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
          animate={{ opacity: [0.3, 1, 0.3], y: ["0%", "10%", "0%"] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Comets (desktop only) */}
      {!isMobile && comets.map((comet, idx) => (
        <motion.div
          key={idx}
          className="absolute w-1 h-1 bg-white/70 rounded-full shadow-glow will-change-transform"
          style={{ top: comet.top, left: comet.left }}
          animate={{ x: ["-10%", "110%"], rotate: comet.rotate, opacity: [0, 1, 0] }}
          transition={{ duration: comet.duration, delay: comet.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 px-6">

        <div className="flex-1 text-center md:text-left">
          <motion.h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide" initial="hidden" animate="visible" custom={0} variants={textVariants}>
            Hi, I&apos;m <span className="text-blue-400">Ashik the Great</span>
          </motion.h1>

          <motion.div className="text-lg md:text-xl mb-6 text-gray-300" initial="hidden" animate="visible" custom={1} variants={textVariants}>
            <TypingText texts={["I build cosmic UI websites", "I design glowing neon effects", "I craft interactive experiences"]} />
          </motion.div>

          <motion.div className="flex justify-center md:justify-start gap-4" initial="hidden" animate="visible" custom={2} variants={textVariants}>
            <Link href="/projects" className="px-6 py-3 bg-blue-600 rounded-lg text-white font-bold shadow-lg hover:scale-105 hover:shadow-blue-400/50 transition-transform duration-300">
              View Portfolio
            </Link>
            <Link href="/contact" className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg text-white font-semibold hover:scale-105 hover:bg-white/20 hover:shadow-yellow-400/50 transition-all duration-300">
              Hire Me
            </Link>
          </motion.div>

          <motion.div className="flex gap-4 mt-6 justify-center md:justify-start">
            {[{ icon: <FaLinkedin />, link: "https://linkedin.com" }, { icon: <FaGithub />, link: "https://github.com" }, { icon: <FaDribbble />, link: "https://dribbble.com" }].map((social, idx) => (
              <Link key={idx} href={social.link} target="_blank" className="text-white text-2xl hover:scale-110 hover:text-blue-400 transition-all duration-300">
                {social.icon}
              </Link>
            ))}
          </motion.div>

        </div>

        {/* Profile Illustration */}
        <div className="flex-1 max-w-md md:max-w-lg mx-auto relative">
          <motion.div className="relative rounded-3xl shadow-2xl border border-white/10" animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <Image src="/ashik.png" alt="Hero Illustration" width={isMobile ? 300 : 500} height={isMobile ? 300 : 500} className="rounded-3xl" priority />
          </motion.div>
        </div>
      </div>

      <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce">
        <span className="text-3xl">⌄</span>
      </motion.div>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 10px #fff, 0 0 20px #00f, 0 0 30px #f0f, 0 0 40px #0ff;
        }
      `}</style>
    </section>
  );
}
