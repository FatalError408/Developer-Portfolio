
import { useEffect } from "react";
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
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <motion.div 
      className="min-h-screen bg-dark-500 text-white"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Global particles background with matrix rain effect */}
      <ParticlesBackground />
      
      {/* 3D matrix background for additional effect */}
      <ParticlesBackground3D />
      
      <Navbar />
      
      <main className="relative z-10">
        {/* Hero section with default particles */}
        <Hero />
        
        {/* About section with enhanced matrix background */}
        <MatrixBackgroundSection intensity="medium" particleCount={35}>
          <About />
        </MatrixBackgroundSection>
        
        <Skills />
        
        {/* Projects section with high intensity matrix effect */}
        <MatrixBackgroundSection intensity="high" particleCount={40}>
          <Projects />
        </MatrixBackgroundSection>
        
        <GitHubRepositories />
        
        {/* Experience section with medium matrix background */}
        <MatrixBackgroundSection intensity="medium" particleCount={30}>
          <Experience />
        </MatrixBackgroundSection>
        
        <Contact />
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Index;
