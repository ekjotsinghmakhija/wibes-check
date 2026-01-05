import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let domain = searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });
  if (!domain.startsWith("http")) domain = `https://${domain}`;

  // Using Microlink (Free Tier) for stability on Vercel
  const screenshotUrl = `https://api.microlink.io?url=${encodeURIComponent(domain)}&screenshot=true&meta=false&embed=screenshot.url`;

  return NextResponse.json({ url: screenshotUrl });
}
