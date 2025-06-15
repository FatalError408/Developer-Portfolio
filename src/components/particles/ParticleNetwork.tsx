
import { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

interface ParticleNetworkProps {
  particleCount?: number;
  connectionDistance?: number;
  mouseRadius?: number;
  colors?: string[];
  className?: string;
}

const ParticleNetwork = ({
  particleCount = 50,
  connectionDistance = 120,
  mouseRadius = 100,
  colors = ['#3A36E0', '#6E42CA', '#FF7B5C', '#4F46E5', '#8B5CF6'],
  className = ''
}: ParticleNetworkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isInside: false });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize particles
  const initParticles = useCallback(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.3
      });
    }
    particlesRef.current = particles;
  }, [particleCount, dimensions, colors]);

  // Update canvas dimensions
  const updateDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    
    setDimensions({ width: rect.width, height: rect.height });
  }, []);

  // Mouse tracking
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isInside: true
      };
    };

    const handleMouseEnter = () => {
      mouseRef.current.isInside = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isInside = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Update and draw particles
    particles.forEach((particle, i) => {
      // Mouse interaction
      if (mouse.isInside) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force * 0.01;
          particle.vy += Math.sin(angle) * force * 0.01;
        }
      }

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Boundary bounce
      if (particle.x < 0 || particle.x > dimensions.width) {
        particle.vx *= -0.8;
        particle.x = Math.max(0, Math.min(dimensions.width, particle.x));
      }
      if (particle.y < 0 || particle.y > dimensions.height) {
        particle.vy *= -0.8;
        particle.y = Math.max(0, Math.min(dimensions.height, particle.y));
      }

      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.alpha;
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.4;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.globalAlpha = opacity;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });

    ctx.globalAlpha = 1;
    animationRef.current = requestAnimationFrame(animate);
  }, [dimensions, connectionDistance, mouseRadius]);

  // Setup and cleanup
  useEffect(() => {
    updateDimensions();
    const handleResize = () => updateDimensions();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [updateDimensions]);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      initParticles();
    }
  }, [initParticles]);

  useEffect(() => {
    if (particlesRef.current.length > 0) {
      animate();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleNetwork;
