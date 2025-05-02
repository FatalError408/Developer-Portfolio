
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const ParticlesBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  // Enhanced canvas matrix effect with better performance
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;
    
    // Set canvas dimensions with device pixel ratio for crisp rendering
    const setCanvasDimensions = () => {
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.scale(dpr, dpr);
      }
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Enhanced code rain with optimized performance
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/?{}[]()=+-*&^%$#@!;:,.\\|~`'\"";
    const codeSnippets = [
      "function()", "const", "let", "var", "=>", "class", "import", "export",
      "return", "async", "await", "try", "catch", "if", "else", "for", "while",
      "<div>", "</div>", "<span>", "{props}", "useState", "useEffect", "()",
      "=>", "==", "===", "&&", "||", "map", "filter", "reduce", "push", "pop"
    ];
    
    // Optimize for better performance on different screens
    const columnWidth = 14;
    const columns = Math.floor(window.innerWidth / columnWidth);
    
    // Arrays to track data for each column
    const drops: number[] = [];
    const speeds: number[] = [];
    const colors: string[] = [];
    const sizes: number[] = [];
    const textTypes: number[] = [];
    const fontSizes = [12, 14, 16];
    const opacities: number[] = [];
    
    // Initialize arrays with varied parameters for better visual effect
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
      // Varied speeds based on screen size for better responsiveness
      speeds[i] = Math.random() * (window.innerWidth > 768 ? 0.8 : 0.5) + (window.innerWidth > 768 ? 0.5 : 0.3);
      
      // Create more vibrant blue-purple colors
      const hue = Math.random() * 40 + 220;  // Blue to purple range (220-260)
      const saturation = Math.random() * 40 + 70;  // 70-110%
      const lightness = Math.random() * 25 + 55;  // 55-80%
      colors[i] = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.95)`;
      
      sizes[i] = fontSizes[Math.floor(Math.random() * fontSizes.length)];
      textTypes[i] = Math.random() > 0.8 ? 1 : 0;
      opacities[i] = Math.random() * 0.4 + 0.6; // Higher base opacity for better visibility
    }
    
    // Optimized draw function with better visuals and performance
    const draw = () => {
      // Semi-transparent black background for trail effect - more transparent for better legibility
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      
      // Calculate distance from mouse for enhanced interactive glow
      const mouseX = mousePosition.x;
      const mouseY = mousePosition.y;
      const mouseRadius = window.innerWidth > 768 ? 180 : 120; // Responsive area of influence
      
      // For each column with optimized rendering
      for (let i = 0; i < drops.length; i++) {
        const x = i * columnWidth;
        const y = drops[i] * sizes[i];
        
        // Calculate distance to mouse
        const dx = mouseX - x;
        const dy = mouseY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let glowIntensity = 0;
        
        if (distance < mouseRadius) {
          // Stronger glow effect
          glowIntensity = 1 - (distance / mouseRadius);
        }
        
        // Draw character with enhanced glow effect
        if (textTypes[i] === 0) {
          // Regular characters
          const text = chars[Math.floor(Math.random() * chars.length)];
          
          // Apply enhanced glow effect near mouse
          if (glowIntensity > 0) {
            ctx.shadowBlur = 18 * glowIntensity;
            ctx.shadowColor = "rgba(140, 210, 255, 0.9)";
            ctx.fillStyle = `rgba(220, 240, 255, ${0.8 * glowIntensity + 0.2})`;
          } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = colors[i];
          }
          
          ctx.font = `${sizes[i]}px "Fira Code", monospace`;
          ctx.globalAlpha = opacities[i];
          ctx.fillText(text, x, y);
          ctx.globalAlpha = 1;
        } else {
          // Code snippets (less frequent)
          const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
          
          // Different style for snippets - more pronounced
          if (glowIntensity > 0) {
            ctx.shadowBlur = 18 * glowIntensity;
            ctx.shadowColor = "rgba(160, 120, 255, 0.95)";
            ctx.fillStyle = `rgba(230, 210, 255, ${0.85 * glowIntensity + 0.15})`;
          } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = "rgba(186, 140, 255, 0.9)"; // More vibrant purple for snippets
          }
          
          ctx.font = `bold ${sizes[i]}px "Fira Code", monospace`;
          ctx.globalAlpha = opacities[i];
          ctx.fillText(snippet, x, y);
          ctx.globalAlpha = 1;
        }
        
        // Reset when off screen with varied reset positions for natural flow
        if (y > canvas.height / (window.devicePixelRatio || 1) && Math.random() > 0.98) {
          drops[i] = 0;
          // Occasionally change parameters for continued variety
          if (Math.random() > 0.8) {
            speeds[i] = Math.random() * (window.innerWidth > 768 ? 0.8 : 0.5) + (window.innerWidth > 768 ? 0.5 : 0.3);
            textTypes[i] = Math.random() > 0.8 ? 1 : 0;
            opacities[i] = Math.random() * 0.4 + 0.6;
          }
        }
        
        // Increment Y coordinate for next character
        drops[i] += speeds[i];
      }
    };
    
    // Animation loop with optimized framerate
    let animationFrameId: number;
    let lastTime = 0;
    const fps = 30; // Cap framerate for better performance
    const fpsInterval = 1000 / fps;
    
    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Throttle frame rate for better performance
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
  }, [mousePosition]);
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Canvas with improved visibility */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-30"
      />
      
      {/* Enhanced floating particles with better responsiveness */}
      {Array.from({ length: window.innerWidth > 768 ? 25 : 15 }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        const isBlue = Math.random() > 0.6;
        const isPurple = Math.random() > 0.8;
        const isYellow = !isBlue && !isPurple;
        const color = isBlue ? "#4B92F6" : isPurple ? "#9861F9" : "#EAB308";
        const opacity = Math.random() * 0.2 + 0.15;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: color,
              opacity: opacity,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: `blur(${Math.random() > 0.7 ? 1 : 0}px)`
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [opacity, opacity * 2.5, opacity],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        );
      })}
      
      {/* Enhanced mouse follower effect with smoother transitions */}
      <motion.div 
        className="absolute w-96 h-96 rounded-full bg-blue/10 filter blur-3xl"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 150,
          mass: 2.5,
        }}
      />
      
      <motion.div 
        className="absolute w-64 h-64 rounded-full bg-purple/10 filter blur-2xl"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{
          type: "spring",
          damping: 35,
          stiffness: 200,
          mass: 1.8,
        }}
      />
      
      {/* Enhanced gradient orbs with more vibrant colors */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-yellow/15 rounded-full filter blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-blue/15 rounded-full filter blur-3xl animate-pulse-glow animation-delay-1000" />
      <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-purple/12 rounded-full filter blur-2xl animate-pulse-glow animation-delay-1500" />
    </div>
  );
};

export default ParticlesBackground;
