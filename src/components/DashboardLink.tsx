
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardLink = () => {
  const navigate = useNavigate();
  // Not showing "authenticated" status here for stealth.
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {/* Minimal gear button, accessible */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Dev dashboard"
        >
          <Settings className="h-5 w-5 text-muted-foreground hover:text-blue transition-colors" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-dark-400 border-dark-300">
        <DropdownMenuLabel>Admin Dashboard</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => {
            setOpen(false);
            navigate("/dashboard");
          }}
          className="cursor-pointer flex items-center"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Open Dashboard</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardLink;
