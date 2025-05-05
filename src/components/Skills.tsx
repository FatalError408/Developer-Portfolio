
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
  
  const skills = [
    // Frontend
    { name: "React", level: 95, category: "Frontend" },
    { name: "TypeScript", level: 90, category: "Frontend" },
    { name: "Next.js", level: 85, category: "Frontend" },
    { name: "CSS/Sass", level: 90, category: "Frontend" },
    { name: "Tailwind CSS", level: 95, category: "Frontend" },
    { name: "Three.js", level: 70, category: "Frontend" },
    
    // Backend
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "Python", level: 80, category: "Backend" },
    { name: "Express", level: 85, category: "Backend" },
    { name: "PostgreSQL", level: 75, category: "Backend" },
    { name: "MongoDB", level: 80, category: "Backend" },
    { name: "GraphQL", level: 70, category: "Backend" },
    
    // DevOps & Tools
    { name: "Git", level: 90, category: "DevOps & Tools" },
    { name: "Docker", level: 75, category: "DevOps & Tools" },
    { name: "CI/CD", level: 80, category: "DevOps & Tools" },
    { name: "AWS", level: 65, category: "DevOps & Tools" },
    { name: "Testing", level: 85, category: "DevOps & Tools" },
    { name: "Webpack", level: 70, category: "DevOps & Tools" },
  ];
  
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);
  
  return (
    <section id="skills" className="py-16 px-4 bg-dark-400/50" ref={ref}>
      <div className="container mx-auto max-w-5xl">
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category} className="bg-dark-300 rounded-xl p-6 backdrop-blur-sm bg-opacity-80 hover:bg-opacity-100 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-blue-light">{category}</h3>
              <div className="space-y-4">
                {categorySkills.map((skill) => (
                  <motion.div key={skill.name} variants={skillVariants} className="skill-item">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-blue">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-dark-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-dark to-blue-light rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
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
