'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'lume-hero-played';

export function useFirstVisit(): { isFirstVisit: boolean; ready: boolean } {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const played = sessionStorage.getItem(STORAGE_KEY);
      if (!played) {
        setIsFirstVisit(true);
        sessionStorage.setItem(STORAGE_KEY, '1');
      }
    } catch {
      // sessionStorage unavailable (private mode, etc) — treat as not-first-visit
    }
    setReady(true);
  }, []);

  return { isFirstVisit, ready };
}
