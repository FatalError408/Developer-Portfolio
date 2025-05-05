
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink, Code } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  languages_url: string;
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface LanguageData {
  [key: string]: number;
}

const GitHubRepositories = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [repoLanguages, setRepoLanguages] = useState<{[key: string]: LanguageData}>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        // Fetch org repos from JBLinx-Studio
        const response = await fetch('https://api.github.com/orgs/JBLinx-Studio/repos');
        
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        
        const data: Repository[] = await response.json();
        setRepositories(data);
        
        // Fetch languages for each repository
        const languagesPromises = data.map(async (repo) => {
          const langResponse = await fetch(repo.languages_url);
          if (!langResponse.ok) return null;
          const langData = await langResponse.json();
          return { repoId: repo.id, languages: langData };
        });
        
        const languagesResults = await Promise.all(languagesPromises);
        const languagesMap: {[key: string]: LanguageData} = {};
        
        languagesResults.forEach((result) => {
          if (result) {
            languagesMap[result.repoId] = result.languages;
          }
        });
        
        setRepoLanguages(languagesMap);
      } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        toast({
          title: "Error",
          description: "Failed to load GitHub repositories. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [toast]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const getLanguageColor = (language: string | null) => {
    const colors: {[key: string]: string} = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-600',
      Python: 'bg-green-500',
      Java: 'bg-orange-600',
      HTML: 'bg-red-600',
      CSS: 'bg-purple-600',
      'C#': 'bg-green-700',
      PHP: 'bg-indigo-600',
      Swift: 'bg-orange-500',
      Kotlin: 'bg-purple-700',
      Go: 'bg-blue-400',
      Ruby: 'bg-red-700',
      Rust: 'bg-orange-800',
      Dart: 'bg-blue-500',
    };
    
    return language ? colors[language] || 'bg-gray-500' : 'bg-gray-400';
  };
  
  // Calculate language percentages
  const getLanguagePercentages = (languages: LanguageData) => {
    if (!languages) return [];
    
    const total = Object.values(languages).reduce((sum, value) => sum + value, 0);
    
    return Object.entries(languages).map(([name, bytes]) => {
      const percentage = Math.round((bytes / total) * 100);
      return { name, percentage };
    }).sort((a, b) => b.percentage - a.percentage);
  };

  return (
    <section id="github" className="py-16 bg-dark-400">
      <div className="section-container">
        <h2 className="section-title">
          My <span className="text-gradient-blue">GitHub</span> Repositories
        </h2>
        <p className="section-subtitle">
          Explore my open-source projects and contributions from the JBLinx Studio organization.
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-dark-300 border-dark-200 overflow-hidden">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 bg-dark-100" />
                  <Skeleton className="h-4 w-full bg-dark-100 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full bg-dark-100" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-8 w-full bg-dark-100" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {repositories.length > 0 ? (
              repositories.map((repo) => (
                <motion.div key={repo.id} variants={itemVariants}>
                  <Card className="h-full bg-dark-300 border-dark-200 hover:border-blue/40 transition-colors overflow-hidden flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white text-xl font-medium">
                            {repo.name}
                          </CardTitle>
                          {repo.language && (
                            <div className="flex items-center mt-1">
                              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${getLanguageColor(repo.language)}`}></span>
                              <span className="text-sm text-gray-400">{repo.language}</span>
                            </div>
                          )}
                        </div>
                        <a href={repo.owner.avatar_url} target="_blank" rel="noopener noreferrer">
                          <img 
                            src={repo.owner.avatar_url} 
                            alt={repo.owner.login} 
                            className="w-8 h-8 rounded-full"
                          />
                        </a>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-gray-300 line-clamp-3">
                        {repo.description || "No description provided"}
                      </CardDescription>
                      
                      {/* Display language breakdown */}
                      {repoLanguages[repo.id] && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-400 mb-1 flex items-center">
                            <Code className="h-3 w-3 mr-1" /> Languages:
                          </p>
                          <div className="h-2 w-full bg-dark-400 rounded-full overflow-hidden flex">
                            {getLanguagePercentages(repoLanguages[repo.id]).map((lang, idx) => (
                              <TooltipProvider key={idx}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div 
                                      className={`h-full ${getLanguageColor(lang.name)}`}
                                      style={{ width: `${lang.percentage}%` }}
                                    ></div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{lang.name}: {lang.percentage}%</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                            {getLanguagePercentages(repoLanguages[repo.id]).slice(0, 3).map((lang, idx) => (
                              <span key={idx} className="text-xs text-gray-400 flex items-center">
                                <span className={`inline-block w-2 h-2 rounded-full mr-1 ${getLanguageColor(lang.name)}`}></span>
                                {lang.name} {lang.percentage}%
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {repo.topics && repo.topics.slice(0, 3).map((topic, index) => (
                          <Badge key={index} variant="secondary" className="bg-dark-100 text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-dark-200 pt-4">
                      <div className="flex justify-between w-full">
                        <div className="flex space-x-4">
                          <div className="flex items-center text-gray-400 text-sm">
                            <Star className="mr-1 h-4 w-4" />
                            <span>{repo.stargazers_count}</span>
                          </div>
                          <div className="flex items-center text-gray-400 text-sm">
                            <GitFork className="mr-1 h-4 w-4" />
                            <span>{repo.forks_count}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <a 
                            href={repo.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center text-blue hover:text-blue-light transition-colors"
                          >
                            <Github className="h-4 w-4 mr-1" />
                            <span className="text-sm">Code</span>
                          </a>
                          {repo.homepage && (
                            <a 
                              href={repo.homepage} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex items-center text-blue hover:text-blue-light transition-colors ml-3"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              <span className="text-sm">Live</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
                <Github className="h-12 w-12 text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No repositories found</h3>
                <p className="text-gray-400">
                  No GitHub repositories were found in the JBLinx Studio organization.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GitHubRepositories;
