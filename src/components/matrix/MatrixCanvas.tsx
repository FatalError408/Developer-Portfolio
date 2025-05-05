
import { useEffect, useRef } from "react";
import useMatrixSettings, { IntensityLevel } from "./useMatrixSettings";

interface MatrixCanvasProps {
  intensity: IntensityLevel;
}

const MatrixCanvas = ({ intensity }: MatrixCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const interactionRef = useRef<HTMLDivElement | null>(null);
  const settings = useMatrixSettings(intensity);
  
  // Matrix rain effect with performance optimization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true, // Hardware acceleration where available
    });
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas || !canvas.parentElement) return;
      
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Set actual dimensions accounting for device pixel ratio
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Set display size
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Scale context for hi-DPI displays
      ctx.scale(dpr, dpr);
      
      // Clear canvas when resizing
      ctx.clearRect(0, 0, rect.width, rect.height);
    };
    
    setCanvasDimensions();
    
    // Debounce resize for better performance
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setCanvasDimensions, 200);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Matrix rain effect content
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/?{}[]()=+-*&^%$#@!;:,.\\|~`'\"";
    const codeSnippets = [
      "function()", "const", "let", "var", "=>", "class", "import", "export",
      "return", "async", "await", "try", "catch", "if", "else", "for", "while",
      "<div>", "</div>", "<span>", "{props}", "useState", "useEffect", "<Code/>"
    ];
    
    // Track interaction events for responsive matrix effect
    let mouseX = -1;
    let mouseY = -1;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouseX = -1;
      mouseY = -1;
    };
    
    interactionRef.current = canvas.parentElement;
    if (interactionRef.current) {
      interactionRef.current.addEventListener('mousemove', handleMouseMove);
      interactionRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
    
    // Optimize columns based on screen width and performance
    const columnWidth = Math.max(14, Math.floor(window.innerWidth / 120));
    const columns = Math.ceil((canvas.width / window.devicePixelRatio) / columnWidth);
    
    // Pre-allocate arrays for better performance
    const drops = new Array(columns).fill(0).map(() => Math.random() * -100);
    const speeds = new Array(columns).fill(0).map(() => Math.random() * settings.speed + 0.35);
    
    // Enhanced color range - more vivid blues and purples
    const colors = new Array(columns).fill('').map(() => {
      // Choose between different color palettes for more visual interest
      const colorType = Math.random();
      
      if (colorType > 0.7) {
        // Vivid purple
        const hue = Math.random() * 30 + 260; 
        const saturation = Math.random() * 30 + 70;
        const lightness = Math.random() * 20 + 60;
        return `hsla(${hue}, ${saturation}%, ${lightness}%, ${settings.opacity})`;
      } else if (colorType > 0.4) {
        // Bright blue
        const hue = Math.random() * 30 + 210;
        const saturation = Math.random() * 40 + 80;
        const lightness = Math.random() * 20 + 65;
        return `hsla(${hue}, ${saturation}%, ${lightness}%, ${settings.opacity})`;
      } else {
        // Cyan highlight
        const hue = Math.random() * 20 + 180;
        const saturation = Math.random() * 30 + 70;
        const lightness = Math.random() * 25 + 60;
        return `hsla(${hue}, ${saturation}%, ${lightness}%, ${settings.opacity})`;
      }
    });
    
    const sizes = new Array(columns).fill(0).map(() => [12, 14, 16][Math.floor(Math.random() * 3)]);
    const textTypes = new Array(columns).fill(0).map(() => Math.random() > 0.8 ? 1 : 0);
    const chars_to_draw = new Array(columns).fill('').map(() => chars[Math.floor(Math.random() * chars.length)]);
    
    // Easter egg: Special rare characters that contain hidden messages
    const easterEggMessages = [
      "YOU FOUND ME", "SECRET", "HIDDEN TALENT", "EASTER EGG",
      "HIRE ME", "MAGIC", "PORTFOLIO SECRET"
    ];
    
    // Show easter egg message very rarely (0.1% chance per character)
    const showEasterEgg = () => {
      return Math.random() > 0.999;
    };
    
    const draw = () => {
      // Semi-transparent background for trail effect - adjusted for visibility
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      
      // Draw each column
      for (let i = 0; i < drops.length; i++) {
        const x = i * columnWidth;
        const y = drops[i] * sizes[i];
        
        // Use pre-calculated characters for better performance, update occasionally
        if (Math.random() > 0.95) {
          chars_to_draw[i] = chars[Math.floor(Math.random() * chars.length)];
        }
        
        // Choose what to draw - code snippet, character or easter egg
        let text;
        let isEasterEgg = showEasterEgg();
        
        if (isEasterEgg) {
          text = easterEggMessages[Math.floor(Math.random() * easterEggMessages.length)];
          ctx.font = `bold ${sizes[i]}px "Fira Code", monospace`;
          ctx.fillStyle = `hsla(60, 100%, 70%, 0.9)`;  // Golden color for easter eggs
          ctx.shadowColor = `hsla(60, 100%, 70%, 0.9)`;
          ctx.shadowBlur = 10;
        } else {
          if (textTypes[i] === 1) {
            text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
          } else {
            text = chars_to_draw[i];
          }
          
          // Mouse proximity effect for standard characters
          const distX = Math.abs(x - mouseX);
          const distY = Math.abs(y - mouseY);
          const dist = Math.sqrt(distX * distX + distY * distY);
          const proximity = dist < 100 ? (100 - dist) / 100 : 0;
          
          // Enhanced glow effect for better visibility
          if (proximity > 0.3 || Math.random() > 0.85) {
            const glowColor = colors[i].replace('rgba', 'rgba').replace(/[\d.]+\)$/, '0.9)');
            ctx.shadowColor = glowColor;
            ctx.shadowBlur = settings.glow + (proximity * 5) + (Math.random() * 3);
          } else {
            ctx.shadowBlur = 0;
          }
          
          // Brighten color near mouse position
          if (proximity > 0.3) {
            const colorParts = colors[i].match(/hsla\((\d+),\s*(\d+)%,\s*(\d+)%,\s*([\d.]+)\)/);
            if (colorParts) {
              const h = parseInt(colorParts[1]);
              const s = parseInt(colorParts[2]);
              const l = Math.min(85, parseInt(colorParts[3]) + (proximity * 15));
              ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${settings.opacity + (proximity * 0.2)})`;
            } else {
              ctx.fillStyle = colors[i];
            }
          } else {
            ctx.fillStyle = colors[i];
          }
          
          ctx.font = `${textTypes[i] === 1 ? 'bold ' : ''}${sizes[i]}px "Fira Code", monospace`;
        }
        
        ctx.fillText(text, x, y);
        
        // Reset when off screen
        if (y > canvas.height / window.devicePixelRatio && Math.random() > 0.98) {
          drops[i] = 0;
        }
        
        // Increment Y coordinate with adjusted speed near mouse
        if (mouseX > 0 && mouseY > 0) {
          const distX = Math.abs(x - mouseX);
          const distY = Math.abs(y - mouseY);
          const dist = Math.sqrt(distX * distX + distY * distY);
          const proximity = dist < 100 ? (100 - dist) / 100 : 0;
          
          // Increase speed near mouse
          drops[i] += speeds[i] * (1 + proximity);
        } else {
          drops[i] += speeds[i];
        }
      }
    };
    
    // Animation loop with optimized framerate
    let animationFrameId: number;
    let lastTime = 0;
    const fps = window.innerWidth > 768 ? 30 : 20; // Lower FPS on mobile devices
    const fpsInterval = 1000 / fps;
    
    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Throttle frame rate for performance
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
      if (interactionRef.current) {
        interactionRef.current.removeEventListener('mousemove', handleMouseMove);
        interactionRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      clearTimeout(resizeTimer);
    };
  }, [intensity, settings]);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 opacity-90 pointer-events-none"
    />
  );
};

export default MatrixCanvas;
