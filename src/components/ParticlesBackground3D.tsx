
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PointsProps {
  count: number;
}

// Code-inspired particles that move in a matrix-like pattern
function CodeParticles({ count = 3000 }: PointsProps) {
  const points = useRef<THREE.Points>(null!);
  
  // Create particles in code-like patterns (more rows, column-like arrangement)
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  const sizes = new Float32Array(count);
  
  // Set up particles in a more structured grid-like pattern
  for (let i = 0; i < count; i++) {
    // Create more defined "columns" of particles
    positions[i * 3] = (Math.floor(i / 50) * 0.2) - 10 + (Math.random() * 0.1);
    // Stagger vertical positions more like lines of text
    positions[i * 3 + 1] = ((i % 50) * 0.3) - 7 + (Math.random() * 0.05);
    // Add some depth variation
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    
    // Varying speeds for more natural flow, mostly moving downward
    speeds[i] = 0.01 + Math.random() * 0.03;
    // Varying sizes for visual interest
    sizes[i] = Math.random() * 0.05 + 0.01;
  }

  useFrame(() => {
    if (!points.current) return;
    
    const positions = points.current.geometry.attributes.position.array as Float32Array;
    
    // Update positions to create flowing code effect
    for (let i = 0; i < count; i++) {
      // Move particles downward
      positions[i * 3 + 1] -= speeds[i];
      
      // Reset particles when they go off screen
      if (positions[i * 3 + 1] < -7) {
        positions[i * 3 + 1] = 7;
        // Give slight horizontal variation when recycling
        positions[i * 3] = (Math.floor(i / 50) * 0.2) - 10 + (Math.random() * 0.1);
      }
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#3b82f6"
        size={0.02}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  );
}

const ParticlesBackground3D = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-60">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <CodeParticles count={2500} />
      </Canvas>
    </div>
  );
};

export default ParticlesBackground3D;
