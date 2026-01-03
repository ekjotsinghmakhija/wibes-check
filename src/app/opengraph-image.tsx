import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const alt = 'Wibes Check - Web Intelligence Engine';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const desktopData = readFileSync(join(process.cwd(), 'public/assets/desktop-landing.png'));
  const mobileData = readFileSync(join(process.cwd(), 'public/assets/mobile-landing.png'));

  const desktopBase64 = `data:image/png;base64,${desktopData.toString('base64')}`;
  const mobileBase64 = `data:image/png;base64,${mobileData.toString('base64')}`;

  return new ImageResponse(
    (
      <div style={{
          height: '100%', width: '100%', display: 'flex',
          backgroundColor: '#020202',
          backgroundImage: 'radial-gradient(circle at 50% 0%, #1e1b4b 0%, #020202 50%)',
          position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif',
        }}
      >
        <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', transform: 'scale(1.1)' }}>
            {/* Desktop Mockup */}
            <div style={{
                width: 800, height: 500, background: '#0A0A0B', borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                overflow: 'hidden',
                display: 'flex', // <--- Added for safety
                transform: 'translate(-50px, 0px)',
                zIndex: 1
            }}>
                <img src={desktopBase64} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </div>

            {/* Mobile Mockup */}
            <div style={{
                position: 'absolute', right: 150, bottom: -20, width: 260, height: 520,
                background: '#020202', borderRadius: 30, border: '4px solid #333',
                boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(99,102,241,0.2)',
                overflow: 'hidden',
                display: 'flex', // <--- Added for safety
                transform: 'rotate(-5deg)',
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
