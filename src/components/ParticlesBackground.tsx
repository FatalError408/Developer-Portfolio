
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const ParticlesBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Performance-optimized mouse movement tracking
  useEffect(() => {
    let timeoutId: number | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (timeoutId) return;
      
      timeoutId = window.setTimeout(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        timeoutId = null;
      }, 100);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);
  
  // Optimized matrix rain effect with memory usage improvements
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
      
      // Calculate dimensions
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Set display size
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Scale for hi-DPI displays
      ctx.scale(dpr, dpr);
      
      // Clear canvas and reset all parameters
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    
    setCanvasDimensions();
    
    // Add resize listener but debounce it for performance
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setCanvasDimensions, 200);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Define characters for the matrix rain
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/?{}[]()=+-*&^%$#@!;:,.\\|~`'\"";
    const codeSnippets = [
      "function()", "const", "let", "var", "=>", "class", "import", "export",
      "return", "async", "await", "try", "catch", "if", "else", "for", "while",
      "<div>", "</div>", "<span>", "{props}", "useState", "useEffect", "()",
      "=>", "==", "===", "&&", "||", "map", "filter", "reduce", "<Matrix/>", "<Code/>"
    ];
    
    // Optimize the number of columns based on screen size and performance
    const columnWidth = Math.max(14, Math.floor(window.innerWidth / 100));
    const columns = Math.ceil(window.innerWidth / columnWidth);
    
    // Arrays for tracking column data - pre-allocate
    const drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -100);
    const speeds: number[] = new Array(columns).fill(0).map(() => Math.random() * 0.5 + 0.5);
    
    // Enhanced color palette with more vibrance
    const colors: string[] = new Array(columns).fill('').map(() => {
      const colorType = Math.random();
      
      if (colorType > 0.7) {
        // Vivid purple-blue
        const hue = Math.random() * 30 + 250; 
        const saturation = Math.random() * 30 + 80;
        const lightness = Math.random() * 20 + 65;
        return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.95)`;
      } else if (colorType > 0.45) {
        // Bright blue
        const hue = Math.random() * 30 + 210;
        const saturation = Math.random() * 30 + 80;
        const lightness = Math.random() * 20 + 65;
        return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.95)`;
      } else if (colorType > 0.25) {
        // Cyan
        const hue = Math.random() * 20 + 180;
        const saturation = Math.random() * 30 + 80;
        const lightness = Math.random() * 20 + 65;
        return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.95)`;
      } else {
        // Magenta highlights (rare)
        const hue = Math.random() * 20 + 290;
        const saturation = Math.random() * 30 + 80;
        const lightness = Math.random() * 20 + 65;
        return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.95)`;
      }
    });
    
    const sizes: number[] = new Array(columns).fill(0).map(() => [12, 14, 16][Math.floor(Math.random() * 3)]);
    const textTypes: number[] = new Array(columns).fill(0).map(() => Math.random() > 0.8 ? 1 : 0);
    const chars_to_draw: string[] = new Array(columns).fill('').map(() => chars[Math.floor(Math.random() * chars.length)]);
    
    // Track mouse position to create a subtle interactive effect
    let lastMouseX = 0;
    let lastMouseY = 0;
    canvas.addEventListener('mousemove', (e) => {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });
    
    // Optimized draw function with reduced memory allocations
    const draw = () => {
      // Semi-transparent background for trail effect - adjust for better visibility
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      
      // Draw each column
      for (let i = 0; i < drops.length; i++) {
        const x = i * columnWidth;
        const y = drops[i] * sizes[i];
        
        // Choose character/code snippet to draw
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
        
        // Mouse proximity effect - increase glow and speed when near mouse
        const distX = Math.abs(x - lastMouseX);
        const distY = Math.abs(y - lastMouseY);
        const dist = Math.sqrt(distX * distX + distY * distY);
        const proximity = dist < 150 ? (150 - dist) / 150 : 0;
        
        // Enhanced glow effect with mouse interaction
        if (proximity > 0.3 || Math.random() > 0.9) {
          const glowColor = colors[i].replace('hsla', 'hsla');
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = 6 + (proximity * 4); // Increased glow near mouse
        } else {
          ctx.shadowBlur = 0;
        }
        
        // Adjust character color based on mouse proximity
        if (proximity > 0.3) {
          // Brighter colors near mouse
          const colorParts = colors[i].match(/hsla\((\d+),\s*(\d+)%,\s*(\d+)%,\s*([\d.]+)\)/);
          if (colorParts) {
            const h = parseInt(colorParts[1]);
            const s = parseInt(colorParts[2]);
            const l = Math.min(90, parseInt(colorParts[3]) + (proximity * 15)); // Brighter
            ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${0.95 + (proximity * 0.05)})`;
          } else {
            ctx.fillStyle = colors[i];
          }
        } else {
          ctx.fillStyle = colors[i];
        }
        
        // Adjust speed based on mouse proximity
        const currentSpeed = speeds[i] * (1 + (proximity * 1.5));
        
        ctx.font = `${textTypes[i] === 1 ? 'bold ' : ''}${sizes[i]}px "Fira Code", monospace`;
        ctx.fillText(text, x, y);
        
        // Reset when off screen
        if (y > canvas.height / window.devicePixelRatio && Math.random() > 0.98) {
          drops[i] = 0;
          // Occasionally change parameters for continued variety
          if (Math.random() > 0.8) {
            speeds[i] = Math.random() * 0.5 + 0.5;
            textTypes[i] = Math.random() > 0.8 ? 1 : 0;
          }
        }
        
        // Increment Y coordinate using the potentially adjusted speed
        drops[i] += currentSpeed;
      }
    };
    
    // Animation loop with optimized framerate using requestAnimationFrame
    let animationFrameId: number;
    let lastTime = 0;
    // Adaptive frame rate based on device capabilities
    const fps = navigator.hardwareConcurrency > 4 ? 
                (window.innerWidth > 768 ? 30 : 24) : 
                (window.innerWidth > 768 ? 24 : 18);
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
    
    // Clean up function
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', () => {});
      clearTimeout(resizeTimer);
    };
  }, []);
  
  // Determine particle count based on viewport width and device capabilities
  const particleCount = typeof window !== 'undefined' ? 
    (navigator.hardwareConcurrency > 4 ?
      (window.innerWidth > 1200 ? 60 : window.innerWidth > 768 ? 50 : 30) :
      (window.innerWidth > 1200 ? 40 : window.innerWidth > 768 ? 30 : 20)) : 30;
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Matrix rain canvas with improved visibility */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-80" 
        style={{ pointerEvents: "none" }} 
      />
      
      {/* Enhanced floating particles with better performance */}
      {Array.from({ length: Math.min(particleCount, 60) }).map((_, i) => {
        const size = Math.random() * 6 + 3; // Larger particles
        const colorRoll = Math.random();
        let color;
        
        if (colorRoll < 0.2) {
          color = "#9b87f5"; // Primary Purple
        } else if (colorRoll < 0.4) {
          color = "#8B5CF6"; // Vivid Purple
        } else if (colorRoll < 0.6) {
          color = "#1EAEDB"; // Bright Blue
        } else if (colorRoll < 0.75) {
          color = "#6E59A5"; // Tertiary Purple
        } else if (colorRoll < 0.9) {
          color = "#50E3C2"; // Bright Cyan
        } else {
          color = "#D946EF"; // Magenta Pink - new color for pops
        }
        
        const opacity = Math.random() * 0.5 + 0.4; // Higher opacity
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        
        // More varied movements that are more efficient
        const xMove = Math.random() * 120 - 60; // Wider movement range
        const yMove = Math.random() * 120 - 60;
        const duration = Math.random() * 25 + 15;
        const delay = Math.random() * -15;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: color,
              opacity: opacity,
              top: top,
              left: left,
              filter: `blur(${Math.random() > 0.7 ? 1 : 0}px)`,
              boxShadow: Math.random() > 0.75 ? `0 0 15px 6px ${color}90` : 'none', // Enhanced glow
            }}
            initial={{ opacity: 0 }}
            animate={{
              x: [0, xMove, 0, -xMove / 1.5, 0],
              y: [0, yMove, -yMove / 2, yMove / 1.5, 0],
              opacity: [opacity, opacity * 1.8, opacity], // More dramatic opacity shift
              scale: [1, Math.random() > 0.6 ? 1.4 : 1, 1] // Add occasional pulsing
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
          />
        );
      })}
      
      {/* Enhanced gradient orbs - larger and more vibrant */}
      <div className="absolute top-1/4 -right-32 w-[40rem] h-[40rem] bg-gradient-radial from-blue-500/20 to-transparent rounded-full filter blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/3 -left-32 w-[35rem] h-[35rem] bg-gradient-radial from-purple-500/25 to-transparent rounded-full filter blur-3xl animate-pulse-slow animation-delay-1500 pointer-events-none" />
      <div className="absolute top-2/3 left-1/4 w-[30rem] h-[30rem] bg-gradient-radial from-cyan-400/15 to-transparent rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 w-[25rem] h-[25rem] bg-gradient-radial from-pink-500/10 to-transparent rounded-full filter blur-3xl animate-pulse-slow animation-delay-1000 pointer-events-none" />
    </div>
  );
};

export default ParticlesBackground;
