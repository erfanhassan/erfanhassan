"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FallingPattern } from "@/components/ui/falling-pattern";

const TypingEffect = ({ text, delay = 0, className = "" }: { text: string; delay?: number, className?: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, 15); // Fast typing speed
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [inView, text, delay]);

  return (
    <p ref={ref} className={className}>
      {displayedText}
      <span className="animate-pulse ml-1 text-green-400">|</span>
    </p>
  );
};

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative w-full bg-[#0a0a0a] pt-32 pb-40 md:pt-48 md:pb-56 px-6 md:px-12 lg:px-20 border-t border-white/[0.04] flex flex-col items-center overflow-hidden"
    >
      {/* Falling Pattern Background */}
      <div className="absolute inset-0 opacity-50 pointer-events-none z-0">
        <FallingPattern color="#4ade80" backgroundColor="#0a0a0a" />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center" style={{ paddingTop: '160px' }} ref={ref}>
          {/* ── About Me ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center mb-24 md:mb-32"
          >
            <h2
              className="font-normal leading-tight text-[#e8ff47] mb-20"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              <span className="font-bold text-[#f0f0f0]">The guy</span> behind the code
            </h2>

            {/* Terminal-like text block with huge top and bottom margins */}
            <div 
              className="text-green-400 font-mono font-medium drop-shadow-[0_0_8px_rgba(74,222,128,0.3)]"
              style={{
                marginTop: "120px",
                marginBottom: "160px",
                paddingLeft: "24px",
                paddingRight: "24px",
                width: "100%",
                maxWidth: "768px",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "justify",
                lineHeight: "2"
              }}
            >
              <TypingEffect 
                text="A lot of developers only know how to write code. But because I have an engineering degree and a background working as a Data Analyst for Dolby and Uber, I look at things through a business lens. I also know what it is like to be in your shoes. I founded my own company called Mizu, which was eventually acquired by a major FMCG brand. Today, I run the best AI automation agency in Bangladesh, spending all my time solving expensive business problems as an experienced AI developer."
                delay={0.2}
                className="mb-16 min-h-[160px] md:min-h-[140px]"
              />
              <TypingEffect 
                text="But life is not just about work. The whole reason I love building automated systems is that it gives us our time back. Since my businesses run themselves, I am usually traveling the world. When I am not building custom AI automation solutions or looking at startup pitches, you will probably find me riding my motorcycles, exploring a new city, or trying to find the absolute best plate of biryani on earth."
                delay={5.5}
                className="min-h-[140px] md:min-h-[100px]"
              />
            </div>
          </motion.div>


      </div>
    </section>
  );
}
