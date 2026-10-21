import { useEffect, useRef, useState } from 'react';
import type { Theme } from '../lib/ThemeContext';
import { clearAllSavedState, isSoundOn, setSoundOn } from '../lib/sound';

type Props = {
  theme: Theme;
  onToggleTheme: () => void;
  // Resets just the current track's route (position + code). The caller
  // owns that state, so it does the work; this menu only asks.
  onRestartRoute: () => void;
  routeLabel: string;
};

function GearIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="10" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10 2.2v2M10 15.8v2M2.2 10h2M15.8 10h2M4.5 4.5l1.4 1.4M14.1 14.1l1.4 1.4M4.5 15.5l1.4-1.4M14.1 5.9l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="10" cy="10" r="5.6" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2.2 2.6" />
    </svg>
  );
}

type Confirm = 'route' | 'all' | null;

// One place for everything that is a preference or a reset, so the top
// bar carries only the things that are part of learning (route, solve,
// sandbox, nest, quickfire) plus "my stuff" (projects, key index) and
// this gear. The two resets each take a second click inside the menu.
export function SettingsMenu({ theme, onToggleTheme, onRestartRoute, routeLabel }: Props) {
  const [open, setOpen] = useState(false);
  const [sound, setSound] = useState(isSoundOn);
  const [confirm, setConfirm] = useState<Confirm>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    // A click inside the output iframe never reaches this document, but it
    // does blur the window — treat that as an outside click too.
    const onBlur = () => setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    window.addEventListener('blur', onBlur);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('blur', onBlur);
    };
  }, [open]);

  useEffect(() => {
    if (!open) setConfirm(null);
  }, [open]);

  const toggleSound = () => {
    const next = !sound;
    setSoundOn(next);
    setSound(next);
  };

  const restartRoute = () => {
    onRestartRoute();
    setOpen(false);
  };

  const startOver = () => {
    clearAllSavedState();
    // A full reload from the front door: every pane reads its state on
    // mount, and this is the one action where a stale in-memory copy of
    // anything would be a bug.
    window.location.assign('/');
  };

  return (
    <div className="settings" ref={rootRef}>
      <button
        className={`topbar-action ${open ? 'active' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Settings"
        title="Settings"
      >
        <GearIcon />
        <span>settings</span>
      </button>

      {open && (
        <div className="settings-menu" role="group" aria-label="Settings">
          <div className="settings-row">
            <span className="settings-label">theme</span>
            <div className="settings-seg" role="radiogroup" aria-label="Theme">
              <button
                role="radio"
                aria-checked={theme === 'light'}
                className={`settings-seg-btn ${theme === 'light' ? 'active' : ''}`}
                onClick={() => theme !== 'light' && onToggleTheme()}
              >
                light
              </button>
              <button
                role="radio"
                aria-checked={theme === 'dark'}
                className={`settings-seg-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => theme !== 'dark' && onToggleTheme()}
              >
                dark
              </button>
            </div>
          </div>

          <div className="settings-row">
            <span className="settings-label">sound</span>
            <div className="settings-seg" role="radiogroup" aria-label="Sound">
              <button role="radio" aria-checked={sound} className={`settings-seg-btn ${sound ? 'active' : ''}`} onClick={() => !sound && toggleSound()}>
                on
              </button>
              <button role="radio" aria-checked={!sound} className={`settings-seg-btn ${!sound ? 'active' : ''}`} onClick={() => sound && toggleSound()}>
                off
              </button>
            </div>
          </div>

          <div className="settings-divider" />

          {confirm === 'route' ? (
            <div className="settings-confirm">
              <p>Restart the {routeLabel} route from step 1? Your puzzles, projects and sandbox stay.</p>
              <div className="settings-confirm-actions">
                <button className="btn btn-destructive btn-sm" onClick={restartRoute}>
                  yes, restart
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setConfirm(null)}>
                  cancel
                </button>
              </div>
            </div>
          ) : (
            <button className="settings-item" onClick={() => setConfirm('route')}>
              restart this route
              <span className="settings-item-sub">back to step 1 of {routeLabel}</span>
            </button>
          )}

          {confirm === 'all' ? (
            <div className="settings-confirm">
              <p>Start over as a brand-new user? This clears every route, puzzle, project and sandbox saved on this device. It can&apos;t be undone.</p>
              <div className="settings-confirm-actions">
                <button className="btn btn-destructive btn-sm" onClick={startOver}>
                  yes, wipe everything
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setConfirm(null)}>
                  cancel
                </button>
              </div>
            </div>
          ) : (
            <button className="settings-item" onClick={() => setConfirm('all')}>
              start over as a new user
              <span className="settings-item-sub">clears all progress on this device</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
