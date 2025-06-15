
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
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  
  const skillVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const skills = {
    "Frontend Technologies": [
      { name: "React", level: "Expert", years: "4+ years", color: "bg-blue-500", proficiency: 95, projects: 50 },
      { name: "TypeScript", level: "Expert", years: "3+ years", color: "bg-blue-600", proficiency: 92, projects: 35 },
      { name: "Next.js", level: "Advanced", years: "2+ years", color: "bg-gray-700", proficiency: 88, projects: 25 },
      { name: "Tailwind CSS", level: "Expert", years: "3+ years", color: "bg-cyan-500", proficiency: 94, projects: 40 },
      { name: "JavaScript", level: "Expert", years: "5+ years", color: "bg-yellow-500", proficiency: 96, projects: 60 },
      { name: "HTML/CSS", level: "Expert", years: "5+ years", color: "bg-orange-500", proficiency: 98, projects: 70 },
    ],
    "Backend & Database": [
      { name: "Node.js", level: "Advanced", years: "3+ years", color: "bg-green-600", proficiency: 85, projects: 30 },
      { name: "Python", level: "Intermediate", years: "2+ years", color: "bg-blue-400", proficiency: 75, projects: 15 },
      { name: "PostgreSQL", level: "Intermediate", years: "2+ years", color: "bg-blue-700", proficiency: 78, projects: 20 },
      { name: "MongoDB", level: "Advanced", years: "2+ years", color: "bg-green-500", proficiency: 82, projects: 25 },
      { name: "Express.js", level: "Advanced", years: "3+ years", color: "bg-gray-600", proficiency: 87, projects: 28 },
      { name: "GraphQL", level: "Intermediate", years: "1+ years", color: "bg-pink-500", proficiency: 72, projects: 12 },
    ],
    "Tools & DevOps": [
      { name: "Git", level: "Expert", years: "5+ years", color: "bg-red-500", proficiency: 95, projects: 80 },
      { name: "Docker", level: "Intermediate", years: "2+ years", color: "bg-blue-500", proficiency: 76, projects: 18 },
      { name: "AWS", level: "Intermediate", years: "1+ years", color: "bg-orange-400", proficiency: 70, projects: 10 },
      { name: "CI/CD", level: "Advanced", years: "2+ years", color: "bg-purple-500", proficiency: 83, projects: 22 },
      { name: "Webpack", level: "Intermediate", years: "2+ years", color: "bg-blue-400", proficiency: 74, projects: 16 },
      { name: "Jest/Testing", level: "Advanced", years: "3+ years", color: "bg-red-400", proficiency: 86, projects: 35 },
    ]
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "bg-emerald-500/20 text-emerald-400 border-emerald-400/40";
      case "Advanced": return "bg-blue-500/20 text-blue-400 border-blue-400/40";
      case "Intermediate": return "bg-amber-500/20 text-amber-400 border-amber-400/40";
      default: return "bg-gray-500/20 text-gray-400 border-gray-400/40";
    }
  };

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return "bg-gradient-to-r from-emerald-400 to-emerald-500";
    if (proficiency >= 80) return "bg-gradient-to-r from-blue-400 to-blue-500";
    if (proficiency >= 70) return "bg-gradient-to-r from-amber-400 to-amber-500";
    return "bg-gradient-to-r from-orange-400 to-orange-500";
  };

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 95) return "Master";
    if (proficiency >= 90) return "Expert";
    if (proficiency >= 80) return "Advanced";
    if (proficiency >= 70) return "Proficient";
    return "Learning";
  };
  
  return (
    <section id="skills" className="py-20 px-4 relative" ref={ref}>
      {/* Enhanced background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-400/30 via-dark-400/50 to-dark-400/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(139,92,246,0.05)_180deg,transparent_360deg)]" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent"
            animate={isInView ? {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Technical Expertise
          </motion.h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of my technical skills, real-world experience, and project implementations
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {Object.entries(skills).map(([category, categorySkills]) => (
            <motion.div 
              key={category} 
              variants={skillVariants}
              className="group bg-dark-300/60 backdrop-blur-lg rounded-2xl p-8 border border-dark-200/40 hover:border-blue-400/30 transition-all duration-500 hover:bg-dark-300/80 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="flex items-center mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full mr-4" />
                <h3 className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors">
                  {category}
                </h3>
              </div>
              
              <div className="space-y-6">
                {categorySkills.map((skill, index) => (
                  <motion.div 
                    key={skill.name} 
                    className="space-y-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <motion.div 
                          className={`w-3 h-3 rounded-full ${skill.color} shadow-lg`}
                          animate={{
                            boxShadow: [
                              `0 0 0 0 ${skill.color}`,
                              `0 0 0 4px ${skill.color}40`,
                              `0 0 0 0 ${skill.color}`
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        />
                        <span className="font-semibold text-white">{skill.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs font-medium ${getLevelColor(skill.level)}`}
                        >
                          {getProficiencyLabel(skill.proficiency)}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Enhanced proficiency display */}
                    <div className="ml-6 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{skill.years} • {skill.projects}+ projects</span>
                        <span className="text-white font-medium">{skill.proficiency}%</span>
                      </div>
                      
                      {/* Sophisticated proficiency bar */}
                      <div className="relative">
                        <div className="h-2 bg-dark-500/50 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${getProficiencyColor(skill.proficiency)} rounded-full shadow-sm relative`}
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                            transition={{ 
                              delay: index * 0.1 + 0.8, 
                              duration: 1.5, 
                              ease: "easeOut" 
                            }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-white/20 rounded-full"
                              animate={{
                                x: ["0%", "100%", "0%"],
                                opacity: [0, 0.6, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.3 + 2
                              }}
                            />
                          </motion.div>
                        </div>
                        
                        {/* Skill level indicators */}
                        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                          <span>Beginner</span>
                          <span>Proficient</span>
                          <span>Expert</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced experience summary with better metrics */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-dark-300/60 via-dark-300/80 to-dark-300/60 backdrop-blur-lg rounded-2xl p-8 border border-dark-200/40">
            <motion.h4 
              className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Professional Journey
            </motion.h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "5+", label: "Years Experience", color: "text-emerald-400", icon: "🚀", description: "Building software" },
                { value: "150+", label: "Projects Delivered", color: "text-blue-400", icon: "💼", description: "Successful launches" },
                { value: "18+", label: "Technologies", color: "text-purple-400", icon: "⚡", description: "Mastered tools" },
                { value: "50K+", label: "Lines of Code", color: "text-amber-400", icon: "💻", description: "Written & reviewed" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300"
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div 
                    className={`text-4xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform`}
                    animate={{
                      textShadow: [
                        "0 0 0px currentColor",
                        "0 0 20px currentColor",
                        "0 0 0px currentColor"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.7
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-white font-medium mb-1">
                    {stat.label}
                  </div>
                  <div className="text-muted-foreground text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
