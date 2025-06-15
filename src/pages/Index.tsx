import { useEffect, useState, lazy, Suspense } from "react";
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

// New minimal, aesthetic background
import BackgroundGradientOrbs from "@/components/BackgroundGradientOrbs";

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
  // Hide welcome effect after 3 seconds
  const [showWelcomeEffect, setShowWelcomeEffect] = useState(true);

  // Smooth anchor scrolling
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

    document.addEventListener('click', handleAnchorClick, { passive: false });

    const timer = setTimeout(() => setShowWelcomeEffect(false), 3000);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      clearTimeout(timer);
    };
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const typingEffect = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        duration: 1.2,
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
            transition={{ duration: 0.4 }}
          >
            <div className="font-mono text-3xl md:text-5xl text-blue-light mb-4">
              <motion.div
                className="overflow-hidden inline-block"
                variants={typingEffect}
              >
                <span className="block whitespace-nowrap">
                  <span className="text-yellow">&gt;</span> Portfolio initialized...
                </span>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="font-mono text-lg text-muted-foreground"
            >
              Welcome to my modern portfolio
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.4 }}
              className="mt-8 text-muted-foreground text-sm"
            >
              Activating lightning-fast background...
            </motion.div>
            <motion.div
              className="mt-4 h-1 w-64 bg-dark-300 rounded-full mx-auto overflow-hidden"
              initial={{ width: "64px" }}
            >
              <motion.div
                className="h-full bg-blue"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.8, duration: 1.2 }}
              />
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Only use ultra-fast, beautiful background gradients, NO matrix/particle/canvas */}
      <BackgroundGradientOrbs />

      <Navbar />

      <main className="relative z-10">
        <section className="pt-2 pb-12 md:pb-20">
          <Hero />
        </section>
        <section className="py-12 md:py-20">
          <About />
        </section>
        <section className="py-12 md:py-20">
          <Skills />
        </section>
        <section className="py-12 md:py-20">
          <Suspense fallback={<SectionLoading />}>
            <Projects />
          </Suspense>
        </section>
        <section className="py-12 md:py-20">
          <Suspense fallback={<SectionLoading />}>
            <GitHubRepositories />
          </Suspense>
        </section>
        <section className="py-12 md:py-20">
          <Suspense fallback={<SectionLoading />}>
            <Experience />
          </Suspense>
        </section>
        <section className="py-12 md:py-20">
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
