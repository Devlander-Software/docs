# Analytics Integration Guide

## Overview

This document provides comprehensive guidance on the analytics integration implemented in the Devlander Software documentation system. The integration includes Google Ads, Google Analytics, and cookie consent management with GDPR compliance.

## Architecture

### Components

1. **AnalyticsProvider** (`src/components/AnalyticsProvider.tsx`)
   - Main component for initializing Google Ads and Analytics
   - Handles script loading and configuration
   - Manages cookie consent integration

2. **useAnalytics Hook** (`src/hooks/useAnalytics.ts`)
   - Primary hook for tracking user interactions
   - Provides memoized tracking functions
   - Automatically tracks page views on route changes

3. **Analytics Library** (`src/lib/analytics.ts`)
   - Core tracking functions and utilities
   - Cookie consent validation
   - Event and conversion tracking

4. **CookieConsent Component** (`src/components/CookieConsent.tsx`)
   - GDPR-compliant cookie consent management
   - Local storage integration
   - User preference management

## Features

### Core Tracking Functions

- **Page Views**: Automatic tracking on route changes
- **Custom Events**: Flexible event tracking with parameters
- **Conversions**: Google Ads conversion tracking
- **Form Submissions**: Form interaction tracking
- **Button Clicks**: Button interaction tracking
- **Downloads**: File download tracking
- **Search Queries**: Search interaction tracking
- **Outbound Links**: External link tracking
- **Video Engagement**: Video interaction tracking
- **E-commerce**: Transaction tracking

### Specialized Hooks

- `useFormTracking(formName, formId)`: Form-specific tracking
- `useButtonTracking(buttonName, buttonId)`: Button-specific tracking
- `useDownloadTracking()`: Download tracking
- `useSearchTracking()`: Search tracking

## Usage Examples

### Basic Analytics Usage

```tsx
import { useAnalytics } from '../hooks/useAnalytics'

function MyComponent() {
  const { trackEvent, trackConversion, isEnabled } = useAnalytics()

  const handleClick = () => {
    trackEvent('button_click', {
      component: 'MyComponent',
      action: 'primary_button'
    }, 'engagement', 'my-component')
  }

  const handlePurchase = () => {
    trackConversion(undefined, undefined, 99.99, 'USD')
  }

  return (
    <div>
      {isEnabled && (
        <button onClick={handleClick}>
          Track Event
        </button>
      )}
    </div>
  )
}
```

### Form Tracking

```tsx
import { useFormTracking } from '../hooks/useAnalytics'

function ContactForm() {
  const { handleFormSubmit, handleButtonClick } = useFormTracking('contact-form', 'contact-form-1')

  const onSubmit = (formData) => {
    handleFormSubmit({
      form_type: 'contact',
      user_agent: navigator.userAgent,
      timestamp: Date.now()
    })
  }

  const onButtonClick = (buttonName) => {
    handleButtonClick(buttonName, 'submit-button')
  }

  return (
    <form onSubmit={onSubmit}>
      <button onClick={() => onButtonClick('submit')}>
        Submit
      </button>
    </form>
  )
}
```

### Download Tracking

```tsx
import { useDownloadTracking } from '../hooks/useAnalytics'

function DownloadButton() {
  const { handleDownload } = useDownloadTracking()

  const onDownload = () => {
    handleDownload('document.pdf', 'pdf', {
      file_size: '2.5MB',
      download_source: 'homepage'
    })
  }

  return (
    <button onClick={onDownload}>
      Download PDF
    </button>
  )
}
```

## Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Google Ads Configuration
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=XXXXXXXXX

# Google Analytics Configuration
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Google AdSense Configuration
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=Your Site Name
```

### Layout Integration

The analytics integration is automatically initialized in the root layout:

```tsx
// src/app/layout.tsx
import AnalyticsProvider from '../components/AnalyticsProvider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AnalyticsProvider
          googleAdsId={process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}
          googleAnalyticsId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}
          conversionId={process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID}
          conversionLabel={process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL}
          enableRemarketing={true}
          enableConversionTracking={true}
          enableAnalytics={true}
        />
        {children}
      </body>
    </html>
  )
}
```

## Cookie Consent

### GDPR Compliance

The integration includes full GDPR compliance with:

- Cookie consent banner
- User preference management
- Local storage integration
- Consent validation before tracking

### Consent States

- **Not Given**: No tracking occurs
- **Accepted**: Full tracking enabled
- **Declined**: No tracking occurs

### Managing Consent

```tsx
import { hasCookieConsent, clearCookieConsent } from '../components/CookieConsent'

// Check if consent is given
const consentGiven = hasCookieConsent()

// Clear consent (for testing)
clearCookieConsent()
```

## Development

### Debug Mode

Analytics debug mode is enabled in development:

```env
NODE_ENV=development
```

Debug messages will appear in the browser console.

### Testing

1. **Local Testing**: Use development environment variables
2. **Console Logs**: Check browser console for debug messages
3. **Network Tab**: Verify Google Analytics/Ads requests
4. **Cookie Consent**: Test with and without consent

### Example Component

See `src/components/AnalyticsExample.tsx` for a complete working example of all tracking functions.

## Best Practices

### Performance

- Use memoized tracking functions
- Lazy load analytics scripts
- Respect user consent preferences

### Privacy

- Always check cookie consent before tracking
- Provide clear consent options
- Allow users to manage preferences

### Error Handling

- Gracefully handle missing environment variables
- Validate tracking parameters
- Provide fallbacks for failed tracking

### Code Organization

- Use specialized hooks for specific tracking needs
- Keep tracking logic separate from business logic
- Document tracking events clearly

## Troubleshooting

### Common Issues

1. **Analytics Not Working**
   - Check environment variables
   - Verify cookie consent
   - Check browser console for errors

2. **Scripts Not Loading**
   - Verify network connectivity
   - Check ad blockers
   - Validate script URLs

3. **Events Not Tracking**
   - Check consent status
   - Verify event parameters
   - Check Google Analytics/Ads dashboards

### Debug Steps

1. Enable debug mode
2. Check browser console
3. Verify network requests
4. Test with different consent states
5. Check Google Analytics/Ads real-time reports

## Security Considerations

- Never expose sensitive data in tracking events
- Validate all user inputs
- Use HTTPS in production
- Regularly update tracking scripts
- Monitor for suspicious activity

## Maintenance

### Regular Tasks

- Update tracking scripts
- Review consent implementation
- Monitor analytics data
- Update documentation
- Test integration regularly

### Version Updates

- Test with new versions of Google Analytics/Ads
- Update TypeScript types
- Review breaking changes
- Update documentation

## Support

For issues or questions regarding the analytics integration:

1. Check this documentation
2. Review the example component
3. Check browser console for errors
4. Verify environment configuration
5. Test with different consent states

## Changelog

- **2024-12-19**: Initial analytics integration implementation
- Added Google Ads and Analytics support
- Implemented GDPR-compliant cookie consent
- Created comprehensive tracking hooks
- Added example component and documentation
