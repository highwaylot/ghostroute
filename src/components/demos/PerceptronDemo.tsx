import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '../../lib/ThemeContext';

// Rosenblatt's learning rule, live. Dots are -1..1 on both axes. The
// perceptron's line is w1·x + w2·y + b = 0; blue is the side where that
// sum is positive. For each dot on the wrong side, the line is nudged
// toward it. With two groups that a straight line can split, it always
// gets there. With "one or the other, but not both" it never can.

type Dot = { x: number; y: number; label: 1 | -1 };
type Weights = [number, number, number];

const START: Weights = [0.25, -1, 0.35];
const RATE = 0.12;
const MAX_ROUNDS = 40;

const TWO_GROUPS: Dot[] = [
  { x: -0.7, y: 0.6, label: 1 },
  { x: -0.4, y: 0.75, label: 1 },
  { x: -0.55, y: 0.3, label: 1 },
  { x: -0.2, y: 0.5, label: 1 },
  { x: -0.75, y: 0.05, label: 1 },
  { x: 0.1, y: 0.7, label: 1 },
  { x: 0.55, y: -0.2, label: -1 },
  { x: 0.3, y: -0.55, label: -1 },
  { x: 0.75, y: -0.6, label: -1 },
  { x: 0.6, y: 0.2, label: -1 },
  { x: 0.05, y: -0.75, label: -1 },
  { x: 0.4, y: 0.05, label: -1 },
];

const XOR: Dot[] = [
  { x: -0.6, y: 0.6, label: 1 },
  { x: -0.45, y: 0.45, label: 1 },
  { x: 0.6, y: -0.6, label: 1 },
  { x: 0.45, y: -0.45, label: 1 },
  { x: 0.6, y: 0.6, label: -1 },
  { x: 0.45, y: 0.45, label: -1 },
  { x: -0.6, y: -0.6, label: -1 },
  { x: -0.45, y: -0.45, label: -1 },
];

// "0.25x − 1.00y + 0.35 = 0", with real minus signs.
const formatLine = (w: Weights) => {
  const term = (v: number, first: boolean) => (first ? (v < 0 ? '−' : '') : v < 0 ? ' − ' : ' + ') + Math.abs(v).toFixed(2);
  return `${term(w[0], true)}x${term(w[1], false)}y${term(w[2], false)} = 0`;
};

const score = (w: Weights, d: Dot) => w[0] * d.x + w[1] * d.y + w[2];
const wrongCount = (w: Weights, dots: Dot[]) => dots.filter((d) => (score(w, d) >= 0 ? 1 : -1) !== d.label).length;

