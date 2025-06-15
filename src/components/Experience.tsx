
import { useState } from "react";
import { Calendar, MapPin, Building, Award, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PROFESSIONAL_EXPERIENCE = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    dates: "Jan 2021 - Present",
    type: "Full-time",
    description: [
      "Led the development of a microservices architecture that improved system scalability by 40%",
      "Mentored junior developers and conducted code reviews to maintain high code quality",
      "Implemented CI/CD pipelines that reduced deployment time by 60%",
      "Optimized database queries, resulting in a 30% performance improvement",
      "Spearheaded migration to cloud infrastructure (AWS) serving 100K+ users"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Docker", "AWS", "Kubernetes"],
    achievements: [
      "Employee of the Quarter Q3 2022",
      "Led team of 5 developers",
      "Reduced system downtime by 75%"
    ]
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "DataSphere Solutions",
    location: "Boston, MA",
    dates: "Mar 2018 - Dec 2020",
    type: "Full-time",
    description: [
      "Developed and maintained multiple client-facing web applications",
      "Designed and implemented RESTful APIs consumed by web and mobile applications",
      "Collaborated with UX/UI team to implement responsive designs",
      "Migrated legacy systems to modern tech stacks, improving performance and user experience",
      "Integrated third-party APIs and payment gateways for e-commerce solutions"
    ],
    technologies: ["JavaScript", "Vue.js", "Express", "MongoDB", "AWS", "Stripe"],
    achievements: [
      "Delivered 15+ client projects",
      "99.9% client satisfaction rate",
      "Reduced page load times by 50%"
    ]
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "WebCraft Agency",
    location: "Seattle, WA",
    dates: "Jun 2016 - Feb 2018",
    type: "Full-time",
    description: [
      "Built interactive UI components for various client websites",
      "Implemented responsive designs following best practices",
      "Worked with backend team to integrate frontend with APIs",
      "Optimized website performance and loading times",
      "Created custom WordPress themes and plugins"
    ],
    technologies: ["HTML/CSS", "JavaScript", "jQuery", "Bootstrap", "Sass", "WordPress"],
    achievements: [
      "Improved website speed by 40%",
      "Created 20+ custom themes",
      "Perfect accessibility scores"
    ]
  }
];

const FREELANCE_WORK = [
  {
    id: 4,
    title: "Freelance Full Stack Developer",
    company: "JBLinx Studio",
    location: "Remote",
    dates: "2019 - Present",
    type: "Freelance",
    description: [
      "Founded and operate independent development studio specializing in modern web applications",
      "Deliver end-to-end solutions for small to medium businesses",
      "Provide consulting services on technology stack selection and architecture",
      "Maintain long-term client relationships with ongoing support and feature development",
      "Specialize in React ecosystems and cloud deployment strategies"
    ],
    technologies: ["React", "TypeScript", "Node.js", "MongoDB", "AWS", "Vercel"],
    achievements: [
      "30+ successful projects delivered",
      "Average project rating: 4.9/5",
      "100% client retention rate"
    ]
  },
  {
    id: 5,
    title: "Technical Consultant",
    company: "Various Startups",
    location: "Remote",
    dates: "2020 - 2023",
    type: "Contract",
    description: [
      "Provided technical guidance for early-stage startups",
      "Conducted code reviews and architecture assessments",
      "Helped teams establish development workflows and best practices",
      "Advised on technology choices and scalability planning",
      "Mentored junior developers and provided training sessions"
    ],
    technologies: ["React", "Vue.js", "Node.js", "Python", "Docker", "AWS"],
    achievements: [
      "Consulted for 12 startups",
      "Improved development velocity by avg 35%",
      "Successful funding for 8/12 clients"
    ]
  }
];

