
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CODE_SNIPPETS = [
  "const portfolio = { skills: 'unlimited' }",
  "function createMagic() { return innovation; }",
  "while(coding) { dreams.push(reality); }",
  "import { creativity } from 'imagination';",
  "class Developer extends Human { solve() }",
  "let passion = true; // always",
  "async function buildFuture() { await success; }",
  "console.log('Hello, World!');",
  "return bestPractices && cleanCode;",
  "{ experience: years++, learning: never.stop }",
  "if(idea) { makeItReal(); }",
  "export default AmazingProjects;",
  "npm install --save dedication",
  "git commit -m 'Level up'",
  "sudo make me_a_sandwich",
  "// TODO: Change the world",
  "boolean isAwesome = true;",
  "SELECT * FROM possibilities;",
];

const SYMBOLS = ["<", ">", "{", "}", "[", "]", "(", ")", ";", ":", "=", "+", "-", "*", "/", "&", "|", "!", "?", "#", "$", "%"];

interface CodeElement {
  id: number;
  content: string;
  x: number;
  y: number;
  opacity: number;
  fontSize: number;
  duration: number;
  delay: number;
  type: 'snippet' | 'symbol';
}

const AnimatedCodeBackground = () => {
  const [elements, setElements] = useState<CodeElement[]>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements: CodeElement[] = [];
      
      // Generate code snippets
      for (let i = 0; i < 12; i++) {
        newElements.push({
          id: i,
          content: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: Math.random() * 0.4 + 0.1,
          fontSize: Math.random() * 6 + 10,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 5,
          type: 'snippet'
        });
      }
      
      // Generate symbols
      for (let i = 12; i < 35; i++) {
        newElements.push({
          id: i,
          content: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: Math.random() * 0.3 + 0.05,
          fontSize: Math.random() * 15 + 12,
          duration: Math.random() * 25 + 10,
          delay: Math.random() * 8,
          type: 'symbol'
        });
      }
      
      setElements(newElements);
    };

    generateElements();
    
    // Regenerate elements periodically
    const interval = setInterval(generateElements, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute font-mono select-none ${
            element.type === 'snippet' 
              ? 'text-gray-700 whitespace-nowrap' 
              : 'text-gray-600 font-bold'
          }`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.fontSize}px`,
            opacity: element.opacity,
          }}
          initial={{ 
            opacity: 0,
            scale: 0.8,
            rotate: Math.random() * 20 - 10
          }}
          animate={{ 
            opacity: element.opacity,
            scale: 1,
            rotate: 0,
            y: [0, -20, 0, 10, 0],
            x: [0, 5, -5, 0],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        >
          {element.content}
        </motion.div>
      ))}
      
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default AnimatedCodeBackground;
