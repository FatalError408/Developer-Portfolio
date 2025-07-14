import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Calendar, Building, Star, Gamepad2, Globe, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const GAME_PROJECTS = [
  {
    id: 1,
    title: "Casino Game Application",
    company: "JBLinx Studio",
    period: "2022-2023",
    description: "Developed an engaging casino game application featuring multiple game modes, real-time multiplayer functionality, and sophisticated betting mechanics. Built with Java and Android Studio with Firebase backend integration.",
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=600&h=400&fit=crop",
    tags: ["Java", "Android Studio", "Firebase", "Game Development", "Multiplayer"],
    achievements: [
      "Implemented real-time multiplayer gaming",
      "Integrated secure payment systems", 
      "Achieved smooth 60fps gameplay performance"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/JBLinx-Studio",
    type: "game",
    featured: true,
  },
  {
    id: 2,
    title: "Top-Down RTS Game",
    company: "JBLinx Studio", 
    period: "2021-2022",
    description: "Created a strategic real-time strategy game with complex AI systems, resource management, and tactical combat mechanics. Features advanced pathfinding and dynamic battlefield scenarios.",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop",
    tags: ["Unity", "C#", "AI Systems", "Strategy", "Real-time"],
    achievements: [
      "Advanced AI behavior systems",
      "Complex resource management mechanics", 
      "Optimized performance for large battles"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/JBLinx-Studio",
    type: "game",
    featured: true,
  },
  {
    id: 3,
    title: "Survival Game Application",
    company: "JBLinx Studio",
    period: "2020-2021", 
    description: "Developed an immersive survival game with crafting systems, dynamic weather, day/night cycles, and procedural world generation. Focus on player progression and environmental storytelling.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop",
    tags: ["Unreal Engine", "C++", "Procedural Generation", "Survival Mechanics"],
    achievements: [
      "Procedural world generation system",
      "Complex crafting and progression mechanics",
      "Dynamic weather and environment systems"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/JBLinx-Studio",
    type: "game",
    featured: true,
  }
];

const WEB_PROJECTS = [
  {
    id: 4,
    title: "E-commerce Web Application",
    company: "JBLinx Studio",
    period: "2023",
    description: "Built a comprehensive e-commerce platform with secure payment integration, product catalog management, shopping cart functionality, and admin dashboard for inventory management.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Payment Gateway"],
    achievements: [
      "Secure payment processing integration",
      "Responsive design for all devices",
      "Advanced inventory management system"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/JBLinx-Studio",
    type: "web",
    featured: false,
  },
  {
    id: 5,
    title: "AI Text-to-Speech Service Integration",
    company: "JBLinx Studio", 
    period: "2023",
    description: "Integrated advanced AI text-to-speech technology into existing website platform, providing dynamic content narration and accessibility features for users.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    tags: ["AI Integration", "Web APIs", "JavaScript", "Accessibility", "Voice Synthesis"],
    achievements: [
      "Seamless AI service integration",
      "Improved website accessibility", 
      "Enhanced user experience with voice features"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/JBLinx-Studio",
    type: "web",
    featured: false,
  }
];

const AUTOMATION_PROJECTS = [
  {
    id: 6,
    title: "Software Testing Automation Tool",
    company: "JBLinx Studio",
    period: "2022",
    description: "Led development of comprehensive automation testing tool utilizing Selenium and JUnit frameworks for efficient software testing processes. Managed team and project lifecycle from concept to delivery.",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=400&fit=crop",
    tags: ["Python", "Selenium", "JUnit", "Test Automation", "Project Management"],
    achievements: [
      "Reduced testing time by 70%",
      "Improved test coverage and reliability",
      "Successfully managed development team"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/JBLinx-Studio",
    type: "automation",
    featured: false,
  }
];

const ALL_PROJECTS = [...GAME_PROJECTS, ...WEB_PROJECTS, ...AUTOMATION_PROJECTS];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const getFilteredProjects = () => {
    switch (activeTab) {
      case "games": return GAME_PROJECTS;
      case "web": return WEB_PROJECTS;
      case "automation": return AUTOMATION_PROJECTS;
      case "featured": return ALL_PROJECTS.filter(p => p.featured);
      default: return ALL_PROJECTS;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "game": return <Gamepad2 className="w-4 h-4" />;
      case "web": return <Globe className="w-4 h-4" />;
      case "automation": return <Bot className="w-4 h-4" />;
      default: return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "game": return "bg-purple-500 text-white";
      case "web": return "bg-blue-500 text-white";
      case "automation": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

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

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              My Projects & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Creations</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A showcase of my game development projects, web applications, and automation tools. From indie games to AI integrations, 
              each project represents innovation and technical excellence.
            </p>
          </motion.div>
          
          {/* Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 w-full max-w-2xl mx-auto mb-12 bg-card/50 backdrop-blur-sm border border-border">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  All ({ALL_PROJECTS.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="games" 
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  Games ({GAME_PROJECTS.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="web" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Web ({WEB_PROJECTS.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="automation" 
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Tools ({AUTOMATION_PROJECTS.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="featured" 
                  className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
                >
                  Featured
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-8">
                <motion.div 
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={containerVariants}
                >
                  {getFilteredProjects().map((project) => (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-xl group h-full">
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="flex gap-2">
                              <Button 
                                size="sm"
                                variant="secondary"
                                asChild
                              >
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="w-4 h-4 mr-1" />
                                  Code
                                </a>
                              </Button>
                              <Button 
                                size="sm"
                                asChild
                              >
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4 mr-1" />
                                  Live
                                </a>
                              </Button>
                            </div>
                          </div>
                          
                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex gap-2">
                            {project.featured && (
                              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                            <Badge className={getTypeColor(project.type)}>
                              {getTypeIcon(project.type)}
                              <span className="ml-1">
                                {project.type === 'game' ? 'Game' : 
                                 project.type === 'web' ? 'Web App' : 'Tool'}
                              </span>
                            </Badge>
                          </div>
                        </div>
                        
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">
                              {project.title}
                            </h3>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              {project.company}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {project.period}
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                            {project.description}
                          </p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 4).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {project.tags.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{project.tags.length - 4}
                              </Badge>
                            )}
                          </div>
                          
                          {/* Achievements */}
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium">Key Achievements:</h4>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {project.achievements.slice(0, 2).map((achievement, index) => (
                                <li key={index} className="flex items-start gap-1">
                                  <Star className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
          
          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <Button 
              size="lg"
              variant="outline"
              className="border-primary/30 hover:border-primary/60 hover:bg-primary/5"
              asChild
            >
              <a href="https://github.com/JulianArtisan408" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" /> 
                View All Projects on GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;