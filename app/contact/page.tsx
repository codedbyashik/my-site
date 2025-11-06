"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [stars, setStars] = useState<{ top: string; left: string; size: number; delay: number }[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 50 }).map(() => ({
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      size: 1 + Math.random() * 2,
      delay: Math.random() * 5,
    }));
    setStars(generatedStars);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent ✨");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-[#0d1117] to-[#1f1f2e] overflow-hidden">

      {/* 🌟 Stars */}
      {stars.map((star, idx) => (
        <motion.div
          key={idx}
          className="absolute bg-white rounded-full opacity-70 shadow-glow"
          style={{ width: star.size, height: star.size, top: star.top, left: star.left }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
        />
      ))}

      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 relative z-10">

        {/* Left: Contact Info */}
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
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-yellow-400 w-6 h-6 animate-pulse" />
              <span>ashik@example.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FaPhone className="text-pink-400 w-6 h-6 animate-pulse" />
              <span>+880 1234 567890</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-purple-400 w-6 h-6 animate-pulse" />
              <span>Kusthia, Bangladesh</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
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

      {/* Shimmer Animation CSS */}
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
    </section>
  );
}
