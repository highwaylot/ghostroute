import { useEffect, useRef, useState } from 'react';

type Props = {
  code: string;
  title: string;
};

// The output iframe reloads its whole document every time `srcDoc` changes,
// which is real browser behavior, not a bug we can turn off — but two things
// made it worse than it needs to be:
//   1. Reloading on every single keystroke felt janky mid-typing.
//   2. Every reload reset the iframe's own scroll position to the top, which
//      fights "see it update while you build" if you'd scrolled down to look
//      at something.
// Debouncing the reload and restoring the last scroll position after each
// one fixes both without pretending the reload itself doesn't happen.
export function PreviewFrame({ code, title }: Props) {
  const [debounced, setDebounced] = useState(code);
  const [fullscreen, setFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const scrollPos = useRef(0);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(code), 250);
    return () => window.clearTimeout(id);
  }, [code]);

  // Fullscreen shows the page at the real size a visitor would actually see
  // it at — useful for judging whether something "looks right," which a
  // cramped output panel can't honestly tell you.
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fullscreen]);

  const handleLoad = () => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.scrollTo(0, scrollPos.current);
    win.addEventListener('scroll', () => {
      scrollPos.current = win.scrollY;
    });
  };

  const frame = <iframe ref={iframeRef} title={title} srcDoc={debounced} onLoad={handleLoad} />;

  if (fullscreen) {
    return (
      <div className="preview-fullscreen">
        <div className="preview-fullscreen-bar">
          <span>real-scale view — Esc to exit</span>
          <button onClick={() => setFullscreen(false)}>Exit fullscreen</button>
        </div>
        {frame}
      </div>
    );
  }

  return (
    <div className="preview-frame-wrap">
      <button className="preview-expand-btn" onClick={() => setFullscreen(true)} title="View at real scale">
        ⤢ fullscreen
      </button>
      {frame}
    </div>
  );
}
