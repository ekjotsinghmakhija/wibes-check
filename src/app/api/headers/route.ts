import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let domain = searchParams.get("domain");

  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });

  // Ensure protocol
  if (!domain.startsWith("http")) domain = `https://${domain}`;

  try {
    const res = await fetch(domain, { method: "HEAD", redirect: "follow" });
    const headers: Record<string, string> = {};

    res.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return NextResponse.json({
      status: res.status,
      server: headers["server"] || "Unknown",
      headers,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch headers" }, { status: 500 });
  }
}
