import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import JobCard from "./JobCard";
import { supabase } from "@/integrations/supabase/client";
import { Search, Filter, MapPin, Briefcase } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  tags: string[];
  created_at: string;
}

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setJobs(data);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  // Fallback static job data if no jobs in database
  const staticJobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "Meta",
      location: "Menlo Park, CA",
      type: "Full-time",
      salary: "$150k - $220k",
      description: "Build scalable React applications serving billions of users. Work with cutting-edge technologies including React 18, TypeScript, and modern frontend tooling.",
      posted: "2 days ago",
      tags: ["React", "TypeScript", "JavaScript", "GraphQL", "Next.js"]
    },
    {
      id: "2",
      title: "Java Backend Developer",
      company: "Amazon",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$130k - $180k",
      description: "Design and develop high-performance Java applications and microservices. Experience with Spring Boot, AWS, and distributed systems required.",
      posted: "1 day ago",
      tags: ["Java", "Spring Boot", "AWS", "Microservices", "Kubernetes"]
    },
    {
      id: "3",
      title: "Full Stack Developer",
      company: "Google",
      location: "Mountain View, CA",
      type: "Full-time",
      salary: "$140k - $200k",
      description: "Build end-to-end web applications using modern technologies. Strong experience in both frontend and backend development required.",
      posted: "3 days ago",
      tags: ["React", "Node.js", "Python", "GCP", "TypeScript"]
    },
    {
      id: "4",
      title: "Backend Engineer - Python",
      company: "Netflix",
      location: "Los Gatos, CA",
      type: "Full-time",
      salary: "$160k - $230k",
      description: "Develop scalable backend systems for our streaming platform. Experience with Python, Django, and cloud infrastructure is essential.",
      posted: "1 week ago",
      tags: ["Python", "Django", "AWS", "Redis", "PostgreSQL"]
    },
    {
      id: "5",
      title: "DevOps Engineer",
      company: "Microsoft",
      location: "Redmond, WA",
      type: "Full-time",
      salary: "$120k - $170k",
      description: "Automate deployment pipelines and manage cloud infrastructure. Experience with Azure, Docker, and CI/CD tools required.",
      posted: "5 days ago",
      tags: ["Azure", "Docker", "Kubernetes", "Terraform", "CI/CD"]
    },
    {
      id: "6",
      title: "Mobile App Developer (iOS)",
      company: "Apple",
      location: "Cupertino, CA",
      type: "Full-time",
      salary: "$135k - $190k",
      description: "Develop native iOS applications using Swift and UIKit. Experience with SwiftUI and iOS frameworks preferred.",
      posted: "1 week ago",
      tags: ["Swift", "iOS", "UIKit", "SwiftUI", "Xcode"]
    },
    {
      id: "7",
      title: "Frontend Development Internship",
      company: "Spotify",
      location: "New York, NY",
      type: "Internship",
      salary: "$6k - $8k/month",
      description: "Join our frontend team to build user interfaces for our music streaming platform. Perfect opportunity for students to gain real-world experience.",
      posted: "2 days ago",
      tags: ["React", "JavaScript", "CSS", "HTML", "Git"]
    },
    {
      id: "8",
      title: "Backend Development Internship",
      company: "Uber",
      location: "San Francisco, CA",
      type: "Internship",
      salary: "$7k - $9k/month",
      description: "Work on backend services that power millions of rides daily. Learn about microservices, APIs, and distributed systems.",
      posted: "4 days ago",
      tags: ["Python", "Go", "REST APIs", "MySQL", "Docker"]
    },
    {
      id: "9",
      title: "Data Engineer",
      company: "Airbnb",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$145k - $195k",
      description: "Build and maintain data pipelines and analytics infrastructure. Experience with big data technologies and cloud platforms required.",
      posted: "3 days ago",
      tags: ["Python", "Spark", "Kafka", "AWS", "SQL"]
    },
    {
      id: "10",
      title: "React Native Developer",
      company: "Instagram",
      location: "Menlo Park, CA",
      type: "Full-time",
      salary: "$140k - $185k",
      description: "Develop cross-platform mobile applications using React Native. Help millions of users share their stories through code.",
      posted: "6 days ago",
      tags: ["React Native", "JavaScript", "iOS", "Android", "Redux"]
    },
    {
      id: "11",
      title: "Software Engineering Internship",
      company: "Tesla",
      location: "Palo Alto, CA",
      type: "Internship",
      salary: "$8k - $10k/month",
      description: "Contribute to software that powers the future of transportation. Work on embedded systems, web applications, or mobile apps.",
      posted: "1 day ago",
      tags: ["C++", "Python", "Embedded Systems", "Linux", "Git"]
    },
    {
      id: "12",
      title: "Cloud Solutions Architect",
      company: "IBM",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$125k - $165k",
      description: "Design and implement cloud solutions for enterprise clients. Deep knowledge of cloud platforms and enterprise architecture required.",
      posted: "1 week ago",
      tags: ["AWS", "Azure", "Cloud Architecture", "Enterprise", "Solutions"]
    },
    {
      id: "13",
      title: "Cybersecurity Engineer",
      company: "Cisco",
      location: "San Jose, CA",
      type: "Full-time",
      salary: "$130k - $175k",
      description: "Protect our network infrastructure and develop security solutions. Experience with security protocols and threat analysis essential.",
      posted: "2 days ago",
      tags: ["Cybersecurity", "Network Security", "Python", "Linux", "Firewalls"]
    },
    {
      id: "14",
      title: "Machine Learning Internship",
      company: "OpenAI",
      location: "San Francisco, CA",
      type: "Internship",
      salary: "$9k - $12k/month",
      description: "Work on cutting-edge AI research and development. Perfect for students passionate about machine learning and artificial intelligence.",
      posted: "3 days ago",
      tags: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "AI"]
    },
    {
      id: "15",
      title: "WordPress Developer",
      company: "Automattic",
      location: "Remote",
      type: "Full-time",
      salary: "$90k - $130k",
      description: "Develop and maintain WordPress themes and plugins. Join a fully distributed team working on the web's most popular CMS.",
      posted: "4 days ago",
      tags: ["WordPress", "PHP", "JavaScript", "MySQL", "Remote"]
    }
  ];

  const displayJobs = jobs.length > 0 ? jobs : staticJobs;
  
  const locations = ["All Locations", "Menlo Park, CA", "Seattle, WA", "Mountain View, CA", "Los Gatos, CA", "Redmond, WA", "Cupertino, CA", "New York, NY", "San Francisco, CA", "Palo Alto, CA", "Austin, TX", "San Jose, CA", "Remote"];
  const jobTypes = ["All Types", "Full-time", "Part-time", "Contract", "Internship"];

  const filteredJobs = displayJobs.filter(job => {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">IT Jobs & Internships</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find your next opportunity in technology - from frontend to backend, mobile to cloud, and everything in between
          </p>
        </div>

        {/* Filters - Enhanced responsive design */}
        <Card className="p-4 md:p-6 mb-8">
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
            
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full sm:w-48">
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
                <SelectTrigger className="w-full sm:w-48">
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
              
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {loading ? 'Loading jobs...' : `Showing ${filteredJobs.length} of ${displayJobs.length} jobs`}
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

        {/* Job Grid - Enhanced responsiveness */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mb-12">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-64 animate-pulse">
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-muted rounded"></div>
                    <div className="h-2 bg-muted rounded w-5/6"></div>
                  </div>
                </div>
              </Card>
            ))
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No jobs found matching your criteria</p>
              <p className="text-muted-foreground text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          )}
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