
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRef, useState, useEffect } from "react";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true); // State for availability status
  
  useEffect(() => {
    // Load availability only (don't allow public toggling)
    const savedStatus = localStorage.getItem("availability_status");
    setIsAvailable(!savedStatus || savedStatus === "available");
    // Watch for changes to availability status (cross-tab sync)
    const onChange = (e: StorageEvent) => {
      if (e.key === "availability_status") {
        setIsAvailable(!e.newValue || e.newValue === "available");
      }
    };
    window.addEventListener("storage", onChange);
    // Custom cross-tab event support
    const onCustom = (e: any) => {
      if (e.detail?.key === "availability_status") {
        setIsAvailable(e.detail.value === "available");
      }
    };
    window.addEventListener("availabilityStatusChange", onCustom);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener("availabilityStatusChange", onCustom);
    };
  }, []);

  // Handle keyboard shortcut for command menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isCommandOpen) {
        setIsCommandOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCommandOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const quickNavLinks = [
    { name: "Projects", icon: "💼", href: "#projects" },
    { name: "Skills", icon: "🛠️", href: "#skills" },
    { name: "Contact", icon: "📧", href: "#contact" }
  ];

  const imgRef = useRef<HTMLDivElement>(null);
  
  const navigateTo = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsCommandOpen(false);
  };
  
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden bg-dark-500" id="home">
      <div className="absolute inset-0 opacity-20 bg-noise mix-blend-overlay pointer-events-none"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full filter blur-3xl opacity-30 animate-pulse-glow"></div>
      
      <div className="container mx-auto px-4 sm:px-6 z-10">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full md:w-7/12 space-y-6 md:space-y-8">
            <motion.div
              variants={itemVariants}
              className="space-y-2"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-4">
                <span className="animate-pulse mr-1">●</span> Software Engineer & Web Developer
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Brendon Julian Lightfoot</span>
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-2xl md:text-3xl font-medium text-white/90">Software Engineer, 28</span>
                <Badge variant={isAvailable ? "default" : "outline"} className={`ml-2 ${isAvailable ? "bg-green-500" : "text-muted-foreground"}`}>
                  {isAvailable ? "Available for work" : "Currently unavailable"}
                </Badge>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
              variants={itemVariants}
            >
              Passionate software engineer transforming complex challenges into elegant, user-friendly solutions. Let's build something amazing together.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 shadow-lg shadow-blue-500/20 transition-all duration-300 text-base py-6"
                onClick={() => navigateTo('projects')}
              >
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="border-blue-400/30 hover:border-blue-400/80 shadow-lg shadow-purple-500/10 transition-all duration-300 text-base py-6"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                Download CV
              </Button>
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-white hover:bg-dark-300/50 hidden md:flex"
                onClick={() => setIsCommandOpen(true)}
              >
                Press <kbd className="px-2 py-0.5 text-xs bg-dark-300 rounded-md mx-1">⌘ K</kbd> to explore
              </Button>
            </motion.div>

            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              variants={itemVariants}
            >
              {quickNavLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 bg-dark-400/50 rounded-lg hover:bg-dark-300 transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            className="w-full md:w-5/12 flex justify-center"
            variants={itemVariants}
            ref={imgRef}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <motion.div 
                className={`w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-500/30 relative ${!isMobile ? 'hover:border-blue-400' : ''}`}
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(59, 130, 246, 0.4)",
                    "0 0 40px rgba(59, 130, 246, 0.4)",
                    "0 0 0 rgba(59, 130, 246, 0.4)"
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Avatar className="w-full h-full">
                  <AvatarImage 
                    src="https://photos.fife.usercontent.google.com/pw/AP1GczMBaB7Xu7DTbn77bFtxDvKvppBFrkcyIeQHiGFxZd91Okx5N3ZNlbR6=w696-h928-s-no-gm?authuser=0" 
                    alt="Brendon Julian Lightfoot"
                    className="w-full h-full object-cover"
                  />
                  <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-900 to-purple-900">BJL</AvatarFallback>
                </Avatar>
                
                {/* Enhanced animated decorative elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-10 h-10 bg-blue-500 rounded-full opacity-80"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute -bottom-3 -left-3 w-8 h-8 bg-purple-500 rounded-full opacity-70"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.7, 0.9, 0.7],
                  }}
                  transition={{ duration: 2.5, delay: 0.5, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute top-5 -left-4 w-6 h-6 bg-yellow-400 rounded-full opacity-70"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 0.9, 0.7],
                  }}
                  transition={{ duration: 4, delay: 1, repeat: Infinity }}
                />
                
                {/* Add gleam effect */}
                <motion.div 
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none"
                  animate={{
                    opacity: [0, 0.5, 0],
                    rotate: [0, 15, 0],
                    scale: [0.85, 1.1, 0.85],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
              </motion.div>

              {/* Enhanced profile stats */}
              <motion.div 
                className="absolute -bottom-4 -right-4 px-4 py-2 bg-dark-300/90 backdrop-blur-md rounded-lg border border-blue-500/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="text-sm font-medium text-blue-400">5+ years experience</div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-6 -left-6 px-4 py-2 bg-dark-300/90 backdrop-blur-md rounded-lg border border-purple-500/30"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <div className="text-sm font-medium text-purple-400">Full-Stack Developer</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <span className="text-sm text-muted-foreground mb-2">Explore More</span>
          <ChevronDown className="w-5 h-5 text-purple-400" />
        </motion.div>
      </div>

      {/* Command Dialog */}
      {isCommandOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCommandOpen(false)}
        >
          <motion.div 
            className="w-full max-w-md bg-dark-400/95 border border-dark-200 rounded-lg shadow-2xl overflow-hidden"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Command className="border-none bg-transparent">
              <CommandInput placeholder="Search sections..." />
              <CommandList>
                <CommandGroup heading="Navigate">
                  {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
                    <CommandItem 
                      key={section}
                      onSelect={() => navigateTo(section)}
                      className="cursor-pointer"
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandGroup heading="Actions">
                  <CommandItem 
                    onSelect={() => {
                      window.open('/resume.pdf', '_blank');
                      setIsCommandOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    Download Resume
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
