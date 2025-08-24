import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { BriefcaseIcon, Building2, User, Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <BriefcaseIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">JobPortal</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <button onClick={() => navigate('/')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-base">
            Find Jobs
          </button>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-base">
            Companies
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-base">
            Resources
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>
                <Building2 className="h-4 w-4 mr-2" />
                For Employers
              </Button>
            </>
          )}
          <Button variant="default" size="sm" onClick={() => navigate('/admin')}>
            Post a Job
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;