'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  opacitySpeed: number;
  color: string;
};

const LIGHT_COLORS = ['#0E1A2B', '#FF5E47', '#5C6B7E'];
const DARK_COLORS = ['#EEF2F6', '#FF5E47', '#5C6B7E'];
const COUNT = 55;

function makeParticle(w: number, h: number, colors: string[]): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 2 + 0.5,
    speed: Math.random() * 0.4 + 0.1,
    opacity: Math.random() * 0.35 + 0.05,
    opacitySpeed: (Math.random() * 0.003 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
    color: colors[Math.floor(Math.random() * colors.length)]!,
  };
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let raf: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const getColors = () =>
      document.documentElement.getAttribute('data-theme') === 'dark'
        ? DARK_COLORS
        : LIGHT_COLORS;

    const init = () => {
      resize();
      particles = Array.from({ length: COUNT }, () =>
        makeParticle(canvas.width, canvas.height, getColors()),
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const colors = getColors();

      for (const p of particles) {
        // drift upward
        p.y -= p.speed;
        // slight horizontal drift
        p.x += Math.sin(p.y * 0.015) * 0.2;

        // fade in/out
        p.opacity += p.opacitySpeed;
        if (p.opacity > 0.4 || p.opacity < 0.02) p.opacitySpeed *= -1;

        // wrap when off top
        if (p.y < -4) {
          p.y = canvas.height + 4;
          p.x = Math.random() * canvas.width;
          p.color = colors[Math.floor(Math.random() * colors.length)]!;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    init();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 w-full h-full"
    />
  );
}
