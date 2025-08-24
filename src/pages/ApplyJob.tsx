import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
}

const ApplyJob = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    coverLetter: '',
    resumeUrl: '',
    additionalInfo: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchJob = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from('jobs')
        .select('id, title, company, location, type')
        .eq('id', id)
        .single();

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to load job details',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      setJob(data);
      setLoading(false);

      // Check if user has already applied
      const { data: application } = await supabase
        .from('job_applications')
        .select('id')
        .eq('job_id', id)
        .eq('applicant_id', user.id)
        .single();

      if (application) {
        toast({
          title: 'Already Applied',
          description: 'You have already applied for this position',
          variant: 'destructive',
        });
        navigate(`/job/${id}`);
        return;
      }
    };

    fetchJob();
  }, [id, user, toast, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !job) return;

    setSubmitting(true);

    const { error } = await supabase
      .from('job_applications')
      .insert({
        job_id: job.id,
        applicant_id: user.id,
        cover_letter: formData.coverLetter,
        resume_url: formData.resumeUrl,
        additional_info: formData.additionalInfo ? { notes: formData.additionalInfo } : null,
      });

    if (error) {
      toast({
        title: 'Application Failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Application Submitted!',
        description: 'Your application has been sent successfully.',
      });
      navigate(`/job/${id}`);
    }

    setSubmitting(false);
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

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <p>Job not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(`/job/${id}`)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Job Details
        </Button>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Apply for {job.title}</CardTitle>
              <p className="text-muted-foreground">
                {job.company} • {job.location} • {job.type}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cover-letter">Cover Letter *</Label>
                  <Textarea
                    id="cover-letter"
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    className="min-h-32"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume-url">Resume URL</Label>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="resume-url"
                      type="url"
                      placeholder="https://drive.google.com/... or https://linkedin.com/in/yourprofile"
                      value={formData.resumeUrl}
                      onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Link to your resume (Google Drive, Dropbox, LinkedIn, etc.)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-info">Additional Information</Label>
                  <Textarea
                    id="additional-info"
                    placeholder="Any additional information you'd like to share (portfolio links, relevant projects, etc.)"
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    className="min-h-24"
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Application Tips:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Make sure your resume is up to date and accessible via the URL</li>
                    <li>• Tailor your cover letter to this specific position</li>
                    <li>• Highlight relevant skills and experience</li>
                    <li>• Include links to your portfolio or relevant projects</li>
                  </ul>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="flex-1" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(`/job/${id}`)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplyJob;