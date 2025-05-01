import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, ChevronUp, Code } from "lucide-react";
import ScrollRevealWrapper from "./ScrollRevealWrapper";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="bg-dark-500 border-t border-dark-300 relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20 bg-noise mix-blend-overlay pointer-events-none"></div>
      <div className="absolute left-0 top-0 w-full h-20 bg-gradient-to-t from-dark-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <motion.div 
          className="absolute bottom-auto right-6 top-6 w-10 h-10 rounded-full border border-dark-200 bg-dark-300 flex items-center justify-center cursor-pointer hover:bg-dark-200 transition-colors duration-300"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
        >
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollRevealWrapper>
            <div className="flex flex-col">
              <motion.div whileHover={{ x: 5 }} className="inline-block">
                <a href="#" className="text-2xl font-bold text-white flex items-center">
                  <Code className="mr-2 text-blue" />
                  <span>Julian<span className="text-blue">Artisan</span>408</span>
                </a>
              </motion.div>
              <p className="mt-4 text-muted-foreground max-w-xs">
                A passionate software engineer specializing in creating exceptional digital experiences with expertise in modern web technologies.
              </p>
              <div className="flex space-x-4 mt-6">
                {[
                  { icon: <Github size={20} />, url: "https://github.com/JulianArtisan408", label: "GitHub" },
                  { icon: <Linkedin size={20} />, url: "https://linkedin.com/in/julianartisan408", label: "LinkedIn" },
                  { icon: <Twitter size={20} />, url: "https://twitter.com/julianartisan408", label: "Twitter" }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-dark-300/80 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-200 transition-colors"
                    aria-label={social.label}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </ScrollRevealWrapper>
          
          <ScrollRevealWrapper delay={0.2}>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { name: "About", url: "#about" },
                  { name: "Skills", url: "#skills" },
                  { name: "Projects", url: "#projects" },
                  { name: "Experience", url: "#experience" },
                  { name: "Contact", url: "#contact" }
                ].map((link, idx) => (
                  <motion.li key={idx} whileHover={{ x: 5 }}>
                    <a 
                      href={link.url} 
                      className="text-muted-foreground hover:text-white transition-colors flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-blue rounded-full mr-2"></span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollRevealWrapper>
          
          <ScrollRevealWrapper delay={0.4}>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-3">
                <motion.li 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-dark-300/80 backdrop-blur-sm flex items-center justify-center mr-3">
                    <MapPin className="w-4 h-4 text-blue" />
                  </div>
                  <span className="text-muted-foreground">San Francisco, California</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-dark-300/80 backdrop-blur-sm flex items-center justify-center mr-3">
                    <Mail className="w-4 h-4 text-blue" />
                  </div>
                  <a href="mailto:contact@example.com" className="text-muted-foreground hover:text-white transition-colors">
                    julianartisan408@example.com
                  </a>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-dark-300/80 backdrop-blur-sm flex items-center justify-center mr-3">
                    <Phone className="w-4 h-4 text-blue" />
                  </div>
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-white transition-colors">
                    +1 (234) 567-890
                  </a>
                </motion.li>
              </ul>
            </div>
          </ScrollRevealWrapper>
        </div>
        
        <div className="border-t border-dark-300 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} JulianArtisan408. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0">
            Designed & Built by Brendon Julian Lightfoot
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
