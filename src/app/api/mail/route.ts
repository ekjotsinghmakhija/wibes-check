import { NextResponse } from "next/server";
import dns from "node:dns/promises";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });

  try {
    const txtRecords = await dns.resolveTxt(domain).catch(() => []);
    const spf = txtRecords.flat().find(r => r.includes("v=spf1"));

    // DMARC is always at _dmarc.domain.com
    const dmarcRecords = await dns.resolveTxt(`_dmarc.${domain}`).catch(() => []);
    const dmarc = dmarcRecords.flat().find(r => r.includes("v=DMARC1"));

    return NextResponse.json({ spf, dmarc });
  } catch (e) {
    return NextResponse.json({ spf: null, dmarc: null });
  }
}
