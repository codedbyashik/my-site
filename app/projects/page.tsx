"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projects as allProjects } from "@/data/projects";

type Star = { x: number; y: number; size: number; speed: number; angle: number };

const categories = ["All", "Frontend", "Backend", "Fullstack", "React", "Next.js", "Node.js"];

export default function ProjectShowcase() {
  const [stars, setStars] = useState<Star[]>([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(allProjects);

  // Detect mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Mobile-এ stars animation skip করা

    const generatedStars: Star[] = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 1 + Math.random() * 2,
      speed: 0.5 + Math.random(),
      angle: Math.random() * 360,
    }));
    setStars(generatedStars);

    const handleMouseMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  useEffect(() => {
    const filtered = allProjects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.techStack.some((tech) => tech.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory =
        activeCategory === "All" || p.techStack.includes(activeCategory);
      return matchesSearch && matchesCategory;
    });
    setFilteredProjects(filtered);
  }, [search, activeCategory]);

  // Tap overlay for mobile
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <section className="relative py-24 bg-[#0d1117] text-white overflow-hidden min-h-screen">

      {/* Stars */}
      {!isMobile &&
        stars.map((star, idx) => (
          <motion.div
            key={`star-${idx}`}
            className="absolute rounded-full bg-white opacity-70 shadow-glow"
            style={{ width: star.size, height: star.size, top: star.y, left: star.x }}
            animate={{
              x: cursor.x / 60 + Math.sin(star.angle) * star.speed * 20,
              y: cursor.y / 60 + Math.cos(star.angle) * star.speed * 20,
              opacity: [0.3, 1, 0.3],
            }}
            transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent animate-text-shimmer">
          My Projects
        </h2>

        {/* Search */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all shadow-glow"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-semibold transition-all shadow-lg ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-black shadow-2xl scale-105"
                  : "bg-white/10 text-white hover:bg-gradient-to-r hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={`${project.title}-${idx}`}
                className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
                onClick={() => setActiveProject(activeProject === project.title ? null : project.title)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="w-full h-auto aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay */}
                {(activeProject === project.title || !isMobile) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 pointer-events-none group-hover:pointer-events-auto">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="px-2 py-1 bg-white/10 rounded-lg text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform"
                        >
                          Live Site
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white font-semibold hover:scale-105 hover:bg-white/20 transition-all"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient animate-glow pointer-events-none"></div>
              </motion.div>
            ))}
          </AnimatePresence>
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

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px #facc15, 0 0 40px #f43f5e; }
          50% { box-shadow: 0 0 30px #facc15, 0 0 60px #f43f5e; }
        }
        .animate-glow {
          animation: glow 2s infinite alternate;
        }
        .border-gradient {
          border-image-slice: 1;
          border-width: 2px;
          border-image-source: linear-gradient(to right, #facc15, #f43f5e, #a855f7);
        }
        .shadow-glow {
          box-shadow: 0 0 8px #facc15, 0 0 16px #f43f5e;
        }
      `}</style>
    </section>
  );
}
