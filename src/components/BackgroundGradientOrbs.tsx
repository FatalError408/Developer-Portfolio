
import { ReactNode, useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

// Enhanced gradient orbs with better performance and visuals
const BackgroundGradientOrbs = ({ children }: { children?: ReactNode }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Smooth mouse tracking with improved throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ 
      x: (e.clientX / window.innerWidth) * 100, 
      y: (e.clientY / window.innerHeight) * 100 
    });
  }, []);

  // Window resize handler
  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  useEffect(() => {
    let animationFrame: number;
    const throttledMouseMove = (e: MouseEvent) => {
      if (animationFrame) return;
      animationFrame = requestAnimationFrame(() => {
        handleMouseMove(e);
        animationFrame = 0;
      });
    };

    window.addEventListener("mousemove", throttledMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    
    // Initialize
    handleResize();
    setIsVisible(true);

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [handleMouseMove, handleResize]);

  // Memoized orb configurations for better performance
  const orbConfigs = useMemo(() => [
    {
      size: "45rem",
      position: "top-1/4 left-1/2 -translate-x-1/2",
      gradient: "from-blue-500/35 via-blue-400/20 to-transparent",
      animation: {
        scale: [1, 1.05, 1],
        opacity: [0.7, 0.9, 0.7],
        x: [0, mousePos.x * 0.1, 0],
        y: [0, mousePos.y * 0.1, 0],
      },
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
    },
    {
      size: "38rem",
      position: "bottom-1/4 left-1/3",
      gradient: "from-purple-500/30 via-purple-400/15 to-transparent",
      animation: {
        scale: [1, 1.08, 1],
        opacity: [0.6, 0.8, 0.6],
        x: [0, -mousePos.x * 0.08, 0],
        y: [0, mousePos.y * 0.12, 0],
      },
      transition: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }
    },
    {
      size: "22rem",
      position: "top-2/3 right-12",
      gradient: "from-cyan-400/25 via-cyan-300/12 to-transparent",
      animation: {
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.75, 0.5],
        x: [0, mousePos.x * 0.05, 0],
        y: [0, -mousePos.y * 0.08, 0],
      },
      transition: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }
    },
    {
      size: "28rem",
      position: "top-[15%] right-[8%]",
      gradient: "from-pink-400/20 via-pink-300/10 to-transparent",
      animation: {
        scale: [1, 1.06, 1],
        opacity: [0.4, 0.7, 0.4],
      },
      transition: { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }
    }
  ], [mousePos.x, mousePos.y]);

  // Enhanced floating particles with better distribution and performance
  const particles = useMemo(() => {
    const colors = [
      "#8B5CF6", "#1EAEDB", "#D946EF", "#50E3C2", 
      "#6366f1", "#a21caf", "#0ea5e9", "#10b981",
      "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"
    ];
    
    return Array.from({ length: 24 }, (_, i) => {
      const size = Math.random() * 8 + 2;
      const color = colors[i % colors.length];
      
      // Better positioning using golden ratio distribution
      const phi = (1 + Math.sqrt(5)) / 2;
      const angle = i * 2 * Math.PI / phi;
      const radius = Math.sqrt(i) * 8;
      
      const baseLeft = 50 + Math.cos(angle) * radius;
      const baseTop = 50 + Math.sin(angle) * radius;
      
      return {
        id: i,
        size,
        color,
        left: Math.max(5, Math.min(95, baseLeft)),
        top: Math.max(5, Math.min(95, baseTop)),
        blur: Math.random() > 0.6 ? 2 : 0,
        glow: Math.random() > 0.5,
        duration: 10 + Math.random() * 12,
        delay: i * 0.5,
      };
    });
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Main gradient orbs */}
      {orbConfigs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute w-[${orb.size}] h-[${orb.size}] ${orb.position} bg-gradient-radial ${orb.gradient} rounded-full blur-3xl`}
          animate={orb.animation}
          transition={orb.transition}
        />
      ))}

      {/* Enhanced floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-80"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            filter: `blur(${particle.blur}px)`,
            boxShadow: particle.glow ? `0 0 20px 8px ${particle.color}40` : 'none',
          }}
          animate={{
            y: [0, -20 - Math.random() * 15, 0, 15 + Math.random() * 10, 0],
            x: [0, 12 - Math.random() * 24, 0, -8 + Math.random() * 16, 0],
            opacity: [0.6, 1, 0.8, 1, 0.6],
            scale: [1, 1.3, 1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Advanced mesh gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/5 to-purple-900/8 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/3 via-transparent to-pink-900/5 mix-blend-screen" />
      
      {/* Interactive light rays */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {children}
    </div>
  );
};

export default BackgroundGradientOrbs;
