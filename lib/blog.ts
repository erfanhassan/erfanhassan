import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOGS_DIR = path.join(process.cwd(), "content/blogs");

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  author: string;
  authorRole?: string;
  excerpt: string;
  coverImage?: string;
  track: "automation" | "ecosystem";
  category: string;
  tags: string[];
  readingTime: string;
  published: boolean;
  seoKeywords: string[];
  faqs?: FAQItem[];
  content: string;
}

function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function extractFaqsFromContent(content: string): FAQItem[] {
  const faqs: FAQItem[] = [];
  const faqSectionMatch = content.match(/## Frequently Asked Questions[\s\S]*?(?=##|$)/i);
  if (!faqSectionMatch) return faqs;

  const faqText = faqSectionMatch[0];
  const qMatches = [...faqText.matchAll(/### (?:Q:\s*|\d+\.\s*)?([^\n]+)\n+([\s\S]*?)(?=(?:###|$))/g)];

  for (const match of qMatches) {
    const question = match[1].trim().replace(/^Q:\s*/i, "");
    const answer = match[2].trim();
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  return faqs;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOGS_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(BLOGS_DIR);
  const posts: BlogPost[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith(".md") && !fileName.endsWith(".mdx")) continue;

    const fullPath = path.join(BLOGS_DIR, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    if (data.published === false) continue;

    const slug = data.slug || fileName.replace(/\.mdx?$/, "");
    const readingTime = data.readingTime || calculateReadingTime(content);
    const faqs = data.faqs || extractFaqsFromContent(content);

    posts.push({
      title: data.title || "Untitled Post",
      slug,
      date: data.date ? new Date(data.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      author: data.author || "Erfan Hassan",
      authorRole: data.authorRole || "AI Automation Architect & Lead Developer",
      excerpt: data.excerpt || content.slice(0, 160).replace(/[#*`_]/g, "") + "...",
      coverImage: data.coverImage || "",
      track: data.track === "ecosystem" ? "ecosystem" : "automation",
      category: data.category || (data.track === "ecosystem" ? "AI Ecosystem & Tools" : "Business Automation"),
      tags: Array.isArray(data.tags) ? data.tags : ["AI Automation", "AI Agents"],
      readingTime,
      published: data.published !== false,
      seoKeywords: Array.isArray(data.seoKeywords) ? data.seoKeywords : [],
      faqs,
      content,
    });
  }

  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet);
}

export function getPostsByTrack(track: "automation" | "ecosystem"): BlogPost[] {
  return getAllPosts().filter((post) => post.track === track);
}
