# CSS Directory

Direktori ini berisi file-file CSS untuk website PinPod.

## File Structure

### Main CSS Files
- `styles.css` - Main stylesheet (currently in root directory)
- `components.css` - Component-specific styles (future)
- `utilities.css` - Utility classes (future)
- `animations.css` - Animation keyframes (future)

### Responsive CSS
- `mobile.css` - Mobile-specific styles (future)
- `tablet.css` - Tablet-specific styles (future)
- `desktop.css` - Desktop-specific styles (future)

### Theme CSS
- `light-theme.css` - Light theme styles (future)
- `dark-theme.css` - Dark theme styles (future)

## CSS Architecture

### Methodology
- BEM (Block Element Modifier) methodology
- CSS Custom Properties (variables)
- Mobile-first responsive design
- Modular component approach

### Organization
```css
/* 1. Reset & Base */
/* 2. Variables & Configuration */
/* 3. Layout & Grid */
/* 4. Components */
/* 5. Utilities */
/* 6. Animations */
/* 7. Media Queries */
```

### Naming Convention
- Components: `.component-name`
- Elements: `.component-name__element`
- Modifiers: `.component-name--modifier`
- Utilities: `.u-utility-name`

## Color Palette

```css
:root {
  /* Primary Colors */
  --primary-color: #4CAF50;
  --primary-dark: #388E3C;
  --primary-light: #81C784;
  
  /* Secondary Colors */
  --secondary-color: #FF9800;
  --secondary-dark: #F57C00;
  --secondary-light: #FFB74D;
  
  /* Accent Colors */
  --accent-color: #2196F3;
  --accent-dark: #1976D2;
  --accent-light: #64B5F6;
  
  /* Neutral Colors */
  --text-primary: #333;
  --text-secondary: #666;
  --text-light: #999;
  --bg-primary: #fff;
  --bg-secondary: #f8f9fa;
  --bg-dark: #2c3e50;
}
```

## Breakpoints

```css
/* Mobile First */
@media (min-width: 480px) { /* Small tablets */ }
@media (min-width: 768px) { /* Tablets */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1200px) { /* Large desktop */ }
```

## Performance Considerations

- Use CSS Grid and Flexbox for layouts
- Minimize CSS specificity conflicts
- Optimize animations for 60fps
- Use transform and opacity for animations
- Minimize reflows and repaints

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- CSS-in-JS implementation
- PostCSS processing
- CSS modules
- Styled components
- CSS custom properties polyfill
