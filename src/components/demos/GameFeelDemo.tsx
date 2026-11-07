import { useEffect, useRef, useState } from 'react';

// A one-button runner to feel the "game feel" and "juice" ideas. The rules
// never change: run, jump the blocks and pits. Only the numbers and the
// effects do, and the same game goes from stiff to lovely.

type Settings = {
  gravity: number;
  jump: number;
  speed: number;
  coyote: boolean;
  buffer: boolean;
  squash: boolean;
  dust: boolean;
  shake: boolean;
  sound: boolean;
};

const PLAIN: Settings = { gravity: 2400, jump: 760, speed: 260, coyote: false, buffer: false, squash: false, dust: false, shake: false, sound: false };
const JUICY: Settings = { ...PLAIN, coyote: true, buffer: true, squash: true, dust: true, shake: true, sound: true };

const H = 220;
const GROUND = H - 40;
const SIZE = 26;
const PX = 80;
const COYOTE = 0.1;
const BUFFER = 0.13;
const BEST_KEY = 'tagsmiths-gamefeel-best';

type Obstacle = { kind: 'block' | 'pit'; x: number; w: number; h: number };
type Dust = { x: number; y: number; vx: number; vy: number; life: number };
type Phase = 'ready' | 'running' | 'dead';

function loadBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

