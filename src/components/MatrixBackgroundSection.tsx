
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
        return { opacity: 0.3, speed: 0.3, density: 0.5 };
      case "high":
        return { opacity: 0.7, speed: 0.8, density: 1.2 };
      case "medium":
      default:
        return { opacity: 0.5, speed: 0.5, density: 1 };
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
    const columnWidth = 14;
    const columns = Math.ceil((canvas.width / window.devicePixelRatio) / columnWidth);
    
    // Arrays for columns
    const drops: number[] = [];
    const speeds: number[] = [];
    const colors: string[] = [];
    const sizes: number[] = [];
    const fontSizes = [12, 14, 16];
    
    // Initialize arrays with varied parameters
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
      speeds[i] = Math.random() * settings.speed + 0.3;
      
      // Create blue-purple colors
      const hue = Math.random() * 40 + 220; // Blue to purple range (220-260)
      const saturation = Math.random() * 40 + 80; // 80-120%
      const lightness = Math.random() * 25 + 60; // 60-85%
      colors[i] = `hsla(${hue}, ${saturation}%, ${lightness}%, ${settings.opacity})`;
      
      sizes[i] = fontSizes[Math.floor(Math.random() * fontSizes.length)];
    }
    
    const draw = () => {
      // Semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.035)';
      ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      
      // Draw each column
      for (let i = 0; i < drops.length; i++) {
        const x = i * columnWidth;
        const y = drops[i] * sizes[i];
        
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        ctx.fillStyle = colors[i];
        ctx.font = `${sizes[i]}px "Fira Code", monospace`;
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
    const fps = 30; // Cap framerate
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
        className="absolute inset-0 opacity-60 pointer-events-none"
      />
      
      {/* Floating particles */}
      {Array.from({ length: particleCount }).map((_, i) => {
        const size = Math.random() * 4 + 1.5;
        
        // Color distribution
        const colorRoll = Math.random();
        let color;
        
        if (colorRoll < 0.4) {
          color = "#9b87f5"; // Primary Purple
        } else if (colorRoll < 0.6) {
          color = "#8B5CF6"; // Vivid Purple
        } else if (colorRoll < 0.8) {
          color = "#1EAEDB"; // Bright Blue
        } else {
          color = "#6E59A5"; // Tertiary Purple
        }
        
        const opacity = Math.random() * 0.35 + 0.25;
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        
        const xMove = Math.random() * 180 - 90;
        const yMove = Math.random() * 180 - 90;
        const duration = Math.random() * 20 + 15;
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
            }}
            initial={{ opacity: 0 }}
            animate={{
              x: [0, xMove, 0, -xMove / 1.5, 0],
              y: [0, yMove, -yMove / 2, yMove / 1.5, 0],
              opacity: [opacity, opacity * 2, opacity * 1.5, opacity],
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
      
      {/* Enhanced gradient orbs */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/3 -left-24 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-1500 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default MatrixBackgroundSection;
