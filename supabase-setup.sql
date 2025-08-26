-- PinPod Database Setup for Supabase
-- Jalankan script ini di SQL Editor Supabase

-- Enable Row Level Security (RLS)
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    interest TEXT CHECK (interest IN ('pod', 'pin', 'both')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS public.analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type TEXT NOT NULL,
    event_data JSONB,
    user_agent TEXT,
    page_url TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_id TEXT,
    ip_address INET
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed'))
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON public.users(status);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON public.users(created_at);

CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON public.analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON public.analytics(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON public.analytics(session_id);

CREATE INDEX IF NOT EXISTS idx_feedback_status ON public.feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON public.feedback(created_at);

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can insert their own data" ON public.users
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own data" ON public.users
    FOR SELECT USING (auth.email() = email);

-- Create policies for analytics table
CREATE POLICY "Anyone can insert analytics" ON public.analytics
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Only authenticated users can view analytics" ON public.analytics
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create policies for feedback table
CREATE POLICY "Anyone can insert feedback" ON public.feedback
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Only authenticated users can view feedback" ON public.feedback
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for users table
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON public.users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional)
INSERT INTO public.users (email, name, phone, interest, status) VALUES
('john@example.com', 'John Doe', '+6281234567890', 'both', 'approved'),
('jane@example.com', 'Jane Smith', '+6281234567891', 'pod', 'pending'),
('bob@example.com', 'Bob Johnson', '+6281234567892', 'pin', 'approved')
ON CONFLICT (email) DO NOTHING;

-- Create view for user statistics
CREATE OR REPLACE VIEW user_stats AS
SELECT 
    COUNT(*) as total_users,
    COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_users,
    COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_users,
    COUNT(CASE WHEN interest = 'pod' THEN 1 END) as pod_users,
    COUNT(CASE WHEN interest = 'pin' THEN 1 END) as pin_users,
    COUNT(CASE WHEN interest = 'both' THEN 1 END) as both_users
FROM public.users;

-- Create view for analytics summary
CREATE OR REPLACE VIEW analytics_summary AS
SELECT 
    event_type,
    COUNT(*) as event_count,
    DATE(timestamp) as event_date
FROM public.analytics
GROUP BY event_type, DATE(timestamp)
ORDER BY event_date DESC, event_count DESC;
