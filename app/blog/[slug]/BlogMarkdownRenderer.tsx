"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Check, Copy, Info } from "lucide-react";

interface BlogMarkdownRendererProps {
  content: string;
}

const CodeBlock = ({ className, children, node, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || "");
  const [copied, setCopied] = useState(false);
  const codeString = String(children).replace(/\n$/, "");
  
  // ReactMarkdown v9+ removes the `inline` prop. We detect inline code by checking 
  // if it lacks a language match AND doesn't have any newlines.
  const isInline = !match && !String(children).includes("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isInline) {
    return (
      <code className="px-1.5 py-0.5 rounded-md bg-[#1a1a1a] text-[#e8ff47] font-mono text-sm border border-white/[0.08]" {...props}>
        {children}
      </code>
    );
  }

  return (
    <div className="relative my-10 rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl bg-[#0a0a0a] group">
      {/* Mac-style Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#111111] border-b border-white/[0.04]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        
        {match && match[1] && (
          <span className="text-xs font-mono text-[#666] uppercase tracking-wider">
            {match[1]}
          </span>
        )}

        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs text-[#888] hover:text-[#e8ff47] bg-white/[0.05] hover:bg-white/[0.1] px-2.5 py-1 rounded-md"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      
      {/* Syntax Highlighted Code */}
      <div className="text-sm font-mono leading-relaxed">
        <SyntaxHighlighter
          style={vscDarkPlus as any}
          language={match ? match[1] : "text"}
          PreTag="div"
          customStyle={{ margin: 0, padding: "1.5rem", background: "transparent" }}
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default function BlogMarkdownRenderer({ content }: BlogMarkdownRendererProps) {
  return (
    <article className="w-full text-[#d0d0d0] leading-loose text-lg font-light">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#f0f0f0] tracking-tight mt-10 mb-6 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => {
            const text = String(children);
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
            return (
              <h2
                id={id}
                className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-12 mb-6 pb-3 border-b border-white/[0.06] flex items-center gap-3 group scroll-mt-28 relative"
              >
                <a href={`#${id}`} className="absolute -left-8 opacity-0 group-hover:opacity-100 transition-opacity text-[#e8ff47]/60 hover:text-[#e8ff47]">
                  #
                </a>
                <span>{children}</span>
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = String(children);
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
            return (
              <h3
                id={id}
                className="text-xl sm:text-2xl font-bold text-[#e0e0e0] mt-8 mb-4 scroll-mt-28 flex items-center gap-2 group relative"
              >
                <a href={`#${id}`} className="absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity text-[#e8ff47]/50 hover:text-[#e8ff47] text-lg">
                  #
                </a>
                {children}
              </h3>
            );
          },
          p: ({ children }) => (
            <p className="text-base sm:text-[1.1rem] text-[#b0b4bc] leading-[1.8] mb-8 font-light">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-[#f5f5f5] text-inherit">
              {children}
            </strong>
          ),
          ul: ({ children }) => (
            <ul className="list-none space-y-4 my-8 pl-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-4 my-8 text-[#b0b4bc] pl-4 text-base sm:text-[1.1rem]">
              {children}
            </ol>
          ),
          li: ({ children, className }) => {
            // Check if it's in a UL or OL
            return (
              <li className="relative pl-6 leading-[1.8] text-[#c4c4c4] text-base sm:text-[1.1rem]">
                {/* Custom bullet dot for ULs */}
                <span className="absolute left-0 top-[11px] w-2 h-2 rounded-full bg-[#e8ff47]/40 border border-[#e8ff47]/60" />
                {children}
              </li>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="my-10 rounded-2xl bg-gradient-to-r from-[#e8ff47]/5 to-transparent border-l-4 border-[#e8ff47] p-6 sm:p-8 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[#111111]/30 backdrop-blur-sm -z-10" />
              <div className="flex gap-4 items-start">
                <Info className="w-6 h-6 text-[#e8ff47] shrink-0 mt-0.5" />
                <div className="text-[#e0e0e0] text-base sm:text-lg italic font-medium leading-relaxed [&>p]:mb-0">
                  {children}
                </div>
              </div>
            </blockquote>
          ),
          code: CodeBlock,
          table: ({ children }) => (
            <div className="overflow-x-auto my-12 rounded-2xl border border-white/[0.08] bg-[#0c0c0c] shadow-2xl">
              <table className="w-full text-left text-sm sm:text-base text-[#ccc] border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#141414] text-[#e8ff47] uppercase text-[11px] font-bold tracking-widest border-b border-white/[0.08]">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-white/[0.05]">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-white/[0.02] transition-colors">{children}</tr>
          ),
          th: ({ children }) => <th className="p-4 font-bold whitespace-nowrap">{children}</th>,
          td: ({ children }) => <td className="p-4 font-light leading-relaxed">{children}</td>,
          hr: () => <hr className="my-16 border-white/[0.06]" />,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-[#e8ff47] decoration-[#e8ff47]/30 hover:decoration-[#e8ff47] underline underline-offset-4 transition-colors font-medium"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
