
import { ReactNode } from "react";
import MatrixCanvas from "./matrix/MatrixCanvas";
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
  intensity = "medium",
  particleCount = 30
}: MatrixBackgroundSectionProps) => {
  return (
    <div className="relative overflow-hidden py-12">
      {/* Matrix canvas background */}
      <MatrixCanvas intensity={intensity} />
      
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
