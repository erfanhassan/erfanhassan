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
    return url || "https://erfanhassan.sonictch.com/blog";
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

  const currentUrl = url || "https://erfanhassan.sonictch.com/blog";
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
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on X (Twitter)"
          className="w-10 h-10 rounded-full border border-white/[0.08] bg-[#0c0c0c] hover:bg-[#141414] hover:border-white/[0.2] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
        >
          <span className="text-sm font-bold text-[#888] group-hover:text-white transition-colors">
            X
          </span>
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on LinkedIn"
          className="w-10 h-10 rounded-full border border-white/[0.08] bg-[#0c0c0c] hover:bg-[#141414] hover:border-[#0a66c2]/50 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
        >
          <svg
            className="w-4 h-4 text-[#888] group-hover:text-[#0a66c2] transition-colors"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url || getShareUrl()}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on WhatsApp"
          className="w-10 h-10 rounded-full border border-white/[0.08] bg-[#0c0c0c] hover:bg-[#141414] hover:border-[#25D366]/50 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
        >
          <svg
            className="w-4 h-4 text-[#888] group-hover:text-[#25D366] transition-colors"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12.031 0C5.385 0 0 5.388 0 12.035c0 2.126.551 4.198 1.603 6.02L.15 23.364l5.441-1.428A11.966 11.966 0 0012.03 24c6.646 0 12.032-5.388 12.032-12.035C24.062 5.388 18.677 0 12.031 0zm3.805 17.202c-.173.493-.996.963-1.42 1.011-.424.048-.936.143-2.996-.713-2.474-1.026-4.053-3.565-4.175-3.731-.122-.166-1.004-1.336-1.004-2.545 0-1.21.624-1.803.844-2.046.22-.243.483-.304.643-.304.16 0 .319.004.458.01.14.006.326-.056.51.396.183.45.626 1.536.682 1.65.056.114.094.246.012.41-.082.164-.124.267-.248.414-.124.148-.261.32-.375.45-.125.143-.255.302-.112.551.143.249.638 1.056 1.365 1.706.94.84 1.737 1.1 1.986 1.218.249.118.396.096.541-.073.146-.169.625-.728.793-.979.168-.25.337-.208.563-.122.226.086 1.433.676 1.677.798.244.122.406.183.466.286.06.103.06.594-.113 1.087z" />
          </svg>
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on Facebook"
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#888] hover:bg-[#1877f2]/20 hover:text-[#1877f2] hover:border-[#1877f2]/40 transition-all group"
        >
          <svg className="w-4 h-4 fill-current transition-colors" viewBox="0 0 24 24">
            <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
          </svg>
        </a>

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
