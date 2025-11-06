"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CountUp from "react-countup";
import CTAButton from "./CTAButton";
import { FaReact, FaNodeJs, FaGitAlt, FaFigma } from "react-icons/fa";

const stats = [
  { label: "Projects Completed", value: 45 },
  { label: "Clients Worked", value: 20 },
  { label: "Years Experience", value: 3 },
  { label: "Awards Won", value: 2 },
];

const skills = [
  { name: "React", icon: <FaReact className="text-blue-400 w-6 h-6" /> },
  { name: "Next.js", icon: <FaReact className="text-white w-6 h-6" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500 w-6 h-6" /> },
  { name: "Git", icon: <FaGitAlt className="text-red-500 w-6 h-6" /> },
  { name: "Figma", icon: <FaFigma className="text-pink-500 w-6 h-6" /> },
];

const hobbies = [
  { label: "Astronomy 🌌", emoji: "🌌" },
  { label: "Gaming 🎮", emoji: "🎮" },
  { label: "Music 🎵", emoji: "🎵" },
];

export default function AboutSection() {
  const [stars, setStars] = useState<{ top: string; left: string; size: number }[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 40 }, () => ({
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      size: 1 + Math.random() * 2,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0d1117] to-[#07080a] text-white overflow-hidden">

      {/* Stars */}
      {stars.map((star, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-white/50 shadow-[0_0_6px_#ffffff]"
          style={{ width: star.size, height: star.size, top: star.top, left: star.left }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, 4, 0] }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">

        {/* Left Column */}
        <div className="flex-1 text-center lg:text-left space-y-6">

          {/* Heading */}
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-2 tracking-wide bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 bg-clip-text text-transparent animate-text-shimmer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            About Me
          </motion.h2>

          {/* Intro */}
          <motion.p
            className="text-lg md:text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            I am a full-stack web developer crafting premium, interactive digital experiences. Combining design, animation, and code, I deliver websites and apps that users love.
          </motion.p>

          {/* Journey */}
          <motion.p
            className="text-gray-400 italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Started coding in 2018, my mission is to blend aesthetics with functionality in every project.
          </motion.p>

          {/* Skills */}
          <motion.div
            className="flex flex-wrap gap-4 mt-4 justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            {skills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg hover:bg-white/20 hover:shadow-glow transition-all duration-300">
                {skill.icon} <span>{skill.name}</span>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap gap-6 mt-6 justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center lg:text-left">
                <p className="text-3xl font-bold text-yellow-400 shadow-glow">
                  <CountUp end={stat.value} duration={2} />+
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Hobbies */}
          <motion.div
            className="flex gap-4 mt-6 justify-center lg:justify-start text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            {hobbies.map((hobby, idx) => (
              <span key={idx} className="px-2 py-1 bg-white/10 rounded-lg hover:bg-white/20 hover:shadow-glow transition-all duration-300">{hobby.emoji} {hobby.label}</span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div className="flex gap-4 mt-6 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <CTAButton text="Hire Me" href="/contact" />
            <CTAButton text="Download CV" href="/Bangladesh Kusthia Resume.png" />
          </motion.div>

        </div>

        {/* Right Column - Profile Image */}
        <div className="flex-1 relative max-w-sm mx-auto lg:mx-0">
          <motion.div
            className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative"
            animate={{ y: [0, -8, 0], scale: [1, 1.03, 1], rotate: [0, 2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/code.jpg"
              alt="Profile Picture"
              width={400}
              height={400}
              className="rounded-3xl"
              loading="lazy"
            />

            {/* Halo rings */}
            <motion.div
              className="absolute -inset-6 rounded-full border border-yellow-400/40 blur-xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -inset-12 rounded-full border border-yellow-300/20 blur-2xl"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Shimmer + Glow CSS */}
      <style jsx>{`
        @keyframes text-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-text-shimmer {
          background-size: 200% auto;
          animation: text-shimmer 3s linear infinite;
        }
        .shadow-glow {
          box-shadow: 0 0 12px #facc15, 0 0 24px #f43f5e;
        }
      `}</style>
    </section>
  );
}
