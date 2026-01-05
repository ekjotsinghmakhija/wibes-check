/* FILE: src/app/api/dnssec/route.ts */
import { NextResponse } from "next/server";
import dns from "node:dns/promises";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });

  try {
    // Attempt to resolve DNSKEY records
    // Note: We cast to 'any' here because the generic dns.resolve return type
    // is a union that includes non-array types (like SoaRecord), causing TS errors.
    const keys = (await dns.resolve(domain, 'DNSKEY').catch(() => [])) as any[];

    // DS records usually at parent, might be tricky to fetch directly without recursive resolver logic
    const ds = (await dns.resolve(domain, 'DS').catch(() => [])) as any[];

    // For a simple check, existence of keys suggests DNSSEC is active/attempted
    const isSecured = keys.length > 0;

    return NextResponse.json({
      secure: isSecured,
      keys: keys.slice(0, 2), // Limit output
      ds: ds.slice(0, 2)
    });
  } catch (e) {
    return NextResponse.json({ secure: false });
  }
}
