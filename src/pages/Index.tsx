
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import GitHubRepositories from "@/components/GitHubRepositories";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";
import MatrixBackgroundSection from "@/components/MatrixBackgroundSection";
import ParticlesBackground3D from "@/components/ParticlesBackground3D";

const Index = () => {
  // Track visit to show custom welcome effect
  const [showWelcomeEffect, setShowWelcomeEffect] = useState(true);
  
  // Smooth scroll implementation
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

    document.addEventListener('click', handleAnchorClick);
    
    // Hide welcome effect after 5 seconds
    const timer = setTimeout(() => setShowWelcomeEffect(false), 5000);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      clearTimeout(timer);
    };
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } } // Longer duration for smoother fade
  };
  
  // Typing effect animation variant
  const typingEffect = {
    hidden: { width: "0%" },
    visible: { 
      width: "100%",
      transition: { 
        duration: 1.5,
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
      {/* Welcome Easter Egg */}
      {showWelcomeEffect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-500 bg-opacity-95 pointer-events-none">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
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
              transition={{ delay: 1.6, duration: 0.5 }}
              className="font-mono text-lg text-muted-foreground"
            >
              Welcome to the developer matrix
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
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
                transition={{ delay: 2.2, duration: 2 }}
              />
            </motion.div>
          </motion.div>
        </div>
      )}
      
      {/* Global particles background with matrix rain effect */}
      <ParticlesBackground />
      
      {/* 3D matrix background for additional effect */}
      <ParticlesBackground3D />
      
      <Navbar />
      
      <main className="relative z-10">
        {/* Hero section with default particles */}
        <Hero />
        
        {/* About section with enhanced matrix background */}
        <MatrixBackgroundSection intensity="medium" particleCount={40}>
          <About />
        </MatrixBackgroundSection>
        
        <Skills />
        
        {/* Projects section with high intensity matrix effect */}
        <MatrixBackgroundSection intensity="high" particleCount={50}>
          <Projects />
        </MatrixBackgroundSection>
        
        <GitHubRepositories />
        
        {/* Experience section with medium matrix background */}
        <MatrixBackgroundSection intensity="medium" particleCount={35}>
          <Experience />
        </MatrixBackgroundSection>
        
        {/* Contact section with low intensity background for better readability */}
        <MatrixBackgroundSection intensity="low" particleCount={25}>
          <Contact />
        </MatrixBackgroundSection>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Index;
