import { Button } from "@/components/ui/button";
import { Search, User, BriefcaseIcon, Building2 } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <BriefcaseIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">JobPortal</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-base">
            Find Jobs
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-base">
            Companies
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-base">
            Resources
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
          <Button variant="outline" size="sm">
            <Building2 className="h-4 w-4 mr-2" />
            For Employers
          </Button>
          <Button variant="default" size="sm">
            Post a Job
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;