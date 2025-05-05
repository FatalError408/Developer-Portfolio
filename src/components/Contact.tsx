
import { useState, useEffect } from "react";
import { Send, Mail, MapPin, Phone, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAvailableForWork, setIsAvailableForWork] = useState(true);

  // Load availability status from localStorage
  useEffect(() => {
    const savedStatus = localStorage.getItem("availability_status");
    if (savedStatus) {
      setIsAvailableForWork(savedStatus === "available");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-dark-400">
      <div className="section-container">
        <h2 className="section-title">
          Get In <span className="text-gradient-blue">Touch</span>
        </h2>
        <p className="section-subtitle">
          Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          <div>
            <div className="card-highlight h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">Contact Information</h3>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={isAvailableForWork}
                    disabled={true}
                    id="available-mode"
                  />
                  <Badge variant={isAvailableForWork ? "default" : "outline"} className={isAvailableForWork ? "bg-green-500" : "text-muted-foreground"}>
                    {isAvailableForWork ? "Available for work" : "Currently unavailable"}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-dark-300 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <Mail className="text-blue h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">Email</h4>
                    <a 
                      href="mailto:BrendonLightfoot408@Gmail.com" 
                      className="text-muted-foreground hover:text-blue transition-colors"
                    >
                      BrendonLightfoot408@Gmail.com
                    </a>
                    <div className="mt-1">
                      <h4 className="text-sm font-medium">Company Email</h4>
                      <a 
                        href="mailto:ContactJBLinxStudio@Gmail.com" 
                        className="text-muted-foreground hover:text-blue transition-colors text-sm"
                      >
                        ContactJBLinxStudio@Gmail.com
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-dark-300 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <MapPin className="text-blue h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">Location</h4>
                    <p className="text-muted-foreground">
                      South Africa, Eastern Cape, Uitenhage, 6229
                    </p>
                    <p className="text-muted-foreground mt-1 flex items-center">
                      <Briefcase className="h-4 w-4 mr-1 text-blue" />
                      <span>Working Remotely</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-dark-300 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <Phone className="text-blue h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">Phone</h4>
                    <a 
                      href="tel:+27635242767" 
                      className="text-muted-foreground hover:text-blue transition-colors"
                    >
                      +27 63 524 2767
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="text-lg font-medium mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {[
                    { name: 'GitHub', url: 'https://github.com/JulianArtisan408' },
                    { name: 'LinkedIn', url: 'https://linkedin.com/in/julianartisan408' },
                    { name: 'Twitter', url: 'https://twitter.com/julianartisan408' }
                  ].map((platform) => (
                    <a 
                      key={platform.name} 
                      href={platform.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-dark-300 hover:bg-dark-200 px-4 py-2 rounded-md text-sm transition-colors"
                    >
                      {platform.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="card-highlight">
              <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-dark-300 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-dark-300 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-dark-300 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-dark-300 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent resize-none"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  className="button-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
