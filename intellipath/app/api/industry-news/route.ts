import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rssUrl = "https://techcrunch.com/feed/";
    const res = await fetch(rssUrl);
    const xml = await res.text();

    // Simple RSS to JSON parsing
      const items = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g)).map(match => {
      const item = match[1];
        const get = (tag: string) => {
          const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i");
          const m = item.match(regex);
          let text = m ? m[1] : "";
          // Remove CDATA
          text = text.replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1");
          // Remove HTML tags
          text = text.replace(/<[^>]+>/g, "");
          // Decode HTML entities (basic)
          text = text.replace(/&#(\d+);/g, (m, code) => String.fromCharCode(code));
          text = text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">" ).replace(/&quot;/g, '"').replace(/&apos;/g, "'");
          return text.trim();
        };
      return {
        title: get("title"),
        url: get("link"),
        summary: get("description"),
          image: (() => {
            const imgMatch = item.match(/<media:content[^>]*url=["']([^"']+)["']/i);
            return imgMatch ? imgMatch[1] : "";
          })(),
        source: "TechCrunch",
        time: get("pubDate").replace(/\s*\+0000$/, ""),
      };
    });
    return NextResponse.json(items.slice(0, 12));
  } catch (e) {
    return NextResponse.json([], { status: 500 });
  }
}