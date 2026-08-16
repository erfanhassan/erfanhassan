import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import FloatingDock from "@/components/FloatingDock";
import Footer from "@/components/Footer";
import TableOfContents from "@/components/TableOfContents";
import BlogShare from "@/components/BlogShare";
import BlogComments from "@/components/BlogComments";
import DynamicBlogCover from "@/components/DynamicBlogCover";
import BlogMarkdownRenderer from "./BlogMarkdownRenderer";
import ReadingProgressBar from "./ReadingProgressBar";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  HelpCircle,
  ArrowUpRight,
} from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Erfan Hassan",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://erfanhassan.sonictch.com";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | Erfan Hassan`,
    description: post.excerpt,
    keywords: post.seoKeywords.length > 0 ? post.seoKeywords : post.tags,
    authors: [{ name: post.author }],
    creator: post.author,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@erfanhassan",
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && (p.track === post.track || p.category === post.category))
    .slice(0, 2);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://erfanhassan.sonictch.com";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  // Structured Data (JSON-LD) for Generative Engine Optimization (GEO/AEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteUrl}#website`,
          name: "Erfan Hassan - AI Automation Agency",
          url: siteUrl,
        },
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        mainEntityOfPage: postUrl,
        keywords: post.seoKeywords.join(", "),
        articleSection: post.category,
        author: {
          "@type": "Person",
          name: post.author,
          jobTitle: post.authorRole || "Lead AI Automation Architect",
          url: siteUrl,
        },
        publisher: {
          "@type": "Organization",
          name: "Erfan Hassan - AI Automation Agency",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/favicon.ico`,
          },
        },
      },
      ...(post.faqs && post.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${postUrl}#faq`,
              mainEntity: post.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="min-h-screen w-full bg-[#0a0a0a] text-[#f0f0f0] flex flex-col items-center justify-between selection:bg-[#e8ff47] selection:text-black overflow-x-hidden">
      {/* JSON-LD Script for Search & AI Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ReadingProgressBar />
      {/* Floating Navigation Dock */}
      <FloatingDock />

      {/* Main Centered Reading Layout with 220px top clearance */}
      <section
        className="w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-12 relative"
        style={{ paddingTop: "220px", paddingBottom: "160px" }}
      >
        {/* Glow Header Background */}
        <div
          className="absolute top-28 left-1/2 -translate-x-1/2 w-[850px] h-[400px] pointer-events-none opacity-20"
          style={{
            background:
              post.track === "ecosystem"
                ? "radial-gradient(ellipse at top, rgba(79,142,255,0.2) 0%, transparent 70%)"
                : "radial-gradient(ellipse at top, rgba(232,255,71,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Central Reading Column */}
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="w-full flex items-center justify-center gap-2.5 text-xs text-[#777] mb-14">
            <Link href="/" className="hover:text-[#eee] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blog" className="hover:text-[#eee] transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#aaa] truncate max-w-[200px] sm:max-w-md">{post.category}</span>
          </nav>

          {/* Article Header (Centered) */}
          <header className="w-full text-center flex flex-col items-center space-y-10 mb-20">
            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <span
                className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{
                  background:
                    post.track === "ecosystem"
                      ? "rgba(79, 142, 255, 0.15)"
                      : "rgba(232, 255, 71, 0.15)",
                  color: post.track === "ecosystem" ? "#93c5fd" : "#e8ff47",
                  border:
                    post.track === "ecosystem"
                      ? "1px solid rgba(79, 142, 255, 0.3)"
                      : "1px solid rgba(232, 255, 71, 0.3)",
                }}
              >
                {post.category}
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

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black text-[#f5f5f5] leading-[1.25] tracking-tight text-center max-w-3xl">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-base sm:text-lg md:text-xl text-[#9da3af] leading-relaxed font-light text-center max-w-2xl mx-auto">
              {post.excerpt}
            </p>

            {/* Author Card */}
            <div className="inline-flex items-center justify-between gap-6 p-4 px-6 rounded-3xl bg-[#111111]/80 border border-white/[0.08] backdrop-blur-sm shadow-xl">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-[#e8ff47] flex items-center justify-center font-black text-xs text-black shadow-[0_0_15px_rgba(232,255,71,0.25)]">
                  EH
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#f5f5f5]">{post.author}</h4>
                  <p className="text-[11px] text-[#888]">{post.authorRole || "Founder & AI Automation Architect"}</p>
                </div>
              </div>

              <Link
                href="/#contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-black hover:scale-105 transition-transform"
                style={{ background: "#e8ff47" }}
              >
                <span>Work With Us</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Cover Media */}
            {post.coverImage ? (
              <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/[0.08] mt-6 shadow-2xl">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full mt-6 shadow-2xl">
                <DynamicBlogCover
                  category={post.category}
                  track={post.track}
                  readingTime={post.readingTime}
                  className="aspect-[16/9]"
                />
              </div>
            )}
          </header>

          {/* Compact Table of Contents Accordion */}
          <div className="w-full mb-20">
            <TableOfContents content={post.content} />
          </div>

          {/* Main Article Body with Clean Typography & Generous Margins */}
          <div className="w-full space-y-20">
            <BlogMarkdownRenderer content={post.content} />

            {/* Structured FAQs Section */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="my-24 p-8 sm:p-12 rounded-3xl bg-[#111111]/90 border border-white/[0.08] space-y-8 shadow-2xl">
                <div className="flex items-center gap-3 pb-5 border-b border-white/[0.08]">
                  <div className="w-10 h-10 rounded-xl bg-[#e8ff47]/10 border border-[#e8ff47]/30 flex items-center justify-center text-[#e8ff47]">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#f5f5f5]">Frequently Asked Questions</h3>
                </div>

                <div className="space-y-6">
                  {post.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-[#0c0c0c] border border-white/[0.06] space-y-3"
                    >
                      <h4 className="text-base sm:text-lg font-semibold text-[#e8ff47]">{faq.question}</h4>
                      <p className="text-sm sm:text-base text-[#b0b4bc] leading-[1.85] font-light">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Social Share Box */}
            <BlogShare title={post.title} url={postUrl} className="my-20" />

            {/* High-Converting Lead Generation CTA */}
            <section className="my-24 p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#141414] via-[#111111] to-[#0a0a0a] border border-[#e8ff47]/30 relative overflow-hidden shadow-2xl text-center flex flex-col items-center">
              <div
                className="absolute -right-10 -bottom-10 w-60 h-60 pointer-events-none opacity-20"
                style={{
                  background:
                    "radial-gradient(circle, rgba(232,255,71,0.5) 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10 space-y-6 max-w-lg mx-auto flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8ff47]/10 text-[#e8ff47] text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Custom AI Automation Agency</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#f5f5f5] tracking-tight">
                  Want this automated for your business?
                </h3>

                <p className="text-sm sm:text-base text-[#9da3af] leading-relaxed font-light">
                  We build custom AI agents, automated workflow pipelines, and intelligent software to cut your operating expenses and reclaim your team&apos;s time.
                </p>

                <div className="pt-4">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs sm:text-sm font-bold text-black shadow-[0_0_30px_rgba(232,255,71,0.4)] hover:scale-105 transition-transform"
                    style={{ background: "#e8ff47" }}
                  >
                    <span>Book an AI Discovery Call</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Reader Discussion & Comments Section */}
            <BlogComments postSlug={post.slug} />
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="w-full mt-28 pt-16 border-t border-white/[0.08]">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-bold text-[#f5f5f5]">Continue Reading</h3>
                <Link
                  href="/blog"
                  className="text-xs font-bold text-[#e8ff47] hover:underline flex items-center gap-1"
                >
                  <span>All Articles</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((rPost) => (
                  <Link
                    key={rPost.slug}
                    href={`/blog/${rPost.slug}`}
                    className="group p-8 rounded-3xl bg-[#111111]/70 border border-white/[0.06] hover:border-[#e8ff47]/40 transition-all duration-300 space-y-4"
                  >
                    <span className="text-[10px] font-bold text-[#e8ff47] uppercase tracking-wider">
                      {rPost.category}
                    </span>
                    <h4 className="text-lg font-bold text-[#f5f5f5] group-hover:text-[#e8ff47] transition-colors line-clamp-2 leading-snug">
                      {rPost.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#888] line-clamp-2 font-light leading-relaxed">
                      {rPost.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back to Blog Link */}
          <div className="mt-20 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#888] hover:text-[#f5f5f5] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Blog Posts</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
