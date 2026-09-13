import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const BLOGS_DIR = path.join(ROOT_DIR, "content", "blogs");

// A curated list of high-quality, professional tech/business Unsplash images
const CURATED_IMAGES = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop", // globe tech
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop", // data screen
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop", // charts / laptop
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop", // circuit board
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop", // sleek desk chart
  "https://images.unsplash.com/photo-1573164713619-24cb711aeb26?q=80&w=1200&auto=format&fit=crop", // analytics
  "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200&auto=format&fit=crop", // code
  "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop", // github matrix
  "https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?q=80&w=1200&auto=format&fit=crop", // ai bot
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop", // abstract ai
  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop", // finance / money
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop", // dashboard team
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop", // mobile analytics
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop", // lab automation
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"  // clean laptop desk
];

function getRandomImage() {
  return CURATED_IMAGES[Math.floor(Math.random() * CURATED_IMAGES.length)];
}

function updateImages() {
  const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));
  let updatedCount = 0;

  for (const file of files) {
    const filePath = path.join(BLOGS_DIR, file);
    const content = fs.readFileSync(filePath, "utf8");

    // Replace the existing coverImage line
    const newContent = content.replace(/^coverImage:.*$/m, `coverImage: "${getRandomImage()}"`);
    
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, "utf8");
      updatedCount++;
    }
  }

  console.log(`✅ Updated cover images in ${updatedCount} blog posts!`);
}

updateImages();
