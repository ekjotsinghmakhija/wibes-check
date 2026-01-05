/* FILE: src/app/api/rank/route.ts */
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");

  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });

  const apiKey = process.env.OPEN_PAGERANK_KEY;

  // 1. If no key is configured, return a neutral response immediately
  if (!apiKey) {
    return NextResponse.json({
      rank: "Unranked",
      rankDecimal: 0,
      provider: "Open PageRank (No Key)"
    });
  }

  try {
    const res = await fetch(`https://openpagerank.com/api/v1.0/getPageRank?domains%5B0%5D=${domain}`, {
      headers: {
        'API-OPR': apiKey
      }
    });

    // 2. Handle non-200 responses from the API (e.g., 401 Unauthorized, 429 Rate Limit)
    if (!res.ok) {
      console.warn(`OpenPageRank API Error: ${res.status}`);
      throw new Error(`Upstream API Error: ${res.status}`);
    }

    const data = await res.json();

    // 3. Safety Check: Ensure the response structure is exactly what we expect
    // The API might return success: true but an empty array if the domain is invalid
    const result = data?.response?.[0];

    if (!result || result.status_code !== 200) {
      return NextResponse.json({
        rank: "Unranked",
        rankDecimal: 0,
        provider: "Open PageRank"
      });
    }

    return NextResponse.json({
      rank: result.rank || "Unranked",
      rankDecimal: result.page_rank_decimal || 0,
      provider: "Open PageRank"
    });

  } catch (e) {
    console.error("Rank API Failed:", e);
    // 4. FALLBACK: Return a valid JSON object instead of a 500 Error page
    // This ensures the frontend card just shows "N/A" or "Unranked" instead of breaking.
    return NextResponse.json({
        rank: "Unranked",
        rankDecimal: 0,
        provider: "Open PageRank (Error)"
    }, { status: 200 });
  }
}
