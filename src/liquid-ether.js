// Minimal "Liquid Ether" style animated background (vanilla JS)
// Renders moving radial-gradient blobs that blend together for a fluid look.
// Usage: import { initLiquidEther } from './liquid-ether.js'; initLiquidEther({ colors: [...] })

export function initLiquidEther(options = {}) {
  const {
    colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
    blobCount = 6,
    speed = 0.35,
    minRadius = 180,
    maxRadius = 360,
  opacity = 0.18, // restored original brightness
  brightness = 1.0, // full brightness multiplier
    responsiveScale = 1,
    interactive = true,
    mouseForce = 20,
  } = options;

  // Create container and canvas
  const container = document.createElement('div');
  container.className = 'liquid-ether-container';
  const canvas = document.createElement('canvas');
  canvas.id = 'liquid-ether-canvas';
  container.appendChild(canvas);

  // Insert as the first child so it stays behind other content
  document.body.insertBefore(container, document.body.firstChild);

  const ctx = canvas.getContext('2d', { alpha: true });
  let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let radiusScale = 1;

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const computeRadiusScale = () => {
    // Scale blob size by viewport, smaller screens -> smaller blobs
    const basis = Math.min(window.innerWidth, window.innerHeight);
    return clamp(basis / 1440, 0.55, 1);
  };

  function resize() {
    width = Math.floor(window.innerWidth);
    height = Math.floor(window.innerHeight);
    const scale = responsiveScale;
    radiusScale = computeRadiusScale();
    canvas.width = Math.floor(width * dpr * scale);
    canvas.height = Math.floor(height * dpr * scale);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
  }
  resize();

  window.addEventListener('resize', resize);

  // Blob model
  function rand(min, max) { return Math.random() * (max - min) + min; }

  const blobs = Array.from({ length: blobCount }).map((_, i) => {
    const r = rand(minRadius, maxRadius);
    const angle = rand(0, Math.PI * 2);
    const color = colors[i % colors.length];
    return {
      x: rand(r, width - r),
      y: rand(r, height - r),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      baseR: r,
      color,
    };
  });

  const mouse = { x: width / 2, y: height / 2, active: false };
  if (interactive) {
    window.addEventListener('pointermove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });
    window.addEventListener('pointerleave', () => { mouse.active = false; });
  }

  let rafId = 0;
  let running = true;

  function step() {
    if (!running) return;

    ctx.clearRect(0, 0, width, height);

    // Blend blobs additively
    ctx.globalCompositeOperation = 'lighter';

    for (const b of blobs) {
      const r = b.baseR * radiusScale;
      // Simple physics with boundary bounce
      b.x += b.vx;
      b.y += b.vy;

      if (b.x - r < 0 || b.x + r > width) b.vx *= -1;
      if (b.y - r < 0 || b.y + r > height) b.vy *= -1;

      // Mouse interaction: gentle push away
      if (interactive && mouse.active) {
        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const dist2 = dx*dx + dy*dy;
        const maxD = (r + 120);
        if (dist2 < maxD * maxD) {
          const d = Math.sqrt(dist2) || 1;
          const force = (1 - d / maxD) * mouseForce * 0.02;
          b.vx += (dx / d) * force;
          b.vy += (dy / d) * force;
          // Gentle damping to prevent runaway velocities
          b.vx *= 0.98;
          b.vy *= 0.98;
        }
      }

      const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
      const col = hexToRgb(b.color);
      const effectiveOpacity = clamp(opacity * brightness, 0, 1);
      grad.addColorStop(0, `rgba(${col.r}, ${col.g}, ${col.b}, ${Math.min(1, effectiveOpacity * 1.4)})`);
      grad.addColorStop(1, `rgba(${col.r}, ${col.g}, ${col.b}, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Reset composite for next frame
    ctx.globalCompositeOperation = 'source-over';

    rafId = requestAnimationFrame(step);
  }

  function hexToRgb(hex) {
    const s = hex.replace('#', '');
    const bigint = parseInt(s.length === 3 ? s.split('').map(ch => ch + ch).join('') : s, 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
  }

  // Pause on tab hidden to save CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(rafId);
    } else {
      running = true;
      rafId = requestAnimationFrame(step);
    }
  });

  rafId = requestAnimationFrame(step);

  return {
    destroy() {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      container.remove();
    }
  };
}
