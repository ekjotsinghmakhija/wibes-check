import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let domain = searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });
  if (!domain.startsWith("http")) domain = `https://${domain}`;

  try {
    const res = await fetch(domain, { headers: { "User-Agent": "WibesCheck/1.0" } });
    const html = await res.text();
    const headers = Object.fromEntries(res.headers.entries());

    const stack = [];

    // 1. Header Checks
    if (headers["server"]?.includes("Vercel")) stack.push({ name: "Vercel", type: "Hosting" });
    if (headers["server"]?.includes("cloudflare")) stack.push({ name: "Cloudflare", type: "CDN" });
    if (headers["x-powered-by"]?.includes("Express")) stack.push({ name: "Express", type: "Framework" });
    if (headers["x-generator"]?.includes("Drupal")) stack.push({ name: "Drupal", type: "CMS" });

    // 2. HTML Signature Checks
    if (html.includes('id="__next"')) stack.push({ name: "Next.js", type: "Framework" });
    if (html.includes('react-dom')) stack.push({ name: "React", type: "Library" });
    if (html.includes('wp-content')) stack.push({ name: "WordPress", type: "CMS" });
    if (html.includes('shopify.com')) stack.push({ name: "Shopify", type: "eCommerce" });
    if (html.includes('tailwind')) stack.push({ name: "Tailwind CSS", type: "UI" });
    if (html.includes('bootstrap')) stack.push({ name: "Bootstrap", type: "UI" });
    if (html.includes('googletagmanager')) stack.push({ name: "Google Analytics", type: "Analytics" });

    // Deduplicate
    const uniqueStack = Array.from(new Set(stack.map(s => JSON.stringify(s)))).map(s => JSON.parse(s));

    return NextResponse.json({ stack: uniqueStack });
  } catch (error) {
    return NextResponse.json({ stack: [] });
  }
}
