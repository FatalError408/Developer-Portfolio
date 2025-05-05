
import { motion } from "framer-motion";
import { Code, Briefcase, Trophy, Bookmark, Star, Heart } from "lucide-react";
import ScrollRevealWrapper from "./ScrollRevealWrapper";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const About = () => {
  const [isAvailableForWork, setIsAvailableForWork] = useState(true);
  
  const bulletPoints = [
    "Building responsive and accessible web applications",
    "Developing RESTful and GraphQL APIs",
    "Implementing database design and optimization",
    "Creating custom UI/UX components and animations",
    "Optimizing applications for maximum performance",
    "Mentoring junior developers and conducting code reviews"
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
                onCheckedChange={setIsAvailableForWork}
                id="available-mode"
              />
              <Badge variant={isAvailableForWork ? "default" : "outline"} className={isAvailableForWork ? "bg-green-500" : "text-muted-foreground"}>
                {isAvailableForWork ? "Available for work" : "Currently unavailable"}
              </Badge>
            </div>
          </div>
          <p className="section-subtitle">
            I'm a passionate software engineer with a focus on creating efficient, scalable, and user-friendly applications.
          </p>
        </ScrollRevealWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {[
            { 
              icon: <Code />, 
              title: "Full Stack Developer",
              description: "I craft responsive and performant web applications with modern JavaScript frameworks and backend technologies."
            },
            {
              icon: <Briefcase />,
              title: "5+ Years Experience",
              description: "I've worked on a diverse range of projects, from small startups to large enterprise applications."
            },
            {
              icon: <Trophy />,
              title: "Problem Solver",
              description: "I enjoy tackling complex challenges and finding elegant solutions that balance technical and user needs."
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
                  I began my coding journey at the age of 14, tinkering with HTML and CSS to create simple websites. This early passion evolved into a career in software engineering after completing my Computer Science studies.
                </p>
                <p className="text-muted-foreground">
                  Based in South Africa, I work remotely with clients globally, building everything from e-commerce platforms to complex enterprise systems. I'm constantly learning and adapting to new technologies to deliver the best solutions.
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
                        <Heart className="w-3 h-3 text-red-400 mt-1 mr-2" /> Coffee enthusiast with a home brewing station
                      </li>
                      <li className="flex items-start">
                        <Heart className="w-3 h-3 text-red-400 mt-1 mr-2" /> Running JBLinx Studio for freelance development
                      </li>
                      <li className="flex items-start">
                        <Heart className="w-3 h-3 text-red-400 mt-1 mr-2" /> Contributing to open source projects in my free time
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
                      <Trophy className="w-4 h-4 mr-2 text-yellow" /> Professional Highlights
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <Star className="w-3 h-3 text-yellow mt-1 mr-2" /> Working with global clients from South Africa
                      </li>
                      <li className="flex items-start">
                        <Star className="w-3 h-3 text-yellow mt-1 mr-2" /> Remote work specialist with excellent communication
                      </li>
                      <li className="flex items-start">
                        <Star className="w-3 h-3 text-yellow mt-1 mr-2" /> Founded JBLinx Studio for freelance development
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
