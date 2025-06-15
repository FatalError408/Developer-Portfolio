import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Menu, X, Moon, Sun, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import DashboardLink from "@/components/DashboardLink";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
        controls.start({
          height: "60px",
          backgroundColor: "rgba(9, 9, 11, 0.8)",
          backdropFilter: "blur(10px)",
        });
      } else {
        setScrolled(false);
        controls.start({
          height: "80px",
          backgroundColor: "rgba(9, 9, 11, 0.6)",
          backdropFilter: "blur(5px)",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav 
      className="fixed w-full top-0 z-40 backdrop-blur p-3 px-6 bg-dark-500/60 border-b border-dark-300"
      initial={{ height: "80px", backgroundColor: "rgba(9, 9, 11, 0.6)", backdropFilter: "blur(5px)" }}
      animate={controls}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link to="/" className="text-xl font-bold text-white flex items-center">
            <Code className="mr-2 text-blue" />
            <span>Julian<span className="text-blue">Artisan</span>408</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              className="px-3 py-2 text-muted-foreground hover:text-white transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-white"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          {/* DEV DASHBOARD ENTRY: subtle gear icon, tooltip on hover */}
          <DashboardLink />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-muted-foreground hover:text-white"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          className="md:hidden absolute top-full left-0 right-0 bg-dark-400/95 backdrop-blur-md border-b border-dark-300 py-4 px-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="px-3 py-2 text-muted-foreground hover:text-white transition-colors"
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
