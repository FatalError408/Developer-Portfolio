
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Lock, Unlock, Settings, User, Edit } from "lucide-react";

// Components for different dashboard sections
import AvailabilitySection from "@/components/dashboard/AvailabilitySection";
import ProfileSection from "@/components/dashboard/ProfileSection";
import ProjectsSection from "@/components/dashboard/ProjectsSection";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const CORRECT_PASSWORD = "Jbl192168077"; // This should ideally be stored securely

  // Check if already authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem("dashboard_auth");
    if (authStatus === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        setIsAuthenticated(true);
        localStorage.setItem("dashboard_auth", "authenticated");
        toast({
          title: "Authentication successful",
          description: "Welcome to your dashboard, Brendon!",
        });
      } else {
        toast({
          title: "Authentication failed",
          description: "Incorrect password. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
      setPassword("");
    }, 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("dashboard_auth");
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-500 flex items-center justify-center">
        <div className="absolute inset-0 opacity-10 bg-noise mix-blend-overlay pointer-events-none"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 bg-dark-400/80 backdrop-blur-md rounded-xl border border-dark-200 shadow-2xl"
        >
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-dark-300/80 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-blue" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Dashboard Login</h1>
            <p className="text-muted-foreground mt-2">Enter your password to access the dashboard</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-dark-300 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  autoFocus
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full button-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : "Log In"}
              </Button>
              
              <div className="text-center">
                <button 
                  type="button" 
                  onClick={() => navigate("/")}
                  className="text-blue text-sm hover:underline mt-4"
                >
                  Return to Portfolio
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-500">
      <div className="absolute inset-0 opacity-10 bg-noise mix-blend-overlay pointer-events-none"></div>
      
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="bg-dark-400/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center mr-3">
              <Settings className="w-5 h-5 text-blue" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-muted-foreground text-sm">Manage your portfolio content</p>
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <span className="text-white hidden md:inline-block">
              <User className="inline-block w-4 h-4 mr-1" /> Brendon Julian Lightfoot
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout} 
              className="flex items-center"
            >
              <Unlock className="w-4 h-4 mr-1" /> Logout
            </Button>
            <Button 
              size="sm" 
              onClick={() => navigate("/")} 
              className="flex items-center"
            >
              View Portfolio
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="availability" className="bg-dark-400/50 backdrop-blur-sm rounded-xl border border-dark-200 p-4 md:p-6 shadow-xl">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="availability">Availability Status</TabsTrigger>
            <TabsTrigger value="profile">Profile Info</TabsTrigger>
            <TabsTrigger value="projects">Projects & Skills</TabsTrigger>
          </TabsList>
          
          <TabsContent value="availability" className="outline-none">
            <AvailabilitySection />
          </TabsContent>
          
          <TabsContent value="profile" className="outline-none">
            <ProfileSection />
          </TabsContent>
          
          <TabsContent value="projects" className="outline-none">
            <ProjectsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
