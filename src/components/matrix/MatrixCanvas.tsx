
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
  
  // Track mouse position with throttling for performance
  useEffect(() => {
    let timeoutId: number | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (timeoutId) return;
      
      timeoutId = window.setTimeout(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
        timeoutId = null;
      }, deviceInfo.isLowPerformance ? 150 : 100); // More aggressive throttling on low-end devices
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [deviceInfo.isLowPerformance]);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true, // Hardware acceleration where available
      willReadFrequently: false // Optimization hint
    });
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio for crisp rendering
    const setCanvasDimensions = () => {
      if (!canvas) return;

      // Limit DPR for performance on weaker devices
      const dpr = Math.min(window.devicePixelRatio || 1, deviceInfo.isLowPerformance ? 1.5 : 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    setCanvasDimensions();

    // Debounced resize handler
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setCanvasDimensions, 200);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Matrix characters and code snippets - adjusted for theme
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/?{}[]()=+-*&^%$#@!;:,.\\|";
    const codeSnippets = [
      "function()", "const", "let", "var", "=>", "class", "import", "export",
      "return", "async", "await", "try", "catch", "if", "else", "for", "while"
    ];

    // Adjust column density based on performance capability
    const baseColumnWidth = Math.max(14, Math.floor(window.innerWidth / (100 * density)));
    const columnWidth = deviceInfo.isLowPerformance ? baseColumnWidth * 1.5 : baseColumnWidth;
    const columns = Math.ceil(window.innerWidth / columnWidth);

    // Pre-allocate arrays for better performance
    const drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -100);
    const baseSpeed = speed * (deviceInfo.isLowPerformance ? 0.8 : 1);
    const speeds: number[] = new Array(columns).fill(0).map(() => 
      baseSpeed * (Math.random() * 0.5 + 0.5)
    );

    // Enhanced color palette with proper typing and performance optimizations
    const colors: string[] = new Array(columns).fill('').map(() => {
      const colorType = Math.random();
      
      if (colorType > 0.7) {
        // Vivid purple-blue
        const hue = Math.random() * 30 + 250; 
        const saturation = Math.random() * 30 + 80;
        const lightness = Math.random() * 20 + 65;
        return `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
      } else if (colorType > 0.45) {
        // Bright blue
        const hue = Math.random() * 30 + 210;
        const saturation = Math.random() * 30 + 80;
        const lightness = Math.random() * 20 + 65;
        return `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
      } else {
        // Cyan
        const hue = Math.random() * 20 + 180;
        const saturation = Math.random() * 30 + 80;
        const lightness = Math.random() * 20 + 65;
        return `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
      }
    });
    
    const sizes: number[] = new Array(columns).fill(0).map(() => [12, 14, 16][Math.floor(Math.random() * 3)]);
    const textTypes: number[] = new Array(columns).fill(0).map(() => Math.random() > 0.8 ? 1 : 0);
    const chars_to_draw: string[] = new Array(columns).fill('').map(() => 
      chars[Math.floor(Math.random() * chars.length)]
    );

    // Optimized draw function
    const draw = () => {
      // Semi-transparent background for trail effect
      ctx.fillStyle = `rgba(0, 0, 0, ${deviceInfo.isLowPerformance ? 0.05 : 0.03})`;
      ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), 
        canvas.height / (window.devicePixelRatio || 1));
      
      // Draw each column, but skip some on low performance devices
      const skipFactor = deviceInfo.isLowPerformance ? 2 : 1;
      
      for (let i = 0; i < drops.length; i += skipFactor) {
        const x = i * columnWidth;
        const y = drops[i] * sizes[i];
        
        // Choose character/code snippet to draw - update less frequently
        let text = '';
        
        // Only update characters occasionally to improve performance
        if (Math.random() > 0.95) {
          chars_to_draw[i] = chars[Math.floor(Math.random() * chars.length)];
        }
        
        if (textTypes[i] === 0) {
          text = chars_to_draw[i];
        } else {
          text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        }
        
        // Mouse proximity effect - more efficient calculation
        const distX = Math.abs(x - mousePos.x);
        const distY = Math.abs(y - mousePos.y);
        
        // Skip expensive calculations if obviously far from mouse
        if (distX < 200 && distY < 200) {
          const dist = Math.sqrt(distX * distX + distY * distY);
          const proximity = dist < 150 ? (150 - dist) / 150 : 0;
          
          // Apply glow effect based on intensity setting
          if (proximity > 0.3 || Math.random() > 0.9) {
            ctx.shadowColor = colors[i];
            ctx.shadowBlur = glow + (proximity * 4);
          } else {
            ctx.shadowBlur = 0;
          }
          
          // Adjust speed based on proximity
          speeds[i] = baseSpeed * (Math.random() * 0.5 + 0.5) * (1 + (proximity * 1.5));
          
          // Brighter colors near mouse
          if (proximity > 0.3) {
            const colorParts = colors[i].match(/hsla\((\d+),\s*(\d+)%,\s*(\d+)%,\s*([\d.]+)\)/);
            if (colorParts) {
              const h = parseInt(colorParts[1]);
              const s = parseInt(colorParts[2]);
              const l = Math.min(90, parseInt(colorParts[3]) + (proximity * 15)); 
              ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${opacity + (proximity * 0.1)})`;
            } else {
              ctx.fillStyle = colors[i];
            }
          } else {
            ctx.fillStyle = colors[i];
          }
        } else {
          // Default style when far from mouse
          ctx.shadowBlur = 0;
          ctx.fillStyle = colors[i];
        }
        
        // Draw text
        ctx.font = `${textTypes[i] === 1 ? 'bold ' : ''}${sizes[i]}px "Fira Code", monospace`;
        ctx.fillText(text, x, y);
        
        // Reset when off screen
        if (y > canvas.height / (window.devicePixelRatio || 1) && Math.random() > 0.98) {
          drops[i] = 0;
        }
        
        // Increment Y coordinate
        drops[i] += speeds[i];
      }
    };

    // Animation loop with adaptive framerate
    let animationFrameId: number;
    let lastTime = 0;
    
    // Adaptive frame rate based on device capabilities
    const fps = deviceInfo.isHighPerformance ? 30 : 
               deviceInfo.isMediumPerformance ? 24 : 18;
    const fpsInterval = 1000 / fps;
    
    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Throttle frame rate
      const elapsed = currentTime - lastTime;
      if (elapsed > fpsInterval) {
        lastTime = currentTime - (elapsed % fpsInterval);
        draw();
      }
    };
    
    animate(0);
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [opacity, speed, density, glow, mousePos, deviceInfo]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full"
      style={{ opacity: opacity * 2, pointerEvents: "none" }}
    />
  );
};

export default MatrixCanvas;
