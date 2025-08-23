import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, MapPin, ArrowRight } from "lucide-react";

const FeaturedCompanies = () => {
  const companies = [
    {
      id: "1",
      name: "TechCorp Inc.",
      industry: "Technology",
      size: "1,000-5,000",
      location: "San Francisco, CA",
      openPositions: 24,
      description: "Leading the future of technology with innovative solutions and cutting-edge products.",
      logo: null,
      rating: 4.8
    },
    {
      id: "2",
      name: "StartupXYZ",
      industry: "Fintech",
      size: "50-200",
      location: "New York, NY",
      openPositions: 12,
      description: "Revolutionary fintech company transforming how people manage their finances.",
      logo: null,
      rating: 4.6
    },
    {
      id: "3",
      name: "DesignStudio",
      industry: "Design Agency",
      size: "10-50",
      location: "Los Angeles, CA",
      openPositions: 8,
      description: "Award-winning design agency creating beautiful experiences for global brands.",
      logo: null,
      rating: 4.9
    },
    {
      id: "4",
      name: "DataFlow Solutions",
      industry: "Data Analytics",
      size: "200-1,000",
      location: "Austin, TX",
      openPositions: 18,
      description: "Helping businesses make data-driven decisions with advanced analytics platforms.",
      logo: null,
      rating: 4.7
    },
    {
      id: "5",
      name: "GrowthCo",
      industry: "Marketing",
      size: "100-500",
      location: "Chicago, IL",
      openPositions: 15,
      description: "Full-service marketing agency specializing in digital growth strategies.",
      logo: null,
      rating: 4.5
    },
    {
      id: "6",
      name: "AI Innovations",
      industry: "Artificial Intelligence",
      size: "500-1,000",
      location: "Boston, MA",
      openPositions: 32,
      description: "Pioneering AI research and development for next-generation applications.",
      logo: null,
      rating: 4.8
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Companies</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing companies that are hiring and find your next great workplace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {companies.map((company) => (
            <Card key={company.id} className="group hover:shadow-lg transition-slow border-border hover:border-primary/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Company Header */}
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      {company.logo ? (
                        <img src={company.logo} alt={company.name} className="w-8 h-8 object-contain" />
                      ) : (
                        <Building2 className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-base">
                        {company.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{company.industry}</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          {company.rating}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Company Details */}
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {company.size} employees
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {company.location}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {company.description}
                  </p>

                  {/* Open Positions Badge */}
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      {company.openPositions} open positions
                    </Badge>
                    <Button variant="ghost" size="sm" className="group-hover:text-primary">
                      View Company
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Companies
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompanies;