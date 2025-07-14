import { motion } from "framer-motion";
import { Code, Briefcase, Trophy, Star, Heart, Gamepad2, Palette, Rocket, Award, Users, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const achievements = [
    { icon: <Award className="w-5 h-5" />, text: "Successfully launched multiple indie games with dedicated player bases", color: "text-yellow-400" },
    { icon: <Users className="w-5 h-5" />, text: "Founded and secured funding for tech startup", color: "text-blue-400" },
    { icon: <Target className="w-5 h-5" />, text: "Artwork featured in industry publications and galleries", color: "text-green-400" },
    { icon: <Trophy className="w-5 h-5" />, text: "Received industry recognition and awards", color: "text-purple-400" }
  ];

  const stats = [
    { value: "5+", label: "Years Experience", icon: <Code className="w-6 h-6" /> },
    { value: "50+", label: "Projects Completed", icon: <Briefcase className="w-6 h-6" /> },
    { value: "3", label: "Startups Founded", icon: <Rocket className="w-6 h-6" /> },
    { value: "100%", label: "Passion & Dedication", icon: <Heart className="w-6 h-6" /> }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Me</span>
              </h2>
              <Badge 
                variant={isAvailableForWork ? "default" : "outline"} 
                className={`${isAvailableForWork ? "bg-green-500 text-white" : "text-muted-foreground"} px-3 py-1`}
              >
                {isAvailableForWork ? "Available for work" : "Currently unavailable"}
              </Badge>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Hi, I'm Brendon Julian Lightfoot - a passionate Game Developer, Software Engineer, 2D/3D Artist, and Tech Entrepreneur. 
              I bring captivating visuals, immersive gaming experiences, and innovative services to life.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Expertise Cards */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Palette className="w-6 h-6 text-primary" />
                My Expertise
              </h3>
              
              <div className="space-y-4">
                {[
                  { 
                    icon: <Gamepad2 className="w-6 h-6" />, 
                    title: "Game Developer & Software Engineer",
                    description: "Proficient in Unity and Unreal Engine, with expertise in C#, Python, C++, and JavaScript. Successfully launched indie games with dedicated player bases.",
                    color: "bg-blue-500/10 border-blue-500/20"
                  },
                  {
                    icon: <Palette className="w-6 h-6" />,
                    title: "2D/3D Artist & Designer",
                    description: "Master of digital art creation using Photoshop, Illustrator, Blender, and Maya. Creating stunning artwork featured in industry publications.",
                    color: "bg-purple-500/10 border-purple-500/20"
                  },
                  {
                    icon: <Rocket className="w-6 h-6" />,
                    title: "Tech Entrepreneur",
                    description: "Founded and managed JBLinx Studio, securing funding and leading teams in creating innovative software products.",
                    color: "bg-green-500/10 border-green-500/20"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className={`${item.color} border transition-all duration-300 hover:shadow-lg`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-background/50">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                            <p className="text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Journey & Achievements */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-primary" />
                My Journey
              </h3>
              
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    I'm a driven individual with a knack for problem-solving and a passion for bringing art to life. 
                    My journey began with a love for technology and creativity, leading me to pursue Software Engineering 
                    at CTI in Port Elizabeth, South Africa.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    As a passionate creative and tech enthusiast, I specialize in art, game development, and coding. 
                    I'm dedicated to inspiring creativity, empowering individuals, and making a positive impact through 
                    innovative technology solutions.
                  </p>
                  <p className="text-muted-foreground">
                    Based in South Africa, I push boundaries, embrace innovation, and deliver meaningful content that 
                    resonates with users worldwide. My work spans from indie game development to AI integration and 
                    e-commerce solutions.
                  </p>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="border-accent/20 bg-accent/5">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-accent" />
                    Key Achievements
                  </h4>
                  <div className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3"
                        variants={itemVariants}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className={`${achievement.color} mt-1`}>
                          {achievement.icon}
                        </div>
                        <span className="text-sm text-muted-foreground">{achievement.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-2xl font-bold mb-8">By the Numbers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="text-primary mb-2 flex justify-center">
                        {stat.icon}
                      </div>
                      <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
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

export default About;