
import { motion } from "framer-motion";

interface FloatingParticlesProps {
  particleCount: number;
}

const FloatingParticles = ({ particleCount }: FloatingParticlesProps) => {
  return (
    <>
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
    </>
  );
};

export default FloatingParticles;
