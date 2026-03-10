import { playSound, SoundName } from "./sounds";

const ANIMATION_DURATION = 2000;
const FLASH_DURATION = ANIMATION_DURATION * 0.35;

interface Ray {
  x: number;
  y: number;
  angle: number;
  width: number;
  height: number;
  alpha: number;
  born: number;
  ttl: number;
  jitterX: number;
  jitterY: number;
  lastJitter: number;
  jitterRate: number;
  jitterAmp: number;
}

function buildRays(
  cx: number,
  cy: number,
  radius: number,
  count: number,
  maxHeight: number,
): Ray[] {
  const rays: Ray[] = [];
  const now = performance.now();

  for (let i = 0; i < count; i++) {
    if (Math.random() < 0.1) continue;
    const angle = (i / count) * 2 * Math.PI;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    const rayAngle = Math.atan2(y - cy, x - cx) + Math.PI / 2;
    rays.push({
      x,
      y,
      angle: rayAngle,
      width: Math.random() * 1 + 1,
      height: Math.random() * maxHeight + 10,
      alpha: 0.8,
      born: now,
      ttl: 1000 + Math.random() * 300,
      jitterX: 0,
      jitterY: 0,
      lastJitter: now,
      jitterRate: 15 + Math.random() * 10, // 15–25ms, próximo dos 20ms originais
      jitterAmp: 2 + Math.random() * 3, // deslocamento de 2–5px
    });
  }

  return rays;
}

let activeCanvas: HTMLCanvasElement | null = null;

function shakeElement(el: HTMLElement) {
  const SHAKE_DURATION = 400; // ms total
  const SHAKE_FREQ = 18; // ms por quadro de shake
  const DECAY = 0.82; // multiplicador de amplitude a cada frame
  let amp = 6; // px de deslocamento inicial
  const start = performance.now();
  let last = start;

  // Salva transform original para restaurar depois
  const originalTransform = el.style.transform;

  function step(now: number) {
    const elapsed = now - start;
    if (elapsed >= SHAKE_DURATION) {
      el.style.transform = originalTransform;
      return;
    }

    // Atualiza posição a cada SHAKE_FREQ ms
    if (now - last >= SHAKE_FREQ) {
      const dx = (Math.random() * 2 - 1) * amp;
      const dy = (Math.random() * 2 - 1) * amp * 0.5;
      el.style.transform = `${originalTransform} translate(${dx}px, ${dy}px)`;
      amp *= DECAY;
      last = now;
    }

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

export function runImpactAnimation(
  clickX: number,
  clickY: number,
  target: HTMLElement,
  soundName: SoundName = "cinematic",
  soundVolume = 1,
) {
  if (soundName) playSound(soundName, soundVolume);

  if (activeCanvas) {
    activeCanvas.remove();
    activeCanvas = null;
  }

  shakeElement(target);

  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "9999",
  });
  document.body.appendChild(canvas);
  activeCanvas = canvas;

  const ctx = canvas.getContext("2d")!;

  const flashStart = performance.now();

  const allRays: Ray[] = [
    ...buildRays(clickX, clickY, 50, 100, 30),
    ...buildRays(clickX, clickY, 150, 300, 80),
    ...buildRays(clickX, clickY, 300, 400, 150),
  ];

  let rafId: number;

  function draw(now: number) {
    const elapsed = now - flashStart;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // FLASH
    if (elapsed < FLASH_DURATION) {
      const flashAlpha = 1 - elapsed / FLASH_DURATION;
      ctx.fillStyle = `rgba(255,255,255,${flashAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // RAYS
    let anyAlive = false;

    for (const ray of allRays) {
      const age = now - ray.born;
      if (age > ray.ttl) continue;
      anyAlive = true;

      const fadeAlpha = (1 - age / ray.ttl) * 0.8;

      if (now - ray.lastJitter >= ray.jitterRate) {
        ray.jitterX = (Math.random() * 2 - 1) * ray.jitterAmp;
        ray.jitterY = (Math.random() * 2 - 1) * ray.jitterAmp;
        ray.lastJitter = now;
      }

      ctx.save();
      ctx.translate(ray.x + ray.jitterX, ray.y + ray.jitterY);
      ctx.rotate(ray.angle);
      ctx.fillStyle = `rgba(0,0,0,${fadeAlpha})`;
      ctx.beginPath();
      ctx.moveTo(0, -ray.height / 2);
      ctx.lineTo(ray.width / 2, 0);
      ctx.lineTo(0, ray.height * 0.35);
      ctx.lineTo(-ray.width / 2, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    if (elapsed >= ANIMATION_DURATION && !anyAlive) {
      cancelAnimationFrame(rafId);
      canvas.remove();
      if (activeCanvas === canvas) activeCanvas = null;
      return;
    }

    rafId = requestAnimationFrame(draw);
  }

  rafId = requestAnimationFrame(draw);

  setTimeout(() => {
    cancelAnimationFrame(rafId);
    canvas.remove();
    if (activeCanvas === canvas) activeCanvas = null;
  }, ANIMATION_DURATION + 100);
}
