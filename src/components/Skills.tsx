
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScrollRevealWrapper from './ScrollRevealWrapper';
import { CodeIcon, BrainCircuitIcon, ServerIcon, PaletteIcon, WrenchIcon } from 'lucide-react';

const Skills = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [konami, setKonami] = useState<string[]>([]);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  // Optimized Konami code handler with single event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only check if we're not already showing the easter egg
      if (showEasterEgg) return;
      
      const newKonami = [...konami, e.key];
      if (newKonami.length > konamiCode.length) {
        newKonami.shift();
      }
      setKonami(newKonami);
      
      // Check for Konami code match
      if (newKonami.length === konamiCode.length && 
          newKonami.every((key, i) => key === konamiCode[i])) {
        setShowEasterEgg(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konami, showEasterEgg]);

  const frontendSkills = [
    'React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Redux Toolkit', 'React Query'
  ];
  
  const backendSkills = [
    'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'GraphQL', 'RESTful APIs', 'Firebase'
  ];
  
  const aiSkills = [
    'Machine Learning', 'PyTorch', 'TensorFlow', 'Langchain', 'Hugging Face', 'LLMs', 'Prompt Engineering'
  ];
  
  const devopsSkills = [
    'CI/CD', 'Docker', 'Git', 'GitHub Actions', 'AWS', 'Vercel', 'Netlify'
  ];
  
  const designSkills = [
    'Figma', 'UI Design', 'Responsive Design', 'Design Systems', 'Accessibility', 'User Experience'
  ];

  return (
    <section id="skills" className="py-16 bg-dark-400/30">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2">Expertise</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A focused collection of technologies and frameworks I specialize in
            </p>
          </div>
        </ScrollRevealWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScrollRevealWrapper delay={0.1}>
            <SkillCard 
              title="Frontend Development" 
              skills={frontendSkills}
              icon={<CodeIcon className="w-5 h-5" />}
            />
          </ScrollRevealWrapper>
          
          <ScrollRevealWrapper delay={0.2}>
            <SkillCard 
              title="Backend Development" 
              skills={backendSkills}
              icon={<ServerIcon className="w-5 h-5" />}
            />
          </ScrollRevealWrapper>
          
          <ScrollRevealWrapper delay={0.3}>
            <SkillCard 
              title="AI & Machine Learning" 
              skills={aiSkills}
              icon={<BrainCircuitIcon className="w-5 h-5" />}
            />
          </ScrollRevealWrapper>
          
          <ScrollRevealWrapper delay={0.4}>
            <SkillCard 
              title="DevOps & Deployment" 
              skills={devopsSkills}
              icon={<WrenchIcon className="w-5 h-5" />}
            />
          </ScrollRevealWrapper>
          
          <ScrollRevealWrapper delay={0.5}>
            <SkillCard 
              title="Design & UX" 
              skills={designSkills}
              icon={<PaletteIcon className="w-5 h-5" />}
            />
          </ScrollRevealWrapper>
          
          {showEasterEgg && (
            <ScrollRevealWrapper delay={0.3}>
              <MatrixSkillCard />
            </ScrollRevealWrapper>
          )}
        </div>
        
        {/* Hidden Easter Egg - Only visible in source code */}
        <div className="hidden">
          {/* 
            You found a hidden message! This portfolio has several easter eggs. 
            Keep exploring and see what else you can discover.
            
            Hint: Try the Konami code on your keyboard: ↑ ↑ ↓ ↓ ← → ← → B A
          */}
        </div>
      </div>
    </section>
  );
};

// Extracted components for better performance
const SkillCard = ({ title, skills, icon }: { title: string, skills: string[], icon: React.ReactNode }) => (
  <Card className="hover:border-blue/50 transition-all">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2 text-xl">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge 
            key={index} 
            variant="secondary" 
            className="bg-dark-300 hover:bg-dark-200 transition-colors"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Matrix Easter Egg Component
const MatrixSkillCard = () => {
  const matrixSkills = [
    'The Matrix', 'Reality Bending', 'Code Manipulation', 'Simulation Hacking', 
    'Digital Kung Fu', 'Red Pill', 'Bullet Time', 'Agent Avoidance'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-green-500/50 bg-dark-400/80 shadow-lg shadow-green-900/30">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-xl text-green-500">
            <span className="font-mono">01</span>
            <span>Matrix Expertise</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {matrixSkills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline"
                className="border-green-500/50 text-green-400 hover:bg-green-900/20 transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Skills;
