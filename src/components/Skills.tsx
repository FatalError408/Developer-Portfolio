
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
        staggerChildren: 0.1,
        delayChildren: 0.2
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
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };
  
  const skills = {
    "Game Development": [
      { name: "Unity", level: "Expert", color: "bg-gray-700" },
      { name: "Unreal Engine", level: "Advanced", color: "bg-gray-800" },
      { name: "C#", level: "Expert", color: "bg-purple-600" },
      { name: "C++", level: "Advanced", color: "bg-blue-600" },
      { name: "Python", level: "Expert", color: "bg-yellow-500" },
      { name: "JavaScript", level: "Expert", color: "bg-yellow-400" },
    ],
    "3D Design & Art": [
      { name: "Blender", level: "Expert", color: "bg-orange-500" },
      { name: "Autodesk Maya", level: "Advanced", color: "bg-teal-500" },
      { name: "Photoshop", level: "Expert", color: "bg-blue-500" },
      { name: "Illustrator", level: "Advanced", color: "bg-orange-400" },
      { name: "Procreate", level: "Advanced", color: "bg-pink-500" },
      { name: "3D Modeling", level: "Expert", color: "bg-green-600" },
    ],
    "Web Development": [
      { name: "React", level: "Expert", color: "bg-blue-500" },
      { name: "Angular", level: "Advanced", color: "bg-red-500" },
      { name: "Vue.js", level: "Advanced", color: "bg-green-500" },
      { name: "HTML/CSS", level: "Expert", color: "bg-orange-500" },
      { name: "PHP", level: "Intermediate", color: "bg-purple-500" },
      { name: "MySQL", level: "Advanced", color: "bg-blue-700" },
    ],
    "Tools & Technologies": [
      { name: "Android Studio", level: "Advanced", color: "bg-green-600" },
      { name: "Firebase", level: "Advanced", color: "bg-yellow-600" },
      { name: "Selenium", level: "Intermediate", color: "bg-green-500" },
      { name: "GitHub", level: "Expert", color: "bg-gray-800" },
      { name: "AI Integration", level: "Advanced", color: "bg-purple-600" },
      { name: "Project Management", level: "Expert", color: "bg-blue-600" },
    ]
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Advanced": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Intermediate": return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };
  
  return (
    <section id="skills" className="py-16 px-4 bg-gradient-to-b from-white to-gray-50" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Technical Skills & Expertise
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills spanning game development, 3D art, web development, and emerging technologies
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {Object.entries(skills).map(([category, categorySkills]) => (
            <motion.div 
              key={category} 
              variants={skillVariants}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                {category}
              </h3>
              
              <div className="space-y-4">
                {categorySkills.map((skill) => (
                  <div 
                    key={skill.name} 
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${skill.color}`} />
                      <span className="font-medium text-gray-900">{skill.name}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs font-medium ${getLevelColor(skill.level)}`}
                    >
                      {skill.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced stats section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10+", label: "Years Experience" },
                { value: "50+", label: "Projects Completed" },
                { value: "20+", label: "Technologies Mastered" },
                { value: "100%", label: "Passion & Dedication" }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
