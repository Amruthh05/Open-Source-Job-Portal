import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Clock, DollarSign, Bookmark } from "lucide-react";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    posted: string;
    tags: string[];
    logo?: string;
  };
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-slow border-border hover:border-primary/20 h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
              {job.logo ? (
                <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain" />
              ) : (
                <Building2 className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-base truncate">
                {job.title}
              </h3>
              <p className="text-muted-foreground text-sm truncate">{job.company}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-base flex-shrink-0">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4 flex-1">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{job.location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{job.type}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{job.salary}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {job.description}
          </p>
          
          <div className="flex flex-wrap gap-1.5">
            {job.tags.slice(0, 4).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                {tag}
              </Badge>
            ))}
            {job.tags.length > 4 && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{job.tags.length - 4} more
              </Badge>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground">
            Posted {job.posted}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 mt-auto">
        <div className="flex w-full gap-2">
          <Button variant="outline" className="flex-1 text-sm">
            View Details
          </Button>
          <Button className="flex-1 text-sm">
            Apply Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;