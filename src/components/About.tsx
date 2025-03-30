
import { Code, Briefcase, Trophy } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-dark-400">
      <div className="section-container">
        <h2 className="section-title">
          About <span className="text-gradient-blue">Me</span>
        </h2>
        <p className="section-subtitle">
          I'm a passionate software engineer with a focus on creating efficient, scalable, and user-friendly applications.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="card-highlight group">
            <div className="bg-dark-400 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue/10 transition-colors">
              <Code className="text-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Full Stack Developer</h3>
            <p className="text-muted-foreground">
              I craft responsive and performant web applications with modern JavaScript frameworks and backend technologies.
            </p>
          </div>
          
          <div className="card-highlight group">
            <div className="bg-dark-400 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue/10 transition-colors">
              <Briefcase className="text-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">5+ Years Experience</h3>
            <p className="text-muted-foreground">
              I've worked on a diverse range of projects, from small startups to large enterprise applications.
            </p>
          </div>
          
          <div className="card-highlight group">
            <div className="bg-dark-400 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue/10 transition-colors">
              <Trophy className="text-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Problem Solver</h3>
            <p className="text-muted-foreground">
              I enjoy tackling complex challenges and finding elegant solutions that balance technical and user needs.
            </p>
          </div>
        </div>
        
        <div className="mt-16">
          <div className="card-highlight">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
                <p className="text-muted-foreground mb-4">
                  I began my coding journey at the age of 14, tinkering with HTML and CSS to create simple websites. This early passion evolved into a career in software engineering after completing my Computer Science degree.
                </p>
                <p className="text-muted-foreground">
                  Over the years, I've worked with startups and established companies, building everything from e-commerce platforms to complex enterprise systems. I'm constantly learning and adapting to new technologies to deliver the best solutions.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-4">What I Do</h3>
                <ul className="space-y-3">
                  {[
                    "Building responsive and accessible web applications",
                    "Developing RESTful and GraphQL APIs",
                    "Implementing database design and optimization",
                    "Creating custom UI/UX components and animations",
                    "Optimizing applications for maximum performance",
                    "Mentoring junior developers and conducting code reviews"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
