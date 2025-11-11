"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<any[]>([]);
  const [shootingStars, setShootingStars] = useState<any[]>([]);
  const [showToast, setShowToast] = useState(false);

  // Generate floating particles & shooting stars
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const newParticles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1 + Math.random() * 2,
      speed: 0.02 + Math.random() * 0.05,
      blur: 1 + Math.random() * 2,
    }));

    const newShootingStars = Array.from({ length: 5 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height / 2,
      length: 50 + Math.random() * 100,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 5,
    }));

    setParticles(newParticles);
    setShootingStars(newShootingStars);
  }, []);

  // Track mouse for particle movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="relative w-full py-24 overflow-hidden bg-gradient-to-br from-[#0d1117] to-[#1f1f2e]">

      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-indigo-900 via-purple-900 to-black animate-gradient"></div>

      {/* Floating particles */}
      {particles.map((p, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-white/60"
          style={{
            width: p.size,
            height: p.size,
            top: p.y,
            left: p.x,
            filter: `blur(${p.blur}px)`,
          }}
          animate={{
            x: cursor.x * p.speed + Math.random() * 5,
            y: cursor.y * p.speed + Math.random() * 5,
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((s, idx) => (
        <motion.div
          key={idx}
          className="absolute bg-white/80 rounded-full"
          style={{ top: s.y, left: s.x, width: 2, height: 2 }}
          animate={{
            x: [0, s.length],
            y: [0, -s.length / 2],
            opacity: [1, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 relative z-10">

        {/* Contact Info */}
        <motion.div
          className="flex-1 text-white space-y-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent animate-text-shimmer">
            Get in Touch
          </h2>
          <p className="text-gray-300">Have a question or want to work together? Reach out!</p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 hover:scale-105 transition-transform">
              <FaEnvelope className="text-yellow-400 w-6 h-6 animate-pulse" />
              <span>ashikcodes373@gmail.com</span>
            </div>
            <div className="flex items-center gap-4 hover:scale-105 transition-transform">
              <FaPhone className="text-pink-400 w-6 h-6 animate-pulse" />
              <span>+880 1234 567890</span>
            </div>
            <div className="flex items-center gap-4 hover:scale-105 transition-transform">
              <FaMapMarkerAlt className="text-purple-400 w-6 h-6 animate-pulse" />
              <span>Kusthia, Bangladesh</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex-1 bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-xl flex flex-col gap-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all resize-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px #facc15, 0 0 40px #f43f5e" }}
            className="mt-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-bold rounded-2xl transition-all"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>

      {/* Toast */}
      {showToast && (
        <motion.div
          className="fixed bottom-6 right-6 bg-yellow-400 text-black px-6 py-3 rounded-lg shadow-lg z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          Message sent successfully! ✨
        </motion.div>
      )}

      {/* Styles */}
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
