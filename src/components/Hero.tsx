
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRef } from "react";

const Hero = () => {
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
  
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden bg-dark-500">
      <div className="absolute inset-0 opacity-20 bg-noise mix-blend-overlay pointer-events-none"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full filter blur-3xl opacity-20 animate-pulse-glow"></div>
      
      <div className="container mx-auto px-4 sm:px-6 z-10">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full md:w-7/12 space-y-6">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold leading-tight"
              variants={itemVariants}
            >
              Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Brendon Julian Lightfoot</span>
              <span className="block mt-2 text-2xl md:text-3xl">Software Engineer, 28</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground max-w-xl"
              variants={itemVariants}
            >
              Passionate software engineer transforming complex challenges into elegant, user-friendly solutions. Let's build something amazing together.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">Download CV</Button>
            </motion.div>

            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              variants={itemVariants}
            >
              {quickNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 bg-dark-400/50 rounded-lg hover:bg-dark-300 transition-colors"
                >
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </a>
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
                className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-blue-500/30 relative"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(59, 130, 246, 0.4)",
                    "0 0 30px rgba(59, 130, 246, 0.3)",
                    "0 0 0 rgba(59, 130, 246, 0.4)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Avatar className="w-full h-full">
                  <AvatarImage 
                    src="/lovable-uploads/846d9dfe-30b4-4ff3-aac8-a361601dbd00.png" 
                    alt="Brendon Julian Lightfoot"
                    className="w-full h-full object-cover"
                  />
                  <AvatarFallback className="text-4xl">BJL</AvatarFallback>
                </Avatar>
                
                {/* Animated decorative elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-70"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0.9, 0.7],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute -bottom-3 -left-3 w-6 h-6 bg-purple-500 rounded-full opacity-60"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0.8, 0.6],
                  }}
                  transition={{ duration: 2.5, delay: 0.5, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute top-5 -left-4 w-5 h-5 bg-yellow-400 rounded-full opacity-60"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 0.8, 0.6],
                  }}
                  transition={{ duration: 4, delay: 1, repeat: Infinity }}
                />
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
    </section>
  );
};

export default Hero;
