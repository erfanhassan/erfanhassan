import React from "react";
import { Sparkles, Cpu, Bot, Workflow, BarChart3, ShieldCheck } from "lucide-react";

interface DynamicBlogCoverProps {
  title?: string;
  category: string;
  track: "automation" | "ecosystem";
  readingTime?: string;
  className?: string;
}

export default function DynamicBlogCover({
  category,
  track,
  readingTime,
  className = "",
}: DynamicBlogCoverProps) {
  const isEcosystem = track === "ecosystem";

  return (
    <div
      className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0c0c] flex flex-col justify-between p-6 sm:p-7 select-none group-hover:border-[#e8ff47]/30 transition-colors duration-300 ${className}`}
    >
      {/* Background Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50 transition-opacity duration-500 group-hover:opacity-75"
        style={{
          background: isEcosystem
            ? "radial-gradient(circle at 75% 25%, rgba(79, 142, 255, 0.18), transparent 55%), radial-gradient(circle at 20% 80%, rgba(232, 255, 71, 0.08), transparent 60%)"
            : "radial-gradient(circle at 75% 25%, rgba(232, 255, 71, 0.18), transparent 55%), radial-gradient(circle at 20% 80%, rgba(200, 255, 0, 0.06), transparent 60%)",
        }}
      />

      {/* Modern Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top Bar: Category & Read Time */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase"
          style={{
            background: isEcosystem ? "rgba(79, 142, 255, 0.12)" : "rgba(232, 255, 71, 0.12)",
            color: isEcosystem ? "#93c5fd" : "#e8ff47",
            border: isEcosystem ? "1px solid rgba(79, 142, 255, 0.25)" : "1px solid rgba(232, 255, 71, 0.25)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: isEcosystem ? "#93c5fd" : "#e8ff47" }}
          />
          {category}
        </span>

        {readingTime && (
          <span className="text-[11px] text-[#777] font-medium tracking-wide">
            {readingTime}
          </span>
        )}
      </div>

      {/* Center Minimalist Visual Illustration (No clutter text) */}
      <div className="relative z-10 my-auto flex items-center justify-center py-4">
        <div className="relative flex items-center justify-center">
          {/* Outer glow ring */}
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-white/[0.08] flex items-center justify-center backdrop-blur-md shadow-2xl transition-transform duration-500 group-hover:scale-110"
            style={{
              background: isEcosystem
                ? "linear-gradient(135deg, rgba(79,142,255,0.1), rgba(0,0,0,0.4))"
                : "linear-gradient(135deg, rgba(232,255,71,0.1), rgba(0,0,0,0.4))",
            }}
          >
            {isEcosystem ? (
              <Cpu className="w-9 h-9 sm:w-10 sm:h-10 text-[#85b6ff]" />
            ) : (
              <Bot className="w-9 h-9 sm:w-10 sm:h-10 text-[#e8ff47]" />
            )}
          </div>

          {/* Floating mini badges */}
          <div className="absolute -top-2 -right-4 p-1.5 rounded-lg bg-[#141414] border border-white/[0.1] shadow-lg">
            {isEcosystem ? (
              <Sparkles className="w-3.5 h-3.5 text-[#85b6ff]" />
            ) : (
              <Workflow className="w-3.5 h-3.5 text-[#e8ff47]" />
            )}
          </div>

          <div className="absolute -bottom-2 -left-4 p-1.5 rounded-lg bg-[#141414] border border-white/[0.1] shadow-lg">
            {isEcosystem ? (
              <BarChart3 className="w-3.5 h-3.5 text-[#999]" />
            ) : (
              <ShieldCheck className="w-3.5 h-3.5 text-[#999]" />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Watermark Bar */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#e8ff47]/20 border border-[#e8ff47]/40 flex items-center justify-center text-[9px] font-black text-[#e8ff47]">
            EH
          </div>
          <span className="text-[11px] text-[#777] font-medium">Erfan Hassan</span>
        </div>
        <span className="text-[10px] text-[#555] font-mono tracking-wider">AI AUTOMATION</span>
      </div>
    </div>
  );
}
