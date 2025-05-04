
import { motion } from "framer-motion";
import { Code, Database, Cog, Paintbrush, Globe, ChevronRight, Star, Zap, Diamond, Rocket } from "lucide-react";
import ScrollRevealWrapper from "./ScrollRevealWrapper";

const SKILL_CATEGORIES = [
  {
    name: "Frontend",
    icon: <Code className="w-5 h-5 text-blue" />,
    skills: [
      { name: "HTML5/CSS3", level: 95 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "React", level: 90 },
      { name: "Next.js", level: 80 },
      { name: "Vue.js", level: 75 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    name: "Backend",
    icon: <Database className="w-5 h-5 text-blue" />,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "Python", level: 75 },
      { name: "Django", level: 70 },
      { name: "SQL", level: 80 },
      { name: "GraphQL", level: 75 },
      { name: "REST API Design", level: 85 },
    ],
  },
  {
    name: "Tools & Others",
    icon: <Cog className="w-5 h-5 text-blue" />,
    skills: [
      { name: "Git/GitHub", level: 90 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 70 },
      { name: "Testing (Jest/RTL)", level: 80 },
      { name: "CI/CD", level: 75 },
      { name: "Agile/Scrum", level: 85 },
      { name: "UI/UX Design", level: 70 },
    ],
  },
];

