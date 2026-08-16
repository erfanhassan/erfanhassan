"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Send, Heart, User, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
  id: string;
  name: string;
  avatarColor: string;
  text: string;
  date: string;
  likes: number;
  likedByUser?: boolean;
}

interface BlogCommentsProps {
  postSlug: string;
}

const DEFAULT_COMMENTS: Comment[] = [
  {
    id: "seed-1",
    name: "Tariq Mahmud",
    avatarColor: "#e8ff47",
    text: "The cost breakdown and multi-agent workflow architecture are spot on. We were spending hours on manual operations before implementing custom AI agents.",
    date: "2 days ago",
    likes: 12,
  },
  {
    id: "seed-2",
    name: "Sarah Jenkins",
    avatarColor: "#85b6ff",
    text: "Great insights on DeepSeek unit economics vs legacy LLMs. Really clean and practical blueprint.",
    date: "1 day ago",
    likes: 7,
  },
];

const AVATAR_COLORS = ["#e8ff47", "#85b6ff", "#fca5a5", "#c4b5fd", "#6ee7b7", "#f472b6"];

export default function BlogComments({ postSlug }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    // Safely load comments from localStorage
    try {
      const storageKey = `comments_${postSlug}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setComments(parsed);
          return;
        }
      }
      setComments(DEFAULT_COMMENTS);
    } catch {
      setComments(DEFAULT_COMMENTS);
    }
  }, [postSlug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!text.trim()) {
      setError("Please write your comment.");
      return;
    }

    setIsSubmitting(true);

    const newComment: Comment = {
      id: `c_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      avatarColor: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
      text: text.trim(),
      date: "Just now",
      likes: 1,
      likedByUser: true,
    };

    const updated = [newComment, ...comments];
    setComments(updated);

    try {
      localStorage.setItem(`comments_${postSlug}`, JSON.stringify(updated));
    } catch (err) {
      console.warn("Could not save to localStorage", err);
    }

    setName("");
    setText("");
    setIsSubmitting(false);
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 4000);
  };

  const handleLike = (id: string) => {
    const updated = comments.map((c) => {
      if (c.id === id) {
        const liked = !c.likedByUser;
        return {
          ...c,
          likes: liked ? c.likes + 1 : Math.max(0, c.likes - 1),
          likedByUser: liked,
        };
      }
      return c;
    });
    setComments(updated);
    try {
      localStorage.setItem(`comments_${postSlug}`, JSON.stringify(updated));
    } catch {}
  };

  return (
    <section className="mt-16 pt-12 border-t border-white/[0.08]" id="comments">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#e8ff47]/10 border border-[#e8ff47]/20 text-[#e8ff47]">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#f5f5f5]">Discussion &amp; Feedback</h3>
            <p className="text-xs text-[#888]">Share your thoughts, experiences, or ask questions</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-[#888] bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/[0.06]">
          {comments.length} Comments
        </span>
      </div>

      {/* Form Box */}
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 rounded-3xl bg-[#111111]/90 border border-white/[0.08] backdrop-blur-md space-y-5 mb-10 shadow-2xl"
      >
        <h4 className="text-sm font-semibold text-[#e5e7eb] flex items-center gap-2">
          <span>Leave a Comment</span>
        </h4>

        {error && (
          <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label htmlFor="commenter-name" className="block text-xs font-medium text-[#999] mb-2">
            Your Name / Title <span className="text-[#e8ff47]">*</span>
          </label>
          <div className="relative">
            <input
              id="commenter-name"
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Alex Rivera, Tech Founder"
              className="w-full bg-[#0a0a0a] border border-white/[0.08] focus:border-[#e8ff47]/60 rounded-xl px-4 py-3 text-sm text-[#f5f5f5] placeholder-[#555] outline-none transition-colors"
            />
            <User className="absolute right-3.5 top-3.5 w-4 h-4 text-[#555] pointer-events-none" />
          </div>
        </div>

        <div>
          <label htmlFor="comment-text" className="block text-xs font-medium text-[#999] mb-2">
            Your Comment / Thoughts <span className="text-[#e8ff47]">*</span>
          </label>
          <textarea
            id="comment-text"
            required
            rows={3}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError("");
            }}
            placeholder="What are your thoughts on this AI automation strategy?"
            className="w-full bg-[#0a0a0a] border border-white/[0.08] focus:border-[#e8ff47]/60 rounded-xl p-4 text-sm text-[#f5f5f5] placeholder-[#555] outline-none transition-colors resize-y min-h-[100px]"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <AnimatePresence>
            {submittedSuccess && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-xs text-[#e8ff47]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-medium">Comment posted successfully!</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isSubmitting}
            className="ml-auto inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold text-black bg-[#e8ff47] hover:bg-[#c8ff00] hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(232,255,71,0.3)] cursor-pointer"
          >
            <span>Post Comment</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Comment Stream */}
      <div className="space-y-4">
        {comments.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 sm:p-6 rounded-2xl bg-[#0f0f0f] border border-white/[0.05] flex gap-4 items-start shadow-sm"
          >
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-black shadow-inner"
              style={{ background: c.avatarColor }}
            >
              {c.name.slice(0, 2).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h5 className="text-sm font-bold text-[#f5f5f5] truncate">{c.name}</h5>
                <span className="text-[11px] text-[#666] flex-shrink-0">{c.date}</span>
              </div>

              <p className="text-sm text-[#bbb] leading-relaxed font-light mb-3 whitespace-pre-line">
                {c.text}
              </p>

              <button
                type="button"
                onClick={() => handleLike(c.id)}
                className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg border transition-all ${
                  c.likedByUser
                    ? "bg-red-500/10 text-red-400 border-red-500/30"
                    : "bg-white/[0.02] text-[#777] border-white/[0.05] hover:text-[#ddd] hover:bg-white/[0.05]"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${c.likedByUser ? "fill-red-400" : ""}`} />
                <span>{c.likes}</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
