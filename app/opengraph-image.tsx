import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background:
            'radial-gradient(ellipse 80% 60% at 70% 20%, #7c5cff44, transparent 60%), #0a0a0a',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, opacity: 0.7 }}>
          {site.name.toUpperCase()}
        </div>
        <div style={{ fontSize: 88, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }}>
          {site.tagline}
        </div>
        <div style={{ fontSize: 24, opacity: 0.6, maxWidth: 800 }}>{site.description}</div>
      </div>
    ),
    size,
  );
}
