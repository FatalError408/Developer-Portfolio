
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
      { name: "React", level: "Expert", years: "4+ years", color: "bg-blue-500", proficiency: 95 },
      { name: "TypeScript", level: "Expert", years: "3+ years", color: "bg-blue-600", proficiency: 92 },
      { name: "Next.js", level: "Advanced", years: "2+ years", color: "bg-gray-700", proficiency: 88 },
      { name: "Tailwind CSS", level: "Expert", years: "3+ years", color: "bg-cyan-500", proficiency: 94 },
      { name: "JavaScript", level: "Expert", years: "5+ years", color: "bg-yellow-500", proficiency: 96 },
      { name: "HTML/CSS", level: "Expert", years: "5+ years", color: "bg-orange-500", proficiency: 98 },
    ],
    "Backend & Database": [
      { name: "Node.js", level: "Advanced", years: "3+ years", color: "bg-green-600", proficiency: 85 },
      { name: "Python", level: "Intermediate", years: "2+ years", color: "bg-blue-400", proficiency: 75 },
      { name: "PostgreSQL", level: "Intermediate", years: "2+ years", color: "bg-blue-700", proficiency: 78 },
      { name: "MongoDB", level: "Advanced", years: "2+ years", color: "bg-green-500", proficiency: 82 },
      { name: "Express.js", level: "Advanced", years: "3+ years", color: "bg-gray-600", proficiency: 87 },
      { name: "GraphQL", level: "Intermediate", years: "1+ years", color: "bg-pink-500", proficiency: 72 },
    ],
    "Tools & DevOps": [
      { name: "Git", level: "Expert", years: "5+ years", color: "bg-red-500", proficiency: 95 },
      { name: "Docker", level: "Intermediate", years: "2+ years", color: "bg-blue-500", proficiency: 76 },
      { name: "AWS", level: "Intermediate", years: "1+ years", color: "bg-orange-400", proficiency: 70 },
      { name: "CI/CD", level: "Advanced", years: "2+ years", color: "bg-purple-500", proficiency: 83 },
      { name: "Webpack", level: "Intermediate", years: "2+ years", color: "bg-blue-400", proficiency: 74 },
      { name: "Jest/Testing", level: "Advanced", years: "3+ years", color: "bg-red-400", proficiency: 86 },
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
    if (proficiency >= 90) return "bg-emerald-500";
    if (proficiency >= 80) return "bg-blue-500";
    if (proficiency >= 70) return "bg-amber-500";
    return "bg-orange-500";
  };
  
  return (
    <section id="skills" className="py-20 px-4 relative" ref={ref}>
      {/* Enhanced background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-400/30 via-dark-400/50 to-dark-400/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of my technical skills, experience levels, and proficiency across different domains
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
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${skill.color} shadow-lg`} />
                        <span className="font-semibold text-white">{skill.name}</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs font-medium ${getLevelColor(skill.level)}`}
                      >
                        {skill.level}
                      </Badge>
                    </div>
                    
                    {/* Proficiency bar */}
                    <div className="ml-6 space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{skill.years} experience</span>
                        <span className="text-white font-medium">{skill.proficiency}%</span>
                      </div>
                      <div className="h-2 bg-dark-500/50 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${getProficiencyColor(skill.proficiency)} rounded-full shadow-sm`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                          transition={{ 
                            delay: index * 0.1 + 0.8, 
                            duration: 1.2, 
                            ease: "easeOut" 
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced experience summary */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-dark-300/60 via-dark-300/80 to-dark-300/60 backdrop-blur-lg rounded-2xl p-8 border border-dark-200/40">
            <h4 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Experience at a Glance
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "5+", label: "Years Coding", color: "text-emerald-400", icon: "📅" },
                { value: "50+", label: "Projects Built", color: "text-blue-400", icon: "🚀" },
                { value: "15+", label: "Technologies", color: "text-purple-400", icon: "⚡" },
                { value: "3+", label: "Industries", color: "text-amber-400", icon: "🌍" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-2 group-hover:scale-105 transition-transform`}>
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm font-medium">
                    {stat.label}
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
