import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const TOPICS_DIR = path.join(ROOT_DIR, "content", "topics");

if (!fs.existsSync(TOPICS_DIR)) {
  fs.mkdirSync(TOPICS_DIR, { recursive: true });
}

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

async function generateBatch(track, count, previousTopics) {
  const systemPrompt = `You are a creative AI technical strategist. Your goal is to brainstorm exactly ${count} highly unique, long-tail blog post titles. 
  
Track: ${track === "automation" ? "Business Workflow Automation & AI Agents (Target: SMBs, Founders, Operations)" : "AI Ecosystem, Tech Stacks, & Models (Target: AI Developers, CTOs, Tech Enthusiasts)"}

Ensure EVERY title is highly specific, practical, and sounds like a deep-dive technical/business guide. Avoid repetitive templates. Make them sound authoritative.
DO NOT include any formatting like numbers, bullets, or markdown. Just return raw text, ONE title per line.
Do NOT repeat any of these previously generated topics: ${previousTopics.slice(-20).join(", ")}`;

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "system", content: systemPrompt }],
        temperature: 0.9,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) throw new Error(await response.text());
    
    const data = await response.json();
    const text = data.choices[0].message.content.trim();
    
    // Split by newlines, clean up numbers/bullets
    return text.split("\n").map(line => line.replace(/^[\d\.\-\*\s]+/, "").replace(/"/g, "").trim()).filter(line => line.length > 10);
  } catch (err) {
    console.error("Batch generation failed:", err);
    return [];
  }
}

async function run() {
  const tracks = ["automation", "ecosystem"];
  const TARGET_PER_TRACK = 300;
  const BATCH_SIZE = 50;

  for (const track of tracks) {
    console.log(`\n🚀 Generating ${TARGET_PER_TRACK} topics for [${track}] track...`);
    const allTopics = new Set();
    
    while (allTopics.size < TARGET_PER_TRACK) {
      const needed = Math.min(BATCH_SIZE, TARGET_PER_TRACK - allTopics.size);
      console.log(`Generating batch of ${needed} topics... (Currently have ${allTopics.size})`);
      
      const newTopics = await generateBatch(track, needed, Array.from(allTopics));
      for (const t of newTopics) {
        allTopics.add(t);
      }
      // slight delay
      await new Promise(r => setTimeout(r, 1000));
    }
    
    const finalArray = Array.from(allTopics).slice(0, TARGET_PER_TRACK);
    fs.writeFileSync(path.join(TOPICS_DIR, `${track}.json`), JSON.stringify(finalArray, null, 2));
    console.log(`✅ Saved ${finalArray.length} topics for ${track} to content/topics/${track}.json`);
  }
}

run();
