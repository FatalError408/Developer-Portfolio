
import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";

// Defer loading lower-priority components
const Projects = lazy(() => 
  new Promise(resolve => {
    // Only load after main content is visible
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => 
        import("@/components/Projects").then(resolve)
      );
    } else {
      setTimeout(() => import("@/components/Projects").then(resolve), 1500);
    }
  })
);

const GitHubRepositories = lazy(() => 
  new Promise(resolve => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => 
        import("@/components/GitHubRepositories").then(resolve)
      );
    } else {
      setTimeout(() => import("@/components/GitHubRepositories").then(resolve), 2000);
    }
  })
);

const Experience = lazy(() => import("@/components/Experience"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

// Ultra-minimal loading component
const SectionLoading = () => <div className="w-full h-[30vh]" />;

// Background components - core experience only loads the minimal one 
import ParticlesBackground from "@/components/ParticlesBackground";
const MatrixBackgroundSection = lazy(() => import("@/components/MatrixBackgroundSection"));

// Only load 3D particles for high-end devices after a long delay
const ParticlesBackground3D = lazy(() => 
  new Promise(resolve => {
    setTimeout(() => 
      import("@/components/ParticlesBackground3D")
        .then(resolve)
        .catch(() => {
          console.warn("Failed to load 3D particles, using fallback");
          return { default: () => null };
        }),
      3000 // 3-second delay for 3D effects
    );
  })
);

const Index = () => {
  const [isLowPowerMode, setIsLowPowerMode] = useState(true); // Default to low power
  const [load3DEffects, setLoad3DEffects] = useState(false);
  const [showWelcomeEffect, setShowWelcomeEffect] = useState(false); // Disable by default
  
  // Performance-optimized detection
  useEffect(() => {
    const detectPerformance = () => {
      // Quick performance check
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const hardwareConcurrency = navigator.hardwareConcurrency || 2;
      const screenWidth = window.innerWidth;
      const isHighEnd = !isMobile && hardwareConcurrency > 6 && screenWidth > 1024;
      
      // Very conservative approach
      setIsLowPowerMode(!isHighEnd);
      
      // Only load 3D effects on high-end devices and after a delay
      if (isHighEnd) {
        setTimeout(() => setLoad3DEffects(true), 2500);
      }
      
      // Skip welcome animation on lower-end devices
      if (screenWidth > 1024 && !isMobile) {
        setShowWelcomeEffect(true);
        setTimeout(() => setShowWelcomeEffect(false), 2500); // Shorter animation
      }
    };
    
    // Defer detection slightly
    setTimeout(detectPerformance, 100);
  }, []);
  
  // Performance-optimized animations
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } }
  };
  
  const typingEffect = {
    hidden: { width: "0%" },
    visible: { 
      width: "100%",
      transition: { 
        duration: 0.8, // Faster typing
        ease: "easeInOut" 
      } 
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-dark-500 text-white"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Welcome animation - only on high-end devices */}
      {showWelcomeEffect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-500 bg-opacity-95 pointer-events-none">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="font-mono text-2xl md:text-4xl text-blue-light mb-3">
              <motion.div
                className="overflow-hidden inline-block"
                variants={typingEffect}
              >
                <span className="block whitespace-nowrap">
                  <span className="text-yellow">&gt;</span> Matrix initialized...
                </span>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="font-mono text-lg text-muted-foreground"
            >
              Welcome to the developer matrix
            </motion.div>
          </motion.div>
        </div>
      )}
      
      {/* Basic particles - always loaded for all devices */}
      <ParticlesBackground />
      
      {/* 3D particles - only loaded for high-end devices and after delay */}
      {!isLowPowerMode && load3DEffects && (
        <Suspense fallback={null}>
          <ParticlesBackground3D />
        </Suspense>
      )}
      
      <Navbar />
      
      <main className="relative z-10">
        {/* Core sections loaded immediately */}
        <Hero />
        <About />
        <Skills />
        
        {/* Dynamic sections with progressive enhancement */}
        <Suspense fallback={<SectionLoading />}>
          {!isLowPowerMode ? (
            <MatrixBackgroundSection intensity="low" particleCount={15}>
              <Projects />
            </MatrixBackgroundSection>
          ) : (
            <Projects />
          )}
        </Suspense>
        
        <Suspense fallback={<SectionLoading />}>
          <GitHubRepositories />
        </Suspense>
        
        <Suspense fallback={<SectionLoading />}>
          {!isLowPowerMode ? (
            <MatrixBackgroundSection intensity="low" particleCount={10}>
              <Experience />
            </MatrixBackgroundSection>
          ) : (
            <Experience />
          )}
        </Suspense>
        
        <Suspense fallback={<SectionLoading />}>
          <Contact />
        </Suspense>
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </motion.div>
  );
};

export default Index;
