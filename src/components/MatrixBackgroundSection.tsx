
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface MatrixBackgroundSectionProps {
  children: React.ReactNode;
  intensity?: "low" | "medium" | "high";
  particleCount?: number;
}

const MatrixBackgroundSection = ({ 
  children, 
  intensity = "medium",
  particleCount = 30
}: MatrixBackgroundSectionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Matrix effect intensity settings
  const getIntensitySettings = () => {
    switch(intensity) {
      case "low":
        return { opacity: 0.4, speed: 0.4, density: 0.6, glow: 2 };
      case "high":
        return { opacity: 0.8, speed: 0.9, density: 1.5, glow: 4 };
      case "medium":
      default:
        return { opacity: 0.6, speed: 0.65, density: 1.0, glow: 3 };
    }
  };
  
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
      
      console.log("Section canvas dimensions updated", rect.width, rect.height);
    };
    
    setCanvasDimensions();
    
    // Debounce resize for better performance
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setCanvasDimensions, 200);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Matrix rain effect
    const settings = getIntensitySettings();
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/?{}[]()=+-*&^%$#@!;:,.\\|~`'\"";
    const codeSnippets = [
      "function()", "const", "let", "var", "=>", "class", "import", "export",
      "return", "async", "await", "try", "catch", "if", "else", "for", "while",
      "<div>", "</div>", "<span>", "{props}", "useState", "useEffect"
    ];
    
    // Optimize columns based on screen width and performance
    const columnWidth = Math.max(14, Math.floor(window.innerWidth / 120));
    const columns = Math.ceil((canvas.width / window.devicePixelRatio) / columnWidth);
    
    // Pre-allocate arrays for better performance
    const drops = new Array(columns).fill(0).map(() => Math.random() * -100);
    const speeds = new Array(columns).fill(0).map(() => Math.random() * settings.speed + 0.35);
    const colors = new Array(columns).fill('').map(() => {
      const hue = Math.random() * 40 + 220; // Blue to purple range
      const saturation = Math.random() * 40 + 80; 
      const lightness = Math.random() * 25 + 60;
      return `hsla(${hue}, ${saturation}%, ${lightness}%, ${settings.opacity})`;
    });
    const sizes = new Array(columns).fill(0).map(() => [12, 14, 16][Math.floor(Math.random() * 3)]);
    const textTypes = new Array(columns).fill(0).map(() => Math.random() > 0.8 ? 1 : 0);
    const chars_to_draw = new Array(columns).fill('').map(() => chars[Math.floor(Math.random() * chars.length)]);
    
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
        
        // Choose what to draw - code snippet or character
        let text;
        if (textTypes[i] === 1) {
          text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        } else {
          text = chars_to_draw[i];
        }
        
        // Add occasional glow effect
        if (Math.random() > 0.95) {
          ctx.shadowColor = "rgba(155, 135, 245, 0.8)";
          ctx.shadowBlur = settings.glow;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fillStyle = colors[i];
        ctx.font = `${textTypes[i] === 1 ? 'bold ' : ''}${sizes[i]}px "Fira Code", monospace`;
        ctx.fillText(text, x, y);
        
        // Reset when off screen
        if (y > canvas.height / window.devicePixelRatio && Math.random() > 0.98) {
          drops[i] = 0;
        }
        
        // Increment Y coordinate
        drops[i] += speeds[i];
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
      clearTimeout(resizeTimer);
    };
  }, [intensity]);
  
  return (
    <div className="relative overflow-hidden py-12">
      {/* Matrix canvas background with increased opacity */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 opacity-80 pointer-events-none"
      />
      
      {/* Enhanced floating particles with better performance */}
      {Array.from({ length: Math.min(particleCount, 40) }).map((_, i) => {
        const size = Math.random() * 4 + 2;
        
        // Enhanced color distribution with more vibrant colors
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
        
        const opacity = Math.random() * 0.5 + 0.3;
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        
        // Optimized movement patterns
        const xMove = Math.random() * 100 - 50;
        const yMove = Math.random() * 100 - 50;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * -15;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none z-0"
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
      
      {/* Simplified gradient orbs for better performance */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-radial from-blue-500/15 to-transparent rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-24 w-80 h-80 bg-gradient-radial from-purple-500/15 to-transparent rounded-full filter blur-3xl pointer-events-none" />
      
      {/* Content with appropriate z-index to appear above background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default MatrixBackgroundSection;
