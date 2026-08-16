"use client";

import React, { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

interface BlogShareProps {
  title: string;
  url?: string;
  className?: string;
}

export default function BlogShare({ title, url, className = "" }: BlogShareProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (url) return url;
    if (typeof window !== "undefined") return window.location.href;
    return "https://erfanhassan.sonictch.com/blog";
  };

  const handleShareClick = (e: React.MouseEvent, shareUrl: string) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.open(shareUrl, "_blank", "width=600,height=500,scrollbars=yes,resizable=yes");
    }
  };

  const handleCopy = async () => {
    const currentUrl = getShareUrl();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = currentUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : (url || "");
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-[#111111]/90 border border-white/[0.08] backdrop-blur-md shadow-xl ${className}`}
    >
      <div className="flex items-center gap-2.5 text-sm text-[#ccc] font-medium">
        <Share2 className="w-4 h-4 text-[#e8ff47]" />
        <span>Share this insight:</span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {/* X / Twitter */}
        <button
          type="button"
          onClick={(e) =>
            handleShareClick(
              e,
              `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
            )
          }
          title="Share on X (Twitter)"
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#888] hover:bg-white/[0.08] hover:text-[#f5f5f5] hover:border-white/20 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        {/* LinkedIn */}
        <button
          type="button"
          onClick={(e) =>
            handleShareClick(
              e,
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
            )
          }
          title="Share on LinkedIn"
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#888] hover:bg-[#0077b5]/20 hover:text-[#0077b5] hover:border-[#0077b5]/40 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.32a1.64 1.64 0 0 0-1.66 1.64 1.63 1.63 0 0 0 1.66 1.63 1.63 1.63 0 0 0 1.65-1.63 1.64 1.64 0 0 0-1.65-1.64z" />
          </svg>
        </button>

        {/* WhatsApp */}
        <button
          type="button"
          onClick={(e) =>
            handleShareClick(
              e,
              `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`
            )
          }
          title="Share on WhatsApp"
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#888] hover:bg-[#25d366]/20 hover:text-[#25d366] hover:border-[#25d366]/40 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.2 0-.44.08-.66.32-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.13.17 1.73 2.65 4.2 3.72.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29s-1.47-.73-1.7-.81c-.23-.08-.4-.13-.56.13-.17.25-.66.81-.81.98-.15.17-.3.19-.55.07-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43z" />
          </svg>
        </button>

        {/* Facebook */}
        <button
          type="button"
          onClick={(e) =>
            handleShareClick(
              e,
              `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
            )
          }
          title="Share on Facebook"
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#888] hover:bg-[#1877f2]/20 hover:text-[#1877f2] hover:border-[#1877f2]/40 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
          </svg>
        </button>

        {/* Copy Link Button */}
        <button
          type="button"
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            copied
              ? "bg-[#e8ff47]/20 text-[#e8ff47] border-[#e8ff47]/60 shadow-[0_0_20px_rgba(232,255,71,0.3)]"
              : "bg-white/[0.04] text-[#ccc] border-white/[0.08] hover:border-[#e8ff47]/40 hover:text-[#e8ff47]"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#e8ff47]" />
              <span>Copied Link!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
