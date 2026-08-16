"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface TextSection {
  id: string;
  line1: string;
  line2?: string;
  sub?: string;
  alignment: "center" | "left" | "right";
  /** Scroll progress (0-1) when this section is fully visible */
  peakAt: number;
  /** Half-width of the fade window in scroll units */
  window: number;
}

const SECTIONS: TextSection[] = [
  {
    id: "intro",
    line1: "This is Erfan!",
    line2: "Designing systems. Crafting Experience.",
    alignment: "center",
    peakAt: 0.08,
    window: 0.08,
  },
  {
    id: "build",
    line1: "Building Agentic",
    line2: "AI Systems",
    alignment: "left",
    peakAt: 0.38,
    window: 0.12,
  },
  {
    id: "bridge",
    line1: "Automating messy workflows",
    line2: "for global brands",
    alignment: "right",
    peakAt: 0.70,
    window: 0.12,
  },
];

/** Clamp a value to [0, 1] */
function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

// ─── Single parallax text block ──────────────────────────────────────────────
function ParallaxText({
  section,
  scrollYProgress,
}: {
  section: TextSection;
  scrollYProgress: MotionValue<number>;
}) {
  const { peakAt, window: win, alignment } = section;

  // Clamp all range values so they are always in [0, 1] and strictly increasing
  const fadeIn = clamp01(peakAt - win);
  const fadeInMid = clamp01(peakAt - win * 0.4);
  const peak = clamp01(peakAt);
  const fadeOutMid = clamp01(peakAt + win * 0.4);
  const fadeOut = clamp01(peakAt + win);

  const opacity = useTransform(
    scrollYProgress,
    [fadeIn, fadeInMid, peak, fadeOutMid, fadeOut],
    [0, 1, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [clamp01(peakAt - win), peak, clamp01(peakAt + win)],
    ["28px", "0px", "-28px"]
  );

  const alignClasses: Record<TextSection["alignment"], string> = {
    center: "items-center text-center",
    left: "items-start text-left pl-8 md:pl-16 lg:pl-24",
    right: "items-end text-right pr-8 md:pr-16 lg:pr-24",
  };

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col justify-center ${alignClasses[alignment]} pointer-events-none`}
    >
      {/* Intro layout: pill → name → yellow line → sub */}
      {section.id === "intro" ? (
        <div className="max-w-[780px] flex flex-col items-center text-center -mt-16">
          {/* Pill — sits above the name with a gap */}
          <div className="tag-pill mb-8 inline-flex">
            AI Engineer, Angel Investor &amp; Biryani Addict
          </div>

          {/* Main name */}
          <h1
            className="font-black tracking-tight leading-none text-gradient"
            style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}
          >
            {section.line1}
          </h1>

          {/* Yellow line — slightly smaller */}
          {section.line2 && (
            <p
              className="text-accent-gradient font-black tracking-tight leading-tight mt-3"
              style={{ fontSize: "clamp(1.6rem, 4vw, 4.5rem)" }}
            >
              {section.line2}
            </p>
          )}
        </div>
      ) : (
        /* Default layout for other sections */
        <div className="max-w-[720px]">
          <h2
            className="font-black tracking-tight leading-none"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
          >
            <span className="text-gradient block">{section.line1}</span>
            {section.line2 && (
              <span className="text-accent-gradient block">{section.line2}</span>
            )}
          </h2>

          {section.sub && (
            <p
              className="mt-5 text-[#888] font-light leading-relaxed"
              style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.15rem)" }}
            >
              {section.sub}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}

// ─── Scroll progress bar ───────────────────────────────────────────────────────
function ScrollProgressBar({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-white/5">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX,
          background: "linear-gradient(to right, #e8ff47, #a8e060)",
        }}
      />
    </div>
  );
}

// ─── Scroll-to-explore CTA ────────────────────────────────────────────────────
function ScrollCTA({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <motion.div
      id="scroll-cta"
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
      style={{ opacity }}
    >
      <p className="text-[#555] text-xs tracking-[0.2em] uppercase font-medium">
        Scroll to explore
      </p>
      <div className="w-[1px] h-10 bg-gradient-to-b from-[#555] to-transparent" />
    </motion.div>
  );
}

// ─── Main overlay ──────────────────────────────────────────────────────────────
export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <ScrollProgressBar scrollYProgress={scrollYProgress} />

      {/* Positioned absolutely over ScrollyCanvas — pointer-events-none so scroll passes through */}
      <div
        ref={containerRef}
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: "500vh" }}
        id="overlay-container"
        aria-hidden="true"
      >
        {/* Sticky viewport layer */}
        <div className="sticky top-0 h-screen w-full z-10">
          {SECTIONS.map((section) => (
            <ParallaxText
              key={section.id}
              section={section}
              scrollYProgress={scrollYProgress}
            />
          ))}

          <ScrollCTA scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </>
  );
}
