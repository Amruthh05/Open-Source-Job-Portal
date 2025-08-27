import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">JobPortal</h3>
            <p className="text-muted-foreground text-sm">
              Find your dream job or the perfect candidate. Connect talent with opportunity.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">For Job Seekers</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-foreground">Browse Jobs</a>
              <a href="#" className="block text-muted-foreground hover:text-foreground">Career Advice</a>
              <a href="#" className="block text-muted-foreground hover:text-foreground">Resume Builder</a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">For Employers</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-foreground">Post a Job</a>
              <a href="#" className="block text-muted-foreground hover:text-foreground">Find Candidates</a>
              <a href="#" className="block text-muted-foreground hover:text-foreground">Employer Solutions</a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">Get the latest job opportunities in your inbox.</p>
            <div className="flex space-x-2">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 JobPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;