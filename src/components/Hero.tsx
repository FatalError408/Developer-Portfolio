
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Code, Terminal, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  // Animation variants
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

  const techStackIcons = [
    { icon: "react", name: "React" },
    { icon: "node", name: "Node.js" },
    { icon: "typescript", name: "TypeScript" },
    { icon: "python", name: "Python" }
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-dark-500">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20 bg-noise mix-blend-overlay pointer-events-none"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue/30 rounded-full filter blur-3xl opacity-20 animate-pulse-glow"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow/20 rounded-full filter blur-3xl opacity-20 animate-pulse-glow animation-delay-1000"></div>
      
      <div className="container mx-auto px-4 sm:px-6 z-10 pt-10 md:pt-0">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full md:w-7/12">
            <motion.div variants={itemVariants} className="inline-block px-3 py-1 rounded-full bg-dark-300/80 backdrop-blur-sm border border-dark-100 text-sm font-medium text-blue mb-6">
              <span className="flex items-center">
                <Code className="w-4 h-4 mr-1" /> Software Engineer
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4"
              variants={itemVariants}
            >
              Hi, I'm <span className="text-gradient-blue">John Doe</span>
              <span className="block mt-2">I build things for the web</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground max-w-xl mb-8"
              variants={itemVariants}
            >
              I specialize in creating modern, responsive websites and applications with cutting-edge technologies. Performance, accessibility, and user experience are my top priorities.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="button-primary bg-gradient-to-r from-blue to-blue-dark">
                  View My Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="button-outline">
                  Download Resume
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="mt-12 flex items-center gap-3"
              variants={itemVariants}
            >
              <div className="text-sm text-muted-foreground">Tech Stack</div>
              <div className="h-px bg-dark-100 flex-grow"></div>
              <div className="flex gap-3">
                {techStackIcons.map((tech, index) => (
                  <motion.div 
                    key={tech.icon} 
                    className="w-10 h-10 rounded-md flex items-center justify-center bg-dark-300/80 backdrop-blur-sm border border-dark-200/50 hover:border-blue/30 hover:bg-dark-300 transition-all duration-300"
                    title={tech.name}
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <span className="text-xs font-mono opacity-80">{tech.icon.charAt(0).toUpperCase()}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="w-full md:w-5/12"
            variants={itemVariants}
          >
            <div className="relative">
              <motion.div 
                className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-dark-200 mx-auto"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(59, 130, 246, 0)",
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                    "0 0 0 rgba(59, 130, 246, 0)"
                  ],
                  borderColor: [
                    "rgba(30, 30, 30, 0.5)",
                    "rgba(59, 130, 246, 0.5)",
                    "rgba(30, 30, 30, 0.5)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-dark-300 to-dark-400 flex items-center justify-center relative overflow-hidden group">
                  <span className="text-6xl font-bold text-dark-100">JD</span>
                  
                  {/* Code floating effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                    <div className="absolute top-1/4 left-1/4 text-xs font-mono text-blue-light">const developer = true;</div>
                    <div className="absolute top-1/3 right-1/4 text-xs font-mono text-yellow">function createCode() {}</div>
                    <div className="absolute bottom-1/3 left-1/3 text-xs font-mono text-blue-light">let passion = infinite;</div>
                    <div className="absolute bottom-1/4 right-1/3 text-xs font-mono text-yellow">return excellence;</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-dark-300/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-dark-100 font-mono text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-blue">const</span> <span className="text-yellow">developer</span> = <span className="text-blue">true</span>;
              </motion.div>
              
              {/* Floating icons */}
              <motion.div
                className="absolute -top-5 -left-5 p-3 bg-dark-300/80 backdrop-blur-sm rounded-full border border-dark-200"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Terminal className="w-5 h-5 text-blue" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-5 -right-5 p-3 bg-dark-300/80 backdrop-blur-sm rounded-full border border-dark-200"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Zap className="w-5 h-5 text-yellow" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <span className="text-muted-foreground text-sm mb-2">Scroll Down</span>
          <ChevronDown className="w-5 h-5 text-blue" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
