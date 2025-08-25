// PinPod Analytics Tracking
class PinPodAnalytics {
    constructor() {
        this.events = [];
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.init();
    }

    init() {
        this.trackPageView();
        this.trackUserEngagement();
        this.trackFormInteractions();
        this.trackButtonClicks();
        this.trackScrollDepth();
        this.trackTimeOnPage();
    }

    // Generate unique session ID
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Track page view
    trackPageView() {
        const pageData = {
            event: 'page_view',
            page: window.location.pathname,
            title: document.title,
            url: window.location.href,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userAgent: navigator.userAgent,
            screenResolution: `${screen.width}x${screen.height}`,
            viewport: `${window.innerWidth}x${window.innerHeight}`
        };

        this.sendEvent(pageData);
    }

    // Track user engagement
    trackUserEngagement() {
        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (scrollPercent % 25 === 0) { // Track every 25%
                    this.trackEvent('scroll_depth', { depth: scrollPercent });
                }
            }
        });

        // Track time on page
        setInterval(() => {
            const timeOnPage = Math.round((Date.now() - this.startTime) / 1000);
            if (timeOnPage % 30 === 0) { // Track every 30 seconds
                this.trackEvent('time_on_page', { seconds: timeOnPage });
            }
        }, 1000);
    }

    // Track form interactions
    trackFormInteractions() {
        const form = document.getElementById('earlyAccessForm');
        if (form) {
            // Track form start
            form.addEventListener('focusin', (e) => {
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
                    this.trackEvent('form_field_focus', {
                        field: e.target.name || e.target.id,
                        form: 'early_access'
                    });
                }
            });

            // Track form submission
            form.addEventListener('submit', (e) => {
                this.trackEvent('form_submit', {
                    form: 'early_access',
                    success: true
                });
            });
        }
    }

    // Track button clicks
    trackButtonClicks() {
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                const button = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button');
                const buttonText = button.textContent.trim();
                const buttonClass = button.className;

                this.trackEvent('button_click', {
                    text: buttonText,
                    class: buttonClass,
                    location: this.getElementLocation(button)
                });
            }
        });
    }

    // Track scroll depth
    trackScrollDepth() {
        let maxScrollDepth = 0;
        const trackScroll = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = Math.round((scrollTop / docHeight) * 100);

            if (scrollPercent > maxScrollDepth) {
                maxScrollDepth = scrollPercent;
                if (scrollPercent >= 25 && scrollPercent % 25 === 0) {
                    this.trackEvent('scroll_depth', { depth: scrollPercent });
                }
            }
        };

        window.addEventListener('scroll', trackScroll);
    }

    // Track time on page
    trackTimeOnPage() {
        let timeOnPage = 0;
        const trackTime = () => {
            timeOnPage += 1;
            if (timeOnPage % 30 === 0) { // Track every 30 seconds
                this.trackEvent('time_on_page', { seconds: timeOnPage });
            }
        };

        setInterval(trackTime, 1000);

        // Track when user leaves page
        window.addEventListener('beforeunload', () => {
            this.trackEvent('page_exit', { 
                timeOnPage: timeOnPage,
                sessionDuration: Math.round((Date.now() - this.startTime) / 1000)
            });
        });
    }

    // Track tab interactions
    trackTabInteractions() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.getAttribute('data-tab');
                this.trackEvent('tab_click', { tab: tabName });
            });
        });
    }

    // Track section visibility
    trackSectionVisibility() {
        const sections = ['konsep', 'fitur', 'skenario', 'bergabung'];
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.id;
                    this.trackEvent('section_view', { section: sectionName });
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                observer.observe(section);
            }
        });
    }

    // Helper function to get element location
    getElementLocation(element) {
        const rect = element.getBoundingClientRect();
        return {
            x: Math.round(rect.left),
            y: Math.round(rect.top),
            section: this.getSectionFromElement(element)
        };
    }

    // Helper function to get section from element
    getSectionFromElement(element) {
        let parent = element.parentElement;
        while (parent) {
            if (parent.id && ['konsep', 'fitur', 'skenario', 'bergabung'].includes(parent.id)) {
                return parent.id;
            }
            parent = parent.parentElement;
        }
        return 'unknown';
    }

    // Track custom event
    trackEvent(eventName, data = {}) {
        const eventData = {
            event: eventName,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            ...data
        };

        this.sendEvent(eventData);
    }

    // Send event to analytics endpoint
    sendEvent(data) {
        // Store event locally
        this.events.push(data);

        // Send to analytics endpoint (replace with your analytics service)
        if (navigator.sendBeacon) {
            navigator.sendBeacon('/api/analytics', JSON.stringify(data));
        } else {
            // Fallback to fetch
            fetch('/api/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).catch(error => {
                console.log('Analytics error:', error);
            });
        }

        // Log to console for development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Analytics Event:', data);
        }
    }

    // Get analytics summary
    getSummary() {
        return {
            sessionId: this.sessionId,
            startTime: this.startTime,
            duration: Date.now() - this.startTime,
            events: this.events.length,
            pageViews: this.events.filter(e => e.event === 'page_view').length,
            buttonClicks: this.events.filter(e => e.event === 'button_click').length,
            formSubmissions: this.events.filter(e => e.event === 'form_submit').length
        };
    }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pinpodAnalytics = new PinPodAnalytics();
    
    // Track additional interactions
    window.pinpodAnalytics.trackTabInteractions();
    window.pinpodAnalytics.trackSectionVisibility();
});

// Export for global access
window.PinPodAnalytics = PinPodAnalytics;
