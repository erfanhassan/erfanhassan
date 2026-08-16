"use client";

import React, { useState, useEffect } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-[110] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#e8ff47] via-[#c8ff00] to-[#85b6ff] transition-all duration-75 ease-out shadow-[0_0_10px_rgba(232,255,71,0.8)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
