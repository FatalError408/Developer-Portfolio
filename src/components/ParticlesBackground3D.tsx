
import { Suspense, lazy, memo, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import useMousePosition from "./particles/useMousePosition";
import useDeviceCapabilities from "./particles/useDeviceCapabilities";

// Lazy load components for better initial loading performance
const SceneSetup = lazy(() => import("./particles/SceneSetup"));
const ParticlesMaterial = lazy(() => import("./particles/ParticlesMaterial"));

const ParticlesBackground3D = () => {
  const mousePosition = useMousePosition();
  const { particleCount, isLowPowerMode } = useDeviceCapabilities();
  
  // Enhanced performance settings based on device capabilities
  const performanceConfig = useMemo(() => {
    if (isLowPowerMode) {
      return {
        dpr: [0.5, 1.0] as [number, number],
        frameloop: "demand" as const,
        precision: "lowp" as const,
        antialias: false,
        alpha: true,
        depth: false,
        stencil: false,
        powerPreference: "low-power" as const,
        failIfMajorPerformanceCaveat: true,
      };
    }
    
    return {
      dpr: [0.8, 1.5] as [number, number],
      frameloop: "always" as const,
      precision: "mediump" as const,
      antialias: true,
      alpha: true,
      depth: false,
      stencil: false,
      powerPreference: "high-performance" as const,
      failIfMajorPerformanceCaveat: false,
    };
  }, [isLowPowerMode]);
  
  // Skip rendering for very low-end devices or very small particle counts
  if (isLowPowerMode && particleCount < 200) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 -z-10 opacity-90 pointer-events-none">
      <Canvas 
        camera={{ 
          position: [0, 0, 10], 
          fov: 60,
          near: 0.1,
          far: 100
        }} 
        dpr={performanceConfig.dpr}
        gl={{
          alpha: performanceConfig.alpha,
          antialias: performanceConfig.antialias,
          powerPreference: performanceConfig.powerPreference,
          depth: performanceConfig.depth,
          stencil: performanceConfig.stencil,
          precision: performanceConfig.precision,
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: performanceConfig.failIfMajorPerformanceCaveat,
        }}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%' 
        }}
        frameloop={performanceConfig.frameloop}
        performance={{ 
          min: isLowPowerMode ? 0.2 : 0.5,
          max: 1,
          debounce: isLowPowerMode ? 500 : 200
        }}
        shadows={!isLowPowerMode}
        flat={isLowPowerMode}
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

// Prevent unnecessary re-renders with enhanced memoization
export default memo(ParticlesBackground3D);
