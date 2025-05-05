
import { useMemo } from 'react';

export type IntensityLevel = "low" | "medium" | "high";

interface MatrixSettings {
  opacity: number;
  speed: number;
  density: number;
  glow: number;
}

export const useMatrixSettings = (intensity: IntensityLevel): MatrixSettings => {
  return useMemo(() => {
    switch(intensity) {
      case "low":
        return { opacity: 0.4, speed: 0.4, density: 0.6, glow: 2 };
      case "high":
        return { opacity: 0.8, speed: 0.9, density: 1.5, glow: 5 };
      case "medium":
      default:
        return { opacity: 0.6, speed: 0.65, density: 1.0, glow: 3 };
    }
  }, [intensity]);
};

export default useMatrixSettings;
