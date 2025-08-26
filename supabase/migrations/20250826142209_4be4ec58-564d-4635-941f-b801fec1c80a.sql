-- Update job_applications table to include approval functionality
ALTER TABLE public.job_applications 
ADD COLUMN IF NOT EXISTS reviewed_by uuid REFERENCES public.profiles(id),
ADD COLUMN IF NOT EXISTS reviewed_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS admin_notes text;

-- Update the status enum to include more specific statuses
UPDATE public.job_applications SET status = 'pending' WHERE status IS NULL;

-- Create an index for better performance on application lookups
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON public.job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON public.job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_applicant_id ON public.job_applications(applicant_id);

-- Add policy for admins to review applications
CREATE POLICY "Admins can review applications" ON public.job_applications
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Update jobs table to automatically count applications
CREATE OR REPLACE FUNCTION update_application_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.jobs 
    SET applications_count = applications_count + 1 
    WHERE id = NEW.job_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.jobs 
    SET applications_count = GREATEST(applications_count - 1, 0) 
    WHERE id = OLD.job_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for application count updates
DROP TRIGGER IF EXISTS trigger_update_application_count ON public.job_applications;
CREATE TRIGGER trigger_update_application_count
  AFTER INSERT OR DELETE ON public.job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_application_count();