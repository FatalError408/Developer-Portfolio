
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Github, Linkedin, Twitter, ChevronDown,
  Code, Briefcase, User, BarChart2, Send, Coffee, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-500/80 backdrop-blur-md shadow-lg border-b border-dark-200/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <motion.a 
          href="#" 
          className="text-xl font-bold text-white flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Code className="text-blue mr-2" size={24} />
          Dev<span className="text-blue">Portfolio</span>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-white hover:bg-dark-300/50">
                  <User className="w-4 h-4 mr-1" /> About
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-dark-400/95 backdrop-blur-lg border border-dark-200">
                  <ul className="grid gap-3 p-4 w-[400px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex flex-col h-full p-4 rounded-md hover:bg-dark-300/50 transition-colors"
                          href="#about"
                          onClick={closeMenu}
                        >
                          <div className="text-blue mb-2 flex items-center">
                            <User className="w-4 h-4 mr-1" /> My Journey
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Learn about my background, experience, and what drives my passion for coding.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block p-2 rounded-md hover:bg-dark-300/50 transition-colors"
                          href="#about"
                          onClick={closeMenu}
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-yellow" /> Education
                          </div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block p-2 rounded-md hover:bg-dark-300/50 transition-colors"
                          href="#about"
                          onClick={closeMenu}
                        >
                          <div className="flex items-center gap-2">
                            <Coffee className="w-4 h-4 text-yellow" /> Personal Interests
                          </div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-white hover:bg-dark-300/50">
                  <BarChart2 className="w-4 h-4 mr-1" /> Skills
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-dark-400/95 backdrop-blur-lg border border-dark-200">
                  <ul className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="flex flex-col p-3 rounded-md hover:bg-dark-300/50 transition-colors"
                          href="#skills"
                          onClick={closeMenu}
                        >
                          <div className="text-blue mb-1 flex items-center">
                            <Code className="w-4 h-4 mr-1" /> Frontend
                          </div>
                          <p className="text-xs text-muted-foreground">
                            React, Next.js, TypeScript, and more
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="flex flex-col p-3 rounded-md hover:bg-dark-300/50 transition-colors"
                          href="#skills"
                          onClick={closeMenu}
                        >
                          <div className="text-blue mb-1 flex items-center">
                            <Code className="w-4 h-4 mr-1" /> Backend
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Node.js, Express, Python, and more
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="flex flex-col p-3 rounded-md hover:bg-dark-300/50 transition-colors"
                          href="#skills"
                          onClick={closeMenu}
                        >
                          <div className="text-blue mb-1 flex items-center">
                            <Code className="w-4 h-4 mr-1" /> DevOps
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Docker, CI/CD, AWS, and more
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="flex flex-col p-3 rounded-md hover:bg-dark-300/50 transition-colors"
                          href="#skills"
                          onClick={closeMenu}
                        >
                          <div className="text-blue mb-1 flex items-center">
                            <Code className="w-4 h-4 mr-1" /> Tools
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Git, Testing, Agile, and more
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="group flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground bg-transparent hover:text-white"
                  href="#projects"
                  onClick={closeMenu}
                >
                  <Briefcase className="w-4 h-4" /> 
                  <span className="relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-blue after:origin-center after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                    Projects
                  </span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="group flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground bg-transparent hover:text-white"
                  href="#experience"
                  onClick={closeMenu}
                >
                  <Briefcase className="w-4 h-4" /> 
                  <span className="relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-blue after:origin-center after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                    Experience
                  </span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="group flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground bg-transparent hover:text-white"
                  href="#contact"
                  onClick={closeMenu}
                >
                  <Send className="w-4 h-4" /> 
                  <span className="relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-blue after:origin-center after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                    Contact
                  </span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-3">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Twitter size={20} />
            </motion.a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden absolute top-full left-0 right-0 bg-dark-400/95 backdrop-blur-lg shadow-lg overflow-hidden py-4 border-b border-dark-200"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4 px-4">
                <motion.a 
                  href="#about" 
                  onClick={closeMenu} 
                  className="nav-link"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <User className="inline-block mr-2 w-4 h-4" /> About
                </motion.a>
                <motion.a 
                  href="#skills" 
                  onClick={closeMenu} 
                  className="nav-link"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <BarChart2 className="inline-block mr-2 w-4 h-4" /> Skills
                </motion.a>
                <motion.a 
                  href="#projects" 
                  onClick={closeMenu} 
                  className="nav-link"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <Briefcase className="inline-block mr-2 w-4 h-4" /> Projects
                </motion.a>
                <motion.a 
                  href="#experience" 
                  onClick={closeMenu} 
                  className="nav-link"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <Briefcase className="inline-block mr-2 w-4 h-4" /> Experience
                </motion.a>
                <motion.a 
                  href="#contact" 
                  onClick={closeMenu} 
                  className="nav-link"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <Send className="inline-block mr-2 w-4 h-4" /> Contact
                </motion.a>
                
                <div className="flex items-center space-x-4 pt-2">
                  <motion.a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.2 }}
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.2 }}
                  >
                    <Linkedin size={20} />
                  </motion.a>
                  <motion.a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.2 }}
                  >
                    <Twitter size={20} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar;
