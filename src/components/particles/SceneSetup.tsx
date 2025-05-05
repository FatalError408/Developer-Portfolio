
import { ReactNode, memo, useEffect } from "react";
import { useThree } from "@react-three/fiber";

interface SceneSetupProps {
  children: ReactNode;
  ambientIntensity?: number;
  directionalIntensity?: number;
}

const SceneSetup = ({
  children,
  ambientIntensity = 0.1,
  directionalIntensity = 0.2
}: SceneSetupProps) => {
  const { gl, camera } = useThree();
  
  // Apply performance optimizations
  useEffect(() => {
    // Disable autoClear for improved performance
    gl.autoClear = false;
    
    // Optimize camera settings
    if (camera) {
      camera.near = 0.1;
      camera.far = 100;
      camera.updateProjectionMatrix();
    }
    
    return () => {
      // Reset when unmounting
      gl.autoClear = true;
    };
  }, [gl, camera]);
  
  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <directionalLight 
        position={[0, 10, 5]} 
        intensity={directionalIntensity} 
        castShadow={false} // Disable shadows for better performance
      />
      {children}
    </>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default memo(SceneSetup);
