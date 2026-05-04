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
          background: '#0E1A2B',
          color: '#EEF2F6',
          fontFamily: 'sans-serif',
        }}
      >
        {/* logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg width="36" height="36" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="44" stroke="#EEF2F6" strokeWidth="4" />
            <circle cx="60" cy="60" r="28" fill="#FF5E47" />
            <circle cx="50" cy="50" r="6" fill="white" opacity="0.95" />
          </svg>
          <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: -0.5 }}>
            Lume·Studio
          </div>
        </div>
        {/* headline */}
        <div style={{ fontSize: 80, fontWeight: 500, lineHeight: 1.0, letterSpacing: -2, maxWidth: 900 }}>
          We focus your brand into{' '}
          <span style={{ color: '#FF5E47' }}>view.</span>
        </div>
        {/* footer */}
        <div style={{ fontSize: 22, opacity: 0.5 }}>{site.description}</div>
      </div>
    ),
    size,
  );
}
