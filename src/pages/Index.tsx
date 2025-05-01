
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
// Import 3D components conditionally to avoid initial rendering issues
import { lazy, Suspense } from "react";
const Interactive3D = lazy(() => import("@/components/Interactive3D"));
const ParticlesBackground3D = lazy(() => import("@/components/ParticlesBackground3D"));

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
      <ParticlesBackground />
      <Suspense fallback={<div>Loading 3D elements...</div>}>
        <ParticlesBackground3D />
      </Suspense>
      <Navbar />
      <main>
        <Hero />
        <div className="bg-dark-400 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Interactive 3D Elements</h2>
            <Suspense fallback={<div className="h-96 w-full flex items-center justify-center">Loading 3D scene...</div>}>
              <Interactive3D />
            </Suspense>
          </div>
        </div>
        <About />
        <Skills />
        <Projects />
        <GitHubRepositories />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
