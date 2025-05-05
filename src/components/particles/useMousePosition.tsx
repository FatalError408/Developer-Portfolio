
import { useState, useEffect } from "react";

// Safely check for window to avoid SSR issues
const isBrowser = typeof window !== 'undefined';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, z: 0 });
  
  // Track mouse position with throttled updates for better performance
  useEffect(() => {
    if (!isBrowser) return;
    
    let timeoutId: number;
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse move events for better performance
      if (timeoutId) return;
      
      timeoutId = window.setTimeout(() => {
        // Convert mouse position to normalized device coordinates (-1 to +1)
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        setMousePosition({ x, y, z: 0 });
        timeoutId = 0;
      }, 50); // Update at most every 50ms
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;
