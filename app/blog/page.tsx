import React from "react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogClientCatalog from "./BlogClientCatalog";
import FloatingDock from "@/components/FloatingDock";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI Automation Insights & Engineering Blog | Erfan Hassan",
  description:
    "Daily actionable blueprints, cost-reduction frameworks, and cutting-edge breakdowns of AI agents, LLMs, and business workflow automation by Erfan Hassan.",
  keywords: [
    "AI automation blog",
    "business workflow automation",
    "custom AI agents",
    "DeepSeek AI benchmarks",
    "AI cost reduction",
    "Erfan Hassan AI",
    "Generative Engine Optimization",
    "AI developer insights",
  ],
  openGraph: {
    title: "AI Automation Insights & Engineering Blog | Erfan Hassan",
    description:
      "Daily actionable blueprints, cost-reduction frameworks, and breakdowns of custom AI agents and workflow automation.",
    url: "https://erfanhassan.sonictch.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Insights & Engineering Blog | Erfan Hassan",
    description:
      "Actionable blueprints on how AI automation reduces business overhead by up to 70%.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen w-full bg-[#0a0a0a] text-[#f0f0f0] flex flex-col items-center justify-between selection:bg-[#e8ff47] selection:text-black overflow-x-hidden">
      {/* Floating Navigation Dock */}
      <FloatingDock />

      {/* Main Centered Content Section with 220px top clearance from dock */}
      <section 
        className="w-full flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 relative"
        style={{ paddingTop: "220px", paddingBottom: "160px" }}
      >
        {/* Glow Header Background */}
        <div
          className="absolute top-28 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none opacity-25"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(232,255,71,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="w-full max-w-5xl mx-auto flex flex-col items-center relative z-10">
          <BlogClientCatalog initialPosts={posts} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
