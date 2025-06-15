
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Lightweight white particle system with DNA connections
const DNAVertexParticles = () => {
  const [activeVertex, setActiveVertex] = useState<number | null>(null);

  // Minimal vertex configuration for performance
  const VERTICES = [
    {
      className: "absolute top-1/4 left-1/2 w-[30rem] h-[30rem] -translate-x-1/2 blur-2xl",
      gradient: "from-white/5 via-gray-100/2 to-transparent",
      shadow: "0 0 60px 20px rgba(255, 255, 255, 0.02)",
      id: 0,
    },
    {
      className: "absolute bottom-1/3 left-1/4 w-[25rem] h-[25rem] blur-2xl",
      gradient: "from-gray-200/4 via-white/2 to-transparent",
      shadow: "0 0 50px 15px rgba(200, 200, 200, 0.015)",
      id: 1,
    },
    {
      className: "absolute top-1/2 right-1/4 w-[20rem] h-[20rem] blur-2xl",
      gradient: "from-white/3 via-gray-50/1 to-transparent",
      shadow: "0 0 40px 12px rgba(255, 255, 255, 0.01)",
      id: 2,
    },
  ];

  return (
    <>
      {VERTICES.map((vertex, i) => (
        <motion.div
          key={i}
          className={`pointer-events-auto rounded-full bg-gradient-radial ${vertex.className} ${vertex.gradient} ${
            activeVertex === i ? "scale-110" : ""
          }`}
          style={{ 
            boxShadow: activeVertex === i 
              ? `${vertex.shadow}, 0 0 80px 30px rgba(255, 255, 255, 0.03)` 
              : vertex.shadow,
            zIndex: 0 
          }}
          onPointerEnter={() => setActiveVertex(i)}
          onPointerLeave={() => setActiveVertex(null)}
          whileHover={{ scale: 1.05 }}
          animate={{
            y: [0, (i % 2 === 0 ? 1 : -1) * 6, 0],
            x: [0, (i % 3 ? 1 : -1) * 4, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 25 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2
          }}
        />
      ))}
    </>
  );
};

// Lightweight interactive dots with DNA connections
const DNAConnectedDots = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  
  // Reduced particle count for better performance
  const dots = useState(
    Array.from({ length: 20 }, (_, i) => {
      // DNA helix positioning
      const t = (i / 20) * Math.PI * 3;
      const radius = 25;
      const x = 50 + Math.cos(t) * radius;
      const y = 25 + (i / 20) * 50;
      
      return {
        id: i,
        left: `${Math.max(10, Math.min(90, x))}%`,
        top: `${Math.max(10, Math.min(90, y))}%`,
        size: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.3,
        intensity: Math.random() * 0.4 + 0.2,
        helix: t,
      };
    })
  )[0];

  return (
    <>
      {/* Connection lines between nearby dots */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        {dots.map((dot, i) => {
          if (i === 0) return null;
          const prevDot = dots[i - 1];
          return (
            <motion.line
              key={`line-${i}`}
              x1={dot.left}
              y1={dot.top}
              x2={prevDot.left}
              y2={prevDot.top}
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="0.5"
              strokeDasharray="1,2"
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          );
        })}
      </svg>

      {/* DNA vertex dots */}
      {dots.map((dot, i) => (
        <motion.div
          key={dot.id}
          className="absolute pointer-events-auto rounded-full bg-white cursor-pointer"
          style={{
            left: dot.left,
            top: dot.top,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            boxShadow: hovered === i
              ? `0 0 15px 3px rgba(255, 255, 255, 0.5), 0 0 30px 6px rgba(255, 255, 255, 0.2)`
              : `0 0 ${dot.size * 2}px 1px rgba(255, 255, 255, ${dot.intensity})`,
            opacity: hovered === i ? 0.9 : dot.opacity,
            zIndex: 2,
          }}
          whileHover={{
            scale: 1.8,
            opacity: 1,
          }}
          onPointerEnter={() => setHovered(i)}
          onPointerLeave={() => setHovered(null)}
          animate={{
            y: [0, Math.sin(dot.helix) * 3, 0],
            opacity: [dot.opacity * 0.8, dot.opacity, dot.opacity * 0.9],
          }}
          transition={{
            duration: 20 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3
          }}
        />
      ))}
    </>
  );
};

// Main export with pitch black background
const ParticlesBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
    <DNAVertexParticles />
    <DNAConnectedDots />
  </div>
);

export default ParticlesBackground;
