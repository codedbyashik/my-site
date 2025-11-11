"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Star = { x: number; y: number; size: number };
type FAQItem = { question: string; answer: string };

const faqData: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer: "I offer Web Development, UI/UX Design, and Full-Stack Development services with premium cosmic UI design.",
  },
  {
    question: "What technologies do you use?",
    answer: "I primarily use Next.js, Tailwind CSS, Framer Motion, React, Node.js, and other modern web technologies.",
  },
  {
    question: "How can I hire you?",
    answer: "You can reach out through the Contact section or click the 'Hire Me' button to get in touch directly.",
  },
  {
    question: "Do you offer support after project completion?",
    answer: "Yes! I provide post-launch support and maintenance to ensure your project runs smoothly.",
  },
];

export default function FAQSection() {
  const [stars, setStars] = useState<Star[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    // Reduce stars for mobile performance
    const starCount = window.innerWidth < 768 ? 15 : 40;
    const generatedStars: Star[] = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 1 + Math.random() * 2,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0d1117] to-[#111827] text-white overflow-hidden">

      {/* Stars */}
      {stars.map((star, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-white/50 shadow-glow"
          style={{ width: star.size, height: star.size, top: star.y, left: star.x }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, 3, 0] }}
          transition={{ duration: 3 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent animate-text-shimmer">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/5 md:bg-white/10 backdrop-blur-sm md:backdrop-blur-md rounded-xl p-5 cursor-pointer hover:bg-white/10 transition-colors shadow-md"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <span className="text-2xl">{openIndex === idx ? "-" : "+"}</span>
              </div>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 text-gray-300"
                  >
                    {item.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

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
          box-shadow: 0 0 6px #facc15, 0 0 12px #f43f5e;
        }
      `}</style>
    </section>
  );
}