export function PerceptronDemo() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dots, setDots] = useState<Dot[]>(TWO_GROUPS);
  const [w, setW] = useState<Weights>(START);
  const [paint, setPaint] = useState<1 | -1>(1);
  const [running, setRunning] = useState(false);
  const [rounds, setRounds] = useState(0);
  const [preset, setPreset] = useState<'groups' | 'xor' | 'own'>('groups');
  const [focus, setFocus] = useState<number | null>(null);
  const timer = useRef<number | null>(null);

  const draw = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const size = c.clientWidth;
    if (c.width !== Math.round(size * dpr)) {
      c.width = Math.round(size * dpr);
      c.height = Math.round(size * dpr);
    }
    const ctx = c.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const css = getComputedStyle(c);
    const blue = css.getPropertyValue('--blue').trim() || '#3b63e8';
    const ink = css.getPropertyValue('--ink').trim() || '#1e2440';
    const orange = '#e0862c';
    const toPx = (v: number) => ((v + 1) / 2) * size;
    // Shade each side of the line in its color.
    const cells = 36;
    const cell = size / cells;
    for (let i = 0; i < cells; i++)
      for (let j = 0; j < cells; j++) {
        const x = ((i + 0.5) / cells) * 2 - 1;
        const y = 1 - ((j + 0.5) / cells) * 2;
        ctx.fillStyle = w[0] * x + w[1] * y + w[2] >= 0 ? 'rgba(59, 99, 232, 0.14)' : 'rgba(224, 134, 44, 0.14)';
        ctx.fillRect(i * cell, j * cell, cell + 0.5, cell + 0.5);
      }
    // The line itself: solve for two edge points.
    ctx.strokeStyle = ink;
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (Math.abs(w[1]) > 1e-6) {
      const yAt = (x: number) => -(w[0] * x + w[2]) / w[1];
      ctx.moveTo(toPx(-1), toPx(-yAt(-1)));
      ctx.lineTo(toPx(1), toPx(-yAt(1)));
    } else if (Math.abs(w[0]) > 1e-6) {
      const x = -w[2] / w[0];
      ctx.moveTo(toPx(x), 0);
      ctx.lineTo(toPx(x), size);
    }
    ctx.stroke();
    dots.forEach((d, i) => {
      const px = toPx(d.x);
      const py = toPx(-d.y);
      const wrong = (score(w, d) >= 0 ? 1 : -1) !== d.label;
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fillStyle = d.label === 1 ? blue : orange;
      ctx.fill();
      if (wrong || i === focus) {
        ctx.lineWidth = i === focus ? 3 : 2;
        ctx.strokeStyle = i === focus ? ink : '#d6455f';
        ctx.beginPath();
        ctx.arc(px, py, 11, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
  }, [dots, w, focus]);

  useEffect(() => {
    draw();
  }, [draw, theme]);

  useEffect(() => {
    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [draw]);

  const stop = () => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
    setRunning(false);
    setFocus(null);
  };
  useEffect(() => () => stop(), []);

  // One dot at a time, so you can watch each nudge. A round is one pass
  // over every dot; it stops after a clean round or MAX_ROUNDS.
  const learn = () => {
    if (running || dots.length === 0) return;
    setRunning(true);
    let i = 0;
    let round = 0;
    let mistakes = 0;
    let cur: Weights = [...w];
    timer.current = window.setInterval(() => {
      const d = dots[i];
      setFocus(i);
      if ((score(cur, d) >= 0 ? 1 : -1) !== d.label) {
        mistakes++;
        cur = [cur[0] + RATE * d.label * d.x, cur[1] + RATE * d.label * d.y, cur[2] + RATE * d.label];
        setW(cur);
      }
      i++;
      if (i === dots.length) {
        round++;
        setRounds((r) => r + 1);
        if (mistakes === 0 || round >= MAX_ROUNDS) {
          stop();
          return;
        }
        i = 0;
        mistakes = 0;
      }
    }, dots.length > 10 ? 45 : 70);
  };

  const load = (p: 'groups' | 'xor') => {
    stop();
    setPreset(p);
    setDots(p === 'groups' ? TWO_GROUPS : XOR);
    setW(START);
    setRounds(0);
  };

  const addDot = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (running) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = 1 - ((e.clientY - r.top) / r.height) * 2;
    setPreset('own');
    setDots((ds) => [...ds, { x, y, label: paint }]);
    setRounds(0);
  };

  const wrong = wrongCount(w, dots);
  let status: string;
  if (running) status = `Learning… round ${rounds + 1}. ${wrong} on the wrong side.`;
  else if (rounds === 0) status = `${wrong} of ${dots.length} dots are on the wrong side. Press learn.`;
  else if (wrong === 0) status = `Done in ${rounds} round${rounds === 1 ? '' : 's'}. Every dot is on its own color's side.`;
  else if (preset === 'xor')
    status = `Still ${wrong} wrong after ${rounds} rounds, and it will never get there. No single straight line can split these four groups. That is what the 1969 Perceptrons book proved.`;
  else status = `Still ${wrong} wrong after ${rounds} rounds. Can a straight line split your dots?`;

  return (
    <div className="demo demo-perceptron">
      <div className="demo-head">
        <span className="demo-tag">try it</span>
        <h4 className="demo-title">Train a perceptron (1958)</h4>
        <p className="demo-lead">
          The line is the perceptron's guess: blue on one side, orange on the other. Press learn. Each dot on the wrong side nudges the
          line toward it.
        </p>
      </div>
      <div className="perceptron-body">
        <canvas
          ref={canvasRef}
          className="perceptron-canvas"
          onPointerDown={addDot}
          role="img"
          aria-label={`Perceptron demo: ${dots.length} dots and a dividing line. ${status}`}
        />
        <div className="perceptron-side">
          <p className="demo-status" aria-live="polite">
            {status}
          </p>
          <div className="demo-row">
            <button type="button" className="demo-btn demo-btn-primary" onClick={learn} disabled={running || wrong === 0}>
              learn
            </button>
            <button
              type="button"
              className="demo-btn"
              onClick={() => {
                stop();
                setW(START);
                setRounds(0);
              }}
            >
              reset line
            </button>
          </div>
          <p className="demo-small">Load a set:</p>
          <div className="demo-row">
            <button type="button" className={`demo-chip ${preset === 'groups' ? 'active' : ''}`} onClick={() => load('groups')}>
              two groups
            </button>
            <button type="button" className={`demo-chip ${preset === 'xor' ? 'active' : ''}`} onClick={() => load('xor')}>
              one or the other, not both
            </button>
          </div>
          <p className="demo-small">Or tap the square to add your own dots:</p>
          <div className="demo-row" role="radiogroup" aria-label="Color of new dots">
            <button type="button" role="radio" aria-checked={paint === 1} className={`demo-chip dot-chip ${paint === 1 ? 'active' : ''}`} onClick={() => setPaint(1)}>
              <span className="dot dot-blue" aria-hidden="true" /> blue
            </button>
            <button type="button" role="radio" aria-checked={paint === -1} className={`demo-chip dot-chip ${paint === -1 ? 'active' : ''}`} onClick={() => setPaint(-1)}>
              <span className="dot dot-orange" aria-hidden="true" /> orange
            </button>
            <button
              type="button"
              className="demo-chip"
              onClick={() => {
                stop();
                setDots([]);
                setPreset('own');
                setRounds(0);
              }}
            >
              clear dots
            </button>
          </div>
          <p className="demo-small demo-mono">
            the line: {formatLine(w)}
          </p>
        </div>
      </div>
    </div>
  );
}
