import type { Theme } from '../lib/ThemeContext';

type Props = {
  theme: Theme;
  onToggle: () => void;
};

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10 1.5v2.2M10 16.3v2.2M2 10h2.2M15.8 10H18M4.6 4.6l1.5 1.5M13.9 13.9l1.5 1.5M4.6 15.4l1.5-1.5M13.9 6.1l1.5-1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 12.3A7.2 7.2 0 0 1 7.7 3a7.2 7.2 0 1 0 9.3 9.3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Icon-only, no label — small and tucked in among the other topbar
// actions rather than calling attention to itself. Shows the state a
// click switches *to* (a sun means "tap for light"), which is the more
// common convention than showing the current state.
export function ThemeToggle({ theme, onToggle }: Props) {
  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  return (
    <button className="topbar-action theme-toggle" onClick={onToggle} aria-label={label} title={label}>
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
