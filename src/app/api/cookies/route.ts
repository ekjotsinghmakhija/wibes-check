import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let domain = searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });
  if (!domain.startsWith("http")) domain = `https://${domain}`;

  try {
    const response = await fetch(domain, { redirect: 'manual' });
    const setCookie = response.headers.get('set-cookie');

    // Parse cookies
    const cookies = setCookie ? setCookie.split(',').map(c => {
      const parts = c.split(';');
      const [name, value] = parts[0].split('=');
      return { name: name.trim(), value: value?.trim(), raw: c.trim() };
    }) : [];

    return NextResponse.json({ cookies, count: cookies.length });
  } catch (e) {
    return NextResponse.json({ cookies: [], count: 0 });
  }
}
