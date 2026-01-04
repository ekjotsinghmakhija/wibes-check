import { NextResponse } from "next/server";
import dns from "node:dns/promises";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");

  if (!domain) {
    return NextResponse.json({ error: "Domain required" }, { status: 400 });
  }

  try {
    // Run all DNS lookups in parallel for speed
    const [a, aaaa, mx, txt, ns] = await Promise.allSettled([
      dns.resolve4(domain),      // IPv4
      dns.resolve6(domain),      // IPv6
      dns.resolveMx(domain),     // Mail Servers
      dns.resolveTxt(domain),    // Text Records (Verification)
      dns.resolveNs(domain),     // Nameservers
    ]);

    // Helper to extract value from Promise.allSettled
    const getValue = (result: PromiseSettledResult<any>) =>
      result.status === 'fulfilled' ? result.value : [];

    return NextResponse.json({
      a: getValue(a),
      aaaa: getValue(aaaa),
      mx: getValue(mx),
      txt: getValue(txt),
      ns: getValue(ns),
    });

  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch DNS records" }, { status: 500 });
  }
}
