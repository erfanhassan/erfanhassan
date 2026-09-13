import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const posts = getAllPosts();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://erfanhassan.sonictch.com";

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>AI Automation Insights &amp; Engineering Blog | Erfan Hassan</title>
  <link>${siteUrl}</link>
  <description>Actionable blueprints on how AI automation reduces business overhead by up to 70%.</description>
  <language>en-us</language>
  <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
  ${posts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;
      return `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <description><![CDATA[${post.excerpt}]]></description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author><![CDATA[${post.author}]]></author>
    <category><![CDATA[${post.category}]]></category>
  </item>`;
    })
    .join("")}
</channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
