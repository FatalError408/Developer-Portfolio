
import { motion } from "framer-motion";
import { Code, Briefcase, Trophy, Bookmark, Star, Heart, Gamepad2, Palette, Rocket } from "lucide-react";
import ScrollRevealWrapper from "./ScrollRevealWrapper";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

const About = () => {
  const [isAvailableForWork, setIsAvailableForWork] = useState(true);
  
  // Load availability status from localStorage
  useEffect(() => {
    const savedStatus = localStorage.getItem("availability_status");
    if (savedStatus) {
      setIsAvailableForWork(savedStatus === "available");
    }
  }, []);
  
  const bulletPoints = [
    "Developing and launching indie games with dedicated player bases",
    "Creating stunning 2D/3D artwork featured in industry publications",
    "Building responsive web applications with modern frameworks",
    "Managing end-to-end project lifecycles from concept to delivery",
    "Integrating AI technology to enhance creative processes",
    "Publishing and selling e-books on technical and business topics"
  ];

  return (
    <section id="about" className="py-20 bg-dark-400 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10 bg-noise mix-blend-overlay pointer-events-none"></div>
      <div className="absolute left-0 top-0 w-full h-20 bg-gradient-to-b from-dark-500 to-transparent"></div>
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue/10 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="section-container relative z-10">
        <ScrollRevealWrapper>
          <div className="flex justify-between items-center">
            <h2 className="section-title">
              About <span className="text-gradient-blue">Me</span>
            </h2>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={isAvailableForWork}
                disabled={true}
                id="available-mode"
              />
              <Badge variant={isAvailableForWork ? "default" : "outline"} className={isAvailableForWork ? "bg-green-500" : "text-muted-foreground"}>
                {isAvailableForWork ? "Available for work" : "Currently unavailable"}
              </Badge>
            </div>
          </div>
          <p className="section-subtitle">
            Hi, I'm Brendon Julian Lightfoot - a passionate Game Developer, Software Engineer, 2D/3D Artist, and Tech Entrepreneur. I bring captivating visuals, immersive gaming experiences, and innovative services to life.
          </p>
        </ScrollRevealWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {[
            { 
              icon: <Gamepad2 />, 
              title: "Game Developer & Software Engineer",
              description: "Proficient in multiple game engines like Unity and Unreal Engine, with expertise in C#, Python, C++, and JavaScript. Successfully launched indie games with dedicated player bases."
            },
            {
              icon: <Palette />,
              title: "2D/3D Artist & Designer",
              description: "Master of digital art creation using Photoshop, Illustrator, Blender, and Maya. Creating stunning artwork featured in industry publications and art galleries."
            },
            {
              icon: <Rocket />,
              title: "Tech Entrepreneur",
              description: "Founded and managed JBLinx Studio, securing funding and leading teams in creating innovative software products. Successfully established e-commerce operations."
            }
          ].map((card, idx) => (
            <ScrollRevealWrapper key={idx} delay={idx * 0.2}>
              <motion.div 
                className="card-highlight group"
                whileHover={{ y: -5 }}
              >
                <div className="bg-dark-400/80 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue/10 transition-colors">
                  <motion.div 
                    className="text-blue"
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                  >
                    {card.icon}
                  </motion.div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-muted-foreground">
                  {card.description}
                </p>
              </motion.div>
            </ScrollRevealWrapper>
          ))}
        </div>
        
        <ScrollRevealWrapper className="mt-16" delay={0.4}>
          <div className="card-highlight bg-dark-300/50 backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <Bookmark className="mr-2 text-blue" /> My Journey
                </h3>
                <p className="text-muted-foreground mb-4">
                  I'm a driven individual with a knack for problem-solving and a passion for bringing art to life. My journey began with a love for technology and creativity, leading me to pursue Software Engineering at CTI in Port Elizabeth, South Africa.
                </p>
                <p className="text-muted-foreground mb-4">
                  As a passionate creative and tech enthusiast, I specialize in art, game development, and coding. I'm dedicated to inspiring creativity, empowering individuals, and making a positive impact through innovative technology solutions.
                </p>
                <p className="text-muted-foreground">
                  Based in South Africa, I push boundaries, embrace innovation, and deliver meaningful content that resonates with users worldwide. My work spans from indie game development to AI integration and e-commerce solutions.
                </p>
                
                <motion.div 
                  className="mt-8 p-4 bg-dark-400/80 backdrop-blur-sm rounded-lg border border-dark-200 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue/5 to-transparent"></div>
                  <div className="relative">
                    <h4 className="text-lg font-semibold mb-2 flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow" /> Fun Facts
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <Heart className="w-3 h-3 text-red-400 mt-1 mr-2" /> Founder of JBLinx Studio creative enterprise
                      </li>
                      <li className="flex items-start">
                        <Heart className="w-3 h-3 text-red-400 mt-1 mr-2" /> Published author of technical e-books
                      </li>
                      <li className="flex items-start">
                        <Heart className="w-3 h-3 text-red-400 mt-1 mr-2" /> AI technology integration specialist
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <Code className="mr-2 text-blue" /> What I Do
                </h3>
                <ul className="space-y-3">
                  {bulletPoints.map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <motion.span 
                        className="text-blue mr-2 text-xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, delay: index * 0.5, repeat: Infinity }}
                      >•</motion.span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.div 
                  className="mt-8 p-4 bg-gradient-to-br from-dark-400/80 to-dark-300/80 backdrop-blur-sm rounded-lg border border-dark-200 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <h4 className="text-lg font-semibold mb-2 flex items-center">
                      <Trophy className="w-4 h-4 mr-2 text-yellow" /> Biggest Achievements
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <Star className="w-3 h-3 text-yellow mt-1 mr-2" /> Successfully launched multiple indie games with dedicated player bases
                      </li>
                      <li className="flex items-start">
                        <Star className="w-3 h-3 text-yellow mt-1 mr-2" /> Founded and secured funding for tech startup
                      </li>
                      <li className="flex items-start">
                        <Star className="w-3 h-3 text-yellow mt-1 mr-2" /> Artwork featured in industry publications and galleries
                      </li>
                      <li className="flex items-start">
                        <Star className="w-3 h-3 text-yellow mt-1 mr-2" /> Received industry recognition and awards
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default About;
