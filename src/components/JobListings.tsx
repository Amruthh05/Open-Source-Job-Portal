import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import JobCard from "./JobCard";
import { Search, Filter, MapPin, Briefcase } from "lucide-react";

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Mock job data
  const jobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $160k",
      description: "We're looking for an experienced frontend developer to join our growing team. You'll work on cutting-edge web applications using React, TypeScript, and modern development tools.",
      posted: "2 days ago",
      tags: ["React", "TypeScript", "JavaScript", "CSS"]
    },
    {
      id: "2",
      title: "Product Manager",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      salary: "$90k - $130k",
      description: "Join our product team to drive strategy and execution for our flagship products. Experience with agile methodologies and user research is essential.",
      posted: "1 day ago",
      tags: ["Product Strategy", "Agile", "Analytics", "Leadership"]
    },
    {
      id: "3",
      title: "UI/UX Designer",
      company: "DesignStudio",
      location: "New York, NY",
      type: "Full-time",
      salary: "$80k - $110k",
      description: "Create beautiful and intuitive user experiences for web and mobile applications. Strong portfolio and experience with design systems required.",
      posted: "3 days ago",
      tags: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"]
    },
    {
      id: "4",
      title: "Backend Engineer",
      company: "DataFlow Solutions",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$100k - $140k",
      description: "Build scalable backend systems and APIs. Experience with cloud platforms and microservices architecture preferred.",
      posted: "1 week ago",
      tags: ["Node.js", "Python", "AWS", "Docker"]
    },
    {
      id: "5",
      title: "Marketing Specialist",
      company: "GrowthCo",
      location: "Chicago, IL",
      type: "Part-time",
      salary: "$50k - $70k",
      description: "Drive digital marketing campaigns and content strategy. Experience with SEO, social media, and analytics tools required.",
      posted: "5 days ago",
      tags: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"]
    },
    {
      id: "6",
      title: "Data Scientist",
      company: "AI Innovations",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$110k - $150k",
      description: "Apply machine learning and statistical analysis to solve complex business problems. PhD in relevant field preferred.",
      posted: "1 week ago",
      tags: ["Python", "Machine Learning", "Statistics", "SQL"]
    }
  ];

  const locations = ["All Locations", "San Francisco, CA", "Remote", "New York, NY", "Austin, TX", "Chicago, IL", "Boston, MA"];
  const jobTypes = ["All Types", "Full-time", "Part-time", "Contract", "Internship"];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = !selectedLocation || selectedLocation === "All Locations" || job.location === selectedLocation;
    const matchesType = !selectedType || selectedType === "All Types" || job.type === selectedType;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Job Opportunities</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover your next career move from thousands of job listings from top companies
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="lg:w-48">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="lg:w-48">
                <Briefcase className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Sort by:
            <Select defaultValue="recent">
              <SelectTrigger className="w-32 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="company">Company</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobListings;