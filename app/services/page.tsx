"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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

export default function ServicesPage() {
  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    // Generate stars only on client, single-time, safe
    const generatedStars = Array.from({ length: 100 }).map(() => ({
      size: Math.random() * 5 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5,
      glow: Math.random() * 8 + 6,
      opacityRange: [Math.random() * 0.3 + 0.3, Math.random() * 0.7 + 0.5],
    }));

    // Use requestAnimationFrame for safe state update
    requestAnimationFrame(() => setStars(generatedStars));
  }, []);

  return (
    <section className="relative py-24 text-white overflow-hidden bg-[#0d1117]">
      {/* Background gradient + stars */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-purple-900 to-black animate-gradient"></div>
        {stars.map((star, idx) => (
          <motion.div
            key={idx}
            className="absolute bg-white rounded-full"
            style={{
              width: star.size,
              height: star.size,
              top: `${star.top}%`,
              left: `${star.left}%`,
              boxShadow: `0 0 ${star.glow}px rgba(255,255,255,0.9)`,
            }}
            animate={{ opacity: star.opacityRange }}
            transition={{
              delay: star.delay,
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide text-center bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent animate-text-shimmer">
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

      {/* Gradient + shimmer CSS */}
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
