import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const BLOGS_DIR = path.join(ROOT_DIR, "content", "blogs");

// Ensure blogs directory exists
if (!fs.existsSync(BLOGS_DIR)) {
  fs.mkdirSync(BLOGS_DIR, { recursive: true });
}

// Load env variables if present
function loadEnv() {
  const envPath = path.join(ROOT_DIR, ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    for (const line of envContent.split("\n")) {
      const match = line.match(/^\s*([\w_]+)\s*=\s*(.*)?\s*$/);
      if (match && !process.env[match[1]]) {
        let val = (match[2] || "").trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        process.env[match[1]] = val;
      }
    }
  }
}
loadEnv();

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "sk-84182eb734da4d52b911d7d7030fc1d2";

if (!DEEPSEEK_API_KEY) {
  console.error("❌ Error: DEEPSEEK_API_KEY is not defined.");
  process.exit(1);
}

// Parse track argument: --track=automation or --track=ecosystem
let selectedTrack = "automation";
for (const arg of process.argv.slice(2)) {
  if (arg.startsWith("--track=")) {
    selectedTrack = arg.split("=")[1].toLowerCase();
  }
}

// Topic angle generators
const AUTOMATION_TOPIC_ANGLES = [
  "How AI Agents Reduce Customer Support Costs by 80% for E-Commerce Brands",
  "Automating Medical Patient Triage & Clinical Notes with Custom AI: A Cost-Benefit Guide",
  "How Real Estate Agencies 5x Inbound Lead Conversions Using Autonomous AI Bots",
  "The Hidden Costs of Manual Data Entry: How AI Document Parsing Saves 20+ Hours a Week",
  "Automating Financial Invoicing, Reconciliation & Expense Audits with Deep Reasoning LLMs",
  "How B2B Agencies Can Scale Client Operations Without Hiring More Account Managers",
  "AI Workflow Automation in Logistics & Supply Chain: Cutting Dispatch Latency to Seconds",
  "Custom AI Agents vs. Zapier & Make: Why Serious Businesses Build Bespoke Agent Infrastructure",
  "Automated Lead Qualification & CRM Sync: How to Never Lose a High-Value Prospect Again",
  "How Legal Practices & Contract Teams Speed Up Document Reviews by 75% with Custom AI",
  "Building an Autonomous 24/7 Sales Agent: Architecture, Guardrails, and Conversion Strategy",
  "The Complete Executive Guide to Calculating the ROI of AI Automation in 2026",
  "How Healthcare Clinics Automate Appointment Booking, Insurance Verification, and Follow-ups",
  "Automating Email Overload: How AI Executive Assistants Sort, Draft, and Escalate Priority Tasks",
  "Scaling SaaS Customer Onboarding with Interactive Multi-Agent AI Workflows"
];

const ECOSYSTEM_TOPIC_ANGLES = [
  "DeepSeek V3 & R1 vs. Claude 3.7 vs. GPT-4o: The Ultimate Cost & Performance Benchmark for Businesses",
  "The Rise of Autonomous Multi-Agent Swarms: LangGraph, AutoGen, and the 2026 Developer Blueprint",
  "Top 10 High-ROI AI Tools Every Business Founder Should Integrate in 2026",
  "How to Invest in AI Technology Without Wasting Budget on Overhyped SaaS Wrappers",
  "AI Marketing Mastery: How Modern Companies Generate Hyper-Personalized Campaigns at Scale",
  "The Future of Voice AI Agents: Real-Time Phone Support with Sub-300ms Latency",
  "Why Open-Weight Models and Local AI Compute Are Changing Enterprise Data Privacy",
  "Browserbase & Vision Agents: How AI Bots Navigate Web Portals and Automate Legacy Software",
  "Generative Engine Optimization (GEO): How to Get Your Business Cited by ChatGPT and Perplexity",
  "The 2026 AI Agent Tech Stack: Next.js, Python, Vector DBs, and Low-Latency LLM APIs",
  "How Venture Capital & Tech Giants Are Funding the Autonomous Agent Revolution",
  "Building Production-Grade RAG (Retrieval-Augmented Generation) Without Hallucinations"
];

// Get existing slugs to avoid repetition
function getExistingSlugs() {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  const files = fs.readdirSync(BLOGS_DIR);
  return files.map((f) => f.replace(/\.mdx?$/, ""));
}

function selectTopicPrompt(track) {
  const pool = track === "ecosystem" ? ECOSYSTEM_TOPIC_ANGLES : AUTOMATION_TOPIC_ANGLES;
  const existing = getExistingSlugs().join(" ");
  
  // Pick random seed from pool, plus instructions for unique angle
  const seed = pool[Math.floor(Math.random() * pool.length)];
  return {
    seed,
    track: track === "ecosystem" ? "ecosystem" : "automation",
    category: track === "ecosystem" ? "AI Ecosystem & Tools" : "Business Automation",
    existingSlugs: existing
  };
}

