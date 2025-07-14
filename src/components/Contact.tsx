import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, Briefcase, Github, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/JulianArtisan408',
      icon: <Github className="w-5 h-5" />,
      color: "hover:bg-gray-800 hover:text-white"
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/in/julianartisan408',
      icon: <Linkedin className="w-5 h-5" />,
      color: "hover:bg-blue-600 hover:text-white"
    },
    { 
      name: 'Twitter', 
      url: 'https://twitter.com/julianartisan408',
      icon: <Twitter className="w-5 h-5" />,
      color: "hover:bg-blue-400 hover:text-white"
    }
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      primary: "BrendonLightfoot408@Gmail.com",
      secondary: "ContactJBLinxStudio@Gmail.com",
      href: "mailto:BrendonLightfoot408@Gmail.com",
      color: "text-blue-500"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      primary: "+27 63 524 2767",
      secondary: "Available 9 AM - 6 PM (SAST)",
      href: "tel:+27635242767",
      color: "text-green-500"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      primary: "Uitenhage, Eastern Cape",
      secondary: "South Africa, 6229",
      href: null,
      color: "text-purple-500"
    }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Get In <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Touch</span>
              </h2>
              <Badge 
                variant={isAvailableForWork ? "default" : "outline"} 
                className={`${isAvailableForWork ? "bg-green-500 text-white" : "text-muted-foreground"} px-3 py-1`}
              >
                <div className="w-2 h-2 bg-current rounded-full animate-pulse mr-2"></div>
                {isAvailableForWork ? "Available for work" : "Currently unavailable"}
              </Badge>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you. 
              Let's create something amazing together.
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-6 h-6 text-primary" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className={`p-2 rounded-lg bg-card ${item.color}`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        {item.href ? (
                          <a 
                            href={item.href}
                            className="text-primary hover:text-primary/80 transition-colors font-medium"
                          >
                            {item.primary}
                          </a>
                        ) : (
                          <p className="font-medium">{item.primary}</p>
                        )}
                        <p className="text-sm text-muted-foreground mt-1">{item.secondary}</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Work Status */}
                  <motion.div
                    className="flex items-start gap-4 p-4 rounded-lg bg-background/50"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-2 rounded-lg bg-card text-orange-500">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Work Status</h4>
                      <p className="font-medium">Working Remotely</p>
                      <p className="text-sm text-muted-foreground mt-1">Open to freelance & full-time opportunities</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="border-accent/20 bg-accent/5">
                <CardHeader>
                  <CardTitle>Follow Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {socialLinks.map((platform) => (
                      <motion.a
                        key={platform.name}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg bg-background/50 transition-all duration-300 ${platform.color}`}
                        whileHover={{ y: -5, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {platform.icon}
                        <span className="text-sm font-medium">{platform.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="w-6 h-6 text-primary" />
                    Send Me a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Your Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="bg-background/50 border-border/50 focus:border-primary"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Your Email *
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="bg-background/50 border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Project Collaboration"
                        className="bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell me about your project..."
                        className="bg-background/50 border-border/50 focus:border-primary resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="flex items-center gap-2"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </motion.div>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;