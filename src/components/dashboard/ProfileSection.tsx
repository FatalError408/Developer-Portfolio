
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, Check, Edit } from "lucide-react";

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    name: "Brendon Julian Lightfoot",
    professionalName: "JulianArtisan408",
    email: "BrendonLightfoot408@Gmail.com",
    companyEmail: "ContactJBLinxStudio@Gmail.com",
    phone: "+27 63 524 2767",
    location: "South Africa, Eastern Cape, Uitenhage, 6229",
    workStatus: "Remote Worker",
    about: "I began my coding journey at the age of 14, tinkering with HTML and CSS to create simple websites. This early passion evolved into a career in software engineering after completing my Computer Science studies."
  });

  // Load saved profile data
  useEffect(() => {
    const savedProfile = localStorage.getItem("profile_data");
    if (savedProfile) {
      try {
        setProfileData(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Error parsing saved profile data", e);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    
    // Save to localStorage
    localStorage.setItem("profile_data", JSON.stringify(profileData));
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        {isEditing ? (
          <div className="space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveProfile}
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
        ) : (
          <Button 
            onClick={() => setIsEditing(true)}
            size="sm"
            className="flex items-center"
          >
            <Edit className="mr-1 h-4 w-4" /> Edit Profile
          </Button>
        )}
      </div>

      <Card className="p-6 bg-dark-300/50 backdrop-blur-sm">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-400 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                />
              ) : (
                <div className="flex items-center p-3 bg-dark-400/50 rounded-md border border-dark-200">
                  <User className="w-4 h-4 text-blue mr-2" />
                  <span>{profileData.name}</span>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Professional Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="professionalName"
                  value={profileData.professionalName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-400 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                />
              ) : (
                <div className="flex items-center p-3 bg-dark-400/50 rounded-md border border-dark-200">
                  <User className="w-4 h-4 text-blue mr-2" />
                  <span>{profileData.professionalName}</span>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-400 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                />
              ) : (
                <div className="flex items-center p-3 bg-dark-400/50 rounded-md border border-dark-200">
                  <Mail className="w-4 h-4 text-blue mr-2" />
                  <span>{profileData.email}</span>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Company Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="companyEmail"
                  value={profileData.companyEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-400 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                />
              ) : (
                <div className="flex items-center p-3 bg-dark-400/50 rounded-md border border-dark-200">
                  <Mail className="w-4 h-4 text-blue mr-2" />
                  <span>{profileData.companyEmail}</span>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-400 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                />
              ) : (
                <div className="flex items-center p-3 bg-dark-400/50 rounded-md border border-dark-200">
                  <Phone className="w-4 h-4 text-blue mr-2" />
                  <span>{profileData.phone}</span>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-400 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                />
              ) : (
                <div className="flex items-center p-3 bg-dark-400/50 rounded-md border border-dark-200">
                  <MapPin className="w-4 h-4 text-blue mr-2" />
                  <span>{profileData.location}</span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              About Me
            </label>
            {isEditing ? (
              <textarea
                name="about"
                value={profileData.about}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-dark-400 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
              />
            ) : (
              <div className="p-3 bg-dark-400/50 rounded-md border border-dark-200">
                <p>{profileData.about}</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileSection;
