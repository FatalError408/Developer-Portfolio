import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Github, Linkedin, Twitter, Code2, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRef, useState, useEffect } from "react";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  
  // Load profile image from localStorage
  useEffect(() => {
    const savedImageUrl = localStorage.getItem('profile_image_url');
    if (savedImageUrl) {
      setProfileImageUrl(savedImageUrl);
    } else {
      setProfileImageUrl("https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg");
    }

    // Listen for profile image updates
    const handleProfileImageUpdate = (event: CustomEvent) => {
      setProfileImageUrl(event.detail);
    };

    window.addEventListener('profileImageUpdated', handleProfileImageUpdate as EventListener);
    
    return () => {
      window.removeEventListener('profileImageUpdated', handleProfileImageUpdate as EventListener);
    };
  }, []);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const imgRef = useRef<HTMLDivElement>(null);
  
  const navigateTo = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="home">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card"></div>
      
      {/* Animated Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "4s" }}></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="container mx-auto px-4 sm:px-6 z-10 pt-20">
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content Column */}
          <motion.div className="space-y-8 text-center lg:text-left" variants={itemVariants}>
            {/* Status Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Available for hire</span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight tracking-tight"
                variants={itemVariants}
              >
                <span className="block text-foreground">Hi, I'm</span>
                <span className="block bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                  Brendon Julian
                </span>
                <span className="block text-foreground">Lightfoot</span>
              </motion.h1>
              
              <motion.div className="flex flex-wrap gap-3 justify-center lg:justify-start" variants={itemVariants}>
                <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                  <Code2 className="w-4 h-4 mr-1" />
                  Software Engineer
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Game Developer
                </Badge>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
              variants={itemVariants}
            >
              Passionate creator crafting immersive digital experiences through code, art, and innovation. 
              Let's build something extraordinary together.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <Button 
                size="lg"
                className="group bg-gradient-to-r from-primary to-primary-glow hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-primary/25 transition-all duration-300"
                onClick={() => navigateTo('projects')}
              >
                <span>View My Work</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              {[
                { icon: Github, href: "https://github.com/JulianArtisan408", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/julianartisan408", label: "LinkedIn" },
                { icon: Twitter, href: "https://twitter.com/julianartisan408", label: "Twitter" }
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="sr-only">{label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Image Column */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            variants={itemVariants}
            ref={imgRef}
          >
            <motion.div 
              className="relative"
              variants={floatingVariants}
              animate="animate"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-2xl scale-110 opacity-50"></div>
              
              {/* Main Image Container */}
              <motion.div 
                className="relative w-80 h-80 md:w-96 md:h-96"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                  <Avatar className="w-full h-full">
                    <AvatarImage 
                      src={profileImageUrl} 
                      alt="Brendon Julian Lightfoot"
                      className="w-full h-full object-cover"
                    />
                    <AvatarFallback className="text-4xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                      BJL
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                {/* Floating Elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Code2 className="w-6 h-6 text-primary-foreground" />
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-4 -left-4 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg"
                  animate={{
                    rotate: [360, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <Sparkles className="w-5 h-5 text-accent-foreground" />
                </motion.div>
                
                {/* Stats */}
                <motion.div 
                  className="absolute -bottom-6 -right-6 bg-card/90 backdrop-blur-md rounded-lg p-3 border border-border shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  <div className="text-sm font-bold text-primary">5+ Years</div>
                  <div className="text-xs text-muted-foreground">Experience</div>
                </motion.div>
                
                <motion.div 
                  className="absolute -top-6 -left-6 bg-card/90 backdrop-blur-md rounded-lg p-3 border border-border shadow-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 }}
                >
                  <div className="text-sm font-bold text-accent">50+</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => navigateTo('about')}
          >
            <span className="text-sm text-muted-foreground mb-2 block">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 text-primary mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;