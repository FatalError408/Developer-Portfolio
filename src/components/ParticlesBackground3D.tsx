
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Safely check for window to avoid SSR issues
const isBrowser = typeof window !== 'undefined';

interface PointsProps {
  count: number;
}

// Highly optimized particles
function CodeParticles({ count = 500 }: PointsProps) {
  const points = useRef<THREE.Points>(null!);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, z: 0 });
  const frameCount = useRef(0);
  const lastUpdateTime = useRef(0);
  
  // Super throttled mouse position tracking
  useEffect(() => {
    let timeoutId: number | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (timeoutId !== null) return;
      
      timeoutId = window.setTimeout(() => {
        // Convert mouse position to normalized device coordinates (-1 to +1)
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        setMousePosition({ x, y, z: 0 });
        timeoutId = null;
      }, 100); // Very throttled - only update every 100ms
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, []);
  
  // Extremely optimized particles with one-time setup
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    // Spread particles in a more sparse pattern
    for (let i = 0; i < count; i++) {
      // Create columns with greater spacing
      positions[i * 3] = (Math.floor(i / 30) * 0.5) - 15 + (Math.random() * 0.3);
      positions[i * 3 + 1] = ((i % 30) * 0.5) - 7 + (Math.random() * 0.2);
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      
      // Reduce particle sizes significantly
      sizes[i] = Math.random() * 0.02 + 0.01;
      
      // Blue to purple color range - more efficient color calculation
      colors[i * 3] = 0.2 + Math.random() * 0.2;     // R
      colors[i * 3 + 1] = 0.3 + Math.random() * 0.3; // G
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
    }
    
    return { positions, colors, sizes };
  }, [count]);
  
  // Cache for particle speed - don't recompute on every frame
  const speeds = useMemo(() => {
    return new Float32Array(count).map(() => 0.01 + Math.random() * 0.02);
  }, [count]);

  // Extremely optimized animation with frame skipping
  useFrame((state) => {
    if (!points.current) return;
    
    // Skip frames for performance - only update every 2nd or 3rd frame
    frameCount.current = (frameCount.current + 1) % 3;
    if (frameCount.current !== 0) return;
    
    const currentTime = state.clock.elapsedTime;
    // Throttle updates even further - maximum 20 FPS
    if (currentTime - lastUpdateTime.current < 0.05) return;
    lastUpdateTime.current = currentTime;
    
    const positions = points.current.geometry.attributes.position.array as Float32Array;
    
    // Update only 1/5th of particles each frame - super efficient
    const startIdx = Math.floor(Math.random() * 5) * Math.floor(count / 5);
    const endIdx = startIdx + Math.floor(count / 5);
    
    for (let i = startIdx; i < endIdx; i++) {
      const i3 = i * 3;
      
      // Very limited mouse influence - only check particles in a sparse grid
      if (i % 10 === 0) {
        const dx = mousePosition.x * 10 - positions[i3];
        const dy = mousePosition.y * 10 - positions[i3 + 1];
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        
        if (distToMouse < 3) {
          positions[i3] -= dx * 0.0002;
          positions[i3 + 1] -= dy * 0.0002;
        }
      }
      
      // Simpler movement logic - fewer calculations
      positions[i3 + 1] -= speeds[i % speeds.length];
      
      // Reset particles when they go off screen - less frequent checks
      if (positions[i3 + 1] < -7) {
        positions[i3 + 1] = 7;
        positions[i3] = (Math.floor(i / 30) * 0.5) - 15 + (Math.random() * 0.3);
      }
    }
    
    // Minimized updates
    points.current.geometry.attributes.position.needsUpdate = true;
    
    // Minimal rotation - much less computation
    if (frameCount.current === 0) {
      points.current.rotation.y = Math.sin(currentTime * 0.02) * 0.02;
    }
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
        size={0.04}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        depthWrite={false}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Ultra-minimal scene with just the basics
function AmbientScene() {
  return <ambientLight intensity={0.1} />;
}

const ParticlesBackground3D = () => {
  // Ultra-conservative particle count
  const [particleCount, setParticleCount] = useState(200);
  
  useEffect(() => {
    if (!isBrowser) return;
    
    // Extremely aggressive performance detection - prioritize smoothness
    const hardwareConcurrency = navigator.hardwareConcurrency || 1;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const width = window.innerWidth;
    const isLowEndDevice = isMobile || hardwareConcurrency <= 4 || width < 768;
    
    // Very conservative particle counts based on device
    let count = 100; // Ultra low default
    
    if (!isLowEndDevice && width > 1280) {
      count = 400; // High-end desktop only
    } else if (!isLowEndDevice && width > 1024) {
      count = 300; // Decent desktop/laptop
    } else if (!isMobile && width > 768) {
      count = 200; // Lower-end desktop
    }
    
    setParticleCount(count);
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 opacity-70 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }} 
        dpr={[0.5, 1.0]} // Dramatically reduced DPR
        gl={{ 
          alpha: true, 
          antialias: false,
          powerPreference: 'low-power',
          depth: false,
          stencil: false,
          precision: "lowp"
        }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        frameloop="demand" // Only render when needed
        performance={{ min: 0.1 }}
      >
        <AmbientScene />
        <CodeParticles count={particleCount} />
      </Canvas>
    </div>
  );
};

export default ParticlesBackground3D;
