
import { useState, useEffect } from "react";

// Safely check for window to avoid SSR issues
const isBrowser = typeof window !== 'undefined';

const useDeviceCapabilities = () => {
  const [particleCount, setParticleCount] = useState(200); // Much lower default
  
  useEffect(() => {
    if (isBrowser) {
      // Aggressive performance optimization
      const hardwareConcurrency = navigator.hardwareConcurrency || 2;
      const isHighPerformance = hardwareConcurrency > 6;
      const isMediumPerformance = hardwareConcurrency > 3;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const width = window.innerWidth;
      
      // Much lower particle counts for better performance
      let count = 150; // Very conservative default
      
      if (isHighPerformance && !isMobile && width > 1200) {
        count = 300; // Reduced significantly
      } else if (isMediumPerformance && !isMobile && width > 768) {
        count = 200; // Reduced significantly
      } else if (isMobile) {
        count = 50; // Extremely low for mobile
      }
      
      setParticleCount(count);
    }
  }, []);

  const isLowPowerMode = () => {
    if (!isBrowser) return true;
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    return isMobile || hardwareConcurrency <= 3; // More conservative threshold
  };

  return { 
    particleCount, 
    isLowPowerMode: isLowPowerMode(),
  };
};

export default useDeviceCapabilities;
