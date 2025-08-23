import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BriefcaseIcon, Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BriefcaseIcon className="h-8 w-8" />
              <span className="text-xl font-bold">JobPortal</span>
            </div>
            <p className="text-primary-foreground/80">
              Connecting talented professionals with amazing opportunities. Your career journey starts here.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* For Job Seekers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Job Seekers</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-base">Browse Jobs</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-base">Career Advice</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-base">Resume Builder</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-base">Salary Guide</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-base">Job Alerts</a></li>
            </ul>
          </div>

          {/* For Employers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Employers</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-base">Post a Job</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-base">Browse Resumes</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-base">Recruitment Solutions</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-base">Pricing</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-base">Success Stories</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-primary-foreground/80">
              Get the latest job opportunities and career tips delivered to your inbox.
            </p>
            <div className="space-y-2">
              <Input 
                placeholder="Enter your email" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary" className="w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-primary-foreground/20 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-primary-foreground/80">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>contact@jobportal.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center text-primary-foreground/80">
          <p>&copy; 2024 JobPortal. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-foreground transition-base">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-base">Terms of Service</a>
            <a href="#" className="hover:text-primary-foreground transition-base">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;