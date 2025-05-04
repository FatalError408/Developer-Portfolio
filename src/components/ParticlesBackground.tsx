
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
  
  // Canvas matrix effect
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
    
    // Code rain characters
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/?{}[]()=+-*&^%$#@!";
    
    // Matrix rain configuration
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track the Y position of each column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }
    
    // Draw matrix rain animation
    const draw = () => {
      // Slightly transparent black background to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Blue-purple text
      ctx.fillStyle = '#4a72f5';
      ctx.font = `${fontSize}px monospace`;
      
      // For each column
      for (let i = 0; i < drops.length; i++) {
        // Select random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Reset when off screen and randomize reset position
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        
        // Increment Y coordinate for next character
        drops[i]++;
      }
    };
    
    // Animation loop
    const interval = setInterval(draw, 80);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Canvas for code rain effect */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-15"
      />
      
      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full opacity-20"
          style={{
            background: i % 2 === 0 ? "#3B82F6" : "#EAB308",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, Math.random() + 0.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      
      {/* Mouse follower effect */}
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
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-yellow/10 rounded-full filter blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-blue/10 rounded-full filter blur-3xl animate-pulse-glow animation-delay-1000" />
    </div>
  );
};

export default ParticlesBackground;
