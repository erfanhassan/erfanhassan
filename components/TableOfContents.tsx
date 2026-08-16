"use client";

import React, { useState, useEffect } from "react";
import { List, ChevronDown } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Extract H2 and H3 from markdown
    const lines = content.split("\n");
    const extracted: TocItem[] = [];

    lines.forEach((line) => {
      const h2Match = line.match(/^##\s+(.+)$/);
      const h3Match = line.match(/^###\s+(.+)$/);

      if (h2Match) {
        const text = h2Match[1].replace(/[#*`_]/g, "").trim();
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        if (text && !text.toLowerCase().includes("frequently asked")) {
          extracted.push({ id, text, level: 2 });
        }
      } else if (h3Match) {
        const text = h3Match[1].replace(/[#*`_]/g, "").trim();
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        if (text) {
          extracted.push({ id, text, level: 3 });
        }
      }
    });

    setHeadings(extracted);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="rounded-2xl bg-[#111111]/80 border border-white/[0.08] backdrop-blur-md overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-xs font-bold text-[#e8ff47] uppercase tracking-wider hover:bg-white/[0.02] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <List className="w-4 h-4" />
          <span>Table of Contents ({headings.length} Sections)</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul className="px-5 pb-5 pt-1 space-y-1.5 text-xs border-t border-white/[0.04]">
          {headings.map((h) => (
            <li
              key={h.id}
              style={{ paddingLeft: h.level === 3 ? "14px" : "0px" }}
            >
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(h.id);
                  if (target) {
                    const offset = 90;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = target.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    });
                  }
                }}
                className="block py-1 text-[#888] hover:text-[#e8ff47] transition-colors leading-relaxed"
              >
                {h.level === 3 ? "↳ " : "• "} {h.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
