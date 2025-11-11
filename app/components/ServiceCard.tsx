"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}

export default function ServiceCard({ icon, title, description, index }: ServiceCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      className={`p-6 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer
                  ${!isMobile ? "bg-white/5 backdrop-blur-md hover:scale-105 hover:shadow-xl hover:border hover:border-yellow-400" : "bg-white/10"}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="text-4xl mb-4 text-yellow-400"
        animate={!isMobile ? { rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 2 + index, repeat: Infinity, ease: "easeInOut" }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}
