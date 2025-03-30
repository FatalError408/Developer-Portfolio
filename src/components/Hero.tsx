
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-dark-500">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20 bg-noise mix-blend-overlay pointer-events-none"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue/30 rounded-full filter blur-3xl opacity-20 animate-pulse-glow"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow/20 rounded-full filter blur-3xl opacity-20 animate-pulse-glow animation-delay-1000"></div>
      
      <div className="container mx-auto px-4 sm:px-6 z-10 pt-10 md:pt-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-7/12 animate-fade-in">
            <div className="inline-block px-3 py-1 rounded-full bg-dark-300 border border-dark-100 text-sm font-medium text-blue mb-6">
              Software Engineer
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4">
              Hi, I'm <span className="text-gradient-blue">John Doe</span>
              <span className="block mt-2">I build things for the web</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8">
              I specialize in creating modern, responsive websites and applications with cutting-edge technologies. Performance, accessibility, and user experience are my top priorities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="button-primary">
                View My Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button className="button-outline">
                Download Resume
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-3">
              <div className="text-sm text-muted-foreground">Tech Stack</div>
              <div className="h-px bg-dark-100 flex-grow"></div>
              <div className="flex gap-3">
                {['react', 'node', 'typescript', 'python'].map((tech) => (
                  <div 
                    key={tech} 
                    className="w-10 h-10 rounded-md flex items-center justify-center bg-dark-300 border border-dark-200"
                    title={tech}
                  >
                    <span className="text-xs font-mono opacity-80">{tech.charAt(0).toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-5/12 animate-fade-in animation-delay-300">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-dark-200 mx-auto">
                <div className="w-full h-full bg-gradient-to-br from-dark-300 to-dark-400 flex items-center justify-center">
                  <span className="text-6xl font-bold text-dark-100">JD</span>
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-dark-300 px-4 py-2 rounded-lg border border-dark-100 font-mono text-sm">
                <span className="text-blue">const</span> <span className="text-yellow">developer</span> = <span className="text-blue">true</span>;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
