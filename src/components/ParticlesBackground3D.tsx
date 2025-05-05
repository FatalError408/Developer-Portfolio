
import { Suspense, lazy, memo } from "react";
import { Canvas } from "@react-three/fiber";
import useMousePosition from "./particles/useMousePosition";
import useDeviceCapabilities from "./particles/useDeviceCapabilities";

// Lazy load components for better initial loading performance
const SceneSetup = lazy(() => import("./particles/SceneSetup"));
const ParticlesMaterial = lazy(() => import("./particles/ParticlesMaterial"));

const ParticlesBackground3D = () => {
  const mousePosition = useMousePosition();
  const { particleCount, isLowPowerMode } = useDeviceCapabilities();
  
  // Skip rendering entirely for very low-end devices
  if (isLowPowerMode && particleCount < 250) {
    return null;
  }
  
  // Adjust DPR based on device capabilities for better performance
  const dprRange = isLowPowerMode ? [0.5, 1.0] : [0.6, 1.5];
  const frameloop = isLowPowerMode ? "demand" : "demand";
  
  return (
    <div className="fixed inset-0 -z-10 opacity-80 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }} 
        dpr={dprRange} 
        gl={{ 
          alpha: true, 
          antialias: false,
          powerPreference: 'high-performance',
          depth: false, 
          stencil: false, // Disable stencil buffer for performance
          precision: isLowPowerMode ? 'lowp' : 'mediump', // Lower precision on low-power devices
        }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        frameloop={frameloop}
        performance={{ min: 0.1 }} // Allow frame rate to drop in background
      >
        <Suspense fallback={null}>
          <SceneSetup>
            <ParticlesMaterial 
              count={particleCount} 
              mousePosition={mousePosition} 
            />
          </SceneSetup>
        </Suspense>
      </Canvas>
    </div>
  );
};

// Prevent unnecessary re-renders
export default memo(ParticlesBackground3D);
