
import { ReactNode, useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

// Optimized professional background with DNA vertex connections
const BackgroundGradientOrbs = ({ children }: { children?: ReactNode }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Throttled mouse tracking for better performance
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ 
      x: (e.clientX / window.innerWidth) * 100, 
      y: (e.clientY / window.innerHeight) * 100 
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
    setIsVisible(true);

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [handleMouseMove]);

  // Minimal white orb configurations for subtle depth
  const orbConfigs = useMemo(() => [
    {
      size: "35rem",
      position: "top-1/4 left-1/2 -translate-x-1/2",
      gradient: "from-white/4 via-gray-100/2 to-transparent",
      shadow: "0 0 80px 30px rgba(255, 255, 255, 0.02)",
    },
    {
      size: "28rem",
      position: "bottom-1/3 right-1/4",
      gradient: "from-gray-200/3 via-white/1 to-transparent",
      shadow: "0 0 60px 20px rgba(200, 200, 200, 0.015)",
    }
  ], []);

  // DNA vertex particles - much fewer for performance
  const dnaVertices = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      // DNA double helix pattern with fewer particles
      const t = (i / 12) * Math.PI * 2;
      const radius = 20;
      const x = 50 + Math.cos(t) * radius;
      const y = 30 + (i / 12) * 40;
      
      return {
        id: i,
        size: 2 + Math.random() * 2,
        x,
        y,
        opacity: 0.4 + Math.random() * 0.3,
        delay: i * 0.5,
        helix: t,
        isConnector: i % 3 === 0, // Some particles will have connection lines
      };
    });
  }, []);

  // Connection lines between DNA vertices
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < dnaVertices.length - 1; i++) {
      if (i % 2 === 0) { // Only connect every other particle to avoid clutter
        const start = dnaVertices[i];
        const end = dnaVertices[i + 1];
        const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
        
        if (distance < 30) { // Only connect nearby particles
          lines.push({
            id: `line-${i}`,
            x1: start.x,
            y1: start.y,
            x2: end.x,
            y2: end.y,
            opacity: 0.2 + Math.random() * 0.1,
          });
        }
      }
    }
    return lines;
  }, [dnaVertices]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* Minimal gradient orbs for subtle depth */}
      {orbConfigs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute w-[${orb.size}] h-[${orb.size}] ${orb.position} bg-gradient-radial ${orb.gradient} rounded-full blur-3xl`}
          style={{ boxShadow: orb.shadow }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, mousePos.x * 0.02, 0],
            y: [0, mousePos.y * 0.02, 0],
          }}
          transition={{
            duration: 20 + index * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 3
          }}
        />
      ))}

      {/* DNA vertex connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {connections.map((line) => (
          <motion.line
            key={line.id}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
            strokeDasharray="2,4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, line.opacity, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4,
            }}
          />
        ))}
      </svg>

      {/* Optimized DNA vertices - fewer particles */}
      {dnaVertices.map((vertex) => (
        <motion.div
          key={`vertex-${vertex.id}`}
          className="absolute rounded-full bg-white"
          style={{
            width: `${vertex.size}px`,
            height: `${vertex.size}px`,
            left: `${vertex.x}%`,
            top: `${vertex.y}%`,
            opacity: vertex.opacity,
            boxShadow: vertex.isConnector 
              ? `0 0 ${vertex.size * 4}px 2px rgba(255, 255, 255, 0.4), inset 0 0 ${vertex.size}px rgba(255, 255, 255, 0.6)` 
              : `0 0 ${vertex.size * 2}px 1px rgba(255, 255, 255, 0.3)`,
          }}
          animate={{
            x: [0, Math.cos(vertex.helix) * 15, 0],
            y: [0, -5, 0],
            opacity: [vertex.opacity * 0.6, vertex.opacity, vertex.opacity * 0.8],
            scale: vertex.isConnector ? [1, 1.3, 1] : [1, 1.1, 1],
          }}
          transition={{
            duration: 15 + vertex.id * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: vertex.delay,
          }}
        />
      ))}

      {/* Subtle ambient particles - very few */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`ambient-${i}`}
          className="absolute rounded-full bg-white opacity-20"
          style={{
            width: `${1 + Math.random()}px`,
            height: `${1 + Math.random()}px`,
            left: `${20 + i * 10}%`,
            top: `${30 + Math.random() * 40}%`,
            filter: "blur(0.5px)",
            boxShadow: `0 0 ${Math.random() * 6 + 3}px 1px rgba(255, 255, 255, 0.15)`,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            y: [0, -20 - Math.random() * 10, 0],
            x: [0, Math.random() * 10 - 5, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        />
      ))}

      {/* Single subtle depth overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/2 to-transparent mix-blend-overlay" />
      
      {children}
    </div>
  );
};

export default BackgroundGradientOrbs;
