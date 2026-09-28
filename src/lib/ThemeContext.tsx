import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'tagsmiths-theme';

function systemPrefersDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// A saved choice always wins. With no saved choice yet, the *default*
// still follows the OS setting — so someone who's never touched the
// toggle gets whatever their system already prefers, and the toggle only
// starts overriding once they've actually used it.
function loadTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // storage unavailable (private window, etc.) — fall through to system preference
  }
  return systemPrefersDark() ? 'dark' : 'light';
}

type ThemeContextValue = { theme: Theme; toggleTheme: () => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);

// A single source of truth for the current theme, provided once at the
// app root — needed because several CodeEditor instances can be mounted
// at the same time (puzzle pane and project pane both stay mounted even
// when collapsed), and each one needs the same answer to "light or
// dark," not its own independent read of localStorage.
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(loadTheme);

  // Layout effect, not a regular one — sets the attribute before the
  // browser paints, so entering the app doesn't flash light-then-dark
  // (or vice versa) for a frame.
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // storage unavailable — theme just won't persist across reloads
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
