'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MeshGradient } from '@paper-design/shaders-react';

const DARK_COLORS = ['#0a0a0a', '#1a1438', '#7c5cff', '#3a8eff'];
const LIGHT_COLORS = ['#fafafa', '#e8ddff', '#a78bff', '#5b8ef2'];

export function LiquidMetalBackground() {
  const { resolvedTheme } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowEnd =
      typeof navigator !== 'undefined' &&
      ((navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
        window.innerWidth < 640);
    if (!reduced && !lowEnd) setEnabled(true);

    const onVisibility = () => setIsVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  if (!enabled) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 20%, rgba(124,92,255,0.25), transparent 60%), radial-gradient(ellipse 60% 50% at 30% 70%, rgba(58,142,255,0.15), transparent 60%)',
        }}
      />
    );
  }

  const colors = resolvedTheme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
  const opacity = resolvedTheme === 'dark' ? 0.6 : 0.4;

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <MeshGradient
        colors={colors}
        distortion={0.85}
        swirl={0.4}
        grainMixer={0.05}
        grainOverlay={0.02}
        speed={isVisible ? 0.4 : 0}
        style={{ width: '100%', height: '100%', opacity }}
      />
    </div>
  );
}
