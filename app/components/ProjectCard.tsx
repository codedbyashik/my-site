"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    techStack: string[];
    liveLink?: string;
    github?: string;
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="bg-[#161b22] rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative cursor-pointer hover:scale-105 hover:shadow-glow transition-transform duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
    >
      {/* Project Image */}
      <div className="relative w-full h-64">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover rounded-3xl"
          priority
        />

        {/* Glowing halo */}
        <motion.div
          className="absolute -inset-1 rounded-3xl border border-yellow-400/50"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-4 flex gap-4">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-yellow-400/20 px-4 py-2 rounded-xl hover:bg-yellow-400/30 hover:shadow-glow transition-all duration-300"
            >
              Live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-gray-700/50 px-4 py-2 rounded-xl hover:bg-gray-700/70 hover:shadow-glow transition-all duration-300"
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Glow CSS */}
      <style jsx>{`
        .hover\\:shadow-glow:hover {
          box-shadow: 0 0 10px #facc15, 0 0 20px #f43f5e, 0 0 30px #f0f, 0 0 40px #0ff;
        }
      `}</style>
    </motion.div>
  );
}
