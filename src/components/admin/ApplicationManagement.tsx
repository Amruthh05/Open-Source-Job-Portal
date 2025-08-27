import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Application {
  id: string;
  job_id: string;
  applicant_id: string;
  cover_letter: string;
  resume_url?: string;
  additional_info?: any;
  status: string;
  applied_at: string;
  admin_notes?: string;
  jobs: {
    title: string;
    company: string;
  };
}

interface ApplicationManagementProps {
  jobId?: string;
}

const ApplicationManagement = ({ jobId }: ApplicationManagementProps) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const fetchApplications = async () => {
    try {
      let query = supabase
        .from('job_applications')
        .select(`
          *,
          jobs (
            title,
            company
          )
        `)
        .order('applied_at', { ascending: false });

      if (jobId) {
        query = query.eq('job_id', jobId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching applications:', error);
        toast({
          title: "Error",
          description: "Failed to fetch applications",
          variant: "destructive",
        });
        return;
      }

      setApplications(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (
    applicationId: string, 
    status: 'pending' | 'approved' | 'rejected',
    adminNotes?: string
  ) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ 
          status,
          admin_notes: adminNotes 
        })
        .eq('id', applicationId);

      if (error) {
        console.error('Error updating application:', error);
        toast({
          title: "Error",
          description: "Failed to update application status",
          variant: "destructive",
        });
        return;
      }

      // Update local state
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId 
            ? { ...app, status, admin_notes: adminNotes }
            : app
        )
      );

      toast({
        title: "Success",
        description: `Application ${status} successfully`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  if (loading) {
    return <div className="p-6">Loading applications...</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No applications found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {jobId ? 'Job Applications' : 'All Applications'} ({applications.length})
      </h3>
      
      {applications.map((application) => (
        <ApplicationCard 
          key={application.id} 
          application={application}
          onStatusUpdate={updateApplicationStatus}
        />
      ))}
    </div>
  );
};

interface ApplicationCardProps {
  application: Application;
  onStatusUpdate: (id: string, status: 'pending' | 'approved' | 'rejected', notes?: string) => void;
}

const ApplicationCard = ({ application, onStatusUpdate }: ApplicationCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [adminNotes, setAdminNotes] = useState(application.admin_notes || '');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{application.jobs.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {application.jobs.company} • Applied on {new Date(application.applied_at).toLocaleDateString()}
            </p>
            <p className="text-sm text-muted-foreground">
              Applicant ID: {application.applicant_id}
            </p>
          </div>
          <Badge className={getStatusColor(application.status)}>
            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>
          
          {showDetails && (
            <div className="space-y-4 pt-4 border-t">
              <div>
                <h4 className="font-medium mb-2">Cover Letter:</h4>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                  {application.cover_letter}
                </p>
              </div>
              
              {application.resume_url && (
                <div>
                  <h4 className="font-medium mb-2">Resume:</h4>
                  <a 
                    href={application.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Resume
                  </a>
                </div>
              )}
              
              {application.additional_info && (
                <div>
                  <h4 className="font-medium mb-2">Additional Information:</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                    {application.additional_info}
                  </p>
                </div>
              )}
              
              <div>
                <h4 className="font-medium mb-2">Admin Notes:</h4>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about this application..."
                  className="mb-2"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={() => onStatusUpdate(application.id, 'approved', adminNotes)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={application.status === 'approved'}
                >
                  Approve
                </Button>
                <Button
                  onClick={() => onStatusUpdate(application.id, 'rejected', adminNotes)}
                  variant="destructive"
                  disabled={application.status === 'rejected'}
                >
                  Reject
                </Button>
                <Button
                  onClick={() => onStatusUpdate(application.id, 'pending', adminNotes)}
                  variant="outline"
                  disabled={application.status === 'pending'}
                >
                  Mark Pending
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationManagement;