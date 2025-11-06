"use client";

import React, { useState, useEffect } from "react"; // ✅ React import added
import { motion } from "framer-motion";

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
    <section className="relative py-24 bg-gradient-to-b from-[#0d1117] to-[#07080a] text-white overflow-hidden">

      {/* Stars only client-side */}
      <ClientStars count={40} />

      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent animate-text-shimmer">
          What Clients Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              className="bg-white/10 p-6 rounded-3xl backdrop-blur-md shadow-glow flex flex-col items-center text-center hover:scale-105 hover:shadow-glow-lg transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
            >
              <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full mb-4 shadow-glow object-cover" />
              <p className="text-gray-300 mb-4 italic">"{t.message}"</p>
              <h3 className="font-semibold text-yellow-400 glow-text">{t.name}</h3>
              <span className="text-sm text-gray-400">{t.role}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes text-shimmer { 0% {background-position:-200% 0;} 100% {background-position:200% 0;} }
        .animate-text-shimmer { background-size:200% auto; animation:text-shimmer 3s linear infinite; }
        .shadow-glow { box-shadow: 0 0 12px #facc15, 0 0 24px #f43f5e; }
        .glow-text { text-shadow: 0 0 8px #f43f5e, 0 0 16px #facc15; }
      `}</style>
    </section>
  );
}

// 🌟 Stars Component only client-side
function ClientStars({ count }: { count: number }) {
  const [stars, setStars] = useState<{ top: string; left: string; size: number }[]>([]); // ✅ useState imported
  useEffect(() => { // ✅ useEffect imported
    const generated = Array.from({ length: count }).map(() => ({
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      size: 1 + Math.random() * 2,
    }));
    setStars(generated);
  }, [count]);

  return (
    <>
      {stars.map((star, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-white/60 shadow-[0_0_6px_#ffffff]"
          style={{ width: star.size, height: star.size, top: star.top, left: star.left }}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, 5, 0] }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}
