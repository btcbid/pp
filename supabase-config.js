// Supabase Configuration
// Prefer konfigurasi lokal jika tersedia (window.SUPABASE_LOCAL)
// FALLBACK ke placeholder yang harus Anda ganti jika tidak memakai file lokal
const SUPABASE_URL = (window.SUPABASE_LOCAL && window.SUPABASE_LOCAL.url) || 'YOUR_SUPABASE_PROJECT_URL'
const SUPABASE_ANON_KEY = (window.SUPABASE_LOCAL && window.SUPABASE_LOCAL.anonKey) || 'YOUR_SUPABASE_ANON_KEY'

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
