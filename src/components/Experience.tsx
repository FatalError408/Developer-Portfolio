import { useState } from "react";
import { Calendar, MapPin, Building, GraduationCap, Code, Award, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PROFESSIONAL_EXPERIENCE = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    dates: "2021-Present",
    type: "professional",
    description: [
      "Led the development of a scalable e-commerce platform using microservices architecture",
      "Implemented advanced analytics and real-time inventory management systems",
      "Managed a team of 5 engineers, ensuring high-quality code and on-time delivery"
    ],
    technologies: ["React", "Node.js", "MongoDB", "AWS", "Docker", "Kubernetes"],
    achievements: [
      "Improved system scalability by 40%",
      "Reduced deployment time by 60%",
      "Implemented real-time inventory tracking"
    ]
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "DataSphere Solutions",
    location: "New York, NY",
    dates: "2019-2021",
    type: "professional",
    description: [
      "Designed and built a comprehensive project management platform with Kanban boards",
      "Integrated real-time collaboration features using Socket.io and Redis",
      "Developed advanced reporting features for enterprise clients"
    ],
    technologies: ["Vue.js", "Express", "PostgreSQL", "Socket.io", "Redis", "GraphQL"],
    achievements: [
      "Supported 500+ concurrent users",
      "Integrated with 15+ third-party APIs",
      "Achieved 99.9% uptime"
    ]
  }
];

const FREELANCE_EXPERIENCE = [
  {
    id: 3,
    title: "Full-Stack Web Developer",
    company: "Freelance",
    location: "Remote",
    dates: "2018-Present",
    type: "freelance",
    description: [
      "Developed custom web applications for various clients, including e-commerce sites and SaaS platforms",
      "Provided ongoing maintenance and support for existing web applications",
      "Collaborated with designers and project managers to deliver high-quality solutions"
    ],
    technologies: ["React", "Node.js", "JavaScript", "HTML", "CSS", "WordPress"],
    achievements: [
      "Increased client satisfaction by 90%",
      "Delivered projects on time and within budget",
      "Received positive feedback for code quality and communication"
    ]
  },
  {
    id: 4,
    title: "Web Development Consultant",
    company: "Consulting",
    location: "Remote",
    dates: "2022-Present",
    type: "freelance",
    description: [
      "Provided expert advice and guidance to clients on web development best practices",
      "Conducted code reviews and performance audits to identify areas for improvement",
      "Developed and delivered training programs on web development technologies"
    ],
    technologies: ["React", "Node.js", "JavaScript", "Performance Optimization", "Security"],
    achievements: [
      "Improved website performance by 50%",
      "Reduced security vulnerabilities by 75%",
      "Increased client knowledge and skills in web development"
    ]
  }
];

const EDUCATION_CERTIFICATIONS = [
  {
    id: 1,
    title: "Computer Science Degree",
    company: "University of Technology", // Changed from institution to company
    location: "California, USA",
    dates: "2018-2022",
    type: "education",
    description: [
      "Bachelor's degree in Computer Science with focus on Software Engineering", // Changed from focus to description array
      "Specialized in web development, algorithms, and database systems",
      "Graduated Magna Cum Laude with 3.8 GPA"
    ],
    technologies: ["Java", "Python", "C++", "JavaScript", "SQL", "Data Structures"],
    achievements: [
      "Dean's List for 6 consecutive semesters",
      "Led university hackathon team to first place",
      "Published research paper on web optimization"
    ]
  },
  {
    id: 2,
    title: "AWS Certified Solutions Architect",
    company: "Amazon Web Services", // Changed from institution to company
    location: "Online",
    dates: "2023",
    type: "certification",
    description: [
      "Professional certification demonstrating expertise in AWS cloud architecture", // Changed from focus to description array
      "Covers designing distributed systems on AWS platform",
      "Validates knowledge of security, scalability, and cost optimization"
    ],
    technologies: ["AWS", "EC2", "S3", "Lambda", "CloudFormation", "VPC"],
    achievements: [
      "Scored 920/1000 on certification exam",
      "Completed advanced cloud architecture projects",
      "Recognized as AWS community contributor"
    ]
  }
];

