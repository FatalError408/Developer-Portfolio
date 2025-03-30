
import { useState } from "react";
import { Calendar, MapPin } from "lucide-react";

const EXPERIENCES = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    dates: "Jan 2021 - Present",
    description: [
      "Led the development of a microservices architecture that improved system scalability by 40%",
      "Mentored junior developers and conducted code reviews to maintain high code quality",
      "Implemented CI/CD pipelines that reduced deployment time by 60%",
      "Optimized database queries, resulting in a 30% performance improvement",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "DataSphere Solutions",
    location: "Boston, MA",
    dates: "Mar 2018 - Dec 2020",
    description: [
      "Developed and maintained multiple client-facing web applications",
      "Designed and implemented RESTful APIs consumed by web and mobile applications",
      "Collaborated with UX/UI team to implement responsive designs",
      "Migrated legacy systems to modern tech stacks, improving performance and user experience",
    ],
    technologies: ["JavaScript", "Vue.js", "Express", "MongoDB", "AWS"],
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "WebCraft Agency",
    location: "Seattle, WA",
    dates: "Jun 2016 - Feb 2018",
    description: [
      "Built interactive UI components for various client websites",
      "Implemented responsive designs following best practices",
      "Worked with backend team to integrate frontend with APIs",
      "Optimized website performance and loading times",
    ],
    technologies: ["HTML/CSS", "JavaScript", "jQuery", "Bootstrap", "Sass"],
  },
  {
    id: 4,
    title: "Web Development Intern",
    company: "StartUp Ventures",
    location: "Portland, OR",
    dates: "Jan 2016 - May 2016",
    description: [
      "Assisted in developing and maintaining company websites",
      "Created responsive landing pages for marketing campaigns",
      "Learned modern web development practices and workflows",
      "Participated in code reviews and team meetings",
    ],
    technologies: ["HTML/CSS", "JavaScript", "WordPress", "PHP"],
  },
];

const Experience = () => {
  const [activeTab, setActiveTab] = useState(EXPERIENCES[0].id);

  const activeExperience = EXPERIENCES.find(exp => exp.id === activeTab);

  return (
    <section id="experience" className="py-20 bg-dark-500">
      <div className="section-container">
        <h2 className="section-title">
          Work <span className="text-gradient-yellow">Experience</span>
        </h2>
        <p className="section-subtitle">
          My professional journey as a software engineer across various companies and roles.
        </p>
        
        <div className="mt-10 flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3">
            <div className="bg-dark-400 rounded-lg overflow-hidden">
              {EXPERIENCES.map((exp) => (
                <button
                  key={exp.id}
                  className={`w-full text-left p-4 border-l-2 transition-all ${
                    activeTab === exp.id
                      ? "border-blue bg-dark-300 text-white"
                      : "border-transparent hover:bg-dark-300/50 text-muted-foreground"
                  }`}
                  onClick={() => setActiveTab(exp.id)}
                >
                  <div className="font-medium">{exp.company}</div>
                  <div className="text-sm opacity-80">{exp.title}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="lg:w-2/3">
            {activeExperience && (
              <div className="card-highlight h-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h3 className="text-xl font-semibold">
                    {activeExperience.title} <span className="text-blue">@ {activeExperience.company}</span>
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={16} className="mr-1" />
                    {activeExperience.dates}
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground mb-6">
                  <MapPin size={16} className="mr-1" />
                  {activeExperience.location}
                </div>
                
                <ul className="space-y-3 mb-6">
                  {activeExperience.description.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {activeExperience.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs px-2 py-1 rounded-full bg-dark-300 text-blue-light"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-16">
          <div className="card-highlight">
            <h3 className="text-2xl font-semibold mb-6">Education</h3>
            <div className="space-y-6">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-lg font-medium">
                    Bachelor of Science in Computer Science
                  </h4>
                  <div className="text-sm text-muted-foreground">2012 - 2016</div>
                </div>
                <div className="text-blue">University of Technology</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Graduated with honors. Specialized in web development and data structures.
                </p>
              </div>
              
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-lg font-medium">
                    Full Stack Web Development Certification
                  </h4>
                  <div className="text-sm text-muted-foreground">2016</div>
                </div>
                <div className="text-blue">Tech Academy</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Intensive 12-week bootcamp focused on modern web technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
