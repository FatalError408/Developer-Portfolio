
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Professional white particle system
const AnimatedOrbs = () => {
  const [activeOrb, setActiveOrb] = useState<number | null>(null);

  const ORBS = [
    {
      className: "absolute top-1/4 left-1/2 w-[45rem] h-[45rem] -translate-x-1/2 blur-3xl",
      gradient: "from-white/6 via-gray-100/3 to-transparent",
      shadow: "0 0 120px 50px rgba(255, 255, 255, 0.02)",
      id: 0,
    },
    {
      className: "absolute bottom-1/4 left-1/3 w-[38rem] h-[38rem] blur-3xl",
      gradient: "from-gray-200/5 via-white/2 to-transparent",
      shadow: "0 0 100px 40px rgba(200, 200, 200, 0.015)",
      id: 1,
    },
    {
      className: "absolute top-2/3 right-12 w-[25rem] h-[25rem] blur-3xl",
      gradient: "from-white/4 via-gray-50/2 to-transparent",
      shadow: "0 0 80px 30px rgba(255, 255, 255, 0.01)",
      id: 2,
    },
    {
      className: "absolute top-[15%] right-[5%] w-[30rem] h-[30rem] blur-3xl",
      gradient: "from-gray-100/3 via-white/1 to-transparent",
      shadow: "0 0 90px 35px rgba(240, 240, 240, 0.012)",
      id: 3,
    },
    {
      className: "absolute bottom-[22%] left-[5%] w-[26rem] h-[26rem] blur-3xl",
      gradient: "from-white/3 via-gray-200/1 to-transparent",
      shadow: "0 0 70px 25px rgba(255, 255, 255, 0.008)",
      id: 4,
    },
  ];

  return (
    <>
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className={`pointer-events-auto rounded-full bg-gradient-radial ${orb.className} ${orb.gradient} ${
            activeOrb === i ? "scale-105" : ""
          }`}
          style={{ 
            boxShadow: activeOrb === i 
              ? `${orb.shadow}, 0 0 150px 60px rgba(255, 255, 255, 0.04)` 
              : orb.shadow,
            zIndex: 0 
          }}
          onPointerEnter={() => setActiveOrb(i)}
          onPointerLeave={() => setActiveOrb(null)}
          onTouchStart={() => setActiveOrb(i)}
          onTouchEnd={() => setActiveOrb(null)}
          whileHover={{ scale: 1.02 }}
          animate={{
            y: [
              0,
              (i % 2 === 0 ? 1 : -1) * 8,
              0,
              (i % 2 === 0 ? -1 : 1) * 6,
              0,
            ],
            x: [
              0,
              (i % 3 ? 1 : -1) * 5,
              0,
              (i % 3 ? -1 : 1) * 4,
              0,
            ],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5
          }}
        />
      ))}
    </>
  );
};

// Professional white interactive dots
const InteractiveDots = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [dots, setDots] = useState(
    Array.from({ length: 80 }, (_, i) => {
      // More sophisticated distribution pattern
      const angle = (i * 137.5) * (Math.PI / 180); // Golden angle
      const radius = Math.sqrt(i) * 3;
      const x = 50 + Math.cos(angle) * (radius % 35);
      const y = 50 + Math.sin(angle) * (radius % 35);
      
      return {
        id: i,
        left: `${Math.max(5, Math.min(95, x))}%`,
        top: `${Math.max(5, Math.min(95, y))}%`,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.2,
        blur: Math.random() > 0.8 ? Math.random() * 0.5 + 0.2 : 0,
        intensity: Math.random() * 0.3 + 0.1,
      };
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((dots) =>
        dots.map((dot) => ({
          ...dot,
          left: `${parseFloat(dot.left) + Math.sin(Date.now() / 8000 + dot.id) * 0.2}%`,
          top: `${parseFloat(dot.top) + Math.cos(Date.now() / 6000 + dot.id * 1.5) * 0.15}%`,
        }))
      );
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {dots.map((dot, i) => (
        <motion.div
          key={dot.id}
          className="absolute pointer-events-auto rounded-full bg-white"
          style={{
            left: dot.left,
            top: dot.top,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            filter: `blur(${dot.blur}px)`,
            boxShadow: hovered === i
              ? `0 0 20px 5px rgba(255, 255, 255, 0.4), 0 0 40px 10px rgba(255, 255, 255, 0.2), inset 0 0 ${dot.size}px rgba(255, 255, 255, 0.6)`
              : `0 0 ${dot.size * 3}px 1px rgba(255, 255, 255, ${dot.intensity}), inset 0 0 ${dot.size}px rgba(255, 255, 255, 0.3)`,
            opacity: hovered === i ? 0.9 : dot.opacity,
            zIndex: 1,
            cursor: "pointer",
          }}
          whileHover={{
            scale: 2,
            opacity: 1,
            y: -8,
          }}
          onPointerEnter={() => setHovered(i)}
          onPointerLeave={() => setHovered(null)}
          onTouchStart={() => setHovered(i)}
          onTouchEnd={() => setHovered(null)}
          animate={{
            y: [
              0,
              (i % 2 === 0 ? -1 : 1) * Math.random() * 4,
              0,
              (i % 2 === 0 ? 1 : -1) * Math.random() * 3,
              0
            ],
            scale: hovered === i ? 1.8 : 1,
            opacity: [dot.opacity * 0.7, dot.opacity, dot.opacity * 0.8, dot.opacity],
          }}
          transition={{
            duration: 15 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4
          }}
        />
      ))}
    </>
  );
};

// Main export with pitch black background
const ParticlesBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
    <AnimatedOrbs />
    <InteractiveDots />
  </div>
);

export default ParticlesBackground;
