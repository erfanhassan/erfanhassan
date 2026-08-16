"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/lib/blog";
import DynamicBlogCover from "./DynamicBlogCover";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const [imgError, setImgError] = useState(false);
  const isEcosystem = post.track === "ecosystem";

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group relative rounded-3xl bg-[#111111]/90 border border-white/[0.08] hover:border-[#e8ff47]/40 transition-all duration-300 overflow-hidden shadow-2xl backdrop-blur-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 p-8 sm:p-10 lg:p-12 items-center">
          {/* Cover Area */}
          <div className="md:col-span-5 w-full">
            {post.coverImage && !imgError ? (
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.08]">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  unoptimized
                  onError={() => setImgError(true)}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <DynamicBlogCover
                category={post.category}
                track={post.track}
                readingTime={post.readingTime}
              />
            )}
          </div>

          {/* Text Content */}
          <div className="md:col-span-7 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                  style={{
                    background: isEcosystem ? "rgba(79, 142, 255, 0.15)" : "rgba(232, 255, 71, 0.15)",
                    color: isEcosystem ? "#93c5fd" : "#e8ff47",
                    border: isEcosystem ? "1px solid rgba(79, 142, 255, 0.3)" : "1px solid rgba(232, 255, 71, 0.3)",
                  }}
                >
                  Featured • {post.category}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-[#888]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.date}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#888]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readingTime}</span>
                </div>
              </div>

              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#f5f5f5] group-hover:text-[#e8ff47] transition-colors leading-[1.3] tracking-tight">
                  {post.title}
                </h2>
              </Link>

              <p className="text-[#a0a5ad] text-sm sm:text-base leading-[1.8] line-clamp-3 font-light">
                {post.excerpt}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/[0.06]">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] text-[#888] bg-white/[0.03] px-3 py-1 rounded-lg border border-white/[0.05]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-black px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 shadow-[0_0_25px_rgba(232,255,71,0.35)] cursor-pointer"
                style={{ background: "#e8ff47" }}
              >
                <span>Read Full Blueprint</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col justify-between rounded-3xl bg-[#111111]/80 border border-white/[0.06] hover:border-[#e8ff47]/30 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl backdrop-blur-md"
    >
      {/* Cover Image */}
      <div className="w-full">
        {post.coverImage && !imgError ? (
          <div className="relative w-full aspect-[16/9] overflow-hidden border-b border-white/[0.06]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              unoptimized
              onError={() => setImgError(true)}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <DynamicBlogCover
            category={post.category}
            track={post.track}
            readingTime={post.readingTime}
            className="rounded-b-none border-x-0 border-t-0"
          />
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-7 sm:p-8 justify-between space-y-6">
        <div className="space-y-3.5">
          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-[#888]">
            <span
              className="font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full"
              style={{
                background: isEcosystem ? "rgba(79, 142, 255, 0.12)" : "rgba(232, 255, 71, 0.12)",
                color: isEcosystem ? "#93c5fd" : "#e8ff47",
              }}
            >
              {post.category}
            </span>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime}
              </span>
            </div>
          </div>

          <Link href={`/blog/${post.slug}`} className="block pt-1">
            <h3 className="text-xl font-bold text-[#f5f5f5] group-hover:text-[#e8ff47] transition-colors line-clamp-2 leading-[1.4] tracking-tight">
              {post.title}
            </h3>
          </Link>

          <p className="text-[#999] text-xs sm:text-sm leading-[1.8] line-clamp-2 font-light">
            {post.excerpt}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-white/[0.04]">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-[#777] bg-white/[0.02] px-2.5 py-1 rounded-md border border-white/[0.04]"
              >
                #{tag}
              </span>
            ))}
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#e8ff47] group-hover:translate-x-1 transition-transform"
          >
            <span>Read</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
