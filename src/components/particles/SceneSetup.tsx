
import { ReactNode } from "react";

interface SceneSetupProps {
  children: ReactNode;
}

const SceneSetup = ({ children }: SceneSetupProps) => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 10, 5]} intensity={0.2} />
      {children}
    </>
  );
};

export default SceneSetup;
