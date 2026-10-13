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
        if (pong.serving) serve();
        return;
      }
      burst(cx, cy);
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
      speed: 300,
      serving: true,
      playerScore: 0,
      aiScore: 0,
      trail: new Float32Array(24 * 2),
      trailHead: 0,
    };
    const serve = () => {
      pong.ballX = width / 2;
      pong.ballY = height / 2;
      const angle = (Math.random() * 0.6 - 0.3) + (Math.random() < 0.5 ? Math.PI / 2 : -Math.PI / 2);
      pong.speed = 300;
      pong.ballVX = Math.cos(angle) * pong.speed;
      pong.ballVY = Math.sin(angle) * pong.speed;
      pong.serving = false;
    };
    const enterPong = () => {
      mode = 'pong';
      pong.playerScore = 0;
      pong.aiScore = 0;
      pong.serving = true;
      pong.ballX = width / 2;
      pong.ballY = height / 2;
      pong.playerX = width / 2;
      pong.aiX = width / 2;
      pong.trail.fill(-100);
      canvas.style.pointerEvents = 'auto';
      canvas.dataset.mode = 'pong';
      host.classList.add('landing--pong');
    };
    const exitPong = () => {
      mode = reduced ? 'static' : 'flow';
      canvas.style.pointerEvents = 'none';
      canvas.dataset.mode = mode;
      host.classList.remove('landing--pong');
      if (reduced) drawStatic();
    };

    let keyBuf = '';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mode === 'pong') {
        exitPong();
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
      if (mouseInside) p.playerX += (mx - p.playerX) * Math.min(1, dt * 18);
      p.playerX = Math.max(p.paddleW / 2, Math.min(width - p.paddleW / 2, p.playerX));
      // AI tracks the ball with limited speed so it's beatable
      const aiTarget = p.ballVY < 0 ? p.ballX : width / 2;
      const aiMax = 240 * dt;
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
      const topY = 34;
      const hit = (paddleX: number, paddleY: number, dirUp: boolean) => {
        const withinX = Math.abs(p.ballX - paddleX) <= p.paddleW / 2 + p.ballR;
        const crossing = dirUp ? p.ballY + p.ballR >= paddleY && p.ballVY > 0 : p.ballY - p.ballR <= paddleY && p.ballVY < 0;
        if (!withinX || !crossing) return false;
        const offset = (p.ballX - paddleX) / (p.paddleW / 2); // -1..1
        p.speed = Math.min(720, p.speed * 1.04);
        const angle = offset * 0.9; // steer by where it hit the paddle
        p.ballVX = Math.sin(angle) * p.speed;
        p.ballVY = (dirUp ? -1 : 1) * Math.cos(angle) * p.speed;
        p.ballY = dirUp ? paddleY - p.ballR - 1 : paddleY + p.ballR + 1;
        burst(p.ballX, p.ballY);
        return true;
      };
      hit(p.playerX, bottomY, true) || hit(p.aiX, topY, false);

      if (p.ballY > height + 30) {
        p.aiScore++;
        p.serving = true;
      } else if (p.ballY < -30) {
        p.playerScore++;
        p.serving = true;
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
      ctx.fillText(p.serving ? 'click to serve  ·  esc to quit' : 'esc to quit', width - 18, 40);
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
      }
    };

    // --- wire up ---------------------------------------------------------------
    resize();
    scatter();
    canvas.dataset.mode = mode;
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
