
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
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Set display size
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Scale for hi-DPI displays
      ctx.scale(dpr, dpr);
      
      // Clear canvas and reset all parameters
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      console.log("Canvas dimensions updated", canvas.width, canvas.height);
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
      "=>", "==", "===", "&&", "||", "map", "filter", "reduce"
    ];
    
    // Optimize the number of columns based on screen size and performance
    const columnWidth = Math.max(14, Math.floor(window.innerWidth / 100));
    const columns = Math.ceil(window.innerWidth / columnWidth);
    
    // Arrays for tracking column data - pre-allocate
    const drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -100);
    const speeds: number[] = new Array(columns).fill(0).map(() => Math.random() * 0.5 + 0.5);
    const colors: string[] = new Array(columns).fill('').map(() => {
      // Create vibrant blue-purple gradient colors
      const hue = Math.random() * 40 + 220; // Blue to purple range (220-260)
      const saturation = Math.random() * 40 + 80; // High saturation for visibility
      const lightness = Math.random() * 25 + 60; // Bright enough to see
      return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.9)`;
    });
    const sizes: number[] = new Array(columns).fill(0).map(() => [12, 14, 16][Math.floor(Math.random() * 3)]);
    const textTypes: number[] = new Array(columns).fill(0).map(() => Math.random() > 0.8 ? 1 : 0);
    const chars_to_draw: string[] = new Array(columns).fill('').map(() => chars[Math.floor(Math.random() * chars.length)]);
    
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
        
        // Add glow effect but only for a subset of characters to improve performance
        if (Math.random() > 0.95) {
          ctx.shadowColor = "rgba(155, 135, 245, 0.8)";
          ctx.shadowBlur = 4;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fillStyle = colors[i];
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
        
        // Increment Y coordinate
        drops[i] += speeds[i];
      }
    };
    
    // Animation loop with optimized framerate using requestAnimationFrame
    let animationFrameId: number;
    let lastTime = 0;
    const fps = window.innerWidth > 768 ? 30 : 20; // Lower FPS on mobile
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
      clearTimeout(resizeTimer);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Matrix rain canvas with improved visibility */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-70" 
        style={{ pointerEvents: "none" }} 
      />
      
      {/* Floating particles with better performance */}
      {Array.from({ length: Math.min(window.innerWidth > 768 ? 50 : 30, 50) }).map((_, i) => {
        const size = Math.random() * 4 + 2;
        const colorRoll = Math.random();
        let color;
        
        if (colorRoll < 0.3) {
          color = "#9b87f5"; // Primary Purple
        } else if (colorRoll < 0.5) {
          color = "#8B5CF6"; // Vivid Purple
        } else if (colorRoll < 0.7) {
          color = "#1EAEDB"; // Bright Blue
        } else if (colorRoll < 0.85) {
          color = "#6E59A5"; // Tertiary Purple
        } else {
          color = "#50E3C2"; // Bright Cyan
        }
        
        const opacity = Math.random() * 0.4 + 0.3;
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        
        // More varied movements that are more efficient
        const xMove = Math.random() * 100 - 50;
        const yMove = Math.random() * 100 - 50;
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
              boxShadow: Math.random() > 0.85 ? `0 0 8px 2px ${color}80` : 'none',
            }}
            initial={{ opacity: 0 }}
            animate={{
              x: [0, xMove, 0, -xMove / 1.5, 0],
              y: [0, yMove, -yMove / 2, yMove / 1.5, 0],
              opacity: [opacity, opacity * 1.5, opacity],
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
      
      {/* Optimized gradient orbs - reduced number for better performance */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-radial from-blue-500/15 to-transparent rounded-full filter blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/3 -left-24 w-80 h-80 bg-gradient-radial from-purple-500/15 to-transparent rounded-full filter blur-3xl animate-pulse-slow animation-delay-1500 pointer-events-none" />
      <div className="absolute top-2/3 left-1/4 w-72 h-72 bg-gradient-radial from-indigo-500/10 to-transparent rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000 pointer-events-none" />
    </div>
  );
};

export default ParticlesBackground;
