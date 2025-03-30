
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ParticlesBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
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
      
      {/* Gradient orb */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-yellow/10 rounded-full filter blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-blue/10 rounded-full filter blur-3xl animate-pulse-glow animation-delay-1000" />
    </div>
  );
};

export default ParticlesBackground;
