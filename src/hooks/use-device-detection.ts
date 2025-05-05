
import { useState, useEffect } from "react";

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isHighPerformance: boolean;
  isMediumPerformance: boolean;
  isLowPerformance: boolean;
  cores: number;
  width: number;
  height: number;
}

export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isHighPerformance: true,
    isMediumPerformance: false,
    isLowPerformance: false,
    cores: 4,
    width: 1920,
    height: 1080
  });
  
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const userAgent = navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTablet = /iPad|tablet|Tablet/i.test(userAgent) || (width >= 768 && width < 1024);
      const isDesktop = !isMobile && !isTablet;
      
      const cores = navigator.hardwareConcurrency || 2;
      const isHighPerformance = cores > 4 && isDesktop;
      const isMediumPerformance = (cores > 2 && cores <= 4) || isTablet;
      const isLowPerformance = cores <= 2 || isMobile;
      
      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isHighPerformance,
        isMediumPerformance,
        isLowPerformance,
        cores,
        width,
        height
      });
    };
    
    detectDevice();
    
    // Re-detect on resize (debounced)
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(detectDevice, 250);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);
  
  return deviceInfo;
};

export default useDeviceDetection;
