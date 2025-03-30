
import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-500 border-t border-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <a href="#" className="text-2xl font-bold text-white">
              Dev<span className="text-blue">Portfolio</span>
            </a>
            <p className="mt-4 text-muted-foreground max-w-xs">
              A passionate software engineer specializing in creating exceptional digital experiences.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#skills" className="text-muted-foreground hover:text-white transition-colors">Skills</a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-white transition-colors">Projects</a>
              </li>
              <li>
                <a href="#experience" className="text-muted-foreground hover:text-white transition-colors">Experience</a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">San Francisco, California</li>
              <li>
                <a href="mailto:contact@example.com" className="text-muted-foreground hover:text-white transition-colors">
                  contact@example.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-dark-300 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} John Doe. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0 flex items-center">
            Designed & Built with <Heart size={16} className="mx-1 text-red-500" /> by John Doe
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
