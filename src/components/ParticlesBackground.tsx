
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Orb colors to match gradient theme
const ORB_COLORS = [
  "from-blue-500/40 to-transparent",
  "from-purple-500/25 to-transparent",
  "from-fuchsia-400/15 to-transparent",
  "from-cyan-400/15 to-transparent",
  "from-pink-400/15 to-transparent",
];

// Simple floating gradient orbs with touch/mouse glow interactivity
const AnimatedOrbs = () => {
  // Track which orb is hovered/touched for glow fx
  const [activeOrb, setActiveOrb] = useState<number | null>(null);

  // Responsive orb positions
  const ORBS = [
    {
      className:
        "absolute top-1/4 left-1/2 w-[40rem] h-[40rem] -translate-x-1/2 blur-3xl",
      color: ORB_COLORS[0],
      style: { zIndex: 0 },
      id: 0,
    },
    {
      className:
        "absolute bottom-1/4 left-1/3 w-[32rem] h-[32rem] blur-3xl",
      color: ORB_COLORS[1],
      style: { zIndex: 0, animationDelay: "0.8s" },
      id: 1,
    },
    {
      className:
        "absolute top-2/3 right-12 w-[18rem] h-[18rem] blur-3xl",
      color: ORB_COLORS[2],
      style: { zIndex: 0, animationDelay: "1.2s" },
      id: 2,
    },
    {
      className:
        "absolute top-[15%] right-[5%] w-[22rem] h-[22rem] blur-3xl",
      color: ORB_COLORS[3],
      style: { zIndex: 0, animationDelay: "1.6s" },
      id: 3,
    },
    {
      className:
        "absolute bottom-[22%] left-[5%] w-[19rem] h-[19rem] blur-3xl",
      color: ORB_COLORS[4],
      style: { zIndex: 0, animationDelay: "2s" },
      id: 4,
    },
  ];

  return (
    <>
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className={`pointer-events-auto rounded-full bg-gradient-radial animate-pulse-slow ${orb.className} ${activeOrb === i ? "shadow-[0_0_60px_32px_rgba(139,92,246,0.17)] scale-[1.04]" : ""}`}
          style={orb.style}
          onPointerEnter={() => setActiveOrb(i)}
          onPointerLeave={() => setActiveOrb(null)}
          onTouchStart={() => setActiveOrb(i)}
          onTouchEnd={() => setActiveOrb(null)}
          whileHover={{ scale: 1.05 }}
          animate={{
            y: [
              0,
              (i % 2 === 0 ? 1 : -1) * 14,
              0,
              (i % 2 === 0 ? -1 : 1) * 10,
              0,
            ],
            x: [
              0,
              (i % 3 ? 1 : -1) * 8,
              0,
              (i % 3 ? -1 : 1) * 6,
              0,
            ],
          }}
          transition={{
            duration: 18 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i
          }}
        />
      ))}
    </>
  );
};

// Interactive floating dots (user can hover/tap for color pop)
const InteractiveDots = () => {
  // Track which dot is hovering/tapped
  const [hovered, setHovered] = useState<number | null>(null);
  // Maps to make dot positions stable
  const [dots, setDots] = useState(
    Array.from({ length: 14 }).map((_, i) => {
      // Staggered base positions for harmony
      const baseLeft = 8 + (82 * (i % 7)) / 6 + (i > 6 ? 7 : 0);
      const baseTop = 12 + (76 * Math.floor(i / 7)) / 2 + (i % 2 ? 4 : -2);
      return {
        id: i,
        color: [
          "#8B5CF6",
          "#1EAEDB",
          "#D946EF",
          "#50E3C2",
          "#6366f1",
          "#a21caf",
        ][i % 6],
        left: `${baseLeft + Math.random() * 3 - 1.5}%`,
        top: `${baseTop + Math.random() * 4 - 2}%`,
        size: Math.random() * 5 + 4,
        blur: Math.random() > 0.82 ? 2 : 0,
      };
    })
  );

  useEffect(() => {
    // Optional: Animate dot base positions gently for subtle movement
    const timer = setInterval(() => {
      setDots((dots) =>
        dots.map((dot) => ({
          ...dot,
          left: `${parseFloat(dot.left) + Math.sin(Date.now() / 7000 + dot.id) * 0.5}%`,
          top: `${parseFloat(dot.top) + Math.cos(Date.now() / 5900 + dot.id * 1.8) * 0.3}%`,
        }))
      );
    }, 12000); // Very slow drift
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {dots.map((dot, i) => (
        <motion.div
          key={dot.id}
          className="absolute pointer-events-auto"
          style={{
            left: dot.left,
            top: dot.top,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            borderRadius: "9999px",
            background: hovered === i ? "#f9a8d4" : dot.color,
            filter: `blur(${dot.blur}px)`,
            boxShadow:
              hovered === i
                ? `0 0 10px 0 #f9a8d4, 0 0 18px 4px ${dot.color}AA`
                : dot.blur
                ? `0 0 8px 2px ${dot.color}66`
                : undefined,
            opacity: hovered === i ? 0.98 : 0.7,
            zIndex: 1,
            transition: "box-shadow 0.2s, background 0.2s",
            cursor: "pointer",
          }}
          whileHover={{
            scale: 1.72,
            opacity: 1,
            y: -12,
          }}
          onPointerEnter={() => setHovered(i)}
          onPointerLeave={() => setHovered(null)}
          onTouchStart={() => setHovered(i)}
          onTouchEnd={() => setHovered(null)}
          animate={{
            y: [
              0,
              (i % 2 === 0 ? -1 : 1) * Math.random() * 6,
              0,
              (i % 2 === 0 ? 1 : -1) * Math.random() * 4,
              0
            ],
            scale: hovered === i ? 1.26 : 1,
          }}
          transition={{
            duration: 10 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.7
          }}
        />
      ))}
    </>
  );
};

// Main export
const ParticlesBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <AnimatedOrbs />
    <InteractiveDots />
  </div>
);

export default ParticlesBackground;
