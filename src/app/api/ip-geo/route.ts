import { NextResponse } from "next/server";
import dns from "dns/promises";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let domain = searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });

  try {
    // 1. Resolve DNS to get IP
    const addresses = await dns.resolve4(domain).catch(() => []);
    const ip = addresses[0];

    if (!ip) return NextResponse.json({ error: "Could not resolve IP" }, { status: 404 });

    // 2. Fetch Geo Data (Using a free IP API)
    const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,regionName,city,zip,lat,lon,timezone,isp,org,as`);
    const geoData = await geoRes.json();

    return NextResponse.json({
      ip,
      ...geoData
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch IP info" }, { status: 500 });
  }
}
