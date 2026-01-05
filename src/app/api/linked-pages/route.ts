import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let domain = searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });

  // Ensure the domain has a protocol for fetching
  if (!domain.startsWith("http")) domain = `https://${domain}`;

  try {
    const res = await fetch(domain);
    const html = await res.text();
    const $ = cheerio.load(html);

    const internal = new Set<string>();
    const external = new Set<string>();

    // Get the hostname to determine if a link is internal
    const baseDomainObj = new URL(domain);
    const baseHostname = baseDomainObj.hostname;

    $('a').each((i, el) => {
      const href = $(el).attr('href');
      if (!href) return;

      try {
        // 1. Convert relative URLs (e.g. "/about") to Absolute URLs (e.g. "https://site.com/about")
        // The URL constructor handles this automatically when provided a base
        const absoluteUrl = new URL(href, domain).href;
        const urlObj = new URL(absoluteUrl);

        // 2. Filter out non-web links (mailto:, tel:, javascript:)
        if (!['http:', 'https:'].includes(urlObj.protocol)) return;

        // 3. Categorize as Internal vs External
        // We check if the hostname includes the base hostname (handles subdomains usually)
        if (urlObj.hostname === baseHostname || urlObj.hostname.endsWith('.' + baseHostname)) {
          internal.add(absoluteUrl);
        } else {
          external.add(absoluteUrl);
        }
      } catch (e) {
        // Ignore invalid URLs
        return;
      }
    });

    return NextResponse.json({
      internal: Array.from(internal).slice(0, 50), // Increased limit slightly to be more useful
      external: Array.from(external).slice(0, 50),
      totalInternal: internal.size,
      totalExternal: external.size
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to crawl" });
  }
}
