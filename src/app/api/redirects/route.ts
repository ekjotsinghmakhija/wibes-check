import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });

  try {
    const redirects = [];
    let currentUrl = `http://${domain}`; // Start insecure to test redirect

    // Limited depth follow
    for(let i=0; i<5; i++) {
        const res = await fetch(currentUrl, { redirect: 'manual' });
        redirects.push({ url: currentUrl, status: res.status });

        if (res.status >= 300 && res.status < 400) {
            const loc = res.headers.get('location');
            if(!loc) break;
            currentUrl = loc.startsWith('http') ? loc : new URL(loc, currentUrl).toString();
        } else {
            break;
        }
    }

    return NextResponse.json({ redirects });
  } catch (e) {
    return NextResponse.json({ redirects: [] });
  }
}
