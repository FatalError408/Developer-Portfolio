
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface PointsProps {
  count: number;
}

function Points({ count = 2000 }: PointsProps) {
  const points = useRef<THREE.Points>(null!);
  const positions = useRef<Float32Array>(null!);
  
  if (!positions.current) {
    positions.current = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 10;
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
  }

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    points.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}

const ParticlesBackground3D = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Points count={1500} />
      </Canvas>
    </div>
  );
};

export default ParticlesBackground3D;
