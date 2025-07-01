
import { useState } from "react";
import { Github, ExternalLink, Calendar, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GAME_PROJECTS = [
  {
    id: 1,
    title: "Casino Game Application",
    company: "JBLinx Studio",
    period: "2022-2023",
    description: "Developed an engaging casino game application featuring multiple game modes, real-time multiplayer functionality, and sophisticated betting mechanics. Built with Java and Android Studio with Firebase backend integration.",
    image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Casino+Game",
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
    image: "https://placehold.co/600x400/1e1e1e/cccccc?text=RTS+Game",
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
    image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Survival+Game",
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
    image: "https://placehold.co/600x400/1e1e1e/cccccc?text=E-commerce+Platform",
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
    image: "https://placehold.co/600x400/1e1e1e/cccccc?text=AI+TTS+Service",
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
    image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Testing+Automation",
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
  const [selectedProject, setSelectedProject] = useState(null);
  
  const getFilteredProjects = () => {
    switch (activeTab) {
      case "games": return GAME_PROJECTS;
      case "web": return WEB_PROJECTS;
      case "automation": return AUTOMATION_PROJECTS;
      case "featured": return ALL_PROJECTS.filter(p => p.featured);
      default: return ALL_PROJECTS;
    }
  };

  const getTabColor = (tab: string) => {
    const colors = {
      games: "text-purple-400",
      web: "text-blue-400",
      automation: "text-green-400",
      featured: "text-yellow-400"
    };
    return colors[tab] || "text-gray-400";
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-slate-200 via-gray-200 to-slate-300">
      <div className="section-container">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          My Projects & Creations
        </h2>
        <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          A showcase of my game development projects, web applications, and automation tools. From indie games to AI integrations, each project represents innovation and technical excellence.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl mx-auto mb-8 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="all" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              All ({ALL_PROJECTS.length})
            </TabsTrigger>
            <TabsTrigger value="games" className={`data-[state=active]:bg-purple-600 data-[state=active]:text-white ${getTabColor('games')}`}>
              Games ({GAME_PROJECTS.length})
            </TabsTrigger>
            <TabsTrigger value="web" className={`data-[state=active]:bg-blue-600 data-[state=active]:text-white ${getTabColor('web')}`}>
              Web ({WEB_PROJECTS.length})
            </TabsTrigger>
            <TabsTrigger value="automation" className={`data-[state=active]:bg-green-600 data-[state=active]:text-white ${getTabColor('automation')}`}>
              Tools ({AUTOMATION_PROJECTS.length})
            </TabsTrigger>
            <TabsTrigger value="featured" className={`data-[state=active]:bg-yellow-600 data-[state=active]:text-white ${getTabColor('featured')}`}>
              Featured
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getFilteredProjects().map((project) => (
                <div 
                  key={project.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button 
                        variant="secondary"
                        onClick={() => setSelectedProject(project)}
                        className="bg-white/90 text-gray-800 hover:bg-white"
                      >
                        View Details
                      </Button>
                    </div>
                    {project.featured && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge 
                        variant="secondary" 
                        className={`
                          ${project.type === 'game' ? 'bg-purple-600 text-white' : ''}
                          ${project.type === 'web' ? 'bg-blue-600 text-white' : ''}
                          ${project.type === 'automation' ? 'bg-green-600 text-white' : ''}
                        `}
                      >
                        {project.type === 'game' ? 'Game' : 
                         project.type === 'web' ? 'Web App' : 'Automation'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {project.period}
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-3 text-gray-600">
                      <Building className="w-4 h-4 mr-1" />
                      <span className="text-sm">{project.company}</span>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-gray-300 text-gray-600">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 4 && (
                        <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                          +{project.tags.length - 4}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex space-x-3">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Github size={16} className="mr-1" />
                        Code
                      </a>
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-12">
          <Button className="bg-gray-800 text-white hover:bg-gray-900 border-none">
            <Github className="mr-2 h-4 w-4" /> 
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
