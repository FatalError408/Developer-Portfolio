
import { useState } from "react";
import { Github, ExternalLink, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    image: "https://placehold.co/600x400/1e1e1e/cccccc?text=E-Commerce+Project",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Frontend", "Backend"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A Kanban-style task management application with drag-and-drop functionality, user authentication, and real-time updates.",
    image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Task+Management",
    tags: ["React", "Firebase", "Tailwind CSS", "Frontend"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "An interactive weather dashboard that displays current and forecasted weather data with beautiful visualizations.",
    image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Weather+Dashboard",
    tags: ["JavaScript", "API", "Chart.js", "Frontend"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    id: 4,
    title: "Inventory Management System",
    description: "A comprehensive inventory management system with barcoding, stock tracking, and sales analytics.",
    image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Inventory+System",
    tags: ["React", "Node.js", "PostgreSQL", "Frontend", "Backend"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    description: "A dashboard that aggregates and displays data from various social media platforms with analytics.",
    image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Social+Dashboard",
    tags: ["Vue.js", "Express", "API", "Frontend", "Backend"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    id: 6,
    title: "Portfolio Website",
    description: "A modern portfolio website showcasing projects and skills with dark theme and animations.",
    image: "https://placehold.co/600x400/1e1e1e/cccccc?text=Portfolio+Website",
    tags: ["React", "Tailwind CSS", "Frontend"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
];

// All unique tags from projects
const ALL_TAGS = Array.from(
  new Set(PROJECTS.flatMap((project) => project.tags))
).filter(tag => tag !== "Frontend" && tag !== "Backend");

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const filteredProjects = activeFilter === "All" 
    ? PROJECTS 
    : activeFilter === "Featured"
    ? PROJECTS.filter(project => project.featured)
    : PROJECTS.filter(project => project.tags.includes(activeFilter));

  return (
    <section id="projects" className="py-20 bg-dark-400">
      <div className="section-container">
        <h2 className="section-title">
          My <span className="text-gradient-blue">Projects</span>
        </h2>
        <p className="section-subtitle">
          Here are some of the projects I've worked on. Each one presented unique challenges and opportunities to learn and grow.
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {["All", "Featured", "Frontend", "Backend", ...ALL_TAGS].map((tag) => (
            <button
              key={tag}
              className={`px-4 py-2 text-sm rounded-full transition-all ${
                activeFilter === tag
                  ? "bg-blue text-white"
                  : "bg-dark-300 text-gray-300 hover:bg-dark-200"
              }`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="card-highlight overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden rounded-md mb-4">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {project.featured && (
                  <div className="absolute top-3 left-3 bg-yellow text-dark-500 text-xs font-medium px-2 py-1 rounded">
                    Featured
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue transition-colors">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs px-2 py-1 rounded bg-dark-300 text-blue-light"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded bg-dark-300 text-blue-light">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
              
              <div className="flex space-x-3">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="button-outline flex items-center px-3 py-1.5"
                >
                  <Github size={16} className="mr-1" />
                  Code
                </a>
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="button-primary flex items-center px-3 py-1.5"
                >
                  <ExternalLink size={16} className="mr-1" />
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="button-outline">
            <Github className="mr-2 h-4 w-4" /> See More on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
