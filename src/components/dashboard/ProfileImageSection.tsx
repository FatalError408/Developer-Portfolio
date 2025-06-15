
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Camera, Save, RotateCcw } from "lucide-react";

const ProfileImageSection = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [tempImageUrl, setTempImageUrl] = useState("");
  const { toast } = useToast();

  const defaultImageUrl = "https://photos.fife.usercontent.google.com/pw/AP1GczP1HwibmE7-e2Pq4WoVnZreEtPyeb6xXbB5xtuY1mypr72SA1sYs5yM=w696-h928-s-no-gm?authuser=0";

  useEffect(() => {
    const savedImageUrl = localStorage.getItem('profile_image_url') || defaultImageUrl;
    setImageUrl(savedImageUrl);
    setTempImageUrl(savedImageUrl);
  }, []);

  const handleSave = () => {
    if (tempImageUrl.trim()) {
      localStorage.setItem('profile_image_url', tempImageUrl);
      setImageUrl(tempImageUrl);
      
      // Trigger a custom event to update the Hero component
      window.dispatchEvent(new CustomEvent('profileImageUpdated', { detail: tempImageUrl }));
      
      toast({
        title: "Profile image updated",
        description: "Your profile image has been successfully updated.",
      });
    }
  };

  const handleReset = () => {
    setTempImageUrl(defaultImageUrl);
    localStorage.setItem('profile_image_url', defaultImageUrl);
    setImageUrl(defaultImageUrl);
    
    window.dispatchEvent(new CustomEvent('profileImageUpdated', { detail: defaultImageUrl }));
    
    toast({
      title: "Profile image reset",
      description: "Your profile image has been reset to the default.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Camera className="w-5 h-5 text-blue" />
        <h3 className="text-lg font-semibold text-white">Profile Image Management</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="imageUrl" className="text-white mb-2 block">
              Profile Image URL
            </Label>
            <Input
              id="imageUrl"
              type="url"
              value={tempImageUrl}
              onChange={(e) => setTempImageUrl(e.target.value)}
              placeholder="Enter image URL..."
              className="bg-dark-300 border-dark-200 text-white"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              onClick={handleSave}
              className="bg-blue hover:bg-blue/80 flex items-center"
              disabled={!tempImageUrl.trim() || tempImageUrl === imageUrl}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button 
              onClick={handleReset}
              variant="outline"
              className="border-yellow/30 text-yellow hover:bg-yellow/10 flex items-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Default
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p><strong>Note:</strong> Google Photos URLs may not work reliably due to authentication requirements.</p>
            <p><strong>Recommendation:</strong> Upload your image to a public image hosting service like Imgur, Cloudinary, or use a direct URL.</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center">
            <Label className="text-white mb-2 block">Preview</Label>
            <div className="w-32 h-32 mx-auto">
              <Avatar className="w-full h-full border-2 border-blue/30">
                <AvatarImage 
                  src={tempImageUrl} 
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-900 to-purple-900">
                  BJL
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          <div className="text-center">
            <Label className="text-white mb-2 block">Current (Live)</Label>
            <div className="w-24 h-24 mx-auto">
              <Avatar className="w-full h-full border-2 border-green-500/30">
                <AvatarImage 
                  src={imageUrl} 
                  alt="Current Profile"
                  className="w-full h-full object-cover"
                />
                <AvatarFallback className="text-lg bg-gradient-to-br from-blue-900 to-purple-900">
                  BJL
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileImageSection;
