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
  const [popupSuspectedBlocked, setPopupSuspectedBlocked] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const popupCheckTimeout = useRef<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const scrollPos = useRef(0);
  const popupWinRef = useRef<Window | null>(null);
  const popupIframeRef = useRef<HTMLIFrameElement | null>(null);
  const popupScrollPos = useRef(0);

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
  // the in-page fullscreen. Writing raw HTML into the popup's document
  // directly (document.write) on every keystroke turned out unreliable in
  // real use — instead, the popup gets one tiny static shell (written once)
  // holding its own <iframe>, and that inner iframe's srcDoc is what
  // actually updates on every debounced change. Same proven mechanism as
  // the in-page preview above, just relocated into the popup window.
  const closePopup = () => {
    popupWinRef.current?.close();
    popupWinRef.current = null;
    popupIframeRef.current = null;
    setPopupOpen(false);
    setPopupSuspectedBlocked(false);
    if (popupCheckTimeout.current) window.clearTimeout(popupCheckTimeout.current);
  };

  // window.open() succeeding and the popup actually showing real content
  // are two different things — a strict popup/ad blocker can let the
  // window open and then silently strip the injected iframe's content,
  // which window.open()'s return value has no way to tell us about. The
  // shell here has no network fetch to wait on (it's inline content, not
  // a page load), so under any normal circumstance — slow connection
  // included — this check should already have real content well before
  // 2s. If it doesn't, that's a real signal, not a false alarm.
  const scheduleBlockedCheck = () => {
    if (popupCheckTimeout.current) window.clearTimeout(popupCheckTimeout.current);
    popupCheckTimeout.current = window.setTimeout(() => {
      const win = popupWinRef.current;
      const inner = popupIframeRef.current;
      if (!win || win.closed || !inner) return;
      const innerBody = inner.contentDocument?.body;
      const gotContent = Boolean(innerBody && innerBody.children.length > 0);
      if (!gotContent && debounced.trim().length > 0) {
        setPopupSuspectedBlocked(true);
      }
    }, 2000);
  };

  const handlePopupInnerLoad = () => {
    const innerWin = popupIframeRef.current?.contentWindow;
    if (!innerWin) return;
    innerWin.scrollTo(0, popupScrollPos.current);
    innerWin.addEventListener('scroll', () => {
      popupScrollPos.current = innerWin.scrollY;
    });
    // A real load happened — whatever the 2s check might have flagged no
    // longer applies.
    setPopupSuspectedBlocked(false);
  };

  const openPopup = () => {
    setPopupSuspectedBlocked(false);
    const win = window.open('', '_blank', 'width=900,height=700');
    if (!win) {
      setPopupBlocked(true);
      window.setTimeout(() => setPopupBlocked(false), 3000);
      return;
    }
    win.document.open();
    win.document.write(
      '<!DOCTYPE html><html><head><style>html,body{margin:0;height:100%;overflow:hidden}iframe{width:100%;height:100%;border:0;display:block}</style></head><body><iframe id="preview"></iframe></body></html>',
    );
    win.document.close();
    win.document.title = title;

    const innerFrame = win.document.getElementById('preview') as HTMLIFrameElement | null;
    popupWinRef.current = win;
    popupIframeRef.current = innerFrame;
    if (innerFrame) {
      innerFrame.onload = handlePopupInnerLoad;
      innerFrame.srcdoc = debounced;
    }
    setPopupOpen(true);
    scheduleBlockedCheck();
  };

  const togglePopup = () => {
    if (popupWinRef.current && !popupWinRef.current.closed) {
      closePopup();
    } else {
      openPopup();
    }
  };

  // Push every debounced update into the popup's inner iframe.
  useEffect(() => {
    const win = popupWinRef.current;
    const inner = popupIframeRef.current;
    if (!win || win.closed || !inner) return;
    inner.srcdoc = debounced;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  // Detect the user closing the popup window directly (not via our button).
  useEffect(() => {
    const id = window.setInterval(() => {
      if (popupWinRef.current?.closed) {
        popupWinRef.current = null;
        popupIframeRef.current = null;
        setPopupOpen(false);
      }
    }, 600);
    return () => window.clearInterval(id);
  }, []);

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
      {popupSuspectedBlocked && (
        <div className="preview-blocked-banner">
          Pop-out didn't load? A strict ad/popup blocker can silently block it — try disabling extensions for this
          site, or use fullscreen instead.
          <button onClick={() => setPopupSuspectedBlocked(false)} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}
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
