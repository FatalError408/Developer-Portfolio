
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = ({ position, color, speed, distort }: { 
  position: [number, number, number], 
  color: string, 
  speed: number,
  distort: number
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * speed * 0.5) * 0.2;
    mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * speed * 0.3) * 0.2;
    mesh.current.position.y = Math.sin(state.clock.getElapsedTime() * speed) * 0.2;
  });

  return (
    <Sphere args={[1, 64, 64]} position={position} ref={mesh}>
      <MeshDistortMaterial 
        color={color} 
        attach="material" 
        distort={distort} 
        speed={speed} 
        roughness={0.5}
      />
    </Sphere>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <AnimatedSphere position={[-3, 0, 0]} color="#4285F4" speed={1.5} distort={0.4} />
      <AnimatedSphere position={[0, 0, 0]} color="#8A2BE2" speed={2} distort={0.5} />
      <AnimatedSphere position={[3, 0, 0]} color="#DB4437" speed={1} distort={0.3} />
      <OrbitControls enableZoom={false} />
    </>
  );
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
