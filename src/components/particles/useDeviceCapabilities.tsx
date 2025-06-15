
import { useState, useEffect } from "react";

// Safely check for window to avoid SSR issues
const isBrowser = typeof window !== 'undefined';

const useDeviceCapabilities = () => {
  const [particleCount, setParticleCount] = useState(500); 
  
  useEffect(() => {
    if (isBrowser) {
      // More aggressive device capability detection
      const hardwareConcurrency = navigator.hardwareConcurrency || 2;
      const isHighPerformance = hardwareConcurrency > 4;
      const isMediumPerformance = hardwareConcurrency > 2;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const width = window.innerWidth;
      
      // Determine particle count based on device capabilities
      let count = 500; // Default low
      
      if (isHighPerformance && !isMobile && width > 1024) {
        count = 1500; // Reduced from 2000 for better performance
      } else if (isMediumPerformance && !isMobile && width > 768) {
        count = 800; // Reduced from 1000 for better performance
      } else if (isMobile) {
        count = 200; // Very low for mobile
      }
      
      setParticleCount(count);
    }
  }, []);

  const isLowPowerMode = () => {
    if (!isBrowser) return true;
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    return isMobile || hardwareConcurrency <= 2;
  };

  return { 
    particleCount, 
    isLowPowerMode: isLowPowerMode(),
  };
};

export default useDeviceCapabilities;
