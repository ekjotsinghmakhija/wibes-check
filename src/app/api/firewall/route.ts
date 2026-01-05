import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let domain = searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });
  if (!domain.startsWith("http")) domain = `https://${domain}`;

  try {
    const res = await fetch(domain, { method: "HEAD" });
    const server = res.headers.get("server") || "";
    const cf = res.headers.get("cf-ray");
    const aws = res.headers.get("x-amz-cf-id");

    let waf = "None detected";
    if (cf) waf = "Cloudflare";
    if (aws) waf = "AWS CloudFront";
    if (server.includes("Akamai")) waf = "Akamai";
    if (server.includes("Vercel")) waf = "Vercel Firewall";

    return NextResponse.json({ hasWaf: waf !== "None detected", waf });
  } catch (e) {
    return NextResponse.json({ hasWaf: false, waf: "Unknown" });
  }
}
