'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

type ActiveTileContextValue = {
  activeSlug: string | null;
  setActiveSlug: (slug: string | null) => void;
};

const ActiveTileContext = createContext<ActiveTileContextValue | null>(null);

export function ActiveTileProvider({ children }: { children: ReactNode }) {
  const [activeSlug, setActive] = useState<string | null>(null);
  const setActiveSlug = useCallback((slug: string | null) => setActive(slug), []);
  return (
    <ActiveTileContext.Provider value={{ activeSlug, setActiveSlug }}>
      {children}
    </ActiveTileContext.Provider>
  );
}

export function useActiveTile() {
  const ctx = useContext(ActiveTileContext);
  // Allow use outside provider — tiles just always render their poster
  return (
    ctx ?? {
      activeSlug: null,
      setActiveSlug: () => {},
    }
  );
}
