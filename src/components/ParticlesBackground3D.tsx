
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Safely check for window to avoid SSR issues
const isBrowser = typeof window !== 'undefined';

interface PointsProps {
  count: number;
}

// Performance-optimized particles with reduced CPU usage
function CodeParticles({ count = 3000 }: PointsProps) {
  const points = useRef<THREE.Points>(null!);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, z: 0 });
  const frameCount = useRef(0);
  
  // Track mouse position with throttled updates for better performance
  useEffect(() => {
    let timeoutId: number;
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse move events for better performance
      if (timeoutId) return;
      
      timeoutId = window.setTimeout(() => {
        // Convert mouse position to normalized device coordinates (-1 to +1)
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        setMousePosition({ x, y, z: 0 });
        timeoutId = 0;
      }, 50); // Update at most every 50ms
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);
  
  // Create particles with memoization for better performance
  const { positions, speeds, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    
    // Setup more efficient grid pattern
    for (let i = 0; i < count; i++) {
      // Create more defined "columns" of particles
      positions[i * 3] = (Math.floor(i / 50) * 0.2) - 10 + (Math.random() * 0.1);
      // Stagger vertical positions
      positions[i * 3 + 1] = ((i % 50) * 0.3) - 7 + (Math.random() * 0.05);
      // Add some depth variation
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      
      // Varying speeds for natural flow
      speeds[i] = 0.01 + Math.random() * 0.03;
      // Varying sizes for visual interest - smaller for better performance
      sizes[i] = Math.random() * 0.04 + 0.01;
      
      // Blue to purple color range
      colors[i * 3] = 0.2 + Math.random() * 0.2;
      colors[i * 3 + 1] = 0.3 + Math.random() * 0.3;
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
    }
    
    return { positions, speeds, sizes, colors };
  }, [count]);

  // Optimized animation - process fewer particles per frame
  useFrame((state) => {
    if (!points.current) return;
    
    const time = state.clock.getElapsedTime();
    const positions = points.current.geometry.attributes.position.array as Float32Array;
    
    // Only create ripples occasionally to save on processing
    const createRipple = Math.random() > 0.998;
    const rippleX = createRipple ? (Math.random() - 0.5) * 10 : 0;
    const rippleY = createRipple ? (Math.random() - 0.5) * 10 : 0;
    
    // Increment frame counter for staggered updates
    frameCount.current = (frameCount.current + 1) % 3;
    
    // Only update 1/3 of particles each frame for better performance
    const startIdx = frameCount.current * (count / 3);
    const endIdx = Math.min(startIdx + (count / 3), count);
    
    // Update only a subset of positions each frame
    for (let i = startIdx; i < endIdx; i++) {
      const i3 = i * 3;
      
      // Simpler mouse influence with distance check first for performance
      const dx = mousePosition.x * 10 - positions[i3];
      const dy = mousePosition.y * 10 - positions[i3 + 1];
      const distToMouse = Math.sqrt(dx * dx + dy * dy);
      
      // Only apply mouse influence to nearby particles
      if (distToMouse < 5) {
        const mouseInfluence = 0.0005;
        positions[i3] -= dx * mouseInfluence * 2;
        positions[i3 + 1] -= dy * mouseInfluence * 2;
      }
      
      // Skip ripple effect calculations if no ripple is happening
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
      
      // Move particles downward with slight wobble - simplified calculation
      positions[i3 + 1] -= speeds[i] * (1 + 0.05 * Math.sin(time + i));
      
      // Add simplified horizontal drift
      if (i % 5 === 0) { // Only calculate sine for 20% of particles
        positions[i3] += Math.sin(time * 0.5 + i * 0.1) * 0.002;
      }
      
      // Reset particles when they go off screen
      if (positions[i3 + 1] < -7) {
        positions[i3 + 1] = 7;
        positions[i3] = (Math.floor(i / 50) * 0.2) - 10 + (Math.random() * 0.1);
      }
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
    
    // Slower rotation for better performance
    points.current.rotation.y = Math.sin(time * 0.05) * 0.05;
    points.current.rotation.x = Math.cos(time * 0.05) * 0.03;
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
        size={0.05}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
        depthWrite={false}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Add subtle ambient light
function AmbientScene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 10, 5]} intensity={0.2} />
    </>
  );
}

const ParticlesBackground3D = () => {
  // More aggressive particle count adjustment based on device performance
  const [particleCount, setParticleCount] = useState(500); // Start with lower default
  
  useEffect(() => {
    if (isBrowser) {
      // More aggressive device capability detection
      const hardwareConcurrency = navigator.hardwareConcurrency || 2;
      const isHighPerformance = hardwareConcurrency > 4;
      const isMediumPerformance = hardwareConcurrency > 2;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const width = window.innerWidth;
      
      // Determine particle count based on device capabilities
      let count = 500; // Default low
      
      if (isHighPerformance && !isMobile && width > 1024) {
        count = 2000;
      } else if (isMediumPerformance && !isMobile && width > 768) {
        count = 1000;
      } else if (isMobile) {
        count = 300; // Very low for mobile
      }
      
      setParticleCount(count);
    }
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 opacity-80 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }} 
        dpr={[0.6, 1.5]} // Lower DPR for better performance
        gl={{ 
          alpha: true, 
          antialias: false,
          powerPreference: 'high-performance',
          depth: false, // Disable depth testing for better performance
        }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        frameloop="demand" // Only render when needed
      >
        <AmbientScene />
        <CodeParticles count={particleCount} />
      </Canvas>
    </div>
  );
};

export default ParticlesBackground3D;
