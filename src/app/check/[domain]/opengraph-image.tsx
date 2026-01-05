import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const alt = 'Security Report';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;
  const decodedDomain = decodeURIComponent(domain);

  const desktopData = readFileSync(join(process.cwd(), 'public/assets/desktop-dashboard.jpg'));
  const mobileData = readFileSync(join(process.cwd(), 'public/assets/mobile-dashboard.png'));

  const desktopBase64 = `data:image/jpeg;base64,${desktopData.toString('base64')}`;
  const mobileBase64 = `data:image/png;base64,${mobileData.toString('base64')}`;

  return new ImageResponse(
    (
      <div style={{
          height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
          backgroundColor: '#020202',
          backgroundImage: 'radial-gradient(circle at 100% 0%, #312e81 0%, #020202 40%)',
          position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif',
        }}
      >
        <div style={{ padding: '40px 0 0 50px', zIndex: 20, display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: '#818cf8', fontSize: 20, fontWeight: 600, letterSpacing: '0.1em', marginBottom: 10 }}>SECURITY REPORT</div>
            <div style={{ color: 'white', fontSize: 60, fontWeight: 900 }}>{decodedDomain}</div>
        </div>

        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
            {/* Desktop Dashboard */}
            {/* FIX: Added display: 'flex' because this div has 2 children (img and overlay) */}
            <div style={{
                width: 850, height: 500, background: '#0A0A0B', borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                overflow: 'hidden',
                display: 'flex', // <--- REQUIRED FIX
                transform: 'scale(0.9) translate(50px, 0px)',
            }}>
                <img src={desktopBase64} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(transparent 50%, rgba(0,0,0,0.6))' }} />
            </div>

            {/* Mobile Dashboard */}
            <div style={{
                position: 'absolute', left: 80, bottom: -60, width: 250, height: 500,
                background: '#020202', borderRadius: 30, border: '3px solid rgba(255,255,255,0.2)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.8)', overflow: 'hidden',
                display: 'flex', // Added for safety
                transform: 'rotate(5deg)',
                zIndex: 10
            }}>
                <img src={mobileBase64} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