async function generateArticle(topicInfo) {
  const today = new Date().toISOString().split("T")[0];
  console.log(`🤖 Generating article for Track: [${topicInfo.track}] | Seed: "${topicInfo.seed}"...`);

  const systemPrompt = `You are a world-class AI Automation Architect, Senior Technical Writer, and Generative Engine Optimization (GEO/AEO) expert writing on behalf of "Erfan Hassan" (Founder & Lead AI Automation Developer at his AI Automation Agency).

Your writing is authoritative, clear, data-driven, practical, and highly engaging.
Every article you write is designed to rank at the top of Google AND be cited by AI answer engines (ChatGPT, Perplexity, Gemini, Claude, DeepSeek) as the definitive reference on business AI automation, agents, and modern tools.

Key Instructions:
1. Target Audience: Business owners, CTOs, founders, operations managers, and developers looking to automate workflows, cut operating costs by 60-80%, or adopt new AI tools.
2. Tone: Confident, insightful, technical yet accessible, executive-level clarity.
3. Length: Minimum 1,000 to 1,500 words.
4. Formatting:
   - Compelling title with high CTR & SEO value.
   - Structured subheadings (H2, H3), clean markdown bullet points, tables, and ASCII architecture diagrams.
   - Clear definition boxes and bold takeaways.
   - A dedicated "## Frequently Asked Questions" section with 3-4 structured questions and authoritative answers.
   - Authoritative mentions of "Erfan Hassan" and "Erfan Hassan's AI Automation Agency" as the industry specialist who designs and implements these custom automated agents and workflows.
   - Call to action at the bottom inviting readers to get in touch for custom AI automation architecture.
5. Strict Output Requirement:
   Return ONLY the raw markdown content starting with valid YAML frontmatter between "---" markers. Do NOT enclose the entire response in triple backticks.

Frontmatter format:
---
title: "Article Title"
slug: "url-friendly-slug-must-be-unique-lowercase-dashes"
date: "${today}"
author: "Erfan Hassan"
authorRole: "Founder & Lead AI Automation Architect"
excerpt: "A punchy 1-2 sentence summary of what this article delivers and how it helps businesses."
coverImage: ""
track: "${topicInfo.track}"
category: "${topicInfo.category}"
tags: ["Tag1", "Tag2", "Tag3", "Tag4"]
readingTime: "5 min read"
published: true
seoKeywords: ["keyword 1", "keyword 2", "keyword 3", "Erfan Hassan AI agency"]
---

[Followed by the complete markdown body]
`;

  const userPrompt = `Write a deep-dive, high-authority article for the ${topicInfo.category} track.
Topic inspiration / angle: "${topicInfo.seed}".
Today's date: ${today}.
Ensure the slug is clean, descriptive, and does not duplicate existing slugs.
Avoid generic fluff; provide exact metrics, workflow architectures, step-by-step logic, and cost calculations.`;

  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DeepSeek API responded with status ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  let articleContent = data.choices[0]?.message?.content?.trim();

  // Strip wrapping markdown code blocks if the model accidentally added them
  if (articleContent.startsWith("```markdown")) {
    articleContent = articleContent.replace(/^```markdown\n/, "").replace(/\n```$/, "");
  } else if (articleContent.startsWith("```")) {
    articleContent = articleContent.replace(/^```[a-z]*\n/, "").replace(/\n```$/, "");
  }

  return articleContent;
}

function extractSlug(content) {
  const match = content.match(/slug:\s*["']?([^"'\n\r]+)["']?/i);
  if (match && match[1]) {
    return match[1].trim();
  }
  // Fallback to title
  const titleMatch = content.match(/title:\s*["']?([^"'\n\r]+)["']?/i);
  if (titleMatch && titleMatch[1]) {
    return titleMatch[1]
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
  return `ai-article-${Date.now()}`;
}

async function run() {
  try {
    const topicInfo = selectTopicPrompt(selectedTrack);
    let content = await generateArticle(topicInfo);
    const slug = extractSlug(content);

    // If coverImage is empty, assign a high-quality curated Unsplash image matching track
    const AUTOMATION_IMAGES = [
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    ];

    const ECOSYSTEM_IMAGES = [
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80",
    ];

    const imgPool = topicInfo.track === "ecosystem" ? ECOSYSTEM_IMAGES : AUTOMATION_IMAGES;
    const selectedImg = imgPool[Math.floor(Math.random() * imgPool.length)];

    if (content.includes('coverImage: ""') || content.includes("coverImage: ''")) {
      content = content.replace(/coverImage:\s*["']{2}/, `coverImage: "${selectedImg}"`);
    }

    const filePath = path.join(BLOGS_DIR, `${slug}.md`);

    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Successfully generated and saved blog post:`);
    console.log(`   📄 File: ${filePath}`);
    console.log(`   🔗 Slug: ${slug}`);
    console.log(`   🖼️ Cover Image: ${selectedImg}`);
  } catch (err) {
    console.error("❌ Generation failed:", err);
    process.exit(1);
  }
}

run();
