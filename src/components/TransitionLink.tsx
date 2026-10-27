import { flushSync } from 'react-dom';
import { Link, useNavigate, type LinkProps } from 'react-router-dom';
import { loadWorkspace } from '../lib/workspaceLoader';

type StartViewTransition = (update: () => void) => { finished: Promise<void> };

const isWorkspacePath = (to: string) => /^\/(html\/website|html\/email|css\/website)(\/|$)/.test(to);

// Moving between the landing pages and the workspace used to be a hard cut:
// in light mode the whole navy screen turned white at once and the logo
// jumped. With the browser's view-transition API, the navy page resizes
// into the top bar (or grows back out of it), the logo glides to its new
// spot, and the page underneath fades in. Browsers without the API, and
// people who ask for reduced motion, get the plain navigation.
export async function navigateWithTransition(navigate: (to: string) => void, to: string) {
  if (isWorkspacePath(to)) await loadWorkspace();
  const start = (document as Document & { startViewTransition?: StartViewTransition }).startViewTransition;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!start || reduce) {
    navigate(to);
    return;
  }
  // The new page must be in the DOM when the callback returns, or the
  // browser would capture the old page as the "after" picture too.
  start.call(document, () => {
    flushSync(() => navigate(to));
  });
}

// A drop-in for <Link> between the landing pages and the workspace. Keeps a
// real href, so opening in a new tab, copying the link and crawlers all
// behave exactly as before; only a plain left click is intercepted.
export function TransitionLink({ to, onClick, ...rest }: LinkProps & { to: string }) {
  const navigate = useNavigate();
  return (
    <Link
      to={to}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        void navigateWithTransition(navigate, to);
      }}
    />
  );
}
