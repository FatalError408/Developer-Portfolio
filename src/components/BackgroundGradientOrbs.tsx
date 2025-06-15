
import { ReactNode } from "react";

// Simple gradient orbs and minimal floating particles, no canvas/Matrix/code logic
const BackgroundGradientOrbs = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/4 left-1/2 w-[40rem] h-[40rem] -translate-x-1/2 bg-gradient-radial from-blue-500/30 to-transparent rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-1/3 w-[32rem] h-[32rem] bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow animation-delay-1500" />
      <div className="absolute top-2/3 right-12 w-[18rem] h-[18rem] bg-gradient-radial from-cyan-400/10 to-transparent rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />
      {/* Tiny dots: 12 floating light particles, nearly no cost */}
      {Array.from({ length: 12 }).map((_, i) => {
        const size = Math.random() * 4 + 2;
        const color = ["#8B5CF6", "#1EAEDB", "#D946EF", "#50E3C2"][i % 4];
        const top = `${Math.random() * 90 + 5}%`;
        const left = `${Math.random() * 90 + 5}%`;
        const blur = Math.random() > 0.65 ? 2 : 0;
        return (
          <div
            key={i}
            className="absolute rounded-full opacity-70"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: color,
              top,
              left,
              filter: `blur(${blur}px)`,
              transition: "transform 14s linear",
              zIndex: 0,
              animation: `floating 8s ease-in-out ${i * 0.6}s infinite`,
            }}
          />
        );
      })}
      {children}
    </div>
  );
};

export default BackgroundGradientOrbs;
