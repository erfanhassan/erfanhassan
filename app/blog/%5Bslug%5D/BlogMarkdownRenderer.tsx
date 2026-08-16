import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogMarkdownRendererProps {
  content: string;
}

export default function BlogMarkdownRenderer({ content }: BlogMarkdownRendererProps) {
  return (
    <article className="prose prose-invert max-w-none text-[#d6d9df] font-light text-[18px] leading-[2.05]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl sm:text-4xl md:text-[38px] font-black text-[#f5f5f5] tracking-tight mt-16 mb-8 first:mt-0 leading-tight">
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
                className="text-2xl sm:text-3xl font-bold text-[#f5f5f5] tracking-tight mt-20 mb-8 pt-8 border-t border-white/[0.08] scroll-mt-32 leading-snug"
              >
                {children}
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
                className="text-xl sm:text-2xl font-bold text-[#e5e7eb] mt-14 mb-6 scroll-mt-32 leading-snug"
              >
                {children}
              </h3>
            );
          },
          h4: ({ children }) => (
            <h4 className="text-lg font-bold text-[#d1d5db] mt-10 mb-4">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-[18px] text-[#cfd3db] leading-[2.05] mb-8 font-normal">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-[#f8f9fa]">
              {children}
            </strong>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside space-y-4 my-8 pl-8 text-[#cfd3db]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside space-y-4 my-8 pl-8 text-[#cfd3db]">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-[1.9] text-[#cfd3db] pl-2">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-12 p-8 rounded-3xl bg-[#121212] border-l-4 border-[#e8ff47] text-[#e5e7eb] italic text-lg leading-relaxed shadow-xl">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className && typeof children === "string" && !children.includes("\n");
            if (isInline) {
              return (
                <code
                  className="px-2.5 py-1 rounded-lg bg-[#181818] text-[#e8ff47] font-mono text-xs sm:text-sm border border-white/[0.08]"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <div className="my-10 rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0a0a0a] shadow-2xl">
                <div className="flex items-center justify-between px-5 py-3 bg-[#141414] border-b border-white/[0.06] text-xs font-mono text-[#888]">
                  <span>Workflow Architecture / Code</span>
                </div>
                <pre className="p-6 overflow-x-auto text-xs sm:text-sm font-mono text-[#4ade80] leading-relaxed">
                  <code>{children}</code>
                </pre>
              </div>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-12 rounded-3xl border border-white/[0.08] bg-[#0e0e0e] shadow-2xl">
              <table className="w-full text-left text-sm sm:text-base text-[#d1d5db] border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#161616] text-[#e8ff47] uppercase text-xs font-bold tracking-wider border-b border-white/[0.08]">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-white/[0.06]">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-white/[0.02] transition-colors">{children}</tr>
          ),
          th: ({ children }) => <th className="px-6 py-4 font-bold">{children}</th>,
          td: ({ children }) => <td className="px-6 py-4 font-normal text-[#b8bcc4]">{children}</td>,
          hr: () => <hr className="my-16 border-white/[0.08]" />,
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
