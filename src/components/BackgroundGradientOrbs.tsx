
import { ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";

// Enhanced gradient orbs with better performance and visuals
const BackgroundGradientOrbs = ({ children }: { children?: ReactNode }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Smooth mouse tracking with throttling
  useEffect(() => {
    let animationFrame: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrame) return;
      animationFrame = requestAnimationFrame(() => {
        setMousePos({ 
          x: (e.clientX / window.innerWidth) * 100, 
          y: (e.clientY / window.innerHeight) * 100 
        });
        animationFrame = 0;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    setIsVisible(true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Main gradient orbs with enhanced colors and animations */}
      <motion.div 
        className="absolute top-1/4 left-1/2 w-[45rem] h-[45rem] -translate-x-1/2 bg-gradient-radial from-blue-500/35 via-blue-400/20 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.7, 0.9, 0.7],
          x: [0, mousePos.x * 0.1, 0],
          y: [0, mousePos.y * 0.1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 left-1/3 w-[38rem] h-[38rem] bg-gradient-radial from-purple-500/30 via-purple-400/15 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.6, 0.8, 0.6],
          x: [0, -mousePos.x * 0.08, 0],
          y: [0, mousePos.y * 0.12, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div 
        className="absolute top-2/3 right-12 w-[22rem] h-[22rem] bg-gradient-radial from-cyan-400/25 via-cyan-300/12 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.75, 0.5],
          x: [0, mousePos.x * 0.05, 0],
          y: [0, -mousePos.y * 0.08, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Additional accent orbs for depth */}
      <motion.div 
        className="absolute top-[15%] right-[8%] w-[28rem] h-[28rem] bg-gradient-radial from-pink-400/20 via-pink-300/10 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />

      {/* Enhanced floating particles with better distribution */}
      {Array.from({ length: 18 }).map((_, i) => {
        const size = Math.random() * 6 + 3;
        const colors = [
          "#8B5CF6", "#1EAEDB", "#D946EF", "#50E3C2", 
          "#6366f1", "#a21caf", "#0ea5e9", "#10b981"
        ];
        const color = colors[i % colors.length];
        
        // Better positioning distribution
        const sector = i % 6;
        const baseLeft = 10 + (sector * 15) + Math.random() * 10;
        const baseTop = 15 + Math.random() * 70;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-80"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: color,
              left: `${baseLeft}%`,
              top: `${baseTop}%`,
              filter: `blur(${Math.random() > 0.7 ? 1.5 : 0}px)`,
              boxShadow: Math.random() > 0.6 ? `0 0 16px 6px ${color}40` : 'none',
            }}
            animate={{
              y: [0, -15 - Math.random() * 10, 0, 10 + Math.random() * 8, 0],
              x: [0, 8 - Math.random() * 16, 0, -6 + Math.random() * 12, 0],
              opacity: [0.6, 1, 0.8, 1, 0.6],
              scale: [1, 1.2, 1, 1.1, 1],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        );
      })}

      {/* Subtle mesh gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/5 to-purple-900/8 mix-blend-multiply" />
      
      {children}
    </div>
  );
};

export default BackgroundGradientOrbs;
