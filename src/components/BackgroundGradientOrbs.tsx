
import { ReactNode, useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

// Professional white particle system with DNA vertex effects
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

  // Professional white orb configurations
  const orbConfigs = useMemo(() => [
    {
      size: "50rem",
      position: "top-1/4 left-1/2 -translate-x-1/2",
      gradient: "from-white/8 via-gray-100/4 to-transparent",
      shadow: "0 0 100px 40px rgba(255, 255, 255, 0.03)",
      animation: {
        scale: [1, 1.02, 1],
        opacity: [0.4, 0.6, 0.4],
        x: [0, mousePos.x * 0.05, 0],
        y: [0, mousePos.y * 0.05, 0],
      },
      transition: { duration: 12, repeat: Infinity, ease: "easeInOut" }
    },
    {
      size: "42rem",
      position: "bottom-1/4 left-1/3",
      gradient: "from-gray-200/6 via-white/3 to-transparent",
      shadow: "0 0 80px 30px rgba(200, 200, 200, 0.02)",
      animation: {
        scale: [1, 1.04, 1],
        opacity: [0.3, 0.5, 0.3],
        x: [0, -mousePos.x * 0.04, 0],
        y: [0, mousePos.y * 0.06, 0],
      },
      transition: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }
    },
    {
      size: "28rem",
      position: "top-2/3 right-12",
      gradient: "from-white/5 via-gray-50/2 to-transparent",
      shadow: "0 0 60px 20px rgba(255, 255, 255, 0.015)",
      animation: {
        scale: [1, 1.06, 1],
        opacity: [0.25, 0.45, 0.25],
        x: [0, mousePos.x * 0.03, 0],
        y: [0, -mousePos.y * 0.04, 0],
      },
      transition: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }
    }
  ], [mousePos.x, mousePos.y]);

  // DNA vertex particles with white colors
  const dnaParticles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => {
      // DNA double helix pattern
      const t = (i / 40) * Math.PI * 4;
      const radius = 15;
      const x = 50 + Math.cos(t) * radius + (Math.random() - 0.5) * 5;
      const y = 20 + (i / 40) * 60 + (Math.random() - 0.5) * 3;
      const z = Math.sin(t) * radius;
      
      return {
        id: i,
        size: Math.random() * 3 + 1,
        x,
        y,
        z,
        opacity: Math.random() * 0.6 + 0.2,
        delay: i * 0.1,
        duration: 20 + Math.random() * 10,
        helix: t,
      };
    });
  }, []);

  // Professional floating particles
  const floatingParticles = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => {
      const size = Math.random() * 4 + 1;
      
      return {
        id: i,
        size,
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: Math.random() * 0.4 + 0.1,
        blur: Math.random() > 0.7 ? Math.random() * 1 + 0.5 : 0,
        duration: 25 + Math.random() * 15,
        delay: i * 0.3,
        shadow: `0 0 ${size * 4}px ${size}px rgba(255, 255, 255, 0.1)`,
      };
    });
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* Professional gradient orbs */}
      {orbConfigs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute w-[${orb.size}] h-[${orb.size}] ${orb.position} bg-gradient-radial ${orb.gradient} rounded-full blur-3xl`}
          style={{ boxShadow: orb.shadow }}
          animate={orb.animation}
          transition={orb.transition}
        />
      ))}

      {/* DNA Vertex Particles */}
      {dnaParticles.map((particle) => (
        <motion.div
          key={`dna-${particle.id}`}
          className="absolute rounded-full bg-white"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            filter: `blur(${particle.size > 2 ? 0.5 : 0}px)`,
            boxShadow: `0 0 ${particle.size * 3}px 1px rgba(255, 255, 255, 0.3), inset 0 0 ${particle.size}px rgba(255, 255, 255, 0.5)`,
          }}
          animate={{
            x: [0, Math.cos(particle.helix + Math.PI) * 30, 0],
            y: [0, -10 - Math.random() * 5, 0],
            opacity: [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.7],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Professional floating particles */}
      {floatingParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            filter: `blur(${particle.blur}px)`,
            boxShadow: particle.shadow,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -15 - Math.random() * 10, 0, 10 + Math.random() * 5, 0],
            x: [0, 8 - Math.random() * 16, 0, -6 + Math.random() * 12, 0],
            opacity: [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.8, particle.opacity, particle.opacity * 0.6],
            scale: [1, 1.1, 1, 1.05, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Subtle mesh gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/3 to-transparent mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-tr from-white/2 via-transparent to-gray-800/2 mix-blend-soft-light" />
      
      {/* Interactive light effect */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.04) 0%, transparent 50%)`
        }}
        animate={{
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {children}
    </div>
  );
};

export default BackgroundGradientOrbs;
