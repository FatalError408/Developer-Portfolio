
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
  
  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (canvas && canvas.parentElement) {
        const rect = canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(dpr, dpr);
      }
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Matrix rain effect
    const settings = getIntensitySettings();
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/?{}[]()=+-*&^%$#@!;:,.\\|~`'\"";
    const codeSnippets = [
      "function()", "const", "let", "var", "=>", "class", "import", "export",
      "return", "async", "await", "try", "catch", "if", "else", "for", "while",
      "<div>", "</div>", "<span>", "{props}", "useState", "useEffect"
    ];
    
    const columnWidth = 14;
    const columns = Math.ceil((canvas.width / window.devicePixelRatio) / columnWidth);
    
    // Arrays for columns
    const drops: number[] = [];
    const speeds: number[] = [];
    const colors: string[] = [];
    const sizes: number[] = [];
    const textTypes: number[] = [];
    const fontSizes = [12, 14, 16];
    
    // Initialize arrays with varied parameters
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
      speeds[i] = Math.random() * settings.speed + 0.35;
      
      // Create vibrant blue-purple gradient colors
      const hue = Math.random() * 40 + 220; // Blue to purple range (220-260)
      const saturation = Math.random() * 40 + 80; // 80-120%
      const lightness = Math.random() * 25 + 60; // 60-85%
      colors[i] = `hsla(${hue}, ${saturation}%, ${lightness}%, ${settings.opacity})`;
      
      sizes[i] = fontSizes[Math.floor(Math.random() * fontSizes.length)];
      textTypes[i] = Math.random() > 0.8 ? 1 : 0; // 20% chance for code snippets
    }
    
    const draw = () => {
      // Semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      
      // Draw each column
      for (let i = 0; i < drops.length; i++) {
        const x = i * columnWidth;
        const y = drops[i] * sizes[i];
        
        // Use code snippets or random characters
        let text;
        if (textTypes[i] === 1) {
          text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        } else {
          text = chars[Math.floor(Math.random() * chars.length)];
        }
        
        // Add glow effect for some characters
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
        if (y > canvas.height / (window.devicePixelRatio || 1) && Math.random() > 0.98) {
          drops[i] = 0;
        }
        
        // Increment Y coordinate
        drops[i] += speeds[i];
      }
    };
    
    // Animation loop with optimized framerate
    let animationFrameId: number;
    let lastTime = 0;
    const fps = 30;
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
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, [intensity]);
  
  return (
    <div className="relative overflow-hidden">
      {/* Matrix canvas background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 opacity-70 pointer-events-none"
      />
      
      {/* Enhanced floating particles - bigger, more vibrant and more variety */}
      {Array.from({ length: particleCount }).map((_, i) => {
        const size = Math.random() * 5 + 2;
        
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
          // Occasionally add a bright highlight color
          color = "#50E3C2"; // Bright Cyan
        }
        
        const opacity = Math.random() * 0.4 + 0.3; // More visible particles
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        
        // More varied and natural movement patterns
        const xMove = Math.random() * 200 - 100;
        const yMove = Math.random() * 200 - 100;
        const duration = Math.random() * 25 + 15;
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
              opacity: [opacity, opacity * 2, opacity * 1.5, opacity],
              scale: Math.random() > 0.8 ? [1, 1.2, 0.9, 1.1, 1] : [1, 1, 1, 1, 1],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
              times: [0, 0.25, 0.5, 0.75, 1]
            }}
          />
        );
      })}
      
      {/* Enhanced gradient orbs with smoother gradients and better blur effects */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-radial from-blue-500/15 to-transparent rounded-full filter blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/3 -left-24 w-80 h-80 bg-gradient-radial from-purple-500/15 to-transparent rounded-full filter blur-3xl animate-pulse-slow animation-delay-1500 pointer-events-none" />
      <div className="absolute top-2/3 left-1/4 w-72 h-72 bg-gradient-radial from-indigo-500/10 to-transparent rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000 pointer-events-none" />
      
      {/* Content with appropriate z-index to appear above background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default MatrixBackgroundSection;