const EDUCATION_CERTIFICATIONS = [
  {
    id: 6,
    title: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    location: "California, USA",
    dates: "2012 - 2016",
    type: "Education",
    description: "Graduated with honors (GPA: 3.8/4.0). Specialized in web development, data structures, and software engineering principles.",
    focus: ["Web Development", "Data Structures", "Software Engineering", "Database Systems"],
    achievements: ["Dean's List 2014-2016", "Outstanding Student Award", "Computer Science Society President"]
  },
  {
    id: 7,
    title: "AWS Solutions Architect",
    institution: "Amazon Web Services",
    location: "Online",
    dates: "2022",
    type: "Certification",
    description: "Comprehensive certification covering cloud architecture, security, and best practices for scalable applications.",
    focus: ["Cloud Architecture", "Security", "Scalability", "Cost Optimization"],
    achievements: ["Scored 890/1000", "Valid until 2025"]
  },
  {
    id: 8,
    title: "Full Stack Web Development Bootcamp",
    institution: "Tech Academy",
    location: "Seattle, WA",
    dates: "2016",
    type: "Certification",
    description: "Intensive 12-week bootcamp focused on modern web technologies and agile development practices.",
    focus: ["React", "Node.js", "MongoDB", "Agile Methodology"],
    achievements: ["Top 5% of cohort", "Capstone project featured", "Job placement within 2 weeks"]
  }
];

const Experience = () => {
  const [activeTab, setActiveTab] = useState("professional");
  const [selectedExperience, setSelectedExperience] = useState(PROFESSIONAL_EXPERIENCE[0]);

  const getTabData = () => {
    switch (activeTab) {
      case "freelance": return FREELANCE_WORK;
      case "education": return EDUCATION_CERTIFICATIONS;
      default: return PROFESSIONAL_EXPERIENCE;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Full-time": return <Building className="w-4 h-4 text-blue-500" />;
      case "Freelance": return <Users className="w-4 h-4 text-purple-500" />;
      case "Contract": return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "Education": return <Award className="w-4 h-4 text-orange-500" />;
      case "Certification": return <Award className="w-4 h-4 text-red-500" />;
      default: return <Building className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Freelance": return "bg-purple-100 text-purple-700 border-purple-200";
      case "Contract": return "bg-green-100 text-green-700 border-green-200";
      case "Education": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Certification": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-slate-300 via-gray-300 to-slate-400">
      <div className="section-container">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Professional Journey
        </h2>
        <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          My comprehensive professional experience across different roles, companies, and learning opportunities.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-lg mx-auto mb-8 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="professional" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Professional ({PROFESSIONAL_EXPERIENCE.length})
            </TabsTrigger>
            <TabsTrigger value="freelance" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Freelance ({FREELANCE_WORK.length})
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Education ({EDUCATION_CERTIFICATIONS.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
                  {getTabData().map((exp, index) => (
                    <button
                      key={exp.id}
                      className={`w-full text-left p-4 border-l-4 transition-all hover:bg-gray-50 ${
                        selectedExperience?.id === exp.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedExperience(exp)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-gray-900 text-sm">
                          {exp.company || exp.institution}
                        </div>
                        {getTypeIcon(exp.type)}
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{exp.title}</div>
                      <div className="text-xs text-gray-500">{exp.dates}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="lg:w-2/3">
                {selectedExperience && (
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {selectedExperience.title}
                        </h3>
                        <div className="flex items-center text-blue-600 font-semibold mb-2">
                          <Building className="w-5 h-5 mr-2" />
                          {selectedExperience.company || selectedExperience.institution}
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getTypeColor(selectedExperience.type)} font-medium`}
                      >
                        {selectedExperience.type}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mb-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {selectedExperience.dates}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {selectedExperience.location}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-gray-700 mb-4">
                        {Array.isArray(selectedExperience.description) 
                          ? selectedExperience.description[0] 
                          : selectedExperience.description}
                      </p>
                      
                      {Array.isArray(selectedExperience.description) && selectedExperience.description.length > 1 && (
                        <ul className="space-y-2">
                          {selectedExperience.description.slice(1).map((item, index) => (
                            <li key={index} className="flex items-start text-gray-700">
                              <span className="text-blue-500 mr-3 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    
                    {(selectedExperience.technologies || selectedExperience.focus) && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          {selectedExperience.technologies ? "Technologies Used" : "Focus Areas"}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(selectedExperience.technologies || selectedExperience.focus)?.map((tech) => (
                            <Badge key={tech} variant="secondary" className="bg-gray-100 text-gray-700">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedExperience.achievements && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Award className="w-4 h-4 mr-2 text-yellow-500" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {selectedExperience.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start text-gray-700">
                              <span className="text-yellow-500 mr-3 mt-1">★</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Experience;
