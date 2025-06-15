
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

// Refined orb colors for gradient richness
const ORB_COLORS = [
  "from-blue-500/60 to-transparent",
  "from-purple-500/30 to-transparent",
  "from-fuchsia-400/18 to-transparent",
  "from-cyan-400/18 to-transparent",
  "from-pink-400/16 to-transparent",
];

// Maximized useMemo to avoid unnecessary re-renders
const useMemoOrbs = () =>
  [
    {
      className:
        "absolute top-1/4 left-1/2 w-[44rem] h-[44rem] -translate-x-1/2 blur-[110px] opacity-90",
      color: ORB_COLORS[0],
      style: { zIndex: 0 },
      id: 0,
      delay: 0,
    },
    {
      className:
        "absolute bottom-1/4 left-1/3 w-[32rem] h-[32rem] blur-[90px] opacity-65",
      color: ORB_COLORS[1],
      style: { zIndex: 0 },
      id: 1,
      delay: 0.5,
    },
    {
      className:
        "absolute top-2/3 right-10 w-[20rem] h-[20rem] blur-[80px] opacity-80",
      color: ORB_COLORS[2],
      style: { zIndex: 0 },
      id: 2,
      delay: 1.2,
    },
    {
      className:
        "absolute top-[12%] right-[7%] w-[21rem] h-[21rem] blur-[90px] opacity-80",
      color: ORB_COLORS[3],
      style: { zIndex: 0 },
      id: 3,
      delay: 2.1,
    },
    {
      className:
        "absolute bottom-[18%] left-[4%] w-[20rem] h-[20rem] blur-[70px] opacity-70",
      color: ORB_COLORS[4],
      style: { zIndex: 0 },
      id: 4,
      delay: 2.8,
    },
  ];

const AnimatedOrbs = () => {
  const [activeOrb, setActiveOrb] = useState<number | null>(null);
  const ORBS = useMemo(useMemoOrbs, []);

  // Only track on pointerdown/up rather than enter/leave for better perf
  return (
    <>
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className={`pointer-events-auto rounded-full bg-gradient-radial shadow-glow animate-pulse-slow ${orb.className} ${activeOrb === i ? "ring-4 ring-blue-400/30 scale-[1.06]" : ""}`}
          style={orb.style}
          onPointerDown={() => setActiveOrb(i)}
          onPointerUp={() => setActiveOrb(null)}
          onTouchStart={() => setActiveOrb(i)}
          onTouchEnd={() => setActiveOrb(null)}
          whileHover={{ scale: 1.045, filter: "brightness(1.06)" }}
          animate={{
            y: [
              0,
              (i % 2 === 0 ? 1 : -1) * 22,
              0,
              (i % 2 === 0 ? -1 : 1) * 18,
              0,
            ],
            x: [
              0,
              (i % 3 ? 1 : -1) * 10,
              0,
              (i % 3 ? -1 : 1) * 8,
              0,
            ],
          }}
          transition={{
            duration: 14 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
      {/* Subtle glass-morphism rectangle for premium look */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-blue-400/3 pointer-events-none rounded-3xl blur-2xl opacity-80" style={{ zIndex: 0 }}></div>
    </>
  );
};

// Static dots on first render, animated by CSS floating
const useMemoDots = () =>
  Array.from({ length: 13 }).map((_, i) => {
    const baseLeft = 12 + (70 * (i % 7)) / 6 + (i > 6 ? 5 : 0);
    const baseTop = 7 + (72 * Math.floor(i / 7)) / 2 + (i % 2 ? 4 : -2);
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
      blur: Math.random() > 0.78 ? 2 : 0,
      delay: i * 0.33,
    };
  });

const InteractiveDots = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  // Generate once; now they're statically positioned, CSS-animated
  const dots = useMemo(useMemoDots, []);

  return (
    <>
      {dots.map((dot, i) => (
        <motion.div
          key={dot.id}
          className={`absolute pointer-events-auto shadow-soft`}
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
                ? `0 0 10px 0 #f9a8d4, 0 0 24px 6px ${dot.color}AA`
                : dot.blur
                ? `0 0 8px 2px ${dot.color}66`
                : `0 1px 3px 1px #0002`,
            opacity: hovered === i ? 0.98 : 0.7,
            zIndex: 2,
            cursor: "pointer",
            transition: "box-shadow 0.2s, background 0.2s",
            animation: `floating ${7 + i * 0.35}s ease-in-out infinite`,
            animationDelay: `${dot.delay}s`,
            willChange: "transform, filter, opacity",
          }}
          onPointerEnter={() => setHovered(i)}
          onPointerLeave={() => setHovered(null)}
          onTouchStart={() => setHovered(i)}
          onTouchEnd={() => setHovered(null)}
          whileHover={{
            scale: 1.44,
            opacity: 1,
            y: -15,
          }}
          animate={{
            scale: hovered === i ? 1.16 : 1,
          }}
        />
      ))}
    </>
  );
};

const ParticlesBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <AnimatedOrbs />
    <InteractiveDots />
  </div>
);

export default ParticlesBackground;
