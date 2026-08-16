import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogMarkdownRendererProps {
  content: string;
}

export default function BlogMarkdownRenderer({ content }: BlogMarkdownRendererProps) {
  return (
    <article className="prose prose-invert max-w-none space-y-6 text-[#d0d0d0] leading-relaxed text-base font-light">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#f0f0f0] tracking-tight mt-10 mb-4 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => {
            const text = String(children);
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "");
            return (
              <h2
                id={id}
                className="text-2xl sm:text-3xl font-bold text-[#f0f0f0] tracking-tight mt-12 mb-4 pb-2 border-b border-white/[0.06] flex items-center gap-2 group scroll-mt-28"
              >
                <span className="text-[#e8ff47] opacity-60">#</span>
                <span>{children}</span>
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = String(children);
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "");
            return (
              <h3
                id={id}
                className="text-xl sm:text-2xl font-bold text-[#e0e0e0] mt-8 mb-3 scroll-mt-28"
              >
                {children}
              </h3>
            );
          },
          p: ({ children }) => (
            <p className="text-base sm:text-lg text-[#b8b8b8] leading-relaxed mb-4 font-light">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-[#f0f0f0] text-inherit">
              {children}
            </strong>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 my-4 text-[#b8b8b8] pl-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 my-4 text-[#b8b8b8] pl-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed text-[#c4c4c4]">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="p-4 my-6 rounded-2xl bg-[#141414] border-l-4 border-[#e8ff47] text-[#e0e0e0] italic shadow-inner">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className && typeof children === "string" && !children.includes("\n");
            if (isInline) {
              return (
                <code
                  className="px-2 py-0.5 rounded-md bg-[#161616] text-[#e8ff47] font-mono text-xs border border-white/[0.08]"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <pre className="p-5 my-6 rounded-2xl bg-[#0d0d0d] border border-white/[0.08] overflow-x-auto text-xs sm:text-sm font-mono text-[#4ade80] leading-relaxed shadow-2xl">
                <code>{children}</code>
              </pre>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-8 rounded-2xl border border-white/[0.08] bg-[#0e0e0e] shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm text-[#ccc] border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#161616] text-[#e8ff47] uppercase text-[11px] font-bold tracking-wider border-b border-white/[0.08]">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-white/[0.05]">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-white/[0.02] transition-colors">{children}</tr>
          ),
          th: ({ children }) => <th className="p-3.5 font-bold">{children}</th>,
          td: ({ children }) => <td className="p-3.5 font-light">{children}</td>,
          hr: () => <hr className="my-10 border-white/[0.06]" />,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-[#e8ff47] underline underline-offset-4 hover:text-[#c8ff00] transition-colors font-medium"
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
