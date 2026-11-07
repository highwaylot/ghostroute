import { useEffect } from 'react';
import { loadWorkspace } from './workspaceLoader';
import { loadStory } from './storyLoader';

// Called by the landing pages. Waits until the page has fully loaded and
// the browser is then idle (or 1.5s where requestIdleCallback is missing),
// so it never competes with the page itself, then warms the workspace chunk
// and the history pages' chunk, so every tile on the landing opens at once.
export function usePreloadWorkspace() {
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timerId: number | undefined;
    const warm = () => {
      void loadWorkspace();
      void loadStory();
    };
    const schedule = () => {
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(warm, { timeout: 3000 });
      else timerId = window.setTimeout(warm, 1500);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    return () => {
      window.removeEventListener('load', schedule);
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);
}
