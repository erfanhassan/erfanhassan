"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GradientBackground } from "@/components/ui/paper-design-shader-background";

const AI_PROJECTS = [
  {
    id: "ava",
    title: "Ava",
    url: "https://avahealthai.com",
    displayUrl: "avahealthai.com",
    description:
      "We built avahealthai.com from the ground up. It is a live AI medical assistant designed specifically for doctors. Right now, it has about 5000+ active users and it helps them diagnose reports, answer medical queries, and handle clinical work.",
    accent: "#ff4785", // Pinkish red
    glow: "rgba(255, 71, 133, 0.15)",
  },
  {
    id: "jwala",
    title: "Jwala",
    url: "https://jwalaai.com",
    displayUrl: "jwalaai.com",
    description:
      'This is a unique AI we created to help give people mental clarity. It is programmed with two totally different personalities. If you need raw, unfiltered honesty, the "Clowngod" persona will tell you the absolute truth without caring about your feelings. But if you need support, the "Skyboy" persona takes over to be soft, caring, and considerate.',
    accent: "#47c8ff", // Light blue
    glow: "rgba(71, 200, 255, 0.15)",
  },
];

export default function MyAIProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="ai-projects"
      className="relative w-full bg-[#0a0a0a] pt-32 pb-40 md:pt-48 md:pb-56 px-6 md:px-12 lg:px-20 border-t border-white/[0.04] flex flex-col items-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-70 pointer-events-none">
        <GradientBackground />
      </div>
      
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center relative z-10" style={{ paddingTop: '160px', paddingBottom: '160px' }} ref={ref}>
        {/* Header */}
        <div className="flex flex-col items-center text-center" style={{ marginBottom: '120px' }}>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-normal leading-tight text-[#e8ff47] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            <span className="font-bold text-[#f0f0f0]">Things I have</span> built myself
          </motion.h2>
        </div>

        {/* Grid / Stack */}
        <div className="flex flex-col items-center gap-16 lg:gap-24 w-full max-w-5xl mx-auto">
          {AI_PROJECTS.map((project, i) => (
            <div key={project.id} className={`flex w-full flex-col items-center justify-center gap-12 lg:gap-20 max-w-6xl mx-auto ${project.id === "jwala" ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
                className="w-[90%] md:w-[85%] max-w-3xl text-center group relative p-8 md:p-12 lg:p-16 flex flex-col items-center transition-all duration-500 lg:mx-0 lg:flex-1"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top right, ${project.glow}, transparent 70%)`,
                  }}
                />

                <div className="flex flex-col relative z-10 w-full items-center text-center">
                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/95 font-medium leading-relaxed mb-10 text-sm md:text-base max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {project.description}
                  </p>

                  {/* Link */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 mt-auto text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors hover:text-white"
                    style={{ color: project.accent }}
                  >
                    Visit {project.displayUrl}
                    <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </motion.div>

              {/* App Image (Left for Jwala, Right for Ava) */}
              <motion.div 
                initial={{ opacity: 0, x: project.id === "jwala" ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="relative z-10 w-[90%] md:w-[85%] lg:w-auto lg:flex-1 max-w-[320px] flex items-center justify-center group/img perspective-1000"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/${project.id}-app.png`}
                  alt={`${project.title} App Interface`}
                  className="w-full transition-all duration-700 ease-out drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                  style={{
                    transform: `perspective(1200px) rotateY(${project.id === "jwala" ? "15deg" : "-15deg"}) rotateX(10deg) rotateZ(${project.id === "jwala" ? "2deg" : "-2deg"})`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg) rotateZ(0deg) scale(1.05)";
                    (e.currentTarget as HTMLImageElement).style.filter = "drop-shadow(0px 30px 40px rgba(0,0,0,0.6))";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = `perspective(1200px) rotateY(${project.id === "jwala" ? "15deg" : "-15deg"}) rotateX(10deg) rotateZ(${project.id === "jwala" ? "2deg" : "-2deg"})`;
                    (e.currentTarget as HTMLImageElement).style.filter = ""; // Resets to Tailwind class drop-shadow
                  }}
                  draggable={false}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
