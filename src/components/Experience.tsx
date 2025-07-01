
import { useState } from "react";
import { Calendar, MapPin, Building, GraduationCap, Code, Award, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PROFESSIONAL_EXPERIENCE = [
  {
    id: 1,
    title: "Founder and Creative Entrepreneur",
    company: "JBLinx Studio (Self-employed)",
    location: "South Africa",
    dates: "2018-Present",
    type: "professional",
    description: [
      "Established and managed an independent creative studio, with a focus on digital art, software game applications, 3D models, eBook's, articles and integration of AI technology for automated work processes",
      "Showcased artistic talent and technical expertise through visually stunning and immersive game applications and digital artwork",
      "Leveraged various online platforms, including Etsy, ArtStation, and Itch.io, to market and sell products to a global audience",
      "Built a strong online presence through social media marketing and collaborations with influencers, expanding brand recognition",
      "Actively sought out and collaborated with clients on custom commissions, delivering personalized and captivating visual experiences"
    ],
    technologies: ["Unity", "Unreal Engine", "Blender", "C#", "Python", "AI Integration", "Digital Marketing"],
    achievements: [
      "Successfully launched multiple indie games with dedicated player bases",
      "Secured funding and led team in creating innovative software products",
      "Established profitable e-commerce operations selling digital products",
      "Received industry recognition for outstanding game development",
      "Published collection of e-books on technical and business topics"
    ]
  },
  {
    id: 2,
    title: "Electrical Technician",
    company: "A&D Power Analog and Digital Electronics CC",
    location: "South Africa",
    dates: "2016-2018",
    type: "professional",
    description: [
      "Demonstrated proficiency in handling electrical components and conducting thorough testing to ensure quality and reliability",
      "Collaborated with cross-functional teams to troubleshoot technical issues and optimize production processes",
      "Maintained high standards of safety and precision in electrical component testing and assembly"
    ],
    technologies: ["Electrical Testing", "Component Analysis", "Quality Assurance", "Team Collaboration"],
    achievements: [
      "Improved testing processes efficiency by 25%",
      "Maintained 99.5% quality standards in component testing",
      "Contributed to process optimization initiatives"
    ]
  }
];

const EDUCATION_CERTIFICATIONS = [
  {
    id: 1,
    title: "Higher Certificate in Information Systems and Software Engineering",
    company: "CTI (Computer Training Institute)",
    location: "Port Elizabeth, South Africa",
    dates: "2018-2020",
    type: "education",
    description: [
      "Comprehensive software engineering program focusing on modern development practices and methodologies",
      "Specialized in software development, system design, and project management",
      "Completed advanced coursework in programming, database management, and software architecture"
    ],
    technologies: ["Software Engineering", "System Design", "Database Management", "Project Management"],
    achievements: [
      "Completed comprehensive software engineering curriculum",
      "Developed strong foundation in modern programming practices",
      "Applied learning to real-world project implementations"
    ]
  },
  {
    id: 2,
    title: "High School Matriculation Certificate",
    company: "DF Malherbe High School",
    location: "Port Elizabeth, South Africa",
    dates: "2010-2014",
    type: "education",
    description: [
      "Completed high school education with focus on technology and business subjects",
      "Specialized in Computer Applications Technology (CAT) and Information Technology (IT)",
      "Strong foundation in Business Studies providing entrepreneurial knowledge"
    ],
    technologies: ["Computer Applications", "Information Technology", "Business Studies"],
    achievements: [
      "Graduated with Matriculation Certificate in 2014",
      "Excelled in technology-focused subjects",
      "Built foundation for future software engineering studies"
    ]
  },
  {
    id: 3,
    title: "Online Courses",
    company: "Codecademy",
    location: "Online",
    dates: "2015-Ongoing",
    type: "certification",
    description: [
      "Continuous professional development through online programming courses",
      "Advanced skills in web development, game development, and software engineering",
      "Stay current with latest technologies and industry best practices"
    ],
    technologies: ["Web Development", "Programming", "Software Engineering", "Continuous Learning"],
    achievements: [
      "Completed multiple advanced programming courses",
      "Maintained continuous learning and skill development",
      "Applied new technologies to professional projects"
    ]
  }
];

const ALL_EXPERIENCES = [...PROFESSIONAL_EXPERIENCE, ...EDUCATION_CERTIFICATIONS];

const Experience = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const getFilteredExperiences = () => {
    switch (activeTab) {
      case "professional": return PROFESSIONAL_EXPERIENCE;
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
      education: "text-green-400",
    };
    return colors[tab] || "text-gray-400";
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "professional": return <Building className="w-4 h-4 mr-1" />;
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
          A journey through my professional experience as a creative entrepreneur and my educational background in software engineering.
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-xl mx-auto mb-8 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="all" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              All ({ALL_EXPERIENCES.length})
            </TabsTrigger>
            <TabsTrigger value="professional" className={`data-[state=active]:bg-blue-600 data-[state=active]:text-white ${getTabColor('professional')}`}>
              Professional ({PROFESSIONAL_EXPERIENCE.length})
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
                      <span className="text-sm font-medium">{item.company}</span>
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
                            • {desc}
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
                        <h4 className="text-md font-semibold text-gray-800 mb-2">Key Achievements:</h4>
                        <ul>
                          {item.achievements.slice(0, isExpanded(item.id) ? undefined : 3).map((achievement, index) => (
                            <li key={index} className="text-gray-700 text-sm mb-1">
                              • {achievement}
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
