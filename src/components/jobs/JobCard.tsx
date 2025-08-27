import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary?: string;
    description?: string;
    tags?: string[];
    logo?: string;
    posted?: string;
  };
}

const JobCard = ({ job }: JobCardProps) => {
  const navigate = useNavigate();

  const getPostedDate = () => {
    if (!job.posted) return "Recently posted";
    const date = new Date(job.posted);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg leading-none tracking-tight">
              {job.title}
            </h3>
            <p className="text-sm text-muted-foreground">{job.company}</p>
          </div>
          {job.logo && (
            <img 
              src={job.logo} 
              alt={`${job.company} logo`} 
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{job.location}</span>
            <span>•</span>
            <span>{job.type}</span>
            {job.salary && (
              <>
                <span>•</span>
                <span className="font-medium text-foreground">{job.salary}</span>
              </>
            )}
          </div>
          
          {job.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {job.description}
            </p>
          )}
          
          {job.tags && job.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {job.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {job.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{job.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between pt-4">
        <span className="text-xs text-muted-foreground">
          {getPostedDate()}
        </span>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(`/job/${job.id}`)}
          >
            View Details
          </Button>
          <Button 
            size="sm"
            onClick={() => navigate(`/apply/${job.id}`)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Apply Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;