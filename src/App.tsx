
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

// Initialize React Query client
const queryClient = new QueryClient();

// Add console logging to help debug GitHub Pages deployment
console.log("App initializing with basename for GitHub Pages");
console.log("Current URL:", window.location.href);
console.log("Current pathname:", window.location.pathname);
console.log("Current hash:", window.location.hash);

// Debug component to help troubleshoot routing
const DebugInfo = () => {
  useEffect(() => {
    console.log("Debug component mounted, React is working!");
  }, []);
  
  return null; // This component doesn't render anything
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <DebugInfo />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
