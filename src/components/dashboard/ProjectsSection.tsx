
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Edit, Check } from "lucide-react";

const ProjectsSection = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("projects");
  const [isSaving, setIsSaving] = useState(false);
  
  // This would be expanded with actual project editing functionality
  // For now, we'll just show a placeholder with saving behavior
  
  const handleSaveChanges = () => {
    setIsSaving(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Changes Saved",
        description: `Your ${activeTab} have been updated successfully.`,
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Projects & Skills Management</h2>
        <Button 
          onClick={handleSaveChanges}
          disabled={isSaving}
          size="sm"
        >
          {isSaving ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            <span className="flex items-center">
              <Check className="mr-1 h-4 w-4" /> Save Changes
            </span>
          )}
        </Button>
      </div>

      <Card className="p-6 bg-dark-300/50 backdrop-blur-sm">
        <Tabs defaultValue="projects" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6 w-full sm:w-auto">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="outline-none">
            <div className="p-6 bg-dark-400/50 rounded-lg border border-dark-200 text-center">
              <div className="w-20 h-20 bg-dark-300/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit className="w-8 h-8 text-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Project Editor Coming Soon</h3>
              <p className="text-muted-foreground">
                This feature is under development. Soon you'll be able to add, edit, and remove projects directly from this dashboard.
              </p>
              <div className="mt-6">
                <Button disabled>Add New Project</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="skills" className="outline-none">
            <div className="p-6 bg-dark-400/50 rounded-lg border border-dark-200 text-center">
              <div className="w-20 h-20 bg-dark-300/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit className="w-8 h-8 text-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Skills Editor Coming Soon</h3>
              <p className="text-muted-foreground">
                This feature is under development. Soon you'll be able to add, edit, and manage your skills directly from this dashboard.
              </p>
              <div className="mt-6">
                <Button disabled>Add New Skill</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="experience" className="outline-none">
            <div className="p-6 bg-dark-400/50 rounded-lg border border-dark-200 text-center">
              <div className="w-20 h-20 bg-dark-300/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit className="w-8 h-8 text-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Experience Editor Coming Soon</h3>
              <p className="text-muted-foreground">
                This feature is under development. Soon you'll be able to add, edit, and manage your work experience directly from this dashboard.
              </p>
              <div className="mt-6">
                <Button disabled>Add New Experience</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
      
      <div className="bg-dark-400/50 border border-dark-200 rounded-lg p-4 text-sm text-muted-foreground">
        <p className="font-semibold mb-2">Note:</p>
        <p>These edits are currently only stored in your browser's local storage. In the future, changes will be saved to your GitHub repository automatically.</p>
      </div>
    </div>
  );
};

export default ProjectsSection;
