import { useRef, useState } from 'react';
import { playCopyTick } from '../lib/celebrate';

type Props = {
  text: string;
  className?: string;
  iconOnly?: boolean;
};

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7" y="7" width="10" height="10" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 7V4.6A1.6 1.6 0 0 0 11.4 3H4.6A1.6 1.6 0 0 0 3 4.6v6.8A1.6 1.6 0 0 0 4.6 13H7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="m4 10.5 4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Shared copy-to-clipboard button: a quiet tick plus a brief white bounce
// on the button itself, deliberately subtle — this fires often (every code
// block has one), so it can't afford to be a full celebration moment.
// iconOnly drops the text label for a small icon that a parent can choose
// to keep hidden until hover (see .key-copy-btn in App.css).
export function CopyButton({ text, className, iconOnly }: Props) {
  const [copied, setCopied] = useState(false);
  const [bounce, setBounce] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    playCopyTick();
    setCopied(true);
    setBounce(true);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setCopied(false);
      setBounce(false);
    }, 1200);
  };

  return (
    <button
      className={`copy-btn ${iconOnly ? 'copy-btn-icon' : ''} ${bounce ? 'copy-btn-bounce' : ''} ${className ?? ''}`}
      onClick={handleCopy}
      title={iconOnly ? (copied ? 'Copied!' : 'Copy') : undefined}
    >
      {iconOnly ? copied ? <CheckIcon /> : <CopyIcon /> : copied ? 'copied!' : 'copy'}
    </button>
  );
}
