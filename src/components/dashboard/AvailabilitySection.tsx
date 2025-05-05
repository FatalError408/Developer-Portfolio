
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Check } from "lucide-react";

const AvailabilitySection = () => {
  const [isAvailableForWork, setIsAvailableForWork] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Load saved availability status
  useEffect(() => {
    const savedStatus = localStorage.getItem("availability_status");
    if (savedStatus) {
      setIsAvailableForWork(savedStatus === "available");
    }
  }, []);

  const handleSaveAvailability = () => {
    setIsSaving(true);
    
    // Save to localStorage
    localStorage.setItem("availability_status", isAvailableForWork ? "available" : "unavailable");
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Status Updated",
        description: `You are now marked as ${isAvailableForWork ? "available" : "unavailable"} for work.`,
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Work Availability Status</h2>
        <Button 
          onClick={handleSaveAvailability}
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
        <div className="flex flex-col space-y-6">
          <div>
            <p className="mb-4 text-muted-foreground">
              Control whether you're currently available for work opportunities. This status will be displayed throughout your portfolio.
            </p>
            
            <div className="flex items-center justify-between p-4 bg-dark-400/50 rounded-lg border border-dark-200">
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 text-blue mr-3" />
                <div>
                  <h3 className="font-medium">Work Status</h3>
                  <p className="text-sm text-muted-foreground">Are you currently available for new projects?</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Switch 
                  checked={isAvailableForWork}
                  onCheckedChange={setIsAvailableForWork}
                  id="available-mode"
                />
                <Badge variant={isAvailableForWork ? "default" : "outline"} className={isAvailableForWork ? "bg-green-500" : "text-muted-foreground"}>
                  {isAvailableForWork ? "Available for work" : "Currently unavailable"}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-dark-400/50 rounded-lg border border-dark-200">
            <h3 className="font-medium mb-2">Status will appear in:</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>About section</li>
              <li>Contact section</li>
              <li>Footer</li>
              <li>Hero section (when implemented)</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AvailabilitySection;
