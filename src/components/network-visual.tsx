import { useEffect, useRef } from "react";

type Point = { x: number; y: number; vx: number; vy: number; phase: number };

type Palette = { signal: (a: number) => string; link: (a: number) => string; node: (a: number) => string; accent: (a: number) => string };

const darkPalette: Palette = {
  signal: (a) => `rgba(56, 189, 248, ${a})`,
  link: (a) => `rgba(148, 163, 184, ${a})`,
  node: (a) => `rgba(248, 250, 252, ${a})`,
  accent: (a) => `rgba(56, 189, 248, ${a})`,
};

const lightPalette: Palette = {
  signal: (a) => `rgba(71, 85, 105, ${a})`,
  link: (a) => `rgba(100, 116, 139, ${a})`,
  node: (a) => `rgba(51, 65, 85, ${a})`,
  accent: (a) => `rgba(30, 41, 59, ${a})`,
};

export function NetworkVisual({
  className = "absolute inset-0 h-full w-full",
  forceDark = false,
  intensity = 1,
}: {
  className?: string;
  forceDark?: boolean;
  intensity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const isReduced = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("a11y-reduce-motion");
    const currentPalette = () =>
      forceDark || document.documentElement.classList.contains("dark") ? darkPalette : lightPalette;

    let palette = currentPalette();
    let reducedMotion = isReduced();
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let points: Point[] = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.max(24, Math.floor((width * height) / 18000));
      points = Array.from({ length: count }, (_, index) => ({
        x: (index * 83.7) % width,
        y: (index * 47.3) % height,
        vx: ((index % 5) - 2) * 0.018,
        vy: (((index * 3) % 5) - 2) * 0.014,
        phase: index * 0.72,
      }));
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      points.forEach((point, index) => {
        if (!reducedMotion) {
          point.x = (point.x + point.vx + width) % width;
          point.y = (point.y + point.vy + height) % height;
        }
        points.slice(index + 1).forEach((other, offset) => {
          const dx = point.x - other.x;
          const dy = point.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 145) return;
          const signal = Math.sin(time * 0.00045 + point.phase + offset * 0.18) > 0.91;
          const fade = 1 - distance / 145;
          context.strokeStyle = signal
            ? palette.signal(0.42 * fade * intensity)
            : palette.link(0.16 * fade * intensity);
          context.lineWidth = signal ? 1.1 : 0.6;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        });
        const pulse = (0.55 + Math.sin(time * 0.0007 + point.phase) * 0.25) * intensity;
        context.fillStyle = index % 7 === 0 ? palette.accent(pulse) : palette.node(0.34 * intensity);
        context.beginPath();
        context.arc(point.x, point.y, index % 7 === 0 ? 2.1 : 1.25, 0, Math.PI * 2);
        context.fill();
      });
      if (!reducedMotion && !document.hidden) animationFrame = requestAnimationFrame(draw);
    };

    const restart = () => {
      cancelAnimationFrame(animationFrame);
      if (reducedMotion || document.hidden) draw(0);
      else animationFrame = requestAnimationFrame(draw);
    };

    const onPreferenceChange = () => {
      const nextReduced = isReduced();
      const nextPalette = currentPalette();
      if (nextReduced === reducedMotion && nextPalette === palette) return;
      reducedMotion = nextReduced;
      palette = nextPalette;
      restart();
    };

    const observer = new MutationObserver(onPreferenceChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("elevex-a11y-change", onPreferenceChange);
    document.addEventListener("visibilitychange", restart);
    restart();
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("elevex-a11y-change", onPreferenceChange);
      document.removeEventListener("visibilitychange", restart);
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [forceDark, intensity]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
