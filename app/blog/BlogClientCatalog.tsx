"use client";

import React, { useState, useMemo } from "react";
import { BlogPost } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import { Search, Sparkles, Cpu, Layers, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogClientCatalogProps {
  initialPosts: BlogPost[];
}

export default function BlogClientCatalog({ initialPosts }: BlogClientCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<"all" | "automation" | "ecosystem">("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    initialPosts.forEach((post) => post.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [initialPosts]);

  // Filter posts based on search, track, and tag
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // Track match
      if (selectedTrack !== "all" && post.track !== selectedTrack) {
        return false;
      }
      // Tag match
      if (selectedTag && !post.tags.includes(selectedTag)) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = post.title.toLowerCase().includes(q);
        const inExcerpt = post.excerpt.toLowerCase().includes(q);
        const inTags = post.tags.some((t) => t.toLowerCase().includes(q));
        const inKeywords = post.seoKeywords.some((k) => k.toLowerCase().includes(q));
        return inTitle || inExcerpt || inTags || inKeywords;
      }
      return true;
    });
  }, [initialPosts, selectedTrack, selectedTag, searchQuery]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="w-full flex flex-col items-center">
      {/* ── 1. Page Header (Airy & Centered) ───────────────────────────── */}
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center space-y-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-[#e8ff47]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Daily AI Engineering &amp; Automation</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#f5f5f5] text-center leading-[1.15]"
        >
          AI Automation &amp;{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #e8ff47, #c8ff00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Insights
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-[#9da3af] font-light leading-relaxed text-center max-w-xl mx-auto"
        >
          Actionable blueprints on automating business workflows, slashing operational overhead by 70%, and adopting frontier AI models.
        </motion.p>
      </div>

      {/* ── 2. Prominent Search Bar (Separate Clean Row) ───────────────── */}
      <div className="w-full max-w-2xl mx-auto mb-8">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AI topics, tools, ROI blueprints, agents..."
            className="w-full bg-[#111111]/90 border border-white/[0.1] focus:border-[#e8ff47] focus:ring-2 focus:ring-[#e8ff47]/20 rounded-2xl pl-12 pr-10 py-4 text-sm text-[#f5f5f5] placeholder-[#666] outline-none transition-all shadow-xl backdrop-blur-md"
          />
          <Search className="absolute left-4 w-5 h-5 text-[#777] pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-[#999] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── 3. Category Filter Tabs (Spacious & Clear) ─────────────────── */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8 w-full">
        <button
          type="button"
          onClick={() => {
            setSelectedTrack("all");
            setSelectedTag(null);
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            selectedTrack === "all"
              ? "bg-[#e8ff47] text-black shadow-[0_0_20px_rgba(232,255,71,0.3)] scale-105"
              : "bg-[#111111]/80 text-[#888] hover:text-[#f0f0f0] border border-white/[0.06] hover:border-white/[0.15]"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>All Articles ({initialPosts.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedTrack("automation");
            setSelectedTag(null);
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            selectedTrack === "automation"
              ? "bg-[#e8ff47] text-black shadow-[0_0_20px_rgba(232,255,71,0.3)] scale-105"
              : "bg-[#111111]/80 text-[#888] hover:text-[#f0f0f0] border border-white/[0.06] hover:border-white/[0.15]"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Business Automation</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedTrack("ecosystem");
            setSelectedTag(null);
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            selectedTrack === "ecosystem"
              ? "bg-[#85b6ff] text-black shadow-[0_0_20px_rgba(79,142,255,0.3)] scale-105"
              : "bg-[#111111]/80 text-[#888] hover:text-[#f0f0f0] border border-white/[0.06] hover:border-white/[0.15]"
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>AI Tools &amp; Trends</span>
        </button>
      </div>

      {/* ── 4. Trending Tag Filters (Airy Pill Row) ─────────────────────── */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-20 max-w-2xl mx-auto">
          <span className="text-xs text-[#666] font-medium mr-1">Trending:</span>
          {allTags.slice(0, 7).map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(isSelected ? null : tag)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#e8ff47]/20 border-[#e8ff47] text-[#e8ff47]"
                    : "bg-white/[0.03] border-white/[0.06] text-[#888] hover:text-[#e0e0e0] hover:border-white/[0.15]"
                }`}
              >
                #{tag}
              </button>
            );
          })}
          {selectedTag && (
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className="text-[11px] text-[#e8ff47] underline underline-offset-4 ml-1 cursor-pointer"
            >
              Clear tag
            </button>
          )}
        </div>
      )}

      {/* ── 5. Articles Stream ─────────────────────────────────────────── */}
      {filteredPosts.length === 0 ? (
        <div className="w-full text-center py-20 bg-[#111111]/40 rounded-3xl border border-white/[0.06] p-10 space-y-4">
          <p className="text-lg text-[#ccc] font-medium">No articles found matching your criteria.</p>
          <p className="text-xs text-[#777]">Try searching for other terms or resetting your filters.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedTrack("all");
              setSelectedTag(null);
            }}
            className="mt-4 px-6 py-2.5 rounded-2xl text-xs font-bold bg-white/[0.08] hover:bg-white/[0.14] text-white transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="w-full space-y-24">
          {/* Featured Article Card */}
          {featuredPost && (
            <div className="w-full">
              <BlogCard post={featuredPost} featured={true} />
            </div>
          )}

          {/* Grid of Remaining Cards */}
          {remainingPosts.length > 0 && (
            <div className="w-full space-y-10">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <h3 className="text-2xl font-bold text-[#f5f5f5]">
                  Recent Blueprints &amp; Articles
                </h3>
                <span className="text-xs text-[#777] font-medium">
                  Showing {remainingPosts.length} article{remainingPosts.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimatePresence>
                  {remainingPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
