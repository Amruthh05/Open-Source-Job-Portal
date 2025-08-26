import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Eye, User, Calendar, FileText } from 'lucide-react';

interface Application {
  id: string;
  status: string;
  applied_at: string;
  resume_url?: string;
  cover_letter?: string;
  additional_info?: any;
  admin_notes?: string;
  applicant_id: string;
  job: {
    title: string;
    company: string;
  };
}

interface ApplicationManagementProps {
  jobId?: string;
}

const ApplicationManagement = ({ jobId }: ApplicationManagementProps) => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const fetchApplications = async () => {
    let query = supabase
      .from('job_applications')
      .select(`
        id,
        status,
        applied_at,
        resume_url,
        cover_letter,
        additional_info,
        admin_notes,
        applicant_id,
        job:jobs (
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
      toast({
        title: 'Error',
        description: 'Failed to load applications',
        variant: 'destructive',
      });
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  const updateApplicationStatus = async (
    applicationId: string, 
    status: string, 
    adminNotes?: string
  ) => {
    setProcessingId(applicationId);

    const { error } = await supabase
      .from('job_applications')
      .update({
        status,
        admin_notes: adminNotes,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', applicationId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update application',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `Application ${status} successfully`,
      });
      fetchApplications();
    }

    setProcessingId(null);
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
      <div className="space-y-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
          <p className="text-muted-foreground">
            {jobId ? 'This job has no applications yet.' : 'No applications to review.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">
        Applications ({applications.length})
      </h2>
      
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          onStatusUpdate={updateApplicationStatus}
          isProcessing={processingId === application.id}
        />
      ))}
    </div>
  );
};

interface ApplicationCardProps {
  application: Application;
  onStatusUpdate: (id: string, status: string, notes?: string) => void;
  isProcessing: boolean;
}

const ApplicationCard = ({ application, onStatusUpdate, isProcessing }: ApplicationCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [adminNotes, setAdminNotes] = useState(application.admin_notes || '');

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

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold">{application.job.title}</h3>
              <Badge className={getStatusColor(application.status)}>
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </Badge>
            </div>
            
            <div className="flex items-center text-muted-foreground mb-2">
              <User className="h-4 w-4 mr-1" />
              Applicant ID: {application.applicant_id.slice(0, 8)}...
              <span className="mx-2">•</span>
              <Calendar className="h-4 w-4 mr-1" />
              Applied {new Date(application.applied_at).toLocaleDateString()}
            </div>
            
            <p className="text-sm text-muted-foreground">
              {application.job.company}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              <Eye className="h-4 w-4 mr-1" />
              {showDetails ? 'Hide' : 'View'} Details
            </Button>
          </div>
        </div>

        {showDetails && (
          <div className="border-t pt-4 space-y-4">
            {application.cover_letter && (
              <div>
                <h4 className="font-medium mb-2">Cover Letter</h4>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                  {application.cover_letter}
                </p>
              </div>
            )}
            
            {application.resume_url && (
              <div>
                <h4 className="font-medium mb-2">Resume</h4>
                <Button variant="outline" size="sm" asChild>
                  <a href={application.resume_url} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-1" />
                    View Resume
                  </a>
                </Button>
              </div>
            )}

            <div>
              <h4 className="font-medium mb-2">Admin Notes</h4>
              <Textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add notes about this application..."
                className="mb-2"
              />
            </div>

            <div className="flex space-x-2">
              {application.status !== 'approved' && (
                <Button
                  size="sm"
                  disabled={isProcessing}
                  onClick={() => onStatusUpdate(application.id, 'approved', adminNotes)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Approve
                </Button>
              )}
              
              {application.status !== 'rejected' && (
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={isProcessing}
                  onClick={() => onStatusUpdate(application.id, 'rejected', adminNotes)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              )}
              
              {application.status !== 'pending' && (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isProcessing}
                  onClick={() => onStatusUpdate(application.id, 'pending', adminNotes)}
                >
                  Mark Pending
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationManagement;