
import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";

// Lazy load components that are lower in the page
const Projects = lazy(() => import("@/components/Projects"));
const GitHubRepositories = lazy(() => import("@/components/GitHubRepositories"));
const Experience = lazy(() => import("@/components/Experience"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

// Background components
import ParticlesBackground from "@/components/ParticlesBackground";
import MatrixBackgroundSection from "@/components/MatrixBackgroundSection";
const ParticlesBackground3D = lazy(() => import("@/components/ParticlesBackground3D"));

// Loading fallback component for lazy-loaded sections
const SectionLoading = () => (
  <div className="w-full h-[50vh] flex items-center justify-center">
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-32 h-2 bg-blue/30 rounded mb-3"></div>
      <div className="w-48 h-2 bg-blue/20 rounded"></div>
    </div>
  </div>
);

const Index = () => {
  // Track visit to show custom welcome effect
  const [showWelcomeEffect, setShowWelcomeEffect] = useState(true);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  
  // Check device capabilities
  useEffect(() => {
    // Detect low-power devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    const isLowPower = isMobile || hardwareConcurrency <= 2;
    
    setIsLowPowerMode(isLowPower);
    
    // Log performance info
    console.log("Device info:", {
      isMobile,
      cores: hardwareConcurrency,
      isLowPower,
      screenWidth: window.innerWidth
    });
  }, []);
  
  // Optimized smooth scroll implementation
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.replace('#', '');
        const element = document.getElementById(id || '');
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    };

    // Use passive event listener for better performance
    document.addEventListener('click', handleAnchorClick, { passive: false });
    
    // Hide welcome effect after 3 seconds for faster interaction
    const timer = setTimeout(() => setShowWelcomeEffect(false), 3000);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      clearTimeout(timer);
    };
  }, []);

  // Memoized animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } } // Faster fade for better UX
  };
  
  // Memoized typing effect
  const typingEffect = {
    hidden: { width: "0%" },
    visible: { 
      width: "100%",
      transition: { 
        duration: 1.2, // Faster typing
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
      {/* Welcome Easter Egg - optimized */}
      {showWelcomeEffect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-500 bg-opacity-95 pointer-events-none">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }} // Faster animation
          >
            <div className="font-mono text-3xl md:text-5xl text-blue-light mb-4">
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
              transition={{ delay: 1.2, duration: 0.4 }} // Faster fade-in
              className="font-mono text-lg text-muted-foreground"
            >
              Welcome to the developer matrix
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.4 }} // Faster animation
              className="mt-8 text-muted-foreground text-sm"
            >
              Activating interactive background...
            </motion.div>
            
            <motion.div 
              className="mt-4 h-1 w-64 bg-dark-300 rounded-full mx-auto overflow-hidden"
              initial={{ width: "64px" }}
            >
              <motion.div 
                className="h-full bg-blue" 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.8, duration: 1.2 }} // Faster loading
              />
            </motion.div>
          </motion.div>
        </div>
      )}
      
      {/* Global particles background with matrix rain effect - always enabled */}
      <ParticlesBackground />
      
      {/* Conditionally render 3D particles based on device capability */}
      {!isLowPowerMode && (
        <Suspense fallback={null}>
          <ParticlesBackground3D />
        </Suspense>
      )}
      
      <Navbar />
      
      <main className="relative z-10">
        {/* Hero section with default particles */}
        <Hero />
        
        {/* About section with matrix background */}
        <MatrixBackgroundSection intensity={isLowPowerMode ? "low" : "medium"} particleCount={isLowPowerMode ? 20 : 40}>
          <About />
        </MatrixBackgroundSection>
        
        <Skills />
        
        {/* Projects section with high intensity matrix effect */}
        <MatrixBackgroundSection intensity={isLowPowerMode ? "low" : "high"} particleCount={isLowPowerMode ? 25 : 50}>
          <Suspense fallback={<SectionLoading />}>
            <Projects />
          </Suspense>
        </MatrixBackgroundSection>
        
        <Suspense fallback={<SectionLoading />}>
          <GitHubRepositories />
        </Suspense>
        
        {/* Experience section with matrix background */}
        <MatrixBackgroundSection intensity={isLowPowerMode ? "low" : "medium"} particleCount={isLowPowerMode ? 15 : 35}>
          <Suspense fallback={<SectionLoading />}>
            <Experience />
          </Suspense>
        </MatrixBackgroundSection>
        
        {/* Contact section with low intensity background for readability */}
        <MatrixBackgroundSection intensity="low" particleCount={isLowPowerMode ? 10 : 25}>
          <Suspense fallback={<SectionLoading />}>
            <Contact />
          </Suspense>
        </MatrixBackgroundSection>
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </motion.div>
  );
};

export default Index;
