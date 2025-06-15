
import { motion } from "framer-motion";
import { useMemo } from "react";

interface FloatingParticlesProps {
  particleCount: number;
}

const FloatingParticles = ({ particleCount }: FloatingParticlesProps) => {
  // Optimized DNA vertex particles with connections
  const particles = useMemo(() => {
    // Limit particles for better performance
    const count = Math.min(particleCount, 15);
    
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 3 + 2;
      
      // DNA double helix positioning
      const t = (i / count) * Math.PI * 2.5;
      const radius = 20;
      const baseLeft = 50 + Math.cos(t) * radius;
      const baseTop = 30 + (i / count) * 40;
      
      return {
        id: i,
        size,
        left: Math.max(15, Math.min(85, baseLeft)),
        top: Math.max(15, Math.min(85, baseTop)),
        opacity: Math.random() * 0.6 + 0.4,
        intensity: Math.random() * 0.5 + 0.3,
        duration: 18 + Math.random() * 8,
        delay: i * 0.8,
        helix: t,
        glowSize: Math.random() * 10 + 8,
      };
    });
  }, [particleCount]);

  // Connection lines between particles
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < particles.length - 1; i++) {
      const start = particles[i];
      const end = particles[i + 1];
      const distance = Math.sqrt(
        Math.pow(end.left - start.left, 2) + Math.pow(end.top - start.top, 2)
      );
      
      // Only connect nearby particles to avoid visual clutter
      if (distance < 25) {
        lines.push({
          id: `connection-${i}`,
          x1: start.left,
          y1: start.top,
          x2: end.left,
          y2: end.top,
          opacity: 0.2 + Math.random() * 0.1,
        });
      }
    }
    return lines;
  }, [particles]);

  return (
    <>
      {/* DNA connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map((connection) => (
          <motion.line
            key={connection.id}
            x1={`${connection.x1}%`}
            y1={`${connection.y1}%`}
            x2={`${connection.x2}%`}
            y2={`${connection.y2}%`}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
            strokeDasharray="2,3"
            animate={{
              opacity: [0, connection.opacity, 0],
              strokeDashoffset: [0, -10, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </svg>

      {/* DNA vertex particles */}
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
            boxShadow: `0 0 ${particle.glowSize}px ${particle.glowSize/4}px rgba(255, 255, 255, 0.4), 
                       0 0 ${particle.size * 2}px 1px rgba(255, 255, 255, 0.6),
                       inset 0 0 ${particle.size}px rgba(255, 255, 255, 0.8)`,
          }}
          initial={{ 
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, particle.opacity, particle.opacity * 1.2, particle.opacity],
            scale: [0.5, 1, 1.1, 1],
            x: [0, Math.cos(particle.helix) * 10, 0],
            y: [0, Math.sin(particle.helix) * 8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
          whileHover={{
            scale: 1.5,
            opacity: 0.9,
            transition: { duration: 0.3 }
          }}
        />
      ))}
      
      {/* Minimal ambient depth particles */}
      {Array.from({ length: Math.min(particleCount / 10, 5) }).map((_, i) => (
        <motion.div
          key={`ambient-${i}`}
          className="absolute rounded-full pointer-events-none opacity-25 bg-white"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
            filter: "blur(0.5px)",
            boxShadow: `0 0 ${Math.random() * 6 + 3}px 1px rgba(255, 255, 255, 0.2)`,
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scale: [0.8, 1.2, 0.8],
            y: [0, -Math.random() * 20 - 5, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: i * 3,
          }}
        />
      ))}
    </>
  );
};

export default FloatingParticles;
