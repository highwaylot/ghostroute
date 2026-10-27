import { useEffect } from 'react';
import { loadWorkspace } from './workspaceLoader';

// Called by the landing pages. Waits until the page has fully loaded and
// the browser is then idle (or 1.5s where requestIdleCallback is missing),
// so it never competes with the page itself, then warms the workspace chunk.
export function usePreloadWorkspace() {
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timerId: number | undefined;
    const schedule = () => {
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(() => void loadWorkspace(), { timeout: 3000 });
      else timerId = window.setTimeout(() => void loadWorkspace(), 1500);
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
