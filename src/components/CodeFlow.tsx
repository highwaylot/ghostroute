import { useEffect, useRef } from 'react';

// Ambient "flowing code" background for the landing page, with a hidden
// pong mode (type "pong" on the page; Esc quits).
//
// Built around one rule: the page must feel exactly as it did without it.
// So the canvas sits behind the content with pointer-events: none — the
// language tiles stay clickable, untouched — and mouse/click reactions
// are read from `window` instead. Nothing here goes through React state
// per frame: all particle data lives in typed arrays inside a single
// requestAnimationFrame loop, draws are batched into a few style passes
// (one font/fillStyle set per bucket, not per glyph), devicePixelRatio is
// capped, the loop pauses on hidden tabs, and prefers-reduced-motion gets
// a single static frame instead of an animation.

const MAX_DPR = 1.5;
const MIN_PARTICLES = 60;
const MAX_PARTICLES = 220;
const AREA_PER_PARTICLE = 9000;
const MOUSE_RADIUS = 130;
const CLICK_RADIUS = 190;

// Pong tuning. The cpu predicts where the ball will cross its line rather
// than chasing the ball's current x — chasing can't keep up once the ball
// is fast, which made it trivially beatable. AI_AIM_ERROR keeps it human:
// a per-rally offset, so well-angled edge shots still get past it.
const PONG_BASE_SPEED = 420;
const PONG_SPEEDUP = 1.07;
const PONG_MAX_SPEED = 1000;
const AI_MAX_SPEED = 520;
const AI_AIM_ERROR = 0.4; // fraction of half the paddle width

// The easter egg's four letters drift among the digits; click them in
// order and each lights green, the fourth starts the game. They're kept
// out of the central content box: a letter drifting behind a language
// tile would mean clicking it also navigates away.
const LETTERS = ['p', 'o', 'n', 'g'];
const LETTER_HIT_RADIUS = 34;
const LETTER_HOVER_RADIUS = 64; // a letter freezes while the cursor is this close, so it's catchable
const LETTER_MARGIN = 36;
const CLICK_BOOST = 1.12; // mid-rally click: ball speed multiplier

// Four draw buckets: 2 sizes × 2 tones. Particles are allocated in bucket
// order so each frame sets font/fillStyle only four times.
const BUCKET_FONT = ['12px', '12px', '16px', '16px'];
const BUCKET_COLOR = ['rgba(154, 168, 232, ', 'rgba(84, 120, 240, ', 'rgba(154, 168, 232, ', 'rgba(84, 120, 240, '];
const BUCKET_BASE_ALPHA = [0.18, 0.22, 0.26, 0.3];

type Mode = 'static' | 'flow' | 'pong';

