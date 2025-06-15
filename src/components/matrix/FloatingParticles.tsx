
import { motion } from "framer-motion";
import { useMemo } from "react";

interface FloatingParticlesProps {
  particleCount: number;
}

const FloatingParticles = ({ particleCount }: FloatingParticlesProps) => {
  // Memoize particle configurations for better performance
  const particles = useMemo(() => {
    const colors = [
      "#8B5CF6", "#1EAEDB", "#D946EF", "#50E3C2", 
      "#6366f1", "#a21caf", "#0ea5e9", "#10b981",
      "#f59e0b", "#ef4444", "#06b6d4", "#8b5cf6"
    ];
    
    return Array.from({ length: Math.min(particleCount, 50) }).map((_, i) => {
      const size = Math.random() * 8 + 3;
      const color = colors[i % colors.length];
      
      // Use fibonacci spiral for better distribution
      const phi = (1 + Math.sqrt(5)) / 2;
      const angle = i * 2 * Math.PI / phi;
      const radius = Math.sqrt(i) * 12;
      
      const baseLeft = 50 + Math.cos(angle) * (radius % 40);
      const baseTop = 50 + Math.sin(angle) * (radius % 40);
      
      // Enhanced movement patterns
      const movementType = i % 4;
      let movementPattern = {};
      
      switch (movementType) {
        case 0: // Sine wave
          movementPattern = {
            x: Array.from({ length: 6 }, (_, j) => Math.sin(j * Math.PI / 3) * 30),
            y: Array.from({ length: 6 }, (_, j) => Math.cos(j * Math.PI / 3) * 20),
          };
          break;
        case 1: // Figure-8
          movementPattern = {
            x: Array.from({ length: 8 }, (_, j) => Math.sin(j * Math.PI / 4) * 25),
            y: Array.from({ length: 8 }, (_, j) => Math.sin(j * Math.PI / 2) * 15),
          };
          break;
        case 2: // Spiral
          movementPattern = {
            x: Array.from({ length: 10 }, (_, j) => Math.cos(j * Math.PI / 5) * (j * 2)),
            y: Array.from({ length: 10 }, (_, j) => Math.sin(j * Math.PI / 5) * (j * 2)),
          };
          break;
        default: // Random drift
          movementPattern = {
            x: [0, Math.random() * 40 - 20, 0, Math.random() * 30 - 15, 0],
            y: [0, Math.random() * 40 - 20, 0, Math.random() * 30 - 15, 0],
          };
      }
      
      return {
        id: i,
        size,
        color,
        left: Math.max(5, Math.min(95, baseLeft)),
        top: Math.max(5, Math.min(95, baseTop)),
        blur: Math.random() > 0.7 ? Math.random() * 2 + 1 : 0,
        glow: Math.random() > 0.6,
        glowIntensity: Math.random() * 20 + 10,
        duration: 15 + Math.random() * 15,
        delay: i * 0.3,
        opacity: Math.random() * 0.6 + 0.4,
        movementPattern,
        rotationSpeed: Math.random() * 360 + 180,
      };
    });
  }, [particleCount]);

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color}, ${particle.color}80)`,
            opacity: particle.opacity,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            filter: `blur(${particle.blur}px)`,
            boxShadow: particle.glow 
              ? `0 0 ${particle.glowIntensity}px ${particle.glowIntensity/2}px ${particle.color}60, inset 0 0 ${particle.size}px ${particle.color}40` 
              : 'none',
          }}
          initial={{ 
            opacity: 0,
            scale: 0,
            rotate: 0
          }}
          animate={{
            opacity: [0, particle.opacity, particle.opacity * 1.5, particle.opacity, 0.3],
            scale: [0.5, 1, 1.4, 1, 0.8],
            rotate: [0, particle.rotationSpeed],
            ...particle.movementPattern,
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
            times: [0, 0.2, 0.5, 0.8, 1],
          }}
          whileHover={{
            scale: 1.5,
            opacity: 1,
            transition: { duration: 0.3 }
          }}
        />
      ))}
      
      {/* Enhanced ambient particles for depth */}
      {Array.from({ length: Math.min(particleCount / 4, 15) }).map((_, i) => (
        <motion.div
          key={`ambient-${i}`}
          className="absolute rounded-full pointer-events-none opacity-20"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            background: "#ffffff",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(0.5px)",
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scale: [0.5, 1.2, 0.5],
            y: [0, -Math.random() * 50 - 20, 0],
            x: [0, Math.random() * 30 - 15, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        />
      ))}
    </>
  );
};

export default FloatingParticles;
