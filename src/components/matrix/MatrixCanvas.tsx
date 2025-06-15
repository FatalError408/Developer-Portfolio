
import { useEffect, useRef, useState } from "react";
import { IntensityLevel } from "./useMatrixSettings";
import useMatrixSettings from "./useMatrixSettings";
import useDeviceDetection from "@/hooks/use-device-detection";

interface MatrixCanvasProps {
  intensity?: IntensityLevel;
}

const MatrixCanvas = ({ intensity = "medium" }: MatrixCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { opacity, speed, density, glow } = useMatrixSettings(intensity);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const deviceInfo = useDeviceDetection();
  const [shouldRender, setShouldRender] = useState(true);

  // Disable on very low performance devices
  useEffect(() => {
    if (deviceInfo.isLowPerformance) {
      setShouldRender(false);
    } else {
      setShouldRender(true);
    }
  }, [deviceInfo.isLowPerformance]);

  // Track mouse position with throttling for performance
  useEffect(() => {
    if (!shouldRender) return;
    let timeoutId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (timeoutId) return;
      timeoutId = window.setTimeout(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
        timeoutId = null;
      }, deviceInfo.isLowPerformance ? 240 : 120);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [deviceInfo.isLowPerformance, shouldRender]);

  // Matrix rain effect
  useEffect(() => {
    if (!shouldRender) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false
    });
    if (!ctx) return;

    // Determine density, columnWidth, and columns more aggressively for low/mid devices
    const dpr = Math.min(window.devicePixelRatio || 1, deviceInfo.isLowPerformance ? 1 : deviceInfo.isMediumPerformance ? 1.5 : 2);
    const baseDensity = deviceInfo.isLowPerformance ? 0.3 : deviceInfo.isMediumPerformance ? 0.55 : density;
    const baseSpeed = deviceInfo.isLowPerformance ? speed * 0.5 : speed;
    const baseGlow = deviceInfo.isLowPerformance ? 0 : glow;
    const columnWidth = Math.max(17, Math.floor(window.innerWidth / (85 * baseDensity)));
    const columns = Math.min(
      50, // Hard cap for performance!
      Math.ceil(window.innerWidth / columnWidth)
    );

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    setCanvasDimensions();
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setCanvasDimensions, 200);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Characters and palette
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/?{}[]()=+-*&^%$#@!;:,.\\|";
    const codeSnippets = [
      "const", "let", "var", "=>", "class", "import", "export",
      "return", "async", "await", "if", "else", "<div>", "useState", "try"
    ];

    const drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -100);
    const speeds: number[] = new Array(columns).fill(0).map(() =>
      baseSpeed * (Math.random() * 0.3 + 0.45)
    );

    const colors: string[] = new Array(columns).fill('').map(() => {
      const colorType = Math.random();
      if (colorType > 0.7) {
        return `hsla(${Math.random() * 30 + 250}, 90%, 72%, ${opacity})`;
      } else if (colorType > 0.45) {
        return `hsla(${Math.random() * 30 + 210}, 90%, 72%, ${opacity})`;
      } else {
        return `hsla(${Math.random() * 20 + 180}, 90%, 72%, ${opacity})`;
      }
    });

    const sizes: number[] = new Array(columns).fill(0).map(() => [13, 14][Math.floor(Math.random() * 2)]);
    const textTypes: number[] = new Array(columns).fill(0).map(() => Math.random() > 0.9 ? 1 : 0);
    const chars_to_draw: string[] = new Array(columns).fill('').map(() =>
      chars[Math.floor(Math.random() * chars.length)]
    );

    const draw = () => {
      // Make trail more aggressive for perf
      ctx.fillStyle = `rgba(0,0,0,${deviceInfo.isLowPerformance ? 0.11 : deviceInfo.isMediumPerformance ? 0.07 : 0.04})`;
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      for (let i = 0; i < drops.length; i++) {
        const x = i * columnWidth;
        const y = drops[i] * sizes[i];

        // Reduce char change frequency for perf
        if (Math.random() > (deviceInfo.isLowPerformance ? 0.991 : 0.97)) {
          chars_to_draw[i] = chars[Math.floor(Math.random() * chars.length)];
        }

        const text = textTypes[i]
          ? codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
          : chars_to_draw[i];

        // Mouse effect off for very low perf, less for medium
        let proximity = 0;
        if (!deviceInfo.isLowPerformance && (Math.abs(x - mousePos.x) < 170 && Math.abs(y - mousePos.y) < 170)) {
          const dist = Math.sqrt(
            (x - mousePos.x) * (x - mousePos.x) +
            (y - mousePos.y) * (y - mousePos.y)
          );
          proximity = dist < 100 ? (100 - dist) / 100 : 0;
        }

        ctx.shadowBlur = proximity > 0.1 ? (baseGlow + proximity * 2) : 0;
        ctx.shadowColor = colors[i];

        if (proximity > 0.1) {
          const colorParts = colors[i].match(/hsla\((\d+),\s*(\d+)%,\s*(\d+)%,\s*([\d.]+)\)/);
          if (colorParts) {
            const h = parseInt(colorParts[1]);
            const s = parseInt(colorParts[2]);
            const l = Math.min(90, parseInt(colorParts[3]) + (proximity * 15));
            ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${opacity + (proximity * 0.09)})`;
          } else {
            ctx.fillStyle = colors[i];
          }
        } else {
          ctx.fillStyle = colors[i];
        }

        ctx.font = `${textTypes[i] ? 'bold ' : ''}${sizes[i]}px "Fira Code", monospace`;
        ctx.fillText(text, x, y);

        if (y > canvas.height / dpr && Math.random() > 0.96) {
          drops[i] = 0;
        }
        drops[i] += speeds[i];
      }
    };

    let animationFrameId: number;
    let lastTime = 0;
    const maxFPS = deviceInfo.isLowPerformance ? 10 : deviceInfo.isMediumPerformance ? 16 : 24;
    const fpsInterval = 1000 / maxFPS;

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = currentTime - lastTime;
      if (elapsed > fpsInterval) {
        lastTime = currentTime - (elapsed % fpsInterval);
        draw();
      }
    };

    animate(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [opacity, speed, density, glow, mousePos, deviceInfo, shouldRender]);

  if (!shouldRender) return null;
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: opacity * 2, pointerEvents: "none" }}
    />
  );
};

export default MatrixCanvas;
