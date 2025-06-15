
import { ReactNode } from "react";
import FloatingParticles from "./matrix/FloatingParticles";
import GradientOrbs from "./matrix/GradientOrbs";
import { IntensityLevel } from "./matrix/useMatrixSettings";

interface MatrixBackgroundSectionProps {
  children: ReactNode;
  intensity?: IntensityLevel;
  particleCount?: number;
}

const MatrixBackgroundSection = ({ 
  children, 
  intensity = "medium", // intensity is a no-op for orbs/particles only
  particleCount = 30
}: MatrixBackgroundSectionProps) => {
  return (
    <div className="relative overflow-hidden py-12">
      {/* Enhanced floating particles */}
      <FloatingParticles particleCount={particleCount} />
      {/* Gradient orbs in background */}
      <GradientOrbs />
      {/* Content with appropriate z-index */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default MatrixBackgroundSection;
