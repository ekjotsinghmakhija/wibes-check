import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });

  try {
    // Wayback Machine CDX API
    const url = `https://web.archive.org/cdx/search/cdx?url=${domain}&output=json&fl=original,timestamp&limit=10&collapse=digest`;
    const res = await fetch(url);
    const data = await res.json();

    // Remove header row and map
    const snapshots = data.slice(1).map((row: any[]) => ({
      url: row[0],
      timestamp: row[1],
      viewUrl: `https://web.archive.org/web/${row[1]}/${row[0]}`
    }));

    return NextResponse.json({ snapshots });
  } catch (e) {
    return NextResponse.json({ snapshots: [] });
  }
}
