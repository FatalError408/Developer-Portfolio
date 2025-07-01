
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Enhanced orb colors to match gradient theme
const ORB_COLORS = [
  "from-blue-500/50 to-purple-600/20",
  "from-purple-500/40 to-fuchsia-500/15",
  "from-fuchsia-400/30 to-pink-400/10",
  "from-cyan-400/25 to-blue-500/15",
  "from-pink-400/35 to-purple-500/20",
  "from-indigo-500/40 to-blue-600/15",
  "from-violet-500/30 to-purple-400/10",
];

// Enhanced floating gradient orbs with better coverage
const AnimatedOrbs = () => {
  const [activeOrb, setActiveOrb] = useState<number | null>(null);

  // More comprehensive orb positions for full coverage
  const ORBS = [
    {
      className: "absolute top-10 left-1/4 w-[45rem] h-[45rem] -translate-x-1/2 blur-3xl",
      color: ORB_COLORS[0],
      id: 0,
    },
    {
      className: "absolute top-1/3 right-1/4 w-[38rem] h-[38rem] blur-3xl",
      color: ORB_COLORS[1],
      id: 1,
    },
    {
      className: "absolute bottom-1/3 left-1/3 w-[35rem] h-[35rem] blur-3xl",
      color: ORB_COLORS[2],
      id: 2,
    },
    {
      className: "absolute top-2/3 right-1/5 w-[28rem] h-[28rem] blur-3xl",
      color: ORB_COLORS[3],
      id: 3,
    },
    {
      className: "absolute bottom-1/4 left-1/6 w-[32rem] h-[32rem] blur-3xl",
      color: ORB_COLORS[4],
      id: 4,
    },
    {
      className: "absolute top-1/5 right-1/3 w-[25rem] h-[25rem] blur-3xl",
      color: ORB_COLORS[5],
      id: 5,
    },
    {
      className: "absolute bottom-1/5 right-1/4 w-[30rem] h-[30rem] blur-3xl",
      color: ORB_COLORS[6],
      id: 6,
    },
  ];

  return (
    <>
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className={`pointer-events-auto rounded-full bg-gradient-radial animate-pulse-slow ${orb.className} ${
            activeOrb === i ? "shadow-[0_0_80px_40px_rgba(139,92,246,0.25)] scale-110" : ""
          }`}
          style={{ 
            background: `radial-gradient(circle, var(--tw-gradient-stops))`,
            animationDelay: `${i * 0.5}s`,
            zIndex: 0 
          }}
          onPointerEnter={() => setActiveOrb(i)}
          onPointerLeave={() => setActiveOrb(null)}
          onTouchStart={() => setActiveOrb(i)}
          onTouchEnd={() => setActiveOrb(null)}
          whileHover={{ scale: 1.08 }}
          animate={{
            y: [
              0,
              (i % 2 === 0 ? 1 : -1) * (20 + i * 2),
              0,
              (i % 2 === 0 ? -1 : 1) * (15 + i),
              0,
            ],
            x: [
              0,
              (i % 3 ? 1 : -1) * (12 + i),
              0,
              (i % 3 ? -1 : 1) * (8 + i * 0.5),
              0,
            ],
            scale: [1, 1.05, 1, 0.98, 1],
          }}
          transition={{
            duration: 25 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8
          }}
        />
      ))}
    </>
  );
};

// Enhanced interactive floating dots with better distribution
const InteractiveDots = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [dots, setDots] = useState(
    Array.from({ length: 24 }).map((_, i) => {
      // Better grid distribution for full coverage
      const cols = 6;
      const rows = 4;
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      const baseLeft = 8 + (84 * col) / (cols - 1);
      const baseTop = 10 + (80 * row) / (rows - 1);
      
      return {
        id: i,
        color: [
          "#8B5CF6", "#1EAEDB", "#D946EF", "#50E3C2", 
          "#6366f1", "#a21caf", "#0ea5e9", "#10b981",
          "#f59e0b", "#ef4444", "#06b6d4", "#8b5cf6"
        ][i % 12],
        left: `${baseLeft + (Math.random() * 6 - 3)}%`,
        top: `${baseTop + (Math.random() * 8 - 4)}%`,
        size: Math.random() * 4 + 3,
        blur: Math.random() > 0.75 ? 2.5 : 0,
        glowIntensity: Math.random() * 15 + 5,
      };
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((dots) =>
        dots.map((dot) => ({
          ...dot,
          left: `${parseFloat(dot.left) + Math.sin(Date.now() / 8000 + dot.id) * 0.8}%`,
          top: `${parseFloat(dot.top) + Math.cos(Date.now() / 6500 + dot.id * 1.5) * 0.6}%`,
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
          className="absolute pointer-events-auto cursor-pointer"
          style={{
            left: dot.left,
            top: dot.top,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            borderRadius: "50%",
            background: hovered === i ? "#f9a8d4" : dot.color,
            filter: `blur(${dot.blur}px)`,
            boxShadow:
              hovered === i
                ? `0 0 ${dot.glowIntensity * 2}px ${dot.glowIntensity}px #f9a8d4, 0 0 ${dot.glowIntensity * 3}px ${dot.glowIntensity * 1.5}px ${dot.color}88`
                : dot.blur
                ? `0 0 ${dot.glowIntensity}px ${dot.glowIntensity * 0.5}px ${dot.color}77`
                : `0 0 6px 2px ${dot.color}44`,
            opacity: hovered === i ? 1 : 0.8,
            zIndex: hovered === i ? 2 : 1,
            transition: "all 0.3s ease",
          }}
          whileHover={{
            scale: 2.2,
            opacity: 1,
            y: -15,
            transition: { duration: 0.2 }
          }}
          onPointerEnter={() => setHovered(i)}
          onPointerLeave={() => setHovered(null)}
          onTouchStart={() => setHovered(i)}
          onTouchEnd={() => setHovered(null)}
          animate={{
            y: [
              0,
              (i % 2 === 0 ? -1 : 1) * (Math.random() * 8 + 4),
              0,
              (i % 2 === 0 ? 1 : -1) * (Math.random() * 6 + 2),
              0
            ],
            scale: hovered === i ? 2 : [1, 1.1, 1, 0.95, 1],
            opacity: [0.8, 1, 0.8, 0.9, 0.8],
          }}
          transition={{
            duration: 12 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4
          }}
        />
      ))}
    </>
  );
};

// Enhanced ambient particles for depth
const AmbientParticles = () => {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    opacity: Math.random() * 0.4 + 0.1,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 10,
  }));

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: "rgba(255, 255, 255, 0.6)",
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            filter: "blur(1px)",
            opacity: particle.opacity,
          }}
          animate={{
            opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
            scale: [0.5, 1.5, 0.5],
            y: [0, -Math.random() * 100 - 50, 0],
            x: [0, Math.random() * 60 - 30, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
        />
      ))}
    </>
  );
};

// Main export with full coverage
const ParticlesBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <AnimatedOrbs />
    <InteractiveDots />
    <AmbientParticles />
  </div>
);

export default ParticlesBackground;
