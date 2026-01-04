import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });

  try {
    // 1. Get HTML size roughly
    const res = await fetch(`https://${domain}`);
    const html = await res.text();
    const bytes = new TextEncoder().encode(html).length;

    // 2. Query WebsiteCarbon API (Public API)
    const carbonRes = await fetch(`https://api.websitecarbon.com/data?bytes=${bytes}&green=0`);
    const carbonData = await carbonRes.json();

    return NextResponse.json(carbonData);
  } catch (error) {
    return NextResponse.json({ error: "Could not calculate carbon" }, { status: 500 });
  }
}
