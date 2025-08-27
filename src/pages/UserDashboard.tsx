import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, MapPin, Building, Eye } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface Application {
  id: string;
  status: string;
  applied_at: string;
  admin_notes?: string;
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary?: string;
  };
}

const UserDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchApplications();
  }, [user, navigate]);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('job_applications')
      .select(`
        id,
        status,
        applied_at,
        admin_notes,
        job:jobs (
          id,
          title,
          company,
          location,
          type,
          salary
        )
      `)
      .eq('applicant_id', user?.id)
      .order('applied_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load your applications',
        variant: 'destructive',
      });
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Applications</h1>
          <Button onClick={() => navigate('/')}>
            Browse Jobs
          </Button>
        </div>

        {applications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
              <p className="text-muted-foreground mb-4">
                You haven't applied to any jobs yet. Start browsing and apply to your dream job!
              </p>
              <Button onClick={() => navigate('/')}>
                Browse Jobs
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              You have applied to {applications.length} job{applications.length !== 1 ? 's' : ''}
            </p>
            
            {applications.map((application) => (
              <Card key={application.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{application.job.title}</h3>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground mb-2">
                        <Building className="h-4 w-4 mr-1" />
                        {application.job.company}
                        <span className="mx-2">•</span>
                        <MapPin className="h-4 w-4 mr-1" />
                        {application.job.location}
                        <span className="mx-2">•</span>
                        {application.job.type}
                      </div>
                      
                      {application.job.salary && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {application.job.salary}
                        </p>
                      )}
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        Applied on {new Date(application.applied_at).toLocaleDateString()}
                      </div>
                      
                      {application.admin_notes && (
                        <div className="mt-3 p-3 bg-muted rounded-md">
                          <p className="text-sm font-medium">Admin Notes:</p>
                          <p className="text-sm text-muted-foreground">{application.admin_notes}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/job/${application.job.id}`)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Job
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;