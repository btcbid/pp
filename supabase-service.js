// Supabase Service Layer
class SupabaseService {
    constructor() {
        this.supabase = window.supabaseConfig?.supabase
        this.TABLES = window.supabaseConfig?.TABLES
    }

    // User Management
    async registerUser(userData) {
        try {
            const { data, error } = await this.supabase
                .from(this.TABLES.USERS)
                .insert([{
                    email: userData.email,
                    name: userData.name,
                    phone: userData.phone,
                    interest: userData.interest,
                    created_at: new Date().toISOString(),
                    status: 'pending'
                }])
                .select()

            if (error) throw error
            return { success: true, data }
        } catch (error) {
            console.error('Error registering user:', error)
            return { success: false, error: error.message }
        }
    }

    // Analytics Tracking
    async trackEvent(eventData) {
        try {
            const { data, error } = await this.supabase
                .from(this.TABLES.ANALYTICS)
                .insert([{
                    event_type: eventData.type,
                    event_data: eventData.data,
                    user_agent: navigator.userAgent,
                    page_url: window.location.href,
                    timestamp: new Date().toISOString()
                }])

            if (error) throw error
            return { success: true, data }
        } catch (error) {
            console.error('Error tracking event:', error)
            return { success: false, error: error.message }
        }
    }

    // Feedback Collection
    async submitFeedback(feedbackData) {
        try {
            const { data, error } = await this.supabase
                .from(this.TABLES.FEEDBACK)
                .insert([{
                    name: feedbackData.name,
                    email: feedbackData.email,
                    message: feedbackData.message,
                    rating: feedbackData.rating,
                    created_at: new Date().toISOString()
                }])

            if (error) throw error
            return { success: true, data }
        } catch (error) {
            console.error('Error submitting feedback:', error)
            return { success: false, error: error.message }
        }
    }

    // Get Users (for admin purposes)
    async getUsers() {
        try {
            const { data, error } = await this.supabase
                .from(this.TABLES.USERS)
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            return { success: true, data }
        } catch (error) {
            console.error('Error fetching users:', error)
            return { success: false, error: error.message }
        }
    }

    // Get Analytics
    async getAnalytics() {
        try {
            const { data, error } = await this.supabase
                .from(this.TABLES.ANALYTICS)
                .select('*')
                .order('timestamp', { ascending: false })

            if (error) throw error
            return { success: true, data }
        } catch (error) {
            console.error('Error fetching analytics:', error)
            return { success: false, error: error.message }
        }
    }
}

// Initialize service
window.supabaseService = new SupabaseService()
