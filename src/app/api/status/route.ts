import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let domain = searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });
  if (!domain.startsWith("http")) domain = `https://${domain}`;

  const start = Date.now();
  try {
    const res = await fetch(domain, { method: 'HEAD' });
    const duration = Date.now() - start;
    return NextResponse.json({
      online: res.ok,
      status: res.status,
      time: duration,
      alive: true
    });
  } catch (e) {
    return NextResponse.json({ online: false, alive: false, time: 0 });
  }
}
