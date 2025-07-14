import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code, Gamepad2, Palette, Wrench, Star, TrendingUp } from "lucide-react";

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

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5
      }
    })
  };
  
  const skillCategories = [
    {
      title: "Game Development",
      icon: <Gamepad2 className="w-6 h-6" />,
      color: "bg-blue-500/10 border-blue-500/20",
      iconColor: "text-blue-500",
      skills: [
        { name: "Unity", level: 95, years: "5+" },
        { name: "Unreal Engine", level: 85, years: "3+" },
        { name: "C#", level: 95, years: "5+" },
        { name: "C++", level: 80, years: "3+" },
        { name: "Python", level: 90, years: "4+" },
        { name: "JavaScript", level: 85, years: "4+" },
      ]
    },
    {
      title: "3D Design & Art",
      icon: <Palette className="w-6 h-6" />,
      color: "bg-purple-500/10 border-purple-500/20",
      iconColor: "text-purple-500",
      skills: [
        { name: "Blender", level: 95, years: "4+" },
        { name: "Autodesk Maya", level: 80, years: "3+" },
        { name: "Photoshop", level: 95, years: "6+" },
        { name: "Illustrator", level: 85, years: "4+" },
        { name: "Procreate", level: 80, years: "2+" },
        { name: "3D Modeling", level: 90, years: "4+" },
      ]
    },
    {
      title: "Web Development",
      icon: <Code className="w-6 h-6" />,
      color: "bg-green-500/10 border-green-500/20",
      iconColor: "text-green-500",
      skills: [
        { name: "React", level: 90, years: "3+" },
        { name: "Angular", level: 75, years: "2+" },
        { name: "Vue.js", level: 70, years: "2+" },
        { name: "HTML/CSS", level: 95, years: "6+" },
        { name: "PHP", level: 70, years: "3+" },
        { name: "MySQL", level: 80, years: "4+" },
      ]
    },
    {
      title: "Tools & Technologies",
      icon: <Wrench className="w-6 h-6" />,
      color: "bg-orange-500/10 border-orange-500/20",
      iconColor: "text-orange-500",
      skills: [
        { name: "Android Studio", level: 80, years: "3+" },
        { name: "Firebase", level: 85, years: "3+" },
        { name: "Selenium", level: 70, years: "2+" },
        { name: "GitHub", level: 95, years: "5+" },
        { name: "AI Integration", level: 80, years: "2+" },
        { name: "Project Management", level: 90, years: "4+" },
      ]
    }
  ];

  const getLevelLabel = (level: number) => {
    if (level >= 90) return { label: "Expert", color: "bg-green-500 text-white" };
    if (level >= 75) return { label: "Advanced", color: "bg-blue-500 text-white" };
    if (level >= 60) return { label: "Intermediate", color: "bg-yellow-500 text-white" };
    return { label: "Learning", color: "bg-gray-500 text-white" };
  };

  const getProgressColor = (level: number) => {
    if (level >= 90) return "bg-green-500";
    if (level >= 75) return "bg-blue-500";
    if (level >= 60) return "bg-yellow-500";
    return "bg-gray-500";
  };

  const stats = [
    { icon: <Star className="w-8 h-8" />, value: "10+", label: "Years Experience", color: "text-yellow-500" },
    { icon: <Code className="w-8 h-8" />, value: "50+", label: "Projects Completed", color: "text-blue-500" },
    { icon: <TrendingUp className="w-8 h-8" />, value: "20+", label: "Technologies Mastered", color: "text-green-500" },
    { icon: <Gamepad2 className="w-8 h-8" />, value: "100%", label: "Passion & Dedication", color: "text-purple-500" }
  ];
  
  return (
    <section id="skills" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div
            variants={skillVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Technical Skills & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A comprehensive overview of my technical skills spanning game development, 3D art, web development, and emerging technologies
            </p>
          </motion.div>
          
          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8 mb-16"
          >
            {skillCategories.map((category, categoryIndex) => (
              <motion.div 
                key={category.title} 
                variants={skillVariants}
              >
                <Card className={`${category.color} border transition-all duration-300 hover:shadow-lg h-full`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className={`p-2 rounded-lg bg-background/50 ${category.iconColor}`}>
                        {category.icon}
                      </div>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.skills.map((skill, skillIndex) => {
                      const levelInfo = getLevelLabel(skill.level);
                      const progressColor = getProgressColor(skill.level);
                      
                      return (
                        <motion.div 
                          key={skill.name} 
                          className="space-y-2"
                          variants={skillVariants}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="font-medium">{skill.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {skill.years}
                              </Badge>
                            </div>
                            <Badge 
                              className={`text-xs ${levelInfo.color}`}
                            >
                              {levelInfo.label}
                            </Badge>
                          </div>
                          
                          <div className="relative">
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <motion.div
                                className={`h-full ${progressColor} rounded-full`}
                                variants={progressVariants}
                                custom={skill.level}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                              />
                            </div>
                            <span className="absolute right-0 -top-6 text-xs text-muted-foreground">
                              {skill.level}%
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Stats Section */}
          <motion.div 
            variants={skillVariants}
            className="text-center"
          >
            <h3 className="text-3xl font-bold mb-8">By the Numbers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={skillVariants}
                  whileHover={{ y: -5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className={`${stat.color} mb-4 flex justify-center`}>
                        {stat.icon}
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;