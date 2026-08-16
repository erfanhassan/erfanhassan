"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  id: string;
  index: string;
  client: string;
  category: string;
  description: string;
  accentColor: string;
  glowColor: string;
}

const PROJECTS: Project[] = [
  {
    id: "four-seasons",
    index: "01",
    client: "Four Seasons Hotel Dubai",
    category: "AI Automation · Hospitality",
    description:
      "I designed and integrated a completely automated AI booking system for them. It streamlined their entire reservation process and made booking a room a much better experience for their guests.",
    accentColor: "#e8c97a",
    glowColor: "rgba(232, 201, 122, 0.15)",
  },
  {
    id: "sk-overseas",
    index: "02",
    client: "SK Overseas HR Consultancy",
    category: "Workflow Automation · HR Tech",
    description:
      "I completely overhauled their internal workflows. By automating their day-to-day administrative tasks, we saved them countless manual hours and made their operations significantly faster.",
    accentColor: "#e8ff47",
    glowColor: "rgba(232, 255, 71, 0.15)",
  },
  {
    id: "ecommerce",
    index: "03",
    client: "E-Commerce & Retail",
    category: "AI Automation · Scale",
    description:
      "I have worked with massive brands like Al Futtaim, Emma Sleep, and Bkash to handle high volumes of customer interactions. I built smart automation solutions that keep their digital systems running perfectly at scale.",
    accentColor: "#47c8ff",
    glowColor: "rgba(71, 200, 255, 0.15)",
  },
];

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mb-32 text-center flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-normal leading-tight text-[#e8ff47] mb-8"
        style={{ fontSize: "clamp(3rem, 7vw, 6rem)", letterSpacing: "-0.02em" }}
      >
        <span className="font-bold text-[#f0f0f0]">Some recent</span> client projects
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-[#666] text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto"
      >
        Real systems. Real automation. Built for global brands.
      </motion.p>
    </div>
  );
}

// ─── Project Card Component ───────────────────────────────────────────────────
function ProjectCard({ project, index, isLast }: { project: Project; index: number; isLast: boolean }) {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Centered Dot Above Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: "backOut" }}
        className="w-6 h-6 md:w-8 md:h-8 rounded-full mb-8 relative z-10 ring-[8px] ring-[#0a0a0a] mx-auto"
        style={{
          background: project.accentColor,
          boxShadow: `0 0 30px ${project.glowColor}`,
        }}
      />

      {/* Floating Text Section (Formerly Card) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
        className="w-[90%] md:w-[85%] max-w-3xl mx-auto flex flex-col items-center text-center py-8 md:py-12 relative"
      >

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-black mb-3 text-[#f0f0f0] tracking-tight relative z-10 transition-colors duration-500 w-full text-center">
          {project.client}
        </h3>

        {/* Category (Raw Text, No Pills) */}
        <p
          className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] uppercase mb-6 relative z-10 w-full text-center"
          style={{ color: project.accentColor }}
        >
          {project.category}
        </p>

        {/* Description */}
        <p className="text-[#888] text-sm md:text-base leading-[1.8] font-light max-w-2xl mx-auto relative z-10 group-hover:text-[#aaa] transition-colors duration-500 text-center">
          {project.description}
        </p>
      </motion.div>

      {/* Connector line to next dot */}
      {!isLast && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          whileInView={{ opacity: 1, height: "160px" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeInOut" }}
          className="w-px my-4 mx-auto"
          style={{
            background: `linear-gradient(to bottom, ${project.accentColor}60, transparent)`,
          }}
        />
      )}
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="work"
      className="relative w-full bg-[#0a0a0a] pt-40 md:pt-56 pb-40 md:pb-56 px-6 md:px-12 lg:px-20 border-t border-white/[0.04] overflow-hidden flex flex-col items-center"
    >
      {/* Huge ambient background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(232,255,71,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="w-full max-w-6xl mx-auto flex flex-col items-center relative z-10" style={{ paddingBottom: '160px' }} ref={containerRef}>
        <SectionHeader />

        {/* Connector from header to first card */}
        <div className="flex flex-col items-center w-full">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            whileInView={{ opacity: 1, height: "120px" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-px mb-4 mx-auto"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2))",
            }}
          />

          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isLast={index === PROJECTS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
