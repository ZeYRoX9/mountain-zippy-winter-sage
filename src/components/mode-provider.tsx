import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type SiteMode = "learn" | "jobs";
const KEY = "hf-site-mode";

const ModeContext = createContext<{
  mode: SiteMode;
  setMode: (m: SiteMode) => void;
}>({ mode: "learn", setMode: () => {} });

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<SiteMode>("learn");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored === "jobs" || stored === "learn") setModeState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const setMode = (m: SiteMode) => {
    setModeState(m);
    try {
      localStorage.setItem(KEY, m);
    } catch {
      /* ignore */
    }
  };

  const value = useMemo(() => ({ mode, setMode }), [mode]);
  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useSiteMode() {
  return useContext(ModeContext);
}
