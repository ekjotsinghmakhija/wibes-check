import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let domain = searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });

  if (!domain.startsWith("http")) domain = `https://${domain}`;

  try {
    const res = await fetch(domain, { headers: { "User-Agent": "WibesCheck/1.0" } });
    const html = await res.text();
    const $ = cheerio.load(html);

    const metadata = {
      title: $('title').text() || $('meta[property="og:title"]').attr('content'),
      description: $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content'),
      image: $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content'),
      themeColor: $('meta[name="theme-color"]').attr('content'),
      canonical: $('link[rel="canonical"]').attr('href'),
      ogType: $('meta[property="og:type"]').attr('content'),
      twitterCard: $('meta[name="twitter:card"]').attr('content'),
    };

    return NextResponse.json(metadata);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch social tags" }, { status: 500 });
  }
}
