
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
        <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-r-blue-400 animate-ping" />
      </div>
      <div className="text-gray-600 text-sm font-medium">Loading content...</div>
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
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Enhanced welcome effect */}
      {showWelcomeEffect && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/95 to-slate-900 pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center max-w-2xl px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="font-mono text-2xl md:text-4xl lg:text-5xl text-white mb-6">
              <motion.div
                className="overflow-hidden inline-block"
                variants={typingEffect}
              >
                <span className="block whitespace-nowrap">
                  <span className="text-blue-400">&gt;</span> 
                  <span className="ml-2">Portfolio.initialize()</span>
                  <motion.span
                    className="text-blue-400 ml-1"
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
              className="font-mono text-base md:text-lg text-gray-300 mb-8"
            >
              Loading enhanced experience...
            </motion.div>
            
            <motion.div
              className="relative w-80 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 rounded-full"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  delay: 2,
                  duration: 1.2,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="h-full bg-blue-500 rounded-full shadow-lg shadow-blue-500/30"
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

      <Navbar />

      <main className="relative z-10">
        {/* Hero Section */}
        <motion.section 
          className="pt-4 pb-16 md:pb-24 bg-gradient-to-b from-slate-900 via-purple-900/90 to-slate-800/80 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: showWelcomeEffect ? 3.5 : 0, duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10" />
          <Hero />
        </motion.section>
        
        {/* About Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-800/80 via-slate-700/60 to-slate-600/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/3 to-purple-50/5" />
          <About />
        </section>
        
        {/* Skills Section - Fixed blur/whitewash issue */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-600/50 via-slate-500/40 to-slate-400/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/5 via-white/8 to-purple-50/10" />
          <Skills />
        </section>
        
        {/* Projects Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-400/30 via-slate-300/25 to-slate-200/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-blue-50/12 to-purple-50/15" />
          <Suspense fallback={<SectionLoading />}>
            <Projects />
          </Suspense>
        </section>
        
        {/* GitHub Repositories Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-200/20 via-slate-100/25 to-gray-100/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 via-white/15 to-blue-50/20" />
          <Suspense fallback={<SectionLoading />}>
            <GitHubRepositories />
          </Suspense>
        </section>
        
        {/* Experience Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-100/30 via-gray-50/35 to-white/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/25 via-white/25 to-purple-50/25" />
          <Suspense fallback={<SectionLoading />}>
            <Experience />
          </Suspense>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white/40 via-slate-100/25 to-slate-300/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/25 via-slate-100/15 to-blue-900/10" />
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
