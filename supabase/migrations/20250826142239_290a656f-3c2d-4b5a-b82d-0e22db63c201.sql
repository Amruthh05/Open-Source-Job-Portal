-- Fix security issue by setting search path for the function
CREATE OR REPLACE FUNCTION update_application_count()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
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