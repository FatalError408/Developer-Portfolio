
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface ParticlesMaterialProps {
  count: number;
  mousePosition: { x: number; y: number; z: number };
}

const ParticlesMaterial = ({ count, mousePosition }: ParticlesMaterialProps) => {
  const points = useRef<THREE.Points>(null!);
  const frameCount = useRef(0);
  
  // Much more conservative particle count
  const actualCount = Math.min(count, 200);
  
  // Create particles with better performance optimization
  const { positions, speeds, sizes, colors } = (() => {
    const positions = new Float32Array(actualCount * 3);
    const speeds = new Float32Array(actualCount);
    const sizes = new Float32Array(actualCount);
    const colors = new Float32Array(actualCount * 3);
    
    // DNA helix pattern for vertex connections
    for (let i = 0; i < actualCount; i++) {
      const t = (i / actualCount) * Math.PI * 4;
      const radius = 3;
      
      // DNA double helix positioning
      positions[i * 3] = Math.cos(t) * radius;
      positions[i * 3 + 1] = (i / actualCount) * 10 - 5;
      positions[i * 3 + 2] = Math.sin(t) * radius;
      
      // Consistent speeds for smoother movement
      speeds[i] = 0.005 + Math.random() * 0.01;
      // Smaller sizes for better performance
      sizes[i] = Math.random() * 0.02 + 0.01;
      
      // White color variations
      colors[i * 3] = 0.9 + Math.random() * 0.1;     // R
      colors[i * 3 + 1] = 0.9 + Math.random() * 0.1; // G
      colors[i * 3 + 2] = 0.95 + Math.random() * 0.05; // B
    }
    
    return { positions, speeds, sizes, colors };
  })();

  // Highly optimized animation - update fewer particles less frequently
  useFrame((state) => {
    if (!points.current) return;
    
    const time = state.clock.getElapsedTime();
    const positions = points.current.geometry.attributes.position.array as Float32Array;
    
    // Only update every 5th frame for better performance
    frameCount.current = (frameCount.current + 1) % 5;
    if (frameCount.current !== 0) return;
    
    // Update only 1/4 of particles each frame
    const batchSize = Math.floor(actualCount / 4);
    const startIdx = (frameCount.current % 4) * batchSize;
    const endIdx = Math.min(startIdx + batchSize, actualCount);
    
    for (let i = startIdx; i < endIdx; i++) {
      const i3 = i * 3;
      
      // Simplified mouse influence - only for nearby particles
      const dx = mousePosition.x * 5 - positions[i3];
      const dy = mousePosition.y * 5 - positions[i3 + 1];
      const distToMouse = dx * dx + dy * dy; // Skip sqrt for performance
      
      if (distToMouse < 25) { // Squared distance check
        const mouseInfluence = 0.0003;
        positions[i3] -= dx * mouseInfluence;
        positions[i3 + 1] -= dy * mouseInfluence;
      }
      
      // Simple downward movement with DNA helix motion
      positions[i3 + 1] -= speeds[i];
      
      // DNA helix movement - only calculate for some particles
      if (i % 3 === 0) {
        const helixT = time * 0.2 + i * 0.1;
        positions[i3] += Math.sin(helixT) * 0.001;
        positions[i3 + 2] += Math.cos(helixT) * 0.001;
      }
      
      // Reset particle when it goes off screen
      if (positions[i3 + 1] < -5) {
        positions[i3 + 1] = 5;
        const resetT = (i / actualCount) * Math.PI * 4;
        positions[i3] = Math.cos(resetT) * 3;
        positions[i3 + 2] = Math.sin(resetT) * 3;
      }
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
    
    // Much slower rotation for subtlety
    points.current.rotation.y = Math.sin(time * 0.02) * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={actualCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={actualCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={actualCount}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        depthWrite={false}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticlesMaterial;
