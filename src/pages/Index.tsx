
import { useEffect, useState, lazy, Suspense, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";

// Lazy load components for better performance
const Projects = lazy(() => import("@/components/Projects"));
const GitHubRepositories = lazy(() => import("@/components/GitHubRepositories"));
const Experience = lazy(() => import("@/components/Experience"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

// Enhanced background component
import BackgroundGradientOrbs from "@/components/BackgroundGradientOrbs";

// Optimized loading component
const SectionLoading = () => (
  <div className="w-full h-[50vh] flex items-center justify-center">
    <motion.div 
      className="flex flex-col items-center space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-blue/20 border-t-blue animate-spin" />
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-r-cyan-400 animate-ping" />
      </div>
      <div className="text-muted-foreground text-sm font-medium">Loading content...</div>
    </motion.div>
  </div>
);

const Index = () => {
  const [showWelcomeEffect, setShowWelcomeEffect] = useState(true);

  // Optimized smooth scroll function
  const scrollToElement = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  // Enhanced anchor click handling with better performance
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const href = target.getAttribute('href');
      
      if (target.tagName === 'A' && href?.startsWith('#')) {
        e.preventDefault();
        const id = href.replace('#', '');
        scrollToElement(id);
      }
    };

    document.addEventListener('click', handleAnchorClick, { passive: false });

    // Welcome effect timer
    const timer = setTimeout(() => setShowWelcomeEffect(false), 3200);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      clearTimeout(timer);
    };
  }, [scrollToElement]);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const typingEffect = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        duration: 1.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-black text-white overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Enhanced welcome effect with pitch black background */}
      {showWelcomeEffect && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center max-w-2xl px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="font-mono text-2xl md:text-4xl lg:text-5xl text-blue-light mb-6">
              <motion.div
                className="overflow-hidden inline-block"
                variants={typingEffect}
              >
                <span className="block whitespace-nowrap">
                  <span className="text-cyan-400">&gt;</span> 
                  <span className="ml-2">Portfolio.initialize()</span>
                  <motion.span
                    className="text-cyan-400 ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    _
                  </motion.span>
                </span>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="font-mono text-base md:text-lg text-muted-foreground mb-8"
            >
              Loading enhanced experience...
            </motion.div>
            
            <motion.div
              className="relative w-80 h-2 bg-dark-300 rounded-full mx-auto overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  delay: 2,
                  duration: 1.2,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="h-full bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  delay: 2,
                  duration: 1.2,
                  ease: "easeOut"
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Enhanced background system with pitch black base */}
      <BackgroundGradientOrbs />

      <Navbar />

      <main className="relative z-10">
        <motion.section 
          className="pt-4 pb-16 md:pb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: showWelcomeEffect ? 3.5 : 0, duration: 0.8 }}
        >
          <Hero />
        </motion.section>
        
        <section className="py-16 md:py-24">
          <About />
        </section>
        
        <section className="py-16 md:py-24">
          <Skills />
        </section>
        
        <section className="py-16 md:py-24">
          <Suspense fallback={<SectionLoading />}>
            <Projects />
          </Suspense>
        </section>
        
        <section className="py-16 md:py-24">
          <Suspense fallback={<SectionLoading />}>
            <GitHubRepositories />
          </Suspense>
        </section>
        
        <section className="py-16 md:py-24">
          <Suspense fallback={<SectionLoading />}>
            <Experience />
          </Suspense>
        </section>
        
        <section className="py-16 md:py-24">
          <Suspense fallback={<SectionLoading />}>
            <Contact />
          </Suspense>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </motion.div>
  );
};

export default Index;