export function CodeFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mono = getComputedStyle(document.documentElement).getPropertyValue('--mono') || 'monospace';

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let mode: Mode = reduced ? 'static' : 'flow';
    let last = performance.now();

    // --- particles -------------------------------------------------------
    const count = Math.max(
      MIN_PARTICLES,
      Math.min(MAX_PARTICLES, Math.round((host.clientWidth * host.clientHeight) / AREA_PER_PARTICLE)),
    );
    const px = new Float32Array(count);
    const py = new Float32Array(count);
    const vx = new Float32Array(count);
    const vy = new Float32Array(count);
    const baseVy = new Float32Array(count);
    const phase = new Float32Array(count);
    const flash = new Float32Array(count); // click brightness, decays to 0
    const glyph = new Uint8Array(count); // 0 or 1
    const bucketStart = [0, 0, 0, 0];
    for (let i = 0; i < count; i++) {
      const b = Math.floor((i / count) * 4);
      if (bucketStart[b] === 0 && b > 0) bucketStart[b] = i;
      glyph[i] = Math.random() < 0.5 ? 0 : 1;
      phase[i] = Math.random() * Math.PI * 2;
      baseVy[i] = -(14 + Math.random() * 22) * (b >= 2 ? 1.25 : 1); // px/s, bigger = a touch faster
    }
    bucketStart[0] = 0;
    const bucketEnd = [bucketStart[1], bucketStart[2], bucketStart[3], count];

    const scatter = () => {
      for (let i = 0; i < count; i++) {
        px[i] = Math.random() * width;
        py[i] = Math.random() * height;
        vx[i] = 0;
        vy[i] = baseVy[i];
      }
    };

    // --- the p o n g letters ----------------------------------------------
    const lx = new Float32Array(4);
    const ly = new Float32Array(4);
    const lvx = new Float32Array(4);
    const lvy = new Float32Array(4);
    const lphase = new Float32Array(4);
    let lit = 0; // how many letters are lit, in order
    // content box (the hero/mission/tiles), in canvas coords — letters stay outside it
    const inner = { left: 0, top: 0, right: 0, bottom: 0 };
    const measureInner = () => {
      const el = host.querySelector('.landing-inner');
      if (!el) return;
      const h = host.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      inner.left = r.left - h.left - LETTER_MARGIN;
      inner.top = r.top - h.top - LETTER_MARGIN;
      inner.right = r.right - h.left + LETTER_MARGIN;
      inner.bottom = r.bottom - h.top + LETTER_MARGIN;
    };
    const sidesHaveRoom = () => inner.left > 80 && width - inner.right > 80;
    const spawnLetter = (i: number, fromBottom: boolean) => {
      if (sidesHaveRoom()) {
        const leftSide = Math.random() < 0.5;
        lx[i] = leftSide ? 24 + Math.random() * (inner.left - 48) : inner.right + 24 + Math.random() * (width - inner.right - 48);
        ly[i] = fromBottom ? height + 20 : 40 + Math.random() * (height - 80);
      } else {
        // narrow viewport: content spans the width, so use the top/bottom bands
        lx[i] = 24 + Math.random() * (width - 48);
        const topBand = inner.top > 80;
        ly[i] = fromBottom ? height + 20 : topBand ? 30 + Math.random() * (inner.top - 60) : inner.bottom + 20;
      }
      lvx[i] = 0;
      lvy[i] = -(9 + Math.random() * 7);
      lphase[i] = Math.random() * Math.PI * 2;
    };
    const resetLetters = () => {
      lit = 0;
      for (let i = 0; i < 4; i++) spawnLetter(i, false);
    };
    // keep a letter out of the content box by pushing it to the nearest edge
    const keepOut = (i: number) => {
      const x = lx[i];
      const y = ly[i];
      if (x <= inner.left || x >= inner.right || y <= inner.top || y >= inner.bottom) return;
      const dl = x - inner.left;
      const dr = inner.right - x;
      const dt = y - inner.top;
      const db = inner.bottom - y;
      const m = Math.min(dl, dr, dt, db);
      if (m === dl) lx[i] = inner.left - 1;
      else if (m === dr) lx[i] = inner.right + 1;
      else if (m === dt) ly[i] = inner.top - 1;
      else ly[i] = inner.bottom + 1;
    };

    // --- input (window-level, never on the canvas in flow mode) -----------
    let mx = -9999;
    let my = -9999;
    let mouseInside = false;
    const onPointerMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      mouseInside = mx >= 0 && my >= 0 && mx <= width && my <= height;
    };
    const onPointerLeave = () => {
      mouseInside = false;
    };
    const burst = (cx: number, cy: number) => {
      for (let i = 0; i < count; i++) {
        const dx = px[i] - cx;
        const dy = py[i] - cy;
        const d2 = dx * dx + dy * dy;
        if (d2 < CLICK_RADIUS * CLICK_RADIUS && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const k = (1 - d / CLICK_RADIUS) * 260;
          vx[i] += (dx / d) * k;
          vy[i] += (dy / d) * k;
          flash[i] = 1;
          glyph[i] ^= 1;
        }
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const cx = e.clientX - r.left;
      const cy = e.clientY - r.top;
      if (mode === 'pong') {
        if (pong.serving) {
          serve();
        } else {
          // click anywhere mid-rally to crank the ball up
          const p = pong;
          p.speed = Math.min(PONG_MAX_SPEED, p.speed * CLICK_BOOST);
          const mag = Math.hypot(p.ballVX, p.ballVY) || 1;
          p.ballVX = (p.ballVX / mag) * p.speed;
          p.ballVY = (p.ballVY / mag) * p.speed;
          burst(p.ballX, p.ballY);
        }
        return;
      }
      burst(cx, cy);
      if (mode !== 'flow') return;
      // letter hit-test: only the next letter in sequence counts
      const i = lit;
      const dx = lx[i] - cx;
      const dy = ly[i] - cy;
      if (dx * dx + dy * dy <= LETTER_HIT_RADIUS * LETTER_HIT_RADIUS) {
        lit++;
        if (lit === 4) enterPong();
      }
    };

    // --- pong ----------------------------------------------------------------
    const pong = {
      ballX: 0,
      ballY: 0,
      ballVX: 0,
      ballVY: 0,
      playerX: 0,
      aiX: 0,
      paddleW: 110,
      paddleH: 10,
      ballR: 7,
      speed: PONG_BASE_SPEED,
      serving: true,
      playerScore: 0,
      aiScore: 0,
      aiOffset: 0,
      trail: new Float32Array(24 * 2),
      trailHead: 0,
    };
    const setServing = (on: boolean) => {
      pong.serving = on;
      canvas.dataset.serving = on ? 'true' : 'false';
    };
    // Ball back to center, trail cleared, waiting on a serve — called on
    // entering pong and after every point, so a scored point visibly
    // resets instead of leaving the ball off-screen until the next click.
    const resetBall = () => {
      pong.ballX = width / 2;
      pong.ballY = height / 2;
      pong.ballVX = 0;
      pong.ballVY = 0;
      pong.trail.fill(-100);
      setServing(true);
    };
    const serve = () => {
      const angle = (Math.random() * 0.8 - 0.4) + (Math.random() < 0.5 ? Math.PI / 2 : -Math.PI / 2);
      pong.speed = PONG_BASE_SPEED;
      pong.ballVX = Math.cos(angle) * pong.speed;
      pong.ballVY = Math.sin(angle) * pong.speed;
      pong.aiOffset = (Math.random() * 2 - 1) * AI_AIM_ERROR;
      setServing(false);
    };
    const enterPong = () => {
      mode = 'pong';
      pong.playerScore = 0;
      pong.aiScore = 0;
      pong.playerX = width / 2;
      pong.aiX = width / 2;
      resetBall();
      canvas.style.pointerEvents = 'auto';
      canvas.dataset.mode = 'pong';
      host.classList.add('landing--pong');
    };
    const exitPong = () => {
      mode = reduced ? 'static' : 'flow';
      canvas.style.pointerEvents = 'none';
      canvas.dataset.mode = mode;
      host.classList.remove('landing--pong');
      resetLetters();
      if (reduced) drawStatic();
    };

    let keyBuf = '';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mode === 'pong') {
        exitPong();
        return;
      }
      if (e.key === ' ' && mode === 'pong') {
        e.preventDefault();
        if (pong.serving) serve();
        return;
      }
      if (e.key.length !== 1) return;
      keyBuf = (keyBuf + e.key.toLowerCase()).slice(-4);
      if (keyBuf === 'pong') {
        keyBuf = '';
        if (mode === 'pong') exitPong();
        else if (!reduced) enterPong();
      }
    };

    // --- sizing ------------------------------------------------------------
    const resize = () => {
      width = host.clientWidth;
      height = host.clientHeight;
      dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      for (let i = 0; i < count; i++) {
        if (px[i] > width) px[i] = Math.random() * width;
        if (py[i] > height) py[i] = Math.random() * height;
      }
      measureInner();
      for (let i = 0; i < 4; i++) keepOut(i);
      if (mode === 'static') drawStatic();
    };
    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 80);
    });

    // --- drawing -----------------------------------------------------------
    const drawParticles = (alphaScale: number) => {
      for (let b = 0; b < 4; b++) {
        ctx.font = `${BUCKET_FONT[b]} ${mono}`;
        const color = BUCKET_COLOR[b];
        const base = BUCKET_BASE_ALPHA[b] * alphaScale;
        // Two sub-passes per bucket: unflashed (one fillStyle) and flashed
        // (brighter). Flashes are rare, so the second pass is usually tiny.
        ctx.fillStyle = `${color}${base})`;
        for (let i = bucketStart[b]; i < bucketEnd[b]; i++) {
          if (flash[i] > 0.02) continue;
          ctx.fillText(glyph[i] ? '1' : '0', px[i], py[i]);
        }
        for (let i = bucketStart[b]; i < bucketEnd[b]; i++) {
          if (flash[i] <= 0.02) continue;
          ctx.fillStyle = `${color}${Math.min(1, base + flash[i] * 0.7)})`;
          ctx.fillText(glyph[i] ? '1' : '0', px[i], py[i]);
        }
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      drawParticles(0.8);
    };

    const lhover = new Uint8Array(4);
    const stepLetters = (dt: number, t: number) => {
      const hr2 = LETTER_HOVER_RADIUS * LETTER_HOVER_RADIUS;
      for (let i = 0; i < 4; i++) {
        // Unlike the digits, letters never run from the cursor — and when
        // it gets close they stop dead, so they can actually be clicked.
        let hovered = 0;
        if (mouseInside) {
          const dx = lx[i] - mx;
          const dy = ly[i] - my;
          if (dx * dx + dy * dy < hr2) hovered = 1;
        }
        lhover[i] = hovered;
        if (hovered) {
          lvx[i] = 0;
          lvy[i] = 0;
          continue;
        }
        const wobble = Math.sin(t * 0.0009 + lphase[i]) * 4;
        lvx[i] += (wobble - lvx[i]) * Math.min(1, dt * 1.5);
        lvy[i] += (-(7 + (i % 2) * 3) - lvy[i]) * Math.min(1, dt * 1.5);
        lx[i] += lvx[i] * dt;
        ly[i] += lvy[i] * dt;
        keepOut(i);
        if (ly[i] < -24) spawnLetter(i, true);
        if (lx[i] < 12) lx[i] = 12;
        else if (lx[i] > width - 12) lx[i] = width - 12;
      }
    };

    const drawLetters = () => {
      ctx.font = `700 26px ${mono}`;
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 4; i++) {
        if (i < lit) {
          ctx.strokeStyle = 'rgba(58, 201, 129, 0.5)';
          ctx.beginPath();
          ctx.arc(lx[i], ly[i], 18, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = 'rgba(58, 201, 129, 0.95)';
        } else if (lhover[i]) {
          // hovered: a ring says "this is a thing you can click"
          ctx.strokeStyle = 'rgba(200, 208, 255, 0.5)';
          ctx.beginPath();
          ctx.arc(lx[i], ly[i], 18, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        } else {
          ctx.fillStyle = 'rgba(200, 208, 255, 0.75)';
        }
        ctx.fillText(LETTERS[i], lx[i], ly[i]);
      }
    };

    const stepParticles = (dt: number, t: number) => {
      const r2 = MOUSE_RADIUS * MOUSE_RADIUS;
      for (let i = 0; i < count; i++) {
        // gentle sideways wobble on top of the base upward drift
        const wobble = Math.sin(t * 0.0012 + phase[i]) * 6;
        // relax velocity back toward base drift
        vx[i] += (wobble - vx[i]) * Math.min(1, dt * 1.8);
        vy[i] += (baseVy[i] - vy[i]) * Math.min(1, dt * 1.8);
        if (mouseInside) {
          const dx = px[i] - mx;
          const dy = py[i] - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const k = (1 - d / MOUSE_RADIUS) * 140;
            vx[i] += (dx / d) * k * dt * 6;
            vy[i] += (dy / d) * k * dt * 6;
          }
        }
        px[i] += vx[i] * dt;
        py[i] += vy[i] * dt;
        if (flash[i] > 0) flash[i] = Math.max(0, flash[i] - dt * 1.6);
        if (Math.random() < dt * 0.35) glyph[i] ^= 1;
        // wrap
        if (py[i] < -20) {
          py[i] = height + 20;
          px[i] = Math.random() * width;
        } else if (py[i] > height + 20) {
          py[i] = -20;
        }
        if (px[i] < -20) px[i] = width + 20;
        else if (px[i] > width + 20) px[i] = -20;
      }
    };

    const stepPong = (dt: number) => {
      const p = pong;
      const topY = 34;
      if (mouseInside) p.playerX += (mx - p.playerX) * Math.min(1, dt * 26);
      p.playerX = Math.max(p.paddleW / 2, Math.min(width - p.paddleW / 2, p.playerX));

      // cpu: when the ball is coming, predict where it crosses the cpu's
      // line (folding for wall bounces) and head there at full speed. When
      // the ball is moving away it just lazily shadows the ball's x at a
      // third of that — no snapping back to center after every hit, which
      // read as robotic. Capped speed + the per-rally aim error keep it
      // beatable without being a pushover.
      let aiTarget = p.aiX;
      let aiMax = AI_MAX_SPEED * dt;
      if (!p.serving && p.ballVY < 0) {
        const t = (p.ballY - topY) / -p.ballVY;
        let predX = p.ballX + p.ballVX * t;
        const span = width - 2 * p.ballR;
        predX = Math.abs(((predX - p.ballR) % (2 * span) + 2 * span) % (2 * span));
        if (predX > span) predX = 2 * span - predX;
        aiTarget = predX + p.ballR + p.aiOffset * (p.paddleW / 2);
      } else if (!p.serving) {
        aiTarget = p.ballX;
        aiMax *= 0.35;
      }
      p.aiX += Math.max(-aiMax, Math.min(aiMax, aiTarget - p.aiX));
      p.aiX = Math.max(p.paddleW / 2, Math.min(width - p.paddleW / 2, p.aiX));
      if (p.serving) return;

      p.ballX += p.ballVX * dt;
      p.ballY += p.ballVY * dt;
      p.trail[p.trailHead * 2] = p.ballX;
      p.trail[p.trailHead * 2 + 1] = p.ballY;
      p.trailHead = (p.trailHead + 1) % 24;

      if (p.ballX < p.ballR) {
        p.ballX = p.ballR;
        p.ballVX = Math.abs(p.ballVX);
      } else if (p.ballX > width - p.ballR) {
        p.ballX = width - p.ballR;
        p.ballVX = -Math.abs(p.ballVX);
      }
      const bottomY = height - 34;
      const hit = (paddleX: number, paddleY: number, dirUp: boolean) => {
        const withinX = Math.abs(p.ballX - paddleX) <= p.paddleW / 2 + p.ballR;
        const crossing = dirUp ? p.ballY + p.ballR >= paddleY && p.ballVY > 0 : p.ballY - p.ballR <= paddleY && p.ballVY < 0;
        if (!withinX || !crossing) return false;
        const offset = (p.ballX - paddleX) / (p.paddleW / 2); // -1..1
        p.speed = Math.min(PONG_MAX_SPEED, p.speed * PONG_SPEEDUP);
        const angle = offset * 1.0; // steer by where it hit the paddle
        p.ballVX = Math.sin(angle) * p.speed;
        p.ballVY = (dirUp ? -1 : 1) * Math.cos(angle) * p.speed;
        p.ballY = dirUp ? paddleY - p.ballR - 1 : paddleY + p.ballR + 1;
        if (dirUp) p.aiOffset = (Math.random() * 2 - 1) * AI_AIM_ERROR; // fresh error each time it's sent back
        burst(p.ballX, p.ballY);
        return true;
      };
      hit(p.playerX, bottomY, true) || hit(p.aiX, topY, false);

      if (p.ballY > height + 30) {
        p.aiScore++;
        resetBall();
      } else if (p.ballY < -30) {
        p.playerScore++;
        resetBall();
      }
    };

    const drawPong = () => {
      const p = pong;
      ctx.fillStyle = 'rgba(84, 120, 240, 0.9)';
      const bottomY = height - 34;
      const topY = 34;
      ctx.beginPath();
      ctx.roundRect(p.playerX - p.paddleW / 2, bottomY, p.paddleW, p.paddleH, 5);
      ctx.fill();
      ctx.fillStyle = 'rgba(154, 168, 232, 0.8)';
      ctx.beginPath();
      ctx.roundRect(p.aiX - p.paddleW / 2, topY - p.paddleH, p.paddleW, p.paddleH, 5);
      ctx.fill();

      // ball trail as fading digits, then the ball itself
      ctx.font = `12px ${mono}`;
      for (let k = 0; k < 24; k++) {
        const idx = (p.trailHead + k) % 24;
        const tx = p.trail[idx * 2];
        const ty = p.trail[idx * 2 + 1];
        if (tx < 0) continue;
        ctx.fillStyle = `rgba(154, 168, 232, ${(k / 24) * 0.5})`;
        ctx.fillText(k % 2 ? '1' : '0', tx, ty);
      }
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(p.ballX, p.ballY, p.ballR, 0, Math.PI * 2);
      ctx.fill();

      // HUD top-right: top-left is the brand logo, top-center is the cpu paddle.
      ctx.font = `13px ${mono}`;
      ctx.textAlign = 'right';
      ctx.fillStyle = 'rgba(200, 208, 255, 0.85)';
      ctx.fillText(`pong  ·  you ${p.playerScore} : ${p.aiScore} cpu`, width - 18, 20);
      ctx.fillStyle = 'rgba(154, 168, 232, 0.7)';
      ctx.fillText(p.serving ? 'click or space to serve  ·  esc to quit' : 'click to speed up  ·  esc to quit', width - 18, 40);
      ctx.textAlign = 'center';
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000); // clamp so a stalled tab doesn't teleport
      last = now;
      if (document.hidden || mode === 'static') return;
      ctx.clearRect(0, 0, width, height);
      stepParticles(dt, now);
      if (mode === 'pong') {
        drawParticles(0.45);
        stepPong(dt);
        drawPong();
      } else {
        drawParticles(1);
        stepLetters(dt, now);
        drawLetters();
      }
    };

    // --- wire up ---------------------------------------------------------------
    resize();
    scatter();
    resetLetters();
    canvas.dataset.mode = mode;
    // Test seam: read-only snapshot of the parts a browser test can't see
    // through the DOM. A function property, so it costs nothing per frame.
    (canvas as HTMLCanvasElement & { __codeflow?: unknown }).__codeflow = {
      letters: () => LETTERS.map((ch, i) => ({ ch, x: lx[i], y: ly[i], lit: i < lit })),
      ball: () => ({ x: pong.ballX, y: pong.ballY, serving: pong.serving, speed: pong.speed, aiX: pong.aiX }),
    };
    ro.observe(host);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerleave', onPointerLeave);
    const onVisibility = () => {
      last = performance.now();
    };
    document.addEventListener('visibilitychange', onVisibility);

    if (mode === 'static') drawStatic();
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      host.classList.remove('landing--pong');
    };
  }, []);

  return <canvas ref={canvasRef} className="code-flow" aria-hidden="true" />;
}
