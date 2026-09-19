import { useEffect, useState } from 'react';

// Tracks failed attempts for whatever's "active" (a route step, a puzzle id)
// and reveals hints progressively: vague first, exact last. Resets whenever
// the active key changes.
export function useHintLadder(activeKey: string) {
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    setAttempts(0);
  }, [activeKey]);

  const registerFail = () => setAttempts((a) => a + 1);
  const reset = () => setAttempts(0);
  const hintLevel = (hints: string[]) => Math.min(attempts, hints.length - 1);

  return { attempts, registerFail, reset, hintLevel };
}
