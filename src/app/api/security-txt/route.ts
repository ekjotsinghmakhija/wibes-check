import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });

  // Try standard locations
  const paths = [`https://${domain}/.well-known/security.txt`, `https://${domain}/security.txt`];

  for (const url of paths) {
    try {
      const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
      if (res.status === 200) {
        const text = await res.text();
        // Basic validation to ensure it's not an HTML 404 page
        if (text.includes("Contact:")) {
          return NextResponse.json({ found: true, url, content: text });
        }
      }
    } catch (e) { continue; }
  }

  return NextResponse.json({ found: false });
}