// Unique skills with special animations
const SPECIALTY_SKILLS = [
  { name: "React Three Fiber", icon: <Diamond className="w-4 h-4" />, special: "3D" },
  { name: "Matrix Visualization", icon: <Code className="w-4 h-4" />, special: "matrix" },
  { name: "WebGL Shaders", icon: <Zap className="w-4 h-4" />, special: "shader" },
  { name: "Performance Optimization", icon: <Rocket className="w-4 h-4" />, special: "performance" },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-dark-500 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10 bg-noise mix-blend-overlay pointer-events-none"></div>
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue/10 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute left-0 top-0 w-96 h-96 bg-yellow/10 rounded-full filter blur-3xl opacity-20"></div>
      
      {/* Hidden Easter Egg - Only visible in source code */}
      <div className="hidden">
        <!--
          You found a hidden message! This portfolio has several easter eggs. 
          Keep exploring and see what else you can discover.
          Hint: Try hovering over skills and watch for subtle glitches.
        -->
      </div>
      
      <div className="section-container relative z-10">
        <ScrollRevealWrapper>
          <div className="flex items-center">
            <h2 className="section-title mr-3">
              Technical <span className="text-gradient-yellow">Skills</span>
            </h2>
            
            {/* Animated skill badge - subtle popup */}
            <motion.div 
              className="bg-gradient-to-r from-blue to-purple-600 text-xs px-2 py-1 rounded-full text-white font-semibold hidden md:block"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex items-center">
                <Star className="w-3 h-3 mr-1 text-yellow" />
                <span>Matrix Expert</span>
              </div>
            </motion.div>
          </div>
          
          <p className="section-subtitle">
            I've worked with a wide range of technologies in the web development world. Here's an overview of my technical expertise.
          </p>
        </ScrollRevealWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          {SKILL_CATEGORIES.map((category, idx) => (
            <ScrollRevealWrapper key={category.name} delay={idx * 0.2}>
              <motion.div 
                className="card-highlight group"
                whileHover={{ y: -5, boxShadow: "0 0 25px rgba(59, 130, 246, 0.3)" }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-dark-400/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center mr-3 group-hover:bg-blue/10 transition-colors">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, index) => (
                    <div key={skill.name} className="group/skill">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium group-hover/skill:text-blue-light transition-colors">
                          {skill.name}
                          
                          {/* Occasionally show a spark on hover - subtle surprise */}
                          {Math.random() > 0.7 && (
                            <motion.span
                              className="inline-block ml-1 opacity-0 group-hover/skill:opacity-100"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              ✨
                            </motion.span>
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-dark-200 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-blue to-blue-light h-2.5 rounded-full relative"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.1 * index }}
                        >
                          {/* Glowing dots at high skill levels */}
                          {skill.level > 85 && (
                            <motion.div 
                              className="absolute right-0 top-1/2 w-3 h-3 rounded-full bg-blue-light -translate-y-1/2"
                              animate={{ 
                                boxShadow: [
                                  "0 0 2px 1px rgba(59, 130, 246, 0.5)",
                                  "0 0 8px 2px rgba(59, 130, 246, 0.8)",
                                  "0 0 2px 1px rgba(59, 130, 246, 0.5)"
                                ],
                                scale: [0.8, 1.1, 0.8]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          )}
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </ScrollRevealWrapper>
          ))}
        </div>
        
        {/* Special Skills & Matrix Expertise */}
        <ScrollRevealWrapper delay={0.4} className="mt-10">
          <motion.div
            className="card-highlight bg-gradient-to-b from-dark-300 via-dark-400/40 to-dark-300/80 border-blue/10 p-6"
            whileHover={{ boxShadow: "0 0 30px rgba(59, 130, 246, 0.15)" }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Diamond className="w-5 h-5 text-blue-light mr-2" />
              Hidden Special Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {SPECIALTY_SKILLS.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  className="bg-dark-400/60 backdrop-blur-sm rounded-xl p-4 border border-dark-300 hover:border-blue/30 transition-all group"
                  whileHover={{ y: -3, backgroundColor: "rgba(59, 130, 246, 0.08)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * idx }}
                >
                  <div className="flex items-center mb-2">
                    <div className="bg-dark-300/80 rounded-full w-8 h-8 flex items-center justify-center mr-2 group-hover:bg-blue/10 transition-colors">
                      {skill.icon}
                    </div>
                    <h4 className="font-medium text-white">{skill.name}</h4>
                  </div>
                  
                  {/* Special effect based on skill */}
                  {skill.special === "matrix" && (
                    <div className="h-8 overflow-hidden font-mono text-xs text-green-400 opacity-70">
                      <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: -100 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        {Array(20).fill(0).map((_, i) => (
                          <div key={i}>
                            {Math.random().toString(36).substring(2, 6)}
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  )}
                  
                  {skill.special === "3D" && (
                    <div className="h-10 relative">
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center text-blue-light font-bold"
                        animate={{ 
                          rotateX: [0, 25, 0], 
                          rotateY: [0, 15, 0],
                          z: [0, 5, 0],
                          textShadow: [
                            "0 0 5px rgba(30, 174, 219, 0.5)",
                            "0 0 10px rgba(30, 174, 219, 0.8)",
                            "0 0 5px rgba(30, 174, 219, 0.5)",
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        3D RENDERING
                      </motion.div>
                    </div>
                  )}
                  
                  {skill.special === "shader" && (
                    <div className="h-8 overflow-hidden">
                      <motion.div
                        className="h-full w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                        animate={{ 
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  )}
                  
                  {skill.special === "performance" && (
                    <div className="h-8 flex items-center">
                      <motion.div 
                        className="h-1 bg-green-400 rounded-full"
                        initial={{ width: "20%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                      />
                      <motion.div
                        className="ml-2 text-xs text-green-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                      >
                        Optimized!
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper delay={0.6} className="mt-16">
          <div className="card-highlight p-8 relative bg-dark-300/50 backdrop-blur-md">
            <h3 className="text-2xl font-semibold mb-6">Languages & Frameworks I Love</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: "JavaScript", icon: <Code className="w-4 h-4" /> },
                { name: "TypeScript", icon: <Code className="w-4 h-4" /> },
                { name: "React", icon: <Code className="w-4 h-4" /> },
                { name: "Node.js", icon: <Code className="w-4 h-4" /> },
                { name: "Next.js", icon: <Globe className="w-4 h-4" /> },
                { name: "Python", icon: <Code className="w-4 h-4" /> },
                { name: "Tailwind CSS", icon: <Paintbrush className="w-4 h-4" /> },
                { name: "Express", icon: <Database className="w-4 h-4" /> },
                { name: "GraphQL", icon: <Database className="w-4 h-4" /> },
                { name: "MongoDB", icon: <Database className="w-4 h-4" /> },
                { name: "PostgreSQL", icon: <Database className="w-4 h-4" /> },
                { name: "AWS", icon: <Cog className="w-4 h-4" /> }
              ].map((tech, idx) => (
                <motion.div 
                  key={tech.name} 
                  className="bg-dark-300 rounded-lg p-3 text-center border border-dark-200 hover:border-blue/30 transition-all duration-300 group relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "rgba(59, 130, 246, 0.1)" 
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * idx }}
                >
                  <span className="text-sm font-medium flex items-center justify-center">
                    {tech.icon}
                    <span className="ml-1">{tech.name}</span>
                  </span>
                  
                  {/* Highlight effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute -inset-2 opacity-20 bg-gradient-to-r from-blue/20 via-purple-500/20 to-blue-light/20 blur-sm rounded-xl" />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -right-1 -bottom-1 w-5 h-5 bg-blue/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                  >
                    <ChevronRight className="w-3 h-3 text-blue absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            {/* Secret hover element that reveals a hidden message */}
            <div className="absolute bottom-2 right-2 opacity-30 text-xs">
              <div className="group relative cursor-help">
                <span>...</span>
                <div className="absolute bottom-full right-0 bg-dark-400 p-2 rounded text-xs w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="font-mono">Hidden skills detected... Matrix knowledge at 100%</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default Skills;
