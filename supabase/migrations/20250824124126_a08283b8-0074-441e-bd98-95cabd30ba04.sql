-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  avatar_url TEXT,
  phone TEXT,
  location TEXT,
  resume_url TEXT,
  skills TEXT[],
  experience_years INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Full-time', 'Part-time', 'Contract', 'Internship')),
  salary TEXT,
  description TEXT NOT NULL,
  requirements TEXT[],
  benefits TEXT[],
  tags TEXT[],
  posted_by UUID REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed', 'draft')),
  applications_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  applicant_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  cover_letter TEXT,
  resume_url TEXT,
  additional_info JSONB,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(job_id, applicant_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Jobs policies
CREATE POLICY "Jobs are viewable by everyone" 
ON public.jobs FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can insert jobs" 
ON public.jobs FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update jobs" 
ON public.jobs FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Job applications policies
CREATE POLICY "Users can view their own applications" 
ON public.job_applications FOR SELECT USING (applicant_id = auth.uid());

CREATE POLICY "Admins can view all applications" 
ON public.job_applications FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Users can apply for jobs" 
ON public.job_applications FOR INSERT WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Users can update their own applications" 
ON public.job_applications FOR UPDATE USING (applicant_id = auth.uid());

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample jobs data
INSERT INTO public.jobs (title, company, location, type, salary, description, requirements, benefits, tags, status) VALUES
('Senior Frontend Developer', 'Meta', 'Menlo Park, CA', 'Full-time', '$150k - $220k', 
'Build scalable React applications serving billions of users. Work with cutting-edge technologies including React 18, TypeScript, and modern frontend tooling.',
ARRAY['5+ years React experience', 'TypeScript proficiency', 'GraphQL knowledge', 'Performance optimization skills'],
ARRAY['Health insurance', 'Stock options', 'Remote work flexibility', '401k matching'],
ARRAY['React', 'TypeScript', 'JavaScript', 'GraphQL', 'Next.js'], 'active'),

('Java Backend Developer', 'Amazon', 'Seattle, WA', 'Full-time', '$130k - $180k',
'Design and develop high-performance Java applications and microservices. Experience with Spring Boot, AWS, and distributed systems required.',
ARRAY['4+ years Java experience', 'Spring Boot expertise', 'AWS knowledge', 'Microservices architecture'],
ARRAY['Health insurance', 'Stock options', 'Learning budget', 'Flexible hours'],
ARRAY['Java', 'Spring Boot', 'AWS', 'Microservices', 'Kubernetes'], 'active'),

('Full Stack Developer', 'Google', 'Mountain View, CA', 'Full-time', '$140k - $200k',
'Build end-to-end web applications using modern technologies. Strong experience in both frontend and backend development required.',
ARRAY['3+ years full stack experience', 'React and Node.js proficiency', 'Database design skills', 'Cloud platform experience'],
ARRAY['Health insurance', 'Stock options', 'Free meals', 'Gym membership'],
ARRAY['React', 'Node.js', 'Python', 'GCP', 'TypeScript'], 'active'),

('Frontend Development Internship', 'Spotify', 'New York, NY', 'Internship', '$6k - $8k/month',
'Join our frontend team to build user interfaces for our music streaming platform. Perfect opportunity for students to gain real-world experience.',
ARRAY['Currently pursuing CS degree', 'Basic React knowledge', 'JavaScript fundamentals', 'Git experience'],
ARRAY['Mentorship program', 'Lunch provided', 'Networking events', 'Learning opportunities'],
ARRAY['React', 'JavaScript', 'CSS', 'HTML', 'Git'], 'active'),

('DevOps Engineer', 'Microsoft', 'Redmond, WA', 'Full-time', '$120k - $170k',
'Automate deployment pipelines and manage cloud infrastructure. Experience with Azure, Docker, and CI/CD tools required.',
ARRAY['3+ years DevOps experience', 'Azure certification preferred', 'Docker and Kubernetes skills', 'CI/CD pipeline experience'],
ARRAY['Health insurance', 'Stock options', 'Remote work options', 'Professional development'],
ARRAY['Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'], 'active'),

('Machine Learning Internship', 'OpenAI', 'San Francisco, CA', 'Internship', '$9k - $12k/month',
'Work on cutting-edge AI research and development. Perfect for students passionate about machine learning and artificial intelligence.',
ARRAY['Currently pursuing ML/AI degree', 'Python proficiency', 'TensorFlow or PyTorch experience', 'Strong math background'],
ARRAY['Research mentorship', 'Conference attendance', 'GPU access', 'Publication opportunities'],
ARRAY['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'AI'], 'active'),

('React Native Developer', 'Instagram', 'Menlo Park, CA', 'Full-time', '$140k - $185k',
'Develop cross-platform mobile applications using React Native. Help millions of users share their stories through code.',
ARRAY['3+ years React Native experience', 'iOS and Android development', 'Redux or similar state management', 'App Store deployment experience'],
ARRAY['Health insurance', 'Stock options', 'Device allowance', 'Flexible work arrangements'],
ARRAY['React Native', 'JavaScript', 'iOS', 'Android', 'Redux'], 'active'),

('Cybersecurity Engineer', 'Cisco', 'San Jose, CA', 'Full-time', '$130k - $175k',
'Protect our network infrastructure and develop security solutions. Experience with security protocols and threat analysis essential.',
ARRAY['4+ years cybersecurity experience', 'Security certifications (CISSP, CEH)', 'Network security expertise', 'Incident response skills'],
ARRAY['Health insurance', 'Stock options', 'Security training budget', 'Work from home options'],
ARRAY['Cybersecurity', 'Network Security', 'Python', 'Linux', 'Firewalls'], 'active');