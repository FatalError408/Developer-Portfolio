
import { useState } from "react";
import { Github, ExternalLink, Calendar, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PROFESSIONAL_PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    company: "Tech Innovations Inc.",
    period: "2021-2023",
    description: "Led the development of a full-featured e-commerce platform with microservices architecture, handling 10K+ daily transactions with advanced analytics and inventory management.",
    image: "https://placehold.co/600x400/1e1e1e/cccccc?text=E-Commerce+Platform",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Docker", "AWS"],
    achievements: [
      "Improved system scalability by 40%",
      "Reduced deployment time by 60%",
      "Implemented real-time inventory tracking"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    type: "professional",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management Suite",
    company: "DataSphere Solutions",
    period: "2020-2021",
    description: "Designed and built a comprehensive project management platform with Kanban boards, real-time collaboration, and advanced reporting features for enterprise clients.",
    image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Task+Management",
    tags: ["Vue.js", "Express", "PostgreSQL", "Socket.io", "Redis"],
    achievements: [
      "Supported 500+ concurrent users",
      "Integrated with 15+ third-party APIs",
      "Achieved 99.9% uptime"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    type: "professional",
    featured: true,
  }
];

const JBLINX_PROJECTS = [
  {
    id: 3,
    title: "Portfolio Platform",
    company: "JBLinx Studio",
    period: "2023-Present",
    description: "Modern portfolio website with advanced animations, GitHub integration, and dynamic content management. Features responsive design and optimized performance.",
    image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Portfolio+Platform",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "GitHub API"],
    achievements: [
      "Dynamic GitHub repository integration",
      "Performance score of 95+",
      "Fully responsive design"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/JBLinx-Studio",
    type: "jblinx",
    featured: true,
  },
  {
    id: 4,
    title: "Client Dashboard",
    company: "JBLinx Studio",
    period: "2023",
    description: "Comprehensive client management dashboard with project tracking, invoicing, and communication tools. Built for small to medium agencies.",
    image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Client+Dashboard",
    tags: ["React", "Node.js", "MongoDB", "Chart.js", "Material-UI"],
    achievements: [
      "Automated invoicing system",
      "Real-time project tracking",
      "Multi-client support"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/JBLinx-Studio",
    type: "jblinx",
    featured: false,
  }
];

const PERSONAL_PROJECTS = [
  {
    id: 5,
    title: "Weather Analytics",
    company: "Personal Project",
    period: "2022",
    description: "Interactive weather dashboard with historical data analysis, forecasting, and beautiful data visualizations. Features machine learning predictions.",
    image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Weather+Analytics",
    tags: ["JavaScript", "D3.js", "Python", "TensorFlow", "API Integration"],
    achievements: [
      "ML-powered weather predictions",
      "Interactive data visualizations",
      "Historical trend analysis"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    type: "personal",
    featured: false,
  },
  {
    id: 6,
    title: "Crypto Portfolio Tracker",
    company: "Personal Project",
    period: "2021",
    description: "Real-time cryptocurrency portfolio tracking with price alerts, profit/loss calculations, and market analysis tools.",
    image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Crypto+Tracker",
    tags: ["React", "WebSocket", "CoinGecko API", "Chart.js", "Local Storage"],
    achievements: [
      "Real-time price tracking",
      "Portfolio performance analytics",
      "Custom alert system"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    type: "personal",
    featured: false,
  }
];

const ALL_PROJECTS = [...PROFESSIONAL_PROJECTS, ...JBLINX_PROJECTS, ...PERSONAL_PROJECTS];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  
  const getFilteredProjects = () => {
    switch (activeTab) {
      case "professional": return PROFESSIONAL_PROJECTS;
      case "jblinx": return JBLINX_PROJECTS;
      case "personal": return PERSONAL_PROJECTS;
      case "featured": return ALL_PROJECTS.filter(p => p.featured);
      default: return ALL_PROJECTS;
    }
  };

  const getTabColor = (tab: string) => {
    const colors = {
      professional: "text-blue-400",
      jblinx: "text-purple-400",
      personal: "text-green-400",
      featured: "text-yellow-400"
    };
    return colors[tab] || "text-gray-400";
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-slate-200 via-gray-200 to-slate-300">
      <div className="section-container">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          My Work & Projects
        </h2>
        <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          A comprehensive showcase of my professional work, studio projects, and personal innovations across different domains and technologies.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl mx-auto mb-8 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="all" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              All ({ALL_PROJECTS.length})
            </TabsTrigger>
            <TabsTrigger value="professional" className={`data-[state=active]:bg-blue-600 data-[state=active]:text-white ${getTabColor('professional')}`}>
              Professional ({PROFESSIONAL_PROJECTS.length})
            </TabsTrigger>
            <TabsTrigger value="jblinx" className={`data-[state=active]:bg-purple-600 data-[state=active]:text-white ${getTabColor('jblinx')}`}>
              JBLinx Studio ({JBLINX_PROJECTS.length})
            </TabsTrigger>
            <TabsTrigger value="personal" className={`data-[state=active]:bg-green-600 data-[state=active]:text-white ${getTabColor('personal')}`}>
              Personal ({PERSONAL_PROJECTS.length})
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
                          ${project.type === 'professional' ? 'bg-blue-600 text-white' : ''}
                          ${project.type === 'jblinx' ? 'bg-purple-600 text-white' : ''}
                          ${project.type === 'personal' ? 'bg-green-600 text-white' : ''}
                        `}
                      >
                        {project.type === 'professional' ? 'Professional' : 
                         project.type === 'jblinx' ? 'JBLinx Studio' : 'Personal'}
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
