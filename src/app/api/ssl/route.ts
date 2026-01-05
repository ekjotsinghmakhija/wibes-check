import { NextResponse } from "next/server";
import tls from "node:tls";
import https from "node:https";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let domain = searchParams.get("domain");

  if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });
  // Clean domain just in case
  domain = domain.replace(/^https?:\/\//, "").split('/')[0];

  try {
    const info = await new Promise((resolve, reject) => {
      const options = {
        host: domain,
        port: 443,
        servername: domain,
        rejectUnauthorized: false,
        agent: new https.Agent({ maxCachedSessions: 0 }),
      };

      const socket = tls.connect(options, () => {
        const cert = socket.getPeerCertificate(true);
        const authorized = socket.authorized;
        socket.end();

        // FIX: Extract only necessary fields to avoid "Circular Structure" error
        resolve({
          authorized,
          cert: {
            subject: cert.subject,
            issuer: cert.issuer,
            valid_from: cert.valid_from,
            valid_to: cert.valid_to,
            // We intentionally do NOT include 'issuerCertificate' here
          }
        });
      });

      socket.on("error", (err) => reject(err));
      socket.setTimeout(5000, () => reject(new Error("Timeout")));
    });

    return NextResponse.json(info);

  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch SSL info" }, { status: 500 });
  }
}
