"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import {
  FaCode,
  FaPaintBrush,
  FaServer,
  FaMagic,
  FaChartLine,
  FaComments,
} from "react-icons/fa";

const services = [
  { title: "Web Development", description: "Responsive & dynamic websites.", icon: <FaCode /> },
  { title: "UI/UX Design", description: "Visually stunning interfaces.", icon: <FaPaintBrush /> },
  { title: "Full-Stack Development", description: "End-to-end solutions.", icon: <FaServer /> },
  { title: "Animation & Motion", description: "Interactive animations.", icon: <FaMagic /> },
  { title: "SEO Optimization", description: "Boost search rankings.", icon: <FaChartLine /> },
  { title: "Consulting", description: "Tech & design advice.", icon: <FaComments /> },
];

type Star = { x: number; y: number; size: number; speed: number; angle: number; glow: number };

export default function ServicesPage() {
  const [stars, setStars] = useState<Star[]>([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate stars
    const generatedStars: Star[] = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.2,
      angle: Math.random() * 360,
      glow: Math.random() * 6 + 4,
    }));
    setStars(generatedStars);

    const handleMouseMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden min-h-screen text-white bg-[#0d1117]">
      {/* Cosmic background + stars */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-purple-900 to-black animate-gradient"></div>
        {stars.map((star, idx) => (
          <motion.div
            key={idx}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              top: star.y,
              left: star.x,
              boxShadow: `0 0 ${star.glow}px #facc15, 0 0 ${star.glow * 2}px #f43f5e`,
            }}
            animate={{
              x: cursor.x * star.speed + Math.sin(star.angle) * 10,
              y: cursor.y * star.speed + Math.cos(star.angle) * 10,
              opacity: [0.3, 1, 0.3],
            }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-center bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent animate-text-shimmer">
          My Services
        </h2>
        <p className="text-gray-400 text-center mb-12">
          I provide professional services to help your business grow online.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={idx}
            />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes text-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-text-shimmer {
          background-size: 200% auto;
          animation: text-shimmer 3s linear infinite;
          text-shadow: 0 0 8px rgba(255, 200, 0, 0.5);
        }

        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-move 15s ease infinite;
        }
      `}</style>
    </section>
  );
}