const ALL_EXPERIENCES = [...PROFESSIONAL_EXPERIENCE, ...FREELANCE_EXPERIENCE, ...EDUCATION_CERTIFICATIONS];

const Experience = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const getFilteredExperiences = () => {
    switch (activeTab) {
      case "professional": return PROFESSIONAL_EXPERIENCE;
      case "freelance": return FREELANCE_EXPERIENCE;
      case "education": return EDUCATION_CERTIFICATIONS;
      default: return ALL_EXPERIENCES;
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isExpanded = (id: number) => expandedItems.includes(id);

  const getTabColor = (tab: string) => {
    const colors = {
      professional: "text-blue-400",
      freelance: "text-purple-400",
      education: "text-green-400",
    };
    return colors[tab] || "text-gray-400";
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "professional": return <Building className="w-4 h-4 mr-1" />;
      case "freelance": return <Code className="w-4 h-4 mr-1" />;
      case "education": return <GraduationCap className="w-4 h-4 mr-1" />;
      case "certification": return <Award className="w-4 h-4 mr-1" />;
      default: return null;
    }
  };

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-slate-300 via-gray-300 to-slate-400">
      <div className="section-container">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          My Experience & Education
        </h2>
        <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          A detailed overview of my professional journey, freelance projects, and academic achievements.
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto mb-8 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="all" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              All ({ALL_EXPERIENCES.length})
            </TabsTrigger>
            <TabsTrigger value="professional" className={`data-[state=active]:bg-blue-600 data-[state=active]:text-white ${getTabColor('professional')}`}>
              Professional ({PROFESSIONAL_EXPERIENCE.length})
            </TabsTrigger>
            <TabsTrigger value="freelance" className={`data-[state=active]:bg-purple-600 data-[state=active]:text-white ${getTabColor('freelance')}`}>
              Freelance ({FREELANCE_EXPERIENCE.length})
            </TabsTrigger>
            <TabsTrigger value="education" className={`data-[state=active]:bg-green-600 data-[state=active]:text-white ${getTabColor('education')}`}>
              Education ({EDUCATION_CERTIFICATIONS.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-8">
            <div className="grid grid-cols-1 gap-8">
              {getFilteredExperiences().map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {item.dates}
                      </div>
                    </div>

                    <div className="flex items-center mb-3 text-gray-600">
                      {getIconForType(item.type)}
                      <span className="text-sm">{item.company}</span>
                    </div>

                    <div className="flex items-center mb-3 text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{item.location}</span>
                    </div>

                    <p className="text-gray-700 text-sm mb-4">
                      {item.description[0]}
                    </p>

                    {item.description.length > 1 && (
                      <div className="mb-4">
                        {item.description.slice(1, isExpanded(item.id) ? undefined : 3).map((desc, index) => (
                          <p key={index} className="text-gray-700 text-sm mb-1">
                            - {desc}
                          </p>
                        ))}
                        {item.description.length > 3 && !isExpanded(item.id) && (
                          <p className="text-gray-700 text-sm">...</p>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs border-gray-300 text-gray-600">
                          {tech}
                        </Badge>
                      ))}
                      {item.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                          +{item.technologies.length - 4}
                        </Badge>
                      )}
                    </div>

                    {item.achievements && item.achievements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-md font-semibold text-gray-800 mb-2">Achievements:</h4>
                        <ul>
                          {item.achievements.slice(0, isExpanded(item.id) ? undefined : 3).map((achievement, index) => (
                            <li key={index} className="text-gray-700 text-sm mb-1">
                              - {achievement}
                            </li>
                          ))}
                          {item.achievements.length > 3 && !isExpanded(item.id) && (
                            <li className="text-gray-700 text-sm">...</li>
                          )}
                        </ul>
                      </div>
                    )}

                    {item.description.length > 3 || (item.achievements && item.achievements.length > 3) ? (
                      <Button
                        variant="secondary"
                        onClick={() => toggleExpand(item.id)}
                        className="w-full justify-center"
                      >
                        {isExpanded(item.id) ? (
                          <>
                            Show Less <ChevronUp className="ml-2 h-4 w-4" />
                          </>
                        ) : (
                          <>
                            Show More <ChevronDown className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Experience;
