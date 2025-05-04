import { motion } from "framer-motion";
import { Code, Database, Cog, Paintbrush, Globe, ChevronRight } from "lucide-react";
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

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-dark-500 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10 bg-noise mix-blend-overlay pointer-events-none"></div>
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue/10 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute left-0 top-0 w-96 h-96 bg-yellow/10 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="section-container relative z-10">
        <ScrollRevealWrapper>
          <h2 className="section-title">
            Technical <span className="text-gradient-yellow">Skills</span>
          </h2>
          <p className="section-subtitle">
            I've worked with a wide range of technologies in the web development world. Here's an overview of my technical expertise.
          </p>
        </ScrollRevealWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          {SKILL_CATEGORIES.map((category, idx) => (
            <ScrollRevealWrapper key={category.name} delay={idx * 0.2}>
              <motion.div 
                className="card-highlight group"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-dark-400/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center mr-3 group-hover:bg-blue/10 transition-colors">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, index) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-dark-200 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-blue to-blue-light h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.1 * index }}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </ScrollRevealWrapper>
          ))}
        </div>
        
        <ScrollRevealWrapper delay={0.4} className="mt-16">
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
                  className="bg-dark-300 rounded-lg p-3 text-center border border-dark-200 hover:border-blue/30 transition-all duration-300 group"
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
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default Skills;
