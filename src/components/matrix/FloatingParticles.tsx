
import { motion } from "framer-motion";
import { useMemo } from "react";

interface FloatingParticlesProps {
  particleCount: number;
}

const FloatingParticles = ({ particleCount }: FloatingParticlesProps) => {
  // Professional white particles with DNA vertex patterns
  const particles = useMemo(() => {
    return Array.from({ length: Math.min(particleCount, 60) }).map((_, i) => {
      const size = Math.random() * 4 + 2;
      
      // DNA double helix positioning
      const helixIndex = i % 20;
      const helixT = (helixIndex / 20) * Math.PI * 6;
      const helixRadius = 8;
      
      let baseLeft, baseTop;
      
      if (i < 20) {
        // First DNA strand
        baseLeft = 25 + Math.cos(helixT) * helixRadius;
        baseTop = 20 + (helixIndex / 20) * 60;
      } else if (i < 40) {
        // Second DNA strand (complementary)
        baseLeft = 75 + Math.cos(helixT + Math.PI) * helixRadius;
        baseTop = 20 + (helixIndex / 20) * 60;
      } else {
        // Random floating particles
        const phi = (1 + Math.sqrt(5)) / 2;
        const angle = i * 2 * Math.PI / phi;
        const radius = Math.sqrt(i) * 8;
        
        baseLeft = 50 + Math.cos(angle) * (radius % 30);
        baseTop = 50 + Math.sin(angle) * (radius % 30);
      }
      
      // Enhanced movement patterns for DNA vertex effect
      const movementType = i % 5;
      let movementPattern = {};
      
      switch (movementType) {
        case 0: // DNA helix motion
          movementPattern = {
            x: Array.from({ length: 8 }, (_, j) => Math.cos(j * Math.PI / 4 + helixT) * 12),
            y: Array.from({ length: 8 }, (_, j) => j * 2 - 6),
          };
          break;
        case 1: // Complementary helix
          movementPattern = {
            x: Array.from({ length: 8 }, (_, j) => Math.cos(j * Math.PI / 4 + helixT + Math.PI) * 12),
            y: Array.from({ length: 8 }, (_, j) => j * 2 - 6),
          };
          break;
        case 2: // Vertex connection pattern
          movementPattern = {
            x: Array.from({ length: 6 }, (_, j) => Math.sin(j * Math.PI / 3) * 20),
            y: Array.from({ length: 6 }, (_, j) => Math.cos(j * Math.PI / 3) * 15),
          };
          break;
        case 3: // Orbital motion
          movementPattern = {
            x: Array.from({ length: 10 }, (_, j) => Math.cos(j * Math.PI / 5) * (10 + j)),
            y: Array.from({ length: 10 }, (_, j) => Math.sin(j * Math.PI / 5) * (10 + j)),
          };
          break;
        default: // Gentle drift
          movementPattern = {
            x: [0, Math.random() * 20 - 10, 0, Math.random() * 15 - 7.5, 0],
            y: [0, Math.random() * 20 - 10, 0, Math.random() * 15 - 7.5, 0],
          };
      }
      
      return {
        id: i,
        size,
        left: Math.max(5, Math.min(95, baseLeft)),
        top: Math.max(5, Math.min(95, baseTop)),
        blur: Math.random() > 0.8 ? Math.random() * 1 + 0.5 : 0,
        opacity: Math.random() * 0.6 + 0.3,
        intensity: Math.random() * 0.4 + 0.2,
        duration: 18 + Math.random() * 12,
        delay: i * 0.2,
        movementPattern,
        rotationSpeed: Math.random() * 180 + 90,
        isHelixParticle: i < 40,
        glowSize: Math.random() * 15 + 10,
      };
    });
  }, [particleCount]);

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none z-0 bg-white"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            filter: `blur(${particle.blur}px)`,
            boxShadow: particle.isHelixParticle
              ? `0 0 ${particle.glowSize}px ${particle.glowSize/3}px rgba(255, 255, 255, 0.4), 
                 0 0 ${particle.size * 2}px 1px rgba(255, 255, 255, 0.6),
                 inset 0 0 ${particle.size}px rgba(255, 255, 255, 0.8)`
              : `0 0 ${particle.glowSize}px ${particle.glowSize/4}px rgba(255, 255, 255, ${particle.intensity}), 
                 inset 0 0 ${particle.size}px rgba(255, 255, 255, 0.5)`,
          }}
          initial={{ 
            opacity: 0,
            scale: 0,
            rotate: 0
          }}
          animate={{
            opacity: [0, particle.opacity, particle.opacity * 1.3, particle.opacity, 0.4],
            scale: [0.5, 1, 1.2, 1, 0.9],
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
            scale: 1.8,
            opacity: 0.9,
            transition: { duration: 0.3 }
          }}
        />
      ))}
      
      {/* Enhanced DNA connection lines */}
      {Array.from({ length: Math.min(particleCount / 8, 10) }).map((_, i) => (
        <motion.div
          key={`connection-${i}`}
          className="absolute pointer-events-none"
          style={{
            width: `2px`,
            height: `40px`,
            background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent, rgba(255, 255, 255, 0.3))`,
            left: `${30 + i * 8}%`,
            top: `${25 + i * 6}%`,
            transformOrigin: 'center',
            filter: 'blur(0.5px)',
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scaleY: [0.8, 1.2, 0.8],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}
      
      {/* Ambient depth particles */}
      {Array.from({ length: Math.min(particleCount / 6, 20) }).map((_, i) => (
        <motion.div
          key={`ambient-${i}`}
          className="absolute rounded-full pointer-events-none opacity-30 bg-white"
          style={{
            width: `${Math.random() * 2 + 0.5}px`,
            height: `${Math.random() * 2 + 0.5}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(0.5px)",
            boxShadow: `0 0 ${Math.random() * 8 + 4}px 1px rgba(255, 255, 255, 0.2)`,
          }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scale: [0.5, 1.1, 0.5],
            y: [0, -Math.random() * 30 - 10, 0],
            x: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: 25 + Math.random() * 15,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.8,
          }}
        />
      ))}
    </>
  );
};

export default FloatingParticles;
