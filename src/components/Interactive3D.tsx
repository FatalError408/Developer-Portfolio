
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AnimatedSphereProps { 
  position: [number, number, number];
  color: string;
  speed: number;
}

const AnimatedSphere = ({ position, color, speed }: AnimatedSphereProps) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * speed * 0.5) * 0.2;
    mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * speed * 0.3) * 0.2;
    mesh.current.position.y = Math.sin(state.clock.getElapsedTime() * speed) * 0.2;
  });

  return (
    <mesh position={position} ref={mesh}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.2}
        shininess={15}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <AnimatedSphere position={[-3, 0, 0]} color="#4285F4" speed={1.5} />
      <AnimatedSphere position={[0, 0, 0]} color="#8A2BE2" speed={2} />
      <AnimatedSphere position={[3, 0, 0]} color="#DB4437" speed={1} />
      <OrbitControls />
    </>
  );
};

// Simple implementation of OrbitControls
const OrbitControls = () => {
  const controlsRef = useRef<THREE.Group>(null!);
  
  useFrame(({ camera, mouse }) => {
    if (!controlsRef.current) return;
    // Simple camera rotation based on mouse position
    camera.position.x = Math.sin(mouse.x * Math.PI) * 8;
    camera.position.z = Math.cos(mouse.x * Math.PI) * 8;
    camera.position.y = mouse.y * 3;
    camera.lookAt(0, 0, 0);
  });

  return <group ref={controlsRef} />;
};

const Interactive3D = () => {
  return (
    <div className="h-96 w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default Interactive3D;
