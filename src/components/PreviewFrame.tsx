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
  const [popupBlocked, setPopupBlocked] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const scrollPos = useRef(0);
  const popupRef = useRef<Window | null>(null);
  const popupScrollPos = useRef(0);
  const [, forceRerender] = useState(0);

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

  // A real, separate browser window — draggable to a second monitor,
  // resizable and zoomable with the browser's own native controls, unlike
  // the in-page fullscreen. Pushed to via document.write on every debounced
  // update, same scroll-preserving approach as the iframe.
  const writeToPopup = (win: Window) => {
    try {
      win.document.open();
      win.document.write(debounced);
      win.document.close();
      win.document.title = title;
      win.scrollTo(0, popupScrollPos.current);
      win.addEventListener('scroll', () => {
        popupScrollPos.current = win.scrollY;
      });
    } catch {
      popupRef.current = null;
      forceRerender((n) => n + 1);
    }
  };

  useEffect(() => {
    const win = popupRef.current;
    if (!win || win.closed) return;
    writeToPopup(win);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (popupRef.current?.closed) {
        popupRef.current = null;
        forceRerender((n) => n + 1);
      }
    }, 600);
    return () => window.clearInterval(id);
  }, []);

  const togglePopup = () => {
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.close();
      popupRef.current = null;
      forceRerender((n) => n + 1);
      return;
    }
    const win = window.open('', '_blank', 'width=900,height=700');
    if (!win) {
      setPopupBlocked(true);
      window.setTimeout(() => setPopupBlocked(false), 3000);
      return;
    }
    popupRef.current = win;
    writeToPopup(win);
    forceRerender((n) => n + 1);
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

  const popupOpen = Boolean(popupRef.current && !popupRef.current.closed);

  return (
    <div className="preview-frame-wrap">
      <div className="preview-frame-actions">
        {popupBlocked && <span className="preview-popup-blocked">Popup blocked — allow popups for this site</span>}
        <button className="preview-expand-btn" onClick={togglePopup}>
          {popupOpen ? '✕ close pop-out' : '⤢ pop out'}
        </button>
        <button className="preview-expand-btn" onClick={() => setFullscreen(true)} title="View at real scale">
          ⤢ fullscreen
        </button>
      </div>
      {frame}
    </div>
  );
}
