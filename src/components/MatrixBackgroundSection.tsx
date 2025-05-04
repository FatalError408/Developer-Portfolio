
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface MatrixBackgroundSectionProps {
  children: React.ReactNode;
  intensity?: "low" | "medium" | "high";
  particleCount?: number;
}

const MatrixBackgroundSection = ({ 
  children, 
  intensity = "low", // Default to low for better performance
  particleCount = 10  // Default to minimal particles
}: MatrixBackgroundSectionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const interactionRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const isVisibleRef = useRef(false);
  
  // Minimal matrix effect settings
  const getIntensitySettings = () => {
    switch(intensity) {
      case "high": 
        return { opacity: 0.5, speed: 0.7, density: 1.0, glow: 3 };
      case "medium":
        return { opacity: 0.4, speed: 0.5, density: 0.8, glow: 2 };
      case "low":
      default:
        return { opacity: 0.3, speed: 0.3, density: 0.5, glow: 0 };
    }
  };
  
  // Ultra-optimized matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;
    
    // Efficient resize handler
    const setCanvasDimensions = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      
      // Use 1x scaling for all devices - major performance gain
      const dpr = 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, rect.width, rect.height);
    };
    
    // Super-throttled resize
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setCanvasDimensions, 500);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    setCanvasDimensions();
    
    // Intersection Observer to only animate when visible
    const observer = new IntersectionObserver((entries) => {
      isVisibleRef.current = entries[0]?.isIntersecting ?? false;
      
      if (isVisibleRef.current) {
        if (!animationRef.current) {
          animationRef.current = requestAnimationFrame(animate);
        }
      } else {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = 0;
        }
      }
    }, { threshold: 0.1 });
    
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }
    
    // Matrix settings - much simpler
    const settings = getIntensitySettings();
    const chars = "01";
    
    // Optimize columns - much fewer
    const columnWidth = 15; // Larger columns = fewer to draw
    const columns = Math.ceil((canvas.width) / columnWidth / 1.5); // 1.5x fewer columns
    
    // Pre-allocate minimal arrays
    const drops: number[] = [];
    const speeds: number[] = [];
    const colors: string[] = [];
    
    for (let i = 0; i < columns; i++) {
      drops.push(Math.random() * -25);
      speeds.push(Math.random() * settings.speed + 0.2);
      
      // Simplified colors - just use one hue range with variations
      const hue = 120 + Math.random() * 60; // green to blue-green
      const lightness = 50 + Math.random() * 20;
      colors.push(`hsla(${hue}, 80%, ${lightness}%, ${settings.opacity})`);
    }
    
    // Ultra-minimal rendering function
    const draw = () => {
      // Efficient transparent trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Skip many columns each frame for efficiency
      const skipRate = intensity === "low" ? 3 : (intensity === "medium" ? 2 : 1);
      
      // Draw fewer columns each frame
      for (let i = 0; i < columns; i += skipRate) {
        if (Math.random() > settings.density) continue; // Skip some columns entirely
        
        const x = i * columnWidth;
        const y = drops[i] * 14; // Larger font size means less characters to draw
        
        // Ultra simple character drawing - no effects
        ctx.font = `14px monospace`;
        ctx.fillStyle = colors[i];
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y);
        
        // Reset when off screen
        if (y > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
        
        // Simple movement
        drops[i] += speeds[i];
      }
    };
    
    // Extremely throttled animation loop
    let lastRenderTime = 0;
    const minFrameTime = intensity === "low" ? 100 : (intensity === "medium" ? 80 : 60);
    
    const animate = (timestamp: number) => {
      if (!isVisibleRef.current) {
        animationRef.current = 0;
        return;
      }
      
      animationRef.current = requestAnimationFrame(animate);
      
      // Skip frames for performance
      if (timestamp - lastRenderTime < minFrameTime) return;
      lastRenderTime = timestamp;
      
      draw();
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      clearTimeout(resizeTimer);
    };
  }, [intensity]);
  
  return (
    <div className="relative overflow-hidden py-8" ref={interactionRef}>
      {/* Matrix canvas with reduced opacity */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 opacity-70 pointer-events-none"
      />
      
      {/* Minimal floating particles */}
      {particleCount > 0 && Array.from({ length: Math.min(particleCount, 10) }).map((_, i) => {
        // Simplified particles with fewer props
        const size = Math.random() * 4 + 2;
        const color = i % 2 === 0 ? "#8B5CF6" : "#1EAEDB";
        const opacity = 0.4;
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        
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
            }}
            initial={{ opacity: 0 }}
            animate={{
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
              opacity: [opacity, opacity * 1.5, opacity],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
      
      {/* Simplified content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default MatrixBackgroundSection;
