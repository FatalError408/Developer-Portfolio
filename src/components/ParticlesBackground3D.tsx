
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Safely check for window to avoid SSR issues
const isBrowser = typeof window !== 'undefined';

interface PointsProps {
  count: number;
}

// Enhanced code-inspired particles with interactive elements
function CodeParticles({ count = 3000 }: PointsProps) {
  const points = useRef<THREE.Points>(null!);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, z: 0 });
  
  // Track mouse position for interactive effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y, z: 0 });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Create particles in code-like patterns with memo for better performance
  const { positions, speeds, sizes, colors } = useMemo(() => {
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
      
      // Blue to purple color range with more vibrance
      colors[i * 3] = 0.2 + Math.random() * 0.2; // r - increased range
      colors[i * 3 + 1] = 0.3 + Math.random() * 0.3; // g - increased range
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // b
    }
    
    return { positions, speeds, sizes, colors };
  }, [count]);

  // Animation effect
  useFrame((state) => {
    if (!points.current) return;
    
    const time = state.clock.getElapsedTime();
    const positions = points.current.geometry.attributes.position.array as Float32Array;
    
    // Occasionally create a ripple effect
    const createRipple = Math.random() > 0.997;
    const rippleX = createRipple ? (Math.random() - 0.5) * 10 : 0;
    const rippleY = createRipple ? (Math.random() - 0.5) * 10 : 0;
    
    // Update positions to create flowing code effect with mouse interaction
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Mouse influence - particles move slightly toward mouse
      const mouseInfluence = 0.0005;
      const dx = mousePosition.x * 10 - positions[i3];
      const dy = mousePosition.y * 10 - positions[i3 + 1];
      const distToMouse = Math.sqrt(dx * dx + dy * dy);
      
      if (distToMouse < 5) {
        // Particles close to mouse are pushed slightly away
        positions[i3] -= dx * mouseInfluence * 2;
        positions[i3 + 1] -= dy * mouseInfluence * 2;
      }
      
      // Ripple effect
      if (createRipple) {
        const dx = positions[i3] - rippleX;
        const dy = positions[i3 + 1] - rippleY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 3) {
          // Push particles away from ripple center
          positions[i3] += (dx / dist) * 0.04;
          positions[i3 + 1] += (dy / dist) * 0.04;
        }
      }
      
      // Move particles downward with slight wobble
      positions[i3 + 1] -= speeds[i] * (1 + 0.1 * Math.sin(time + i));
      
      // Add slight horizontal drift based on sine wave
      positions[i3] += Math.sin(time * 0.5 + i * 0.1) * 0.002;
      
      // Reset particles when they go off screen
      if (positions[i3 + 1] < -7) {
        positions[i3 + 1] = 7;
        // Give slight horizontal variation when recycling
        positions[i3] = (Math.floor(i / 50) * 0.2) - 10 + (Math.random() * 0.1);
      }
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
    
    // Slowly rotate the entire points system for added depth
    points.current.rotation.y = Math.sin(time * 0.1) * 0.05;
    points.current.rotation.x = Math.cos(time * 0.1) * 0.03;
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
        size={0.05} // Increased size for more visibility
        sizeAttenuation={true}
        transparent={true}
        opacity={0.85} // Increased opacity
        depthWrite={false}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Add subtle ambient light to enhance 3D effect
function AmbientScene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 10, 5]} intensity={0.2} />
    </>
  );
}

const ParticlesBackground3D = () => {
  // Use safe default for window check and adaptive particle count based on device capability
  const [particleCount, setParticleCount] = useState(1000);
  
  useEffect(() => {
    if (isBrowser) {
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const isHighPerformance = hardwareConcurrency > 4;
      
      setParticleCount(
        isHighPerformance ?
          (window.innerWidth > 768 ? 2000 : 1000) :
          (window.innerWidth > 768 ? 1000 : 500)
      );
    }
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 opacity-80 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }} 
        dpr={[1, 1.5]} // More balanced performance setting
        gl={{ alpha: true, antialias: false }} // Performance optimization
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <AmbientScene />
        <CodeParticles count={particleCount} />
      </Canvas>
      
      {/* Easter egg: Hidden code comments that appear randomly */}
      <div className="hidden">
        // Future devs: This matrix isn't just for show.
        // It contains encoded portfolio achievements.
        // Can you decode the pattern?
      </div>
    </div>
  );
};

export default ParticlesBackground3D;
