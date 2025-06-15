
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const skillVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  const skills = {
    "Frontend Technologies": [
      { name: "React", level: "Expert", years: "4+ years", color: "bg-blue-500" },
      { name: "TypeScript", level: "Expert", years: "3+ years", color: "bg-blue-600" },
      { name: "Next.js", level: "Advanced", years: "2+ years", color: "bg-gray-700" },
      { name: "Tailwind CSS", level: "Expert", years: "3+ years", color: "bg-cyan-500" },
      { name: "JavaScript", level: "Expert", years: "5+ years", color: "bg-yellow-500" },
      { name: "HTML/CSS", level: "Expert", years: "5+ years", color: "bg-orange-500" },
    ],
    "Backend & Database": [
      { name: "Node.js", level: "Advanced", years: "3+ years", color: "bg-green-600" },
      { name: "Python", level: "Intermediate", years: "2+ years", color: "bg-blue-400" },
      { name: "PostgreSQL", level: "Intermediate", years: "2+ years", color: "bg-blue-700" },
      { name: "MongoDB", level: "Advanced", years: "2+ years", color: "bg-green-500" },
      { name: "Express.js", level: "Advanced", years: "3+ years", color: "bg-gray-600" },
      { name: "GraphQL", level: "Intermediate", years: "1+ years", color: "bg-pink-500" },
    ],
    "Tools & DevOps": [
      { name: "Git", level: "Expert", years: "5+ years", color: "bg-red-500" },
      { name: "Docker", level: "Intermediate", years: "2+ years", color: "bg-blue-500" },
      { name: "AWS", level: "Intermediate", years: "1+ years", color: "bg-orange-400" },
      { name: "CI/CD", level: "Advanced", years: "2+ years", color: "bg-purple-500" },
      { name: "Webpack", level: "Intermediate", years: "2+ years", color: "bg-blue-400" },
      { name: "Jest/Testing", level: "Advanced", years: "3+ years", color: "bg-red-400" },
    ]
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "bg-green-500/20 text-green-400 border-green-400/30";
      case "Advanced": return "bg-blue-500/20 text-blue-400 border-blue-400/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-400/30";
    }
  };
  
  return (
    <section id="skills" className="py-16 px-4 bg-dark-400/50" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          Technical <span className="text-blue">Skills</span>
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {Object.entries(skills).map(([category, categorySkills]) => (
            <motion.div 
              key={category} 
              variants={skillVariants}
              className="bg-dark-300/80 rounded-xl p-6 backdrop-blur-sm hover:bg-dark-300 transition-all duration-300 border border-dark-200/50"
            >
              <h3 className="text-xl font-bold mb-6 text-blue-light text-center">{category}</h3>
              <div className="space-y-4">
                {categorySkills.map((skill, index) => (
                  <motion.div 
                    key={skill.name} 
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${skill.color}`}></div>
                        <span className="font-medium text-white">{skill.name}</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getLevelColor(skill.level)}`}
                      >
                        {skill.level}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground ml-6">
                      {skill.years} experience
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-dark-300/50 rounded-xl p-6 backdrop-blur-sm border border-dark-200/50">
            <h4 className="text-lg font-semibold mb-4 text-blue-light">Experience Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-2xl font-bold text-green-400">5+</div>
                <div className="text-muted-foreground">Years Coding</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">50+</div>
                <div className="text-muted-foreground">Projects Built</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">15+</div>
                <div className="text-muted-foreground">Technologies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">3+</div>
                <div className="text-muted-foreground">Industries</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Hidden Easter Egg - Only visible in source code */}
        <div className="hidden">
          {/* 
            You found a hidden message! This portfolio has several easter eggs. 
            Keep exploring and see what else you can discover.
          */}
        </div>
      </div>
    </section>
  );
};

export default Skills;
