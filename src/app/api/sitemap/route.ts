import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let domain = searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });

  const sitemapUrl = `https://${domain}/sitemap.xml`;

  try {
    const res = await fetch(sitemapUrl);
    if (res.status !== 200) throw new Error("No sitemap");
    const text = await res.text();

    // Simple XML parsing (RegEx is faster/lighter than full XML parser for this)
    const urls = text.match(/<loc>(.*?)<\/loc>/g)?.map(val => val.replace(/<\/?loc>/g, '')) || [];

    return NextResponse.json({ urls: urls.slice(0, 50), count: urls.length });
  } catch (e) {
    return NextResponse.json({ error: "Sitemap not found", urls: [] });
  }
}
