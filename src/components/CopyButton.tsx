import { useRef, useState } from 'react';
import { playCopyTick } from '../lib/celebrate';

type Props = {
  text: string;
  className?: string;
};

// Shared copy-to-clipboard button: a quiet tick plus a brief white bounce
// on the button itself, deliberately subtle — this fires often (every code
// block has one), so it can't afford to be a full celebration moment.
export function CopyButton({ text, className }: Props) {
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
      className={`copy-btn ${bounce ? 'copy-btn-bounce' : ''} ${className ?? ''}`}
      onClick={handleCopy}
    >
      {copied ? 'copied!' : 'copy'}
    </button>
  );
}
