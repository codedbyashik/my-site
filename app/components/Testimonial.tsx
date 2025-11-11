"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TestimonialProps {
  name: string;
  role: string;
  message: string;
  avatar: string;
}

const testimonials: TestimonialProps[] = [
  {
    name: "John Doe",
    role: "Web Developer",
    message: "Ashik fixed all the bugs in my website perfectly and super fast!",
    avatar: "/avatars/john.jpg",
  },
  {
    name: "Jane Smith",
    role: "Entrepreneur",
    message: "Amazing service! My WordPress site is now running smoothly.",
    avatar: "/avatars/jane.jpg",
  },
  {
    name: "Michael Lee",
    role: "Freelancer",
    message: "Professional, quick, and very reliable. Highly recommend!",
    avatar: "/avatars/michael.jpg",
  },
];

export default function TestimonialSection() {
  return (
    <section className="relative py-16 bg-gradient-to-b from-[#0d1117] to-[#07080a] text-white overflow-hidden">
      {/* Stars only client-side */}
      <ClientStars count={15} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-12 text-center bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent animate-text-shimmer">
          What Clients Say
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              className="bg-white/5 p-6 rounded-2xl shadow-md backdrop-blur-sm flex flex-col items-center text-center transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <div className="w-20 h-20 relative mb-4">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="rounded-full object-cover shadow-sm"
                  priority
                />
              </div>
              <p className="text-gray-300 mb-3 italic">"{t.message}"</p>
              <h3 className="font-semibold text-yellow-400">{t.name}</h3>
              <span className="text-sm text-gray-400">{t.role}</span>
            </motion.div>
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
      `}</style>
    </section>
  );
}

// 🌟 Client-only stars (optimized for mobile)
function ClientStars({ count }: { count: number }) {
  const [stars, setStars] = useState<{ top: string; left: string; size: number }[]>([]);
  useEffect(() => {
    const generated = Array.from({ length: count }).map(() => ({
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      size: 1 + Math.random() * 1.5, // smaller & lighter
    }));
    setStars(generated);
  }, [count]);

  return (
    <>
      {stars.map((star, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-white/50"
          style={{ width: star.size, height: star.size, top: star.top, left: star.left }}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, 3, 0] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}
