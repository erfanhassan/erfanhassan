"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";


export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative bg-[#0a0a0a] border-t border-white/[0.04] px-6 md:px-12 lg:px-20 pt-40 md:pt-56 pb-12 md:pb-20 overflow-hidden"
    >
      {/* Radial glow background */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom, rgba(232,255,71,0.04) 0%, transparent 60%)",
        }}
      />

      <div 
        className="relative z-10"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          maxWidth: "896px",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        {/* CTA Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginBottom: "120px"
          }}
        >
          
          <h2
            className="font-black leading-tight"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "#f0f0f0", letterSpacing: "-0.02em", marginBottom: "32px", textAlign: "center" }}
          >
            Ready to get your{" "}
            <span
              className="block"
              style={{
                background: "linear-gradient(90deg, #e8ff47, #c8ff00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              time back?
            </span>
          </h2>
          
          <p 
            className="text-[#888] font-light leading-relaxed text-lg md:text-xl max-w-2xl"
            style={{ margin: "0 auto 48px auto", textAlign: "center", width: "100%" }}
          >
            Whether you need a custom AI agent built from scratch or you just want to automate your boring daily tasks, I would love to hear from you. We can talk about AI strategy, or we can just argue about which city has the best food.
          </p>

          <motion.a
            href="mailto:erfan@avahealthai.com"
            id="footer-email-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-black font-black text-sm md:text-base tracking-wide"
            style={{ background: "#e8ff47", letterSpacing: "0.04em" }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(232,255,71,0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-black/40" />
            Let&apos;s Talk AI &amp; Biriyani
            <span className="ml-2">→</span>
          </motion.a>
        </motion.div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-12" />

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center justify-center w-full"
        >
          {/* Logo + copyright */}
          <div className="flex items-center gap-3">
            <span className="text-[#555] text-sm">
              © {new Date().getFullYear()} Erfan. All rights reserved.
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
