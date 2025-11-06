"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServiceCard from "./components/ServiceCard";
import TestimonialSection from "./components/Testimonial"; // ✅ Import
 // ✅ Import FAQ
import { FaCode, FaPaintBrush, FaServer } from "react-icons/fa";
import FAQSection from "./components/FaqSection";

// Services data
const services = [
  { title: "Web Development", description: "Responsive & dynamic websites.", icon: <FaCode /> },
  { title: "UI/UX Design", description: "Visually stunning interfaces.", icon: <FaPaintBrush /> },
  { title: "Full-Stack Development", description: "End-to-end solutions.", icon: <FaServer /> },
];

export default function Home() {
  const [stars, setStars] = useState<
    { size: number; top: number; left: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 60 }).map(() => ({
      size: Math.random() * 2 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="relative bg-[#0d1117] overflow-hidden min-h-screen">

      {/* Stars Background */}
      {stars.map((star, idx) => (
        <motion.div
          key={idx}
          className="absolute bg-white rounded-full opacity-70 shadow-glow"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2], y: [0, 2, 0] }}
          transition={{
            delay: star.delay,
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <section className="py-24 text-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent animate-text-shimmer">
            My Services
          </h2>

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
      </section>

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* FAQ Section */}
      <FAQSection/>


      {/* Text shimmer animation */}
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
          box-shadow: 0 0 8px #facc15, 0 0 16px #f43f5e;
        }
      `}</style>

    </div>
  );
}
