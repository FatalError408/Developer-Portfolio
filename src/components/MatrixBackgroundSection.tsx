
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
  const interactionRef = useRef<HTMLDivElement>(null);
  
  // Matrix effect intensity settings
  const getIntensitySettings = () => {
    switch(intensity) {
      case "low":
        return { opacity: 0.4, speed: 0.4, density: 0.6, glow: 2 };
      case "high":
        return { opacity: 0.8, speed: 0.9, density: 1.5, glow: 5 }; // Enhanced glow
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
      "<div>", "</div>", "<span>", "{props}", "useState", "useEffect", "<Code/>"
    ];
    
    // Track interaction events for responsive matrix effect
    let mouseX = -1;
    let mouseY = -1;
    const interactionElement = interactionRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouseX = -1;
      mouseY = -1;
    };
    
    if (interactionElement) {
      interactionElement.addEventListener('mousemove', handleMouseMove);
      interactionElement.addEventListener('mouseleave', handleMouseLeave);
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
      if (interactionElement) {
        interactionElement.removeEventListener('mousemove', handleMouseMove);
        interactionElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      clearTimeout(resizeTimer);
    };
  }, [intensity]);
  
  return (
    <div className="relative overflow-hidden py-12" ref={interactionRef}>
      {/* Matrix canvas background with increased opacity */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 opacity-90 pointer-events-none"
      />
      
      {/* Enhanced floating particles with better performance */}
      {Array.from({ length: Math.min(particleCount, 40) }).map((_, i) => {
        const size = Math.random() * 6 + 2; // Increased size
        
        // Enhanced color distribution with more vibrant colors
        const colorRoll = Math.random();
        let color;
        
        if (colorRoll < 0.25) {
          color = "#9b87f5"; // Primary Purple
        } else if (colorRoll < 0.45) {
          color = "#8B5CF6"; // Vivid Purple
        } else if (colorRoll < 0.65) {
          color = "#1EAEDB"; // Bright Blue
        } else if (colorRoll < 0.85) {
          color = "#50E3C2"; // Bright Cyan
        } else {
          color = "#D946EF"; // Magenta Pink - new vibrant color
        }
        
        const opacity = Math.random() * 0.5 + 0.4; // Increased base opacity
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        
        // Optimized movement patterns
        const xMove = Math.random() * 100 - 50;
        const yMove = Math.random() * 100 - 50;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * -15;
        
        // Add variation to movement patterns for more uniqueness
        const movementType = Math.random();
        let animate = {};
        
        if (movementType > 0.8) {
          // Circular motion
          animate = {
            x: Array.from({ length: 5 }, (_, i) => Math.sin(i * Math.PI / 2) * xMove / 2),
            y: Array.from({ length: 5 }, (_, i) => Math.cos(i * Math.PI / 2) * yMove / 2),
            opacity: [opacity, opacity * 1.7, opacity], // More dramatic opacity shift
            scale: [1, Math.random() > 0.7 ? 1.3 : 1, 1] // Add occasional pulsing
          };
        } else {
          // Standard movement
          animate = {
            x: [0, xMove, 0, -xMove / 1.5, 0],
            y: [0, yMove, -yMove / 2, yMove / 1.5, 0],
            opacity: [opacity, opacity * 1.7, opacity], // More dramatic opacity shift
            scale: [1, Math.random() > 0.7 ? 1.3 : 1, 1] // Add occasional pulsing
          };
        }
        
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
              boxShadow: Math.random() > 0.7 ? `0 0 12px 4px ${color}80` : 'none', // Enhanced glow
            }}
            initial={{ opacity: 0 }}
            animate={animate}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
          />
        );
      })}
      
      {/* Enhanced gradient orbs for better performance */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-radial from-blue-500/25 to-transparent rounded-full filter blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/3 -left-24 w-80 h-80 bg-gradient-radial from-purple-500/25 to-transparent rounded-full filter blur-3xl pointer-events-none animate-pulse-slow animation-delay-1500" />
      <div className="absolute top-3/4 left-1/2 w-72 h-72 bg-gradient-radial from-cyan-400/20 to-transparent rounded-full filter blur-3xl pointer-events-none animate-pulse-slow animation-delay-1000" /> {/* New cyan orb */}
      
      {/* Content with appropriate z-index to appear above background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default MatrixBackgroundSection;
