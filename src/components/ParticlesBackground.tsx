
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
  
  // Enhanced canvas matrix effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Enhanced code rain with multiple colors and effects
    // Include programming language-like symbols
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/?{}[]()=+-*&^%$#@!;:,.\\|~`'\"";
    const codeSnippets = [
      "function()", "const", "let", "var", "=>", "class", "import", "export",
      "return", "async", "await", "try", "catch", "if", "else", "for", "while",
      "<div>", "</div>", "<span>", "{props}", "useState", "useEffect", "()",
      "=>", "==", "===", "&&", "||", "map", "filter", "reduce", "push", "pop"
    ];
    
    // Matrix rain configuration with varied sizes
    const fontSizes = [12, 14, 16];
    const columns = Math.floor(canvas.width / 14);
    
    // Arrays to track data for each column
    const drops: number[] = [];
    const speeds: number[] = [];
    const colors: string[] = [];
    const sizes: number[] = [];
    const textTypes: number[] = [];  // 0 for char, 1 for snippet
    
    // Initialize arrays with varied parameters
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
      speeds[i] = Math.random() * 0.8 + 0.5;  // Varied speeds
      
      // Create a gradient of blue-purple colors for a richer effect
      const hue = Math.random() * 40 + 220;  // Blue to purple range (220-260)
      const saturation = Math.random() * 40 + 60;  // 60-100%
      const lightness = Math.random() * 20 + 50;  // 50-70%
      colors[i] = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.9)`;
      
      sizes[i] = fontSizes[Math.floor(Math.random() * fontSizes.length)];
      textTypes[i] = Math.random() > 0.8 ? 1 : 0;  // 20% chance for code snippets
    }
    
    // Enhanced draw function with more interactive effects
    const draw = () => {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Calculate distance from mouse for interactive glow effect
      const mouseX = mousePosition.x;
      const mouseY = mousePosition.y;
      const mouseRadius = 150; // Area of influence
      
      // For each column
      for (let i = 0; i < drops.length; i++) {
        const x = i * sizes[i];
        const y = drops[i] * sizes[i];
        
        // Calculate distance to mouse
        const dx = mouseX - x;
        const dy = mouseY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let glowIntensity = 0;
        
        if (distance < mouseRadius) {
          // Make chars glow when close to mouse
          glowIntensity = 1 - (distance / mouseRadius);
        }
        
        // Draw character with glow effect
        if (textTypes[i] === 0) {
          // Regular characters
          const text = chars[Math.floor(Math.random() * chars.length)];
          
          // Apply glow effect near mouse
          if (glowIntensity > 0) {
            ctx.shadowBlur = 15 * glowIntensity;
            ctx.shadowColor = "rgba(120, 190, 255, 0.8)";
            ctx.fillStyle = `rgba(200, 230, 255, ${0.7 * glowIntensity + 0.3})`;
          } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = colors[i];
          }
          
          ctx.font = `${sizes[i]}px monospace`;
          ctx.fillText(text, i * sizes[i], drops[i] * sizes[i]);
        } else {
          // Code snippets (less frequent)
          const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
          
          // Different style for snippets
          if (glowIntensity > 0) {
            ctx.shadowBlur = 15 * glowIntensity;
            ctx.shadowColor = "rgba(145, 100, 255, 0.9)";
            ctx.fillStyle = `rgba(220, 190, 255, ${0.8 * glowIntensity + 0.2})`;
          } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = "rgba(176, 130, 255, 0.85)"; // Purple for snippets
          }
          
          ctx.font = `bold ${sizes[i]}px monospace`;
          ctx.fillText(snippet, i * sizes[i], drops[i] * sizes[i]);
        }
        
        // Reset when off screen and randomize reset position
        if (drops[i] * sizes[i] > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
          // Occasionally change parameters for variety
          if (Math.random() > 0.8) {
            speeds[i] = Math.random() * 0.8 + 0.5;
            textTypes[i] = Math.random() > 0.8 ? 1 : 0;
          }
        }
        
        // Increment Y coordinate for next character
        drops[i] += speeds[i];
      }
    };
    
    // Animation loop with smoother framerate
    let animationFrameId: number;
    
    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, [mousePosition]);
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Canvas for enhanced code rain effect */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-25"
      />
      
      {/* Enhanced floating particles with varied effects */}
      {Array.from({ length: 20 }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        const isBlue = Math.random() > 0.6;
        const isPurple = Math.random() > 0.8;
        const isYellow = !isBlue && !isPurple;
        const color = isBlue ? "#3B82F6" : isPurple ? "#9061F9" : "#EAB308";
        const opacity = Math.random() * 0.15 + 0.1;
        
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
              x: [0, Math.random() * 150 - 75],
              y: [0, Math.random() * 150 - 75],
              opacity: [opacity, opacity * 2, opacity],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        );
      })}
      
      {/* Enhanced mouse follower effect with dual layer */}
      <motion.div 
        className="absolute w-96 h-96 rounded-full bg-blue/5 filter blur-3xl"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 3,
        }}
      />
      
      <motion.div 
        className="absolute w-64 h-64 rounded-full bg-purple/5 filter blur-2xl"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 250,
          mass: 2,
        }}
      />
      
      {/* Enhanced gradient orbs with more subtle animations */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-yellow/10 rounded-full filter blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-blue/10 rounded-full filter blur-3xl animate-pulse-glow animation-delay-1000" />
      <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-purple/8 rounded-full filter blur-2xl animate-pulse-glow animation-delay-1500" />
    </div>
  );
};

export default ParticlesBackground;
