
import { useMemo, useCallback } from 'react';
import useDeviceCapabilities from '../particles/useDeviceCapabilities';

export type IntensityLevel = "low" | "medium" | "high";

interface MatrixSettings {
  opacity: number;
  speed: number;
  density: number;
  glow: number;
}

export const useMatrixSettings = (intensity: IntensityLevel): MatrixSettings => {
  const { isLowPowerMode } = useDeviceCapabilities();
  
  // Get base settings based on intensity - memoize the function
  const getBaseSettings = useCallback((level: IntensityLevel): MatrixSettings => {
    switch(level) {
      case "low":
        return { opacity: 0.4, speed: 0.4, density: 0.6, glow: 2 };
      case "high":
        return { opacity: 0.8, speed: 0.9, density: 1.5, glow: 5 };
      case "medium":
      default:
        return { opacity: 0.6, speed: 0.65, density: 1.0, glow: 3 };
    }
  }, []);
  
  // Apply device-specific adjustments - memoize the result
  return useMemo(() => {
    const baseSettings = getBaseSettings(intensity);
    
    // More aggressive reduction for low power devices
    if (isLowPowerMode) {
      return {
        opacity: baseSettings.opacity * 0.75,
        speed: baseSettings.speed * 0.65,
        density: baseSettings.density * 0.5, // More significant density reduction
        glow: Math.max(1, baseSettings.glow * 0.4) // Reduce glow further
      };
    }
    
    return baseSettings;
  }, [intensity, isLowPowerMode, getBaseSettings]);
};

export default useMatrixSettings;
