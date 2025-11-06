"use client";

import { motion } from "framer-motion";

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
      className="bg-[#161b22] rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative cursor-pointer hover:scale-105 transition-transform duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
    >
      {/* Project Image */}
      <div className="relative w-full h-64">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {/* Glowing border */}
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
        <div className="mt-4 flex gap-4">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              className="text-white bg-yellow-400/20 px-4 py-2 rounded-xl hover:bg-yellow-400/30 transition"
            >
              Live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              className="text-white bg-gray-700/50 px-4 py-2 rounded-xl hover:bg-gray-700/70 transition"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
