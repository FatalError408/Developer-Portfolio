import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const ParticlesBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Throttle mouse movement to reduce performance impact
  useEffect(() => {
    let timeoutId: number | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (timeoutId) return; // Skip if we're throttling
      
      timeoutId = window.setTimeout(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        timeoutId = null;
      }, 100); // Only update every 100ms
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);
  
  // Enhanced canvas matrix effect with better performance and persistent behavior
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
    const columns = Math.ceil(window.innerWidth / columnWidth);
    
    // Arrays to track data for each column
    const drops: number[] = [];
    const speeds: number[] = [];
    const colors: string[] = [];
    const sizes: number[] = [];
    const textTypes: number[] = [];
    const fontSizes = [12, 14, 16];
    const opacities: number[] = [];
    const lastUpdatedChars: string[] = [];
    
    // Initialize arrays with varied parameters for better visual effect
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
      // Varied speeds based on screen size for better responsiveness
      speeds[i] = Math.random() * (window.innerWidth > 768 ? 0.8 : 0.5) + (window.innerWidth > 768 ? 0.5 : 0.3);
      
      // Create more vibrant blue-purple colors
      const hue = Math.random() * 40 + 220;  // Blue to purple range (220-260)
      const saturation = Math.random() * 40 + 80;  // 80-120%
      const lightness = Math.random() * 25 + 60;  // 60-85%
      colors[i] = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.95)`;
      
      sizes[i] = fontSizes[Math.floor(Math.random() * fontSizes.length)];
      textTypes[i] = Math.random() > 0.8 ? 1 : 0;
      opacities[i] = Math.random() * 0.5 + 0.6; // Higher base opacity for better visibility
      lastUpdatedChars[i] = chars[Math.floor(Math.random() * chars.length)];
    }
    
    // Optimized draw function with better visuals and performance
    const draw = () => {
      // Semi-transparent black background for trail effect - more transparent for better legibility
      ctx.fillStyle = 'rgba(0, 0, 0, 0.035)';
      ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      
      // For each column with optimized rendering
      for (let i = 0; i < drops.length; i++) {
        const x = i * columnWidth;
        const y = drops[i] * sizes[i];
        
        // Update character every few frames for a more dynamic effect
        if (Math.random() > 0.9) {
          lastUpdatedChars[i] = chars[Math.floor(Math.random() * chars.length)];
        }
        
        // Draw character with enhanced glow effect - always visible
        if (textTypes[i] === 0) {
          // Regular characters
          const text = lastUpdatedChars[i];
          
          ctx.shadowBlur = 0;
          ctx.fillStyle = colors[i];
          ctx.font = `${sizes[i]}px "Fira Code", monospace`;
          ctx.globalAlpha = Math.max(0.4, opacities[i]); // Ensure minimum opacity for visibility
          ctx.fillText(text, x, y);
          ctx.globalAlpha = 1;
        } else {
          // Code snippets (less frequent)
          const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
          
          ctx.shadowBlur = 0;
          ctx.fillStyle = "rgba(186, 140, 255, 0.9)"; // More vibrant purple for snippets
          ctx.font = `bold ${sizes[i]}px "Fira Code", monospace`;
          ctx.globalAlpha = Math.max(0.5, opacities[i]); // Ensure minimum opacity
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
            opacities[i] = Math.random() * 0.5 + 0.6;
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
  }, []);
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Canvas with improved visibility and higher opacity */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-60"
        style={{ pointerEvents: "none" }} 
      />
      
      {/* Fixed floating particles that DON'T react to mouse movement */}
      {Array.from({ length: window.innerWidth > 768 ? 50 : 30 }).map((_, i) => {
        const size = Math.random() * 4 + 1.5;
        
        // Better color distribution with enhanced palette
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
        
        // Fixed positions that don't change with mouse movement
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        
        // More natural, varied movements that are completely independent from mouse position
        const xMove = Math.random() * 180 - 90;
        const yMove = Math.random() * 180 - 90;
        const duration = Math.random() * 20 + 15; // Slower, more subtle movement
        const delay = Math.random() * -15; // Random starting positions in animation cycle
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: color,
              opacity: opacity,
              top: top,
              left: left,
              filter: `blur(${Math.random() > 0.7 ? 1 : 0}px)`,
              pointerEvents: "none"
            }}
            initial={{ opacity: 0 }}
            animate={{
              x: [0, xMove, 0, -xMove / 1.5, 0], // More complex movement pattern
              y: [0, yMove, -yMove / 2, yMove / 1.5, 0],
              opacity: [opacity, opacity * 2, opacity * 1.5, opacity], // Subtle pulsing
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
              times: [0, 0.25, 0.5, 0.75, 1] // Control timing of animation sequence
            }}
          />
        );
      })}
      
      {/* Enhanced gradient orbs in background - not tied to mouse movement */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-yellow-400/10 rounded-full filter blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-1000 pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full filter blur-3xl animate-pulse-slow animation-delay-1500 pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-indigo-600/5 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-blue-400/8 rounded-full filter blur-3xl animate-pulse-slow animation-delay-1200 pointer-events-none" />
      <div className="absolute top-3/4 left-1/4 w-60 h-60 bg-purple-600/6 rounded-full filter blur-3xl animate-pulse-slow animation-delay-1800 pointer-events-none" />
      
      {/* Add an additional large circular gradient for enhanced visual depth */}
      <div className="absolute -top-64 -left-64 w-[40rem] h-[40rem] bg-gradient-radial from-blue-900/10 via-purple-900/5 to-transparent rounded-full filter blur-3xl animate-pulse-slow animation-delay-2200 pointer-events-none" />
    </div>
  );
};

export default ParticlesBackground;
