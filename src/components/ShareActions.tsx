import { useRef, useState } from 'react';
import { buildShareUrl, downloadHtml, SHARE_MAX_CHARS } from '../lib/share';
import { playCopyTick } from '../lib/celebrate';

type Props = {
  name: string;
  code: string;
  sandboxPath: string;
};

// Two ways for a page to leave the site: as a file on the learner's
// machine, or as a link that opens the same code in someone else's
// sandbox. Both are the "show someone what you made" primitive — the
// smallest possible answer to learning alone.
export function ShareActions({ name, code, sandboxPath }: Props) {
  const [copied, setCopied] = useState<'ok' | 'fail' | null>(null);
  const [manualUrl, setManualUrl] = useState<string | null>(null);
  const timer = useRef<number | null>(null);
  const empty = code.trim() === '';
  const tooBig = code.length > SHARE_MAX_CHARS;

  const share = async () => {
    const url = buildShareUrl(sandboxPath, code);
    try {
      await navigator.clipboard.writeText(url);
      playCopyTick();
      setCopied('ok');
    } catch {
      // Clipboard blocked (permissions, an http preview, an old browser):
      // show the link itself, selected, so it can be copied by hand.
      setCopied('fail');
      setManualUrl(url);
    }
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(null), 1800);
  };

  return (
    <>
      <button
        className="btn btn-secondary btn-sm"
        onClick={share}
        disabled={empty || tooBig}
        title={tooBig ? 'Too long to fit in a link — download it instead' : 'Copy a link that opens this code in someone else\'s sandbox'}
      >
        {copied === 'ok' ? 'link copied ✓' : copied === 'fail' ? 'copy it below' : 'share link'}
      </button>
      {manualUrl && (
        <input
          className="share-manual"
          readOnly
          value={manualUrl}
          aria-label="Share link"
          ref={(el) => el?.select()}
          onFocus={(e) => e.currentTarget.select()}
          onBlur={() => setManualUrl(null)}
        />
      )}
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => downloadHtml(name, code)}
        disabled={empty}
        title="Save this as an .html file you can open in any browser"
      >
        download .html
      </button>
    </>
  );
}
