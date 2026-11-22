import { TransitionLink } from './TransitionLink';
import { Logo } from './Logo';
import { useSyncExternalStore } from 'react';
import { useTheme } from '../lib/ThemeContext';

const LINKS = [
  { id: 'ai', label: 'ai', to: '/ai' },
  { id: 'game-design', label: 'game design', to: '/game-design' },
  { id: 'reference', label: 'reference', to: '/reference' },
];

// The navy bar on the reading pages (the two stories and the reference).
// Laid out like the landing brand and the workspace bar, so the logo sits
// on the same pixel on every page.
const noop = () => () => {};

export function ReadingTopbar({ current }: { current: string }) {
  const { theme: savedTheme, toggleTheme } = useTheme();
  // The theme is only known in the browser. The takeover of the
  // prerendered page renders the build's default (light), then this
  // switches to the reader's real theme right after.
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const theme = hydrated ? savedTheme : 'light';
  return (
    <header className="story-topbar">
      <TransitionLink to="/" className="brand-row story-brand" aria-label="tagsmiths home">
        <Logo size={20} />
      </TransitionLink>
      <nav className="story-switch" aria-label="Reading">
        {LINKS.map((l) => (
          <TransitionLink key={l.id} to={l.to} className={`story-switch-link ${l.id === current ? 'active' : ''}`} aria-current={l.id === current ? 'page' : undefined}>
            {l.label}
          </TransitionLink>
        ))}
      </nav>
      <button type="button" className="story-theme" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
        <span className="story-theme-icon" aria-hidden="true">
          ◐
        </span>
        <span className="story-theme-label">
          {theme === 'dark' ? 'light' : 'dark'}
        </span>
      </button>
    </header>
  );
}
