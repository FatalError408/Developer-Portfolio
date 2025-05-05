
import { Suspense, lazy } from "react";
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
  
  return (
    <div className="fixed inset-0 -z-10 opacity-80 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }} 
        dpr={[0.6, 1.5]} // Lower DPR for better performance
        gl={{ 
          alpha: true, 
          antialias: false,
          powerPreference: 'high-performance',
          depth: false, // Disable depth testing for better performance
        }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        frameloop="demand" // Only render when needed
      >
        <Suspense fallback={null}>
          <SceneSetup>
            <ParticlesMaterial count={particleCount} mousePosition={mousePosition} />
          </SceneSetup>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ParticlesBackground3D;
