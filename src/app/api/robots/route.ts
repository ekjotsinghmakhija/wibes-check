import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });

  try {
    const res = await fetch(`https://${domain}/robots.txt`);
    if (res.status !== 200) throw new Error("No robots.txt");
    const text = await res.text();

    const rules: { type: string; value: string }[] = [];
    text.split("\n").forEach(line => {
      const match = line.match(/^(Allow|Disallow|User-agent|Sitemap):\s*(.*)$/i);
      if (match) rules.push({ type: match[1], value: match[2].trim() });
    });

    return NextResponse.json({ found: true, rules: rules.slice(0, 10), full: text }); // Limit to top 10 for UI
  } catch (error) {
    return NextResponse.json({ found: false });
  }
}
