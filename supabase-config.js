// Supabase Configuration
// Ganti dengan URL dan API Key dari project Supabase Anda
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL'
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Database table names
const TABLES = {
    USERS: 'users',
    ANALYTICS: 'analytics',
    FEEDBACK: 'feedback'
}

// Export for use in other files
window.supabaseConfig = {
    supabase,
    TABLES
}
