import { useRef, useState } from 'react';
import { playSuccessChime } from './celebrate';

// Shared "you got it" effect for Route, Fix This Code, and Project: plays a
// chime and flashes the editor panel green for a moment, then clears.
export function useSuccessFlash(duration = 800) {
  const [flashing, setFlashing] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const trigger = () => {
    playSuccessChime();
    setFlashing(true);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setFlashing(false), duration);
  };

  return [flashing, trigger] as const;
}
