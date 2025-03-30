
const SKILL_CATEGORIES = [
  {
    name: "Frontend",
    skills: [
      { name: "HTML5/CSS3", level: 95 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "React", level: 90 },
      { name: "Next.js", level: 80 },
      { name: "Vue.js", level: 75 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "Python", level: 75 },
      { name: "Django", level: 70 },
      { name: "SQL", level: 80 },
      { name: "GraphQL", level: 75 },
      { name: "REST API Design", level: 85 },
    ],
  },
  {
    name: "Tools & Others",
    skills: [
      { name: "Git/GitHub", level: 90 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 70 },
      { name: "Testing (Jest/RTL)", level: 80 },
      { name: "CI/CD", level: 75 },
      { name: "Agile/Scrum", level: 85 },
      { name: "UI/UX Design", level: 70 },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-dark-500">
      <div className="section-container">
        <h2 className="section-title">
          Technical <span className="text-gradient-yellow">Skills</span>
        </h2>
        <p className="section-subtitle">
          I've worked with a wide range of technologies in the web development world. Here's an overview of my technical expertise.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.name} className="card-highlight">
              <h3 className="text-xl font-semibold mb-4 text-white">
                {category.name}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-dark-200 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-blue to-blue-light h-2.5 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 card-highlight p-8">
          <h3 className="text-2xl font-semibold mb-6">Languages & Frameworks I Love</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "JavaScript", "TypeScript", "React", "Node.js", 
              "Next.js", "Python", "Tailwind CSS", "Express", 
              "GraphQL", "MongoDB", "PostgreSQL", "AWS"
            ].map((tech) => (
              <div 
                key={tech} 
                className="bg-dark-300 rounded-lg p-3 text-center border border-dark-200 hover:border-blue/30 transition-all duration-300"
              >
                <span className="text-sm font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