export function GameFeelDemo() {
  const [settings, setSettings] = useState<Settings>(PLAIN);
  const [best, setBest] = useState(loadBest);
  const [last, setLast] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);
  const pressRef = useRef<() => void>(() => {});
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let W = 600;
    let colors = { ink: '#1e2440', dim: '#676d8c', blue: '#3b63e8', line: '#e4e6f0', bg: '#f4f5fa' };
    const readColors = () => {
      const css = getComputedStyle(canvas);
      const v = (n: string, d: string) => css.getPropertyValue(n).trim() || d;
      colors = { ink: v('--ink', colors.ink), dim: v('--ink-dim', colors.dim), blue: v('--blue-bright', colors.blue), line: v('--line', colors.line), bg: v('--panel', colors.bg) };
    };
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.clientWidth || 600;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    readColors();
    resize();

    // Game state lives here, outside React, and is reset on each run.
    let phase: Phase = 'ready';
    let y = GROUND - SIZE;
    let vy = 0;
    let onGround = true;
    let jumpedSinceGround = false;
    let lastGround = 0;
    let bufferedAt = -1;
    let t = 0;
    let dist = 0;
    let untilNext = 420;
    let obstacles: Obstacle[] = [];
    let dust: Dust[] = [];
    let squash = 0;
    let shake = 0;
    let runDust = 0;
    let audio: AudioContext | null = null;

    const beep = (kind: 'jump' | 'land' | 'hit') => {
      if (!settingsRef.current.sound) return;
      try {
        audio ??= new AudioContext();
        const o = audio.createOscillator();
        const g = audio.createGain();
        const now = audio.currentTime;
        if (kind === 'jump') {
          o.type = 'square';
          o.frequency.setValueAtTime(330, now);
          o.frequency.exponentialRampToValueAtTime(760, now + 0.09);
          g.gain.setValueAtTime(0.05, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        } else if (kind === 'land') {
          o.type = 'sine';
          o.frequency.setValueAtTime(140, now);
          g.gain.setValueAtTime(0.12, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        } else {
          o.type = 'sawtooth';
          o.frequency.setValueAtTime(220, now);
          o.frequency.exponentialRampToValueAtTime(50, now + 0.3);
          g.gain.setValueAtTime(0.08, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
        }
        o.connect(g).connect(audio.destination);
        o.start(now);
        o.stop(now + 0.35);
      } catch {
        // no audio here: the game still works
      }
    };

    const puff = (n: number, x: number, yy: number, up = 1) => {
      if (!settingsRef.current.dust) return;
      for (let i = 0; i < n; i++)
        dust.push({ x, y: yy, vx: (Math.random() - 0.5) * 140 - settingsRef.current.speed * 0.3, vy: -Math.random() * 90 * up, life: 0.35 + Math.random() * 0.2 });
    };

    const reset = () => {
      y = GROUND - SIZE;
      vy = 0;
      onGround = true;
      jumpedSinceGround = false;
      lastGround = t;
      bufferedAt = -1;
      dist = 0;
      untilNext = 420;
      obstacles = [];
      dust = [];
      squash = 0;
    };

    const doJump = () => {
      vy = -settingsRef.current.jump;
      onGround = false;
      jumpedSinceGround = true;
      bufferedAt = -1;
      squash = -1;
      puff(5, PX + SIZE / 2, GROUND);
      beep('jump');
    };

    pressRef.current = () => {
      if (phase !== 'running') {
        reset();
        phase = 'running';
        return;
      }
      const s = settingsRef.current;
      const coyoteOk = s.coyote && !jumpedSinceGround && t - lastGround < COYOTE;
      if (onGround || coyoteOk) doJump();
      else if (s.buffer) bufferedAt = t;
    };

    // The highest surface under the player's feet: the ground (unless over
    // a pit) or the top of a block.
    const surfaceUnder = () => {
      const l = PX + 4;
      const r = PX + SIZE - 4;
      let surface = Infinity;
      const overPit = obstacles.some((o) => o.kind === 'pit' && o.x <= l && r <= o.x + o.w);
      if (!overPit) surface = GROUND;
      for (const o of obstacles) if (o.kind === 'block' && r > o.x && l < o.x + o.w) surface = Math.min(surface, GROUND - o.h);
      return surface;
    };

    const die = () => {
      phase = 'dead';
      if (settingsRef.current.shake && !reduce) shake = 10;
      beep('hit');
      const score = Math.floor(dist / 20);
      setLast(score);
      setBest((b) => {
        const nb = Math.max(b, score);
        try {
          localStorage.setItem(BEST_KEY, String(nb));
        } catch {
          // best score just won't persist
        }
        return nb;
      });
    };

    const step = (dt: number) => {
      const s = settingsRef.current;
      t += dt;
      squash += (0 - squash) * Math.min(1, dt * 14);
      shake = Math.max(0, shake - dt * 40);
      dust = dust.filter((d) => (d.life -= dt) > 0);
      for (const d of dust) {
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        d.vy += 300 * dt;
      }
      if (phase !== 'running') return;

      dist += s.speed * dt;
      for (const o of obstacles) o.x -= s.speed * dt;
      obstacles = obstacles.filter((o) => o.x + o.w > -20);
      untilNext -= s.speed * dt;
      if (untilNext <= 0) {
        const pit = Math.random() < 0.45;
        const o: Obstacle = pit ? { kind: 'pit', x: W + 10, w: 60 + Math.random() * 45, h: 0 } : { kind: 'block', x: W + 10, w: 22 + Math.random() * 10, h: 26 + Math.random() * 22 };
        obstacles.push(o);
        untilNext = o.w + 230 + Math.random() * 220;
      }

      const prevBottom = y + SIZE;
      vy += s.gravity * dt;
      y += vy * dt;
      const surface = surfaceUnder();
      if (vy >= 0 && prevBottom <= surface + 1 && y + SIZE >= surface) {
        y = surface - SIZE;
        if (!onGround) {
          // Landing.
          if (s.squash) squash = 1;
          puff(8, PX + SIZE / 2, surface, 0.7);
          if (s.shake && !reduce) shake = Math.max(shake, 2.5);
          beep('land');
          onGround = true;
          jumpedSinceGround = false;
          if (s.buffer && bufferedAt >= 0 && t - bufferedAt < BUFFER) {
            lastGround = t;
            doJump();
            return;
          }
        }
        vy = 0;
        onGround = true;
        lastGround = t;
      } else if (y + SIZE < surface - 0.5 || surface === Infinity) {
        onGround = false;
      }

      if (onGround) {
        runDust -= dt;
        if (runDust <= 0) {
          puff(1, PX + 2, y + SIZE, 0.4);
          runDust = 0.09;
        }
      }

      // Hitting the side of a block, or falling into a pit.
      for (const o of obstacles) {
        if (o.kind !== 'block') continue;
        const top = GROUND - o.h;
        if (PX + SIZE - 3 > o.x && PX + 3 < o.x + o.w && y + SIZE - 3 > top && y + 3 < GROUND) {
          if (!(y + SIZE <= top + 1)) return die();
        }
      }
      if (y > GROUND + 10) return die();
    };

    const render = () => {
      ctx.save();
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, W, H);
      if (shake > 0) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
      // Ground, with pits cut out.
      ctx.fillStyle = colors.line;
      const pits = obstacles.filter((o) => o.kind === 'pit').sort((a, b) => a.x - b.x);
      let gx = -20;
      for (const p of pits) {
        ctx.fillRect(gx, GROUND, p.x - gx, H - GROUND + 20);
        gx = p.x + p.w;
      }
      ctx.fillRect(gx, GROUND, W - gx + 20, H - GROUND + 20);
      ctx.fillStyle = colors.dim;
      for (const o of obstacles) if (o.kind === 'block') ctx.fillRect(o.x, GROUND - o.h, o.w, o.h);
      for (const d of dust) {
        ctx.globalAlpha = Math.max(0, d.life * 2);
        ctx.fillStyle = colors.dim;
        ctx.fillRect(d.x - 2, d.y - 2, 4, 4);
      }
      ctx.globalAlpha = 1;
      // The player, squashed and stretched from its feet.
      let sx = 1;
      let sy = 1;
      if (settingsRef.current.squash) {
        if (squash > 0) {
          sy = 1 - 0.35 * squash;
          sx = 1 + 0.35 * squash;
        } else if (!onGround) {
          sy = 1 + Math.min(0.25, Math.abs(vy) / 3200);
          sx = 1 / sy;
        }
      }
      const w = SIZE * sx;
      const h = SIZE * sy;
      ctx.fillStyle = phase === 'dead' ? '#d6455f' : colors.blue;
      ctx.fillRect(PX + SIZE / 2 - w / 2, y + SIZE - h, w, h);
      ctx.fillStyle = '#fff';
      ctx.fillRect(PX + SIZE / 2 + w * 0.12, y + SIZE - h * 0.75, 4, 5);
      ctx.restore();

      ctx.fillStyle = colors.ink;
      ctx.font = '600 13px "IBM Plex Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(String(Math.floor(dist / 20)).padStart(4, '0'), W - 14, 24);
      if (phase !== 'running') {
        ctx.textAlign = 'center';
        ctx.font = '700 15px Manrope, system-ui, sans-serif';
        ctx.fillText(phase === 'ready' ? 'Tap or press Space to start' : 'Ouch. Tap or press Space to go again', W / 2, 78);
      }
    };

    let raf = 0;
    let prev = performance.now();
    let visible = true;
    const loop = (now: number) => {
      const dt = Math.min(1 / 30, (now - prev) / 1000);
      prev = now;
      if (visible && !document.hidden) {
        // Fixed small steps keep the jump the same height at any frame rate.
        let left = dt;
        while (left > 0) {
          const h = Math.min(1 / 240, left);
          step(h);
          left -= h;
        }
        render();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      prev = performance.now();
    });
    io.observe(canvas);
    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    const themeObs = new MutationObserver(readColors);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      themeObs.disconnect();
      window.removeEventListener('resize', onResize);
      void audio?.close();
    };
  }, [reduce]);

  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => setSettings((s) => ({ ...s, [k]: v }));
  const toggles: { k: keyof Settings; label: string; group: 'forgive' | 'juice' }[] = [
    { k: 'coyote', label: 'coyote time', group: 'forgive' },
    { k: 'buffer', label: 'jump buffer', group: 'forgive' },
    { k: 'squash', label: 'squash and stretch', group: 'juice' },
    { k: 'dust', label: 'dust', group: 'juice' },
    { k: 'shake', label: 'screen shake', group: 'juice' },
    { k: 'sound', label: 'sound', group: 'juice' },
  ];
  const sliders: { k: 'gravity' | 'jump' | 'speed'; label: string; min: number; max: number; step: number }[] = [
    { k: 'gravity', label: 'gravity', min: 1000, max: 4500, step: 100 },
    { k: 'jump', label: 'jump strength', min: 450, max: 1150, step: 10 },
    { k: 'speed', label: 'running speed', min: 140, max: 480, step: 10 },
  ];

  return (
    <div className="demo demo-gamefeel">
      <div className="demo-head">
        <span className="demo-tag">try it</span>
        <h4 className="demo-title">The game feel lab</h4>
        <p className="demo-lead">
          Jump the blocks and pits. Play it plain first. Then switch on the effects one at a time and feel the same game change.
        </p>
      </div>
      <canvas
        ref={canvasRef}
        className="gamefeel-canvas"
        tabIndex={0}
        aria-label="A tiny running game. Press Space or tap to jump over blocks and pits."
        onPointerDown={(e) => {
          e.currentTarget.focus();
          pressRef.current();
        }}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'Enter') {
            e.preventDefault();
            if (!e.repeat) pressRef.current();
          }
        }}
      />
      <p className="demo-status" aria-live="polite">
        {last === null ? `Best: ${best}` : `Score: ${last} · best: ${best}`}
      </p>
      <div className="demo-row">
        <button type="button" className="demo-chip" onClick={() => setSettings(PLAIN)}>
          plain
        </button>
        <button type="button" className="demo-chip" onClick={() => setSettings(JUICY)}>
          everything on
        </button>
      </div>
      <div className="gamefeel-controls">
        <fieldset className="gamefeel-group">
          <legend>forgiving controls</legend>
          {toggles
            .filter((t) => t.group === 'forgive')
            .map((t) => (
              <label key={t.k} className="demo-check">
                <input type="checkbox" checked={settings[t.k] as boolean} onChange={(e) => set(t.k, e.target.checked)} />
                {t.label}
              </label>
            ))}
        </fieldset>
        <fieldset className="gamefeel-group">
          <legend>juice</legend>
          {toggles
            .filter((t) => t.group === 'juice')
            .map((t) => (
              <label key={t.k} className="demo-check">
                <input type="checkbox" checked={settings[t.k] as boolean} onChange={(e) => set(t.k, e.target.checked)} />
                {t.label}
                {t.k === 'shake' && reduce ? ' (off: your device asks for less motion)' : ''}
              </label>
            ))}
        </fieldset>
        <fieldset className="gamefeel-group">
          <legend>the numbers</legend>
          {sliders.map((s) => (
            <label key={s.k} className="gamefeel-slider">
              <span>
                {s.label} <span className="demo-mono">{settings[s.k]}</span>
              </span>
              <input type="range" min={s.min} max={s.max} step={s.step} value={settings[s.k]} onChange={(e) => set(s.k, Number(e.target.value))} />
            </label>
          ))}
        </fieldset>
      </div>
    </div>
  );
}
