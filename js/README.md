# JavaScript Directory

Direktori ini berisi file-file JavaScript untuk website PinPod.

## File Structure

### Main JavaScript Files
- `script.js` - Main JavaScript file (currently in root directory)
- `analytics.js` - Analytics tracking (currently in root directory)
- `sw.js` - Service Worker (currently in root directory)

### Component Modules (Future)
- `components/navigation.js` - Navigation functionality
- `components/tabs.js` - Tab system
- `components/forms.js` - Form handling
- `components/animations.js` - Animation utilities
- `components/modal.js` - Modal dialogs

### Utility Modules (Future)
- `utils/validation.js` - Form validation
- `utils/helpers.js` - Helper functions
- `utils/storage.js` - Local storage utilities
- `utils/api.js` - API communication

### Services (Future)
- `services/analytics.js` - Analytics service
- `services/auth.js` - Authentication service
- `services/notifications.js` - Notification service

## JavaScript Architecture

### Module Pattern
```javascript
// Module pattern example
const PinPodModule = (function() {
    // Private variables
    let privateVar = 'private';
    
    // Private functions
    function privateFunction() {
        return privateVar;
    }
    
    // Public API
    return {
        publicFunction: function() {
            return privateFunction();
        }
    };
})();
```

### ES6 Modules (Future)
```javascript
// Import/Export pattern
import { Navigation } from './components/navigation.js';
import { Analytics } from './services/analytics.js';

export class PinPodApp {
    constructor() {
        this.navigation = new Navigation();
        this.analytics = new Analytics();
    }
}
```

## Code Organization

### 1. Initialization
```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavigation();
    initTabSystem();
    initScrollAnimations();
    // ...
});
```

### 2. Event Handling
```javascript
// Event delegation
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        handleButtonClick(e);
    }
});
```

### 3. Error Handling
```javascript
try {
    // Risky operation
} catch (error) {
    console.error('Error occurred:', error);
    // Handle error gracefully
}
```

## Performance Considerations

### 1. Debouncing
```javascript
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
```

### 2. Throttling
```javascript
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
```

### 3. Lazy Loading
```javascript
// Intersection Observer for lazy loading
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
        }
    });
});
```

## Browser Support

### Modern JavaScript Features
- ES6+ (Arrow functions, destructuring, etc.)
- Fetch API
- Intersection Observer API
- Service Workers
- Local Storage
- CSS Custom Properties

### Polyfills (if needed)
- Promise polyfill for older browsers
- Fetch polyfill for older browsers
- Intersection Observer polyfill

## Testing Strategy

### Unit Testing (Future)
```javascript
// Example with Jest
describe('PinPod Analytics', () => {
    test('should track page view', () => {
        const analytics = new PinPodAnalytics();
        const spy = jest.spyOn(analytics, 'sendEvent');
        
        analytics.trackPageView();
        
        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining({
                event: 'page_view'
            })
        );
    });
});
```

### Integration Testing (Future)
- End-to-end testing with Cypress
- Cross-browser testing
- Performance testing

## Security Considerations

### 1. Input Validation
```javascript
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
```

### 2. XSS Prevention
```javascript
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}
```

### 3. CSRF Protection
```javascript
// Include CSRF token in requests
function makeRequest(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': getCSRFToken()
        },
        body: JSON.stringify(data)
    });
}
```

## Future Enhancements

### 1. Build System
- Webpack or Vite for bundling
- Babel for transpilation
- Minification and optimization

### 2. State Management
- Redux or Zustand for state management
- Local state with React hooks (if using React)

### 3. TypeScript
- Type safety
- Better IDE support
- Improved maintainability

### 4. Progressive Enhancement
- Core functionality without JavaScript
- Enhanced experience with JavaScript
- Graceful degradation

## Code Style Guide

### Naming Conventions
- Variables: camelCase
- Functions: camelCase
- Classes: PascalCase
- Constants: UPPER_SNAKE_CASE
- Files: kebab-case

### Comments
```javascript
/**
 * Tracks user interaction with the form
 * @param {string} fieldName - Name of the form field
 * @param {string} action - Action performed (focus, blur, etc.)
 */
function trackFormInteraction(fieldName, action) {
    // Implementation
}
```

### Error Handling
```javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
}
```
