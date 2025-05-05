
import { ReactNode, memo } from "react";
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
  // Performance optimization with gl.autoClear
  const { gl } = useThree();
  gl.autoClear = false;
  
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
