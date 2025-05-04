
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
  const colors = new Float32Array(count * 3);
  
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
    
    // Blue to purple color range
    colors[i * 3] = 0.2 + Math.random() * 0.1; // r
    colors[i * 3 + 1] = 0.3 + Math.random() * 0.2; // g
    colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // b
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
          attach="attributes-color"
          array={colors}
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
        size={0.03}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.7}
        depthWrite={false}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const ParticlesBackground3D = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-50 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }} 
        dpr={[1, 2]} // Optimize performance with dynamic pixel ratio
        performance={{ min: 0.5 }} // Further performance optimization
      >
        <CodeParticles count={window.innerWidth > 768 ? 2000 : 1000} />
      </Canvas>
    </div>
  );
};

export default ParticlesBackground3D;
