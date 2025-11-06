"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}

export default function ServiceCard({ icon, title, description, index }: ServiceCardProps) {
  return (
    <motion.div
      className="p-6 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl hover:border hover:border-yellow-400 transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="text-4xl mb-4 text-yellow-400"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3 + index, repeat: Infinity, ease: "easeInOut" }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}
