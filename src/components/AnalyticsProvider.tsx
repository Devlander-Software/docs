// Analytics Provider Component for Google Ads and Analytics Integration
// LastEdited: 2024-12-19T10:45:00Z
// Editor: TypeScript React Component

'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { initializeAnalytics } from '../lib/analytics'
import CookieConsent from './CookieConsent'

interface AnalyticsProviderProps {
  googleAdsId?: string
  googleAnalyticsId?: string
  conversionId?: string
  conversionLabel?: string
  enableRemarketing?: boolean
  enableConversionTracking?: boolean
  enableAnalytics?: boolean
}

/**
 * Analytics Provider Component
 * 
 * Handles initialization of Google Ads and Analytics tracking
 * with proper cookie consent management
 * 
 * @param googleAdsId - Google Ads ID for tracking
 * @param googleAnalyticsId - Google Analytics ID for tracking
 * @param conversionId - Google Ads conversion ID
 * @param conversionLabel - Google Ads conversion label
 * @param enableRemarketing - Enable remarketing features
 * @param enableConversionTracking - Enable conversion tracking
 * @param enableAnalytics - Enable analytics tracking
 */
export default function AnalyticsProvider({
  googleAdsId,
  googleAnalyticsId,
  conversionId,
  conversionLabel,
  enableRemarketing = true,
  enableConversionTracking = true,
  enableAnalytics = true
}: AnalyticsProviderProps) {
  useEffect(() => {
    // Initialize analytics when component mounts
    initializeAnalytics()
  }, [])

  // Don't render anything if no tracking IDs are provided
  if (!googleAdsId && !googleAnalyticsId) {
    return <CookieConsent enableGoogleAds={!!googleAdsId} enableAnalytics={!!googleAnalyticsId} />
  }

  return (
    <>
      {/* Google Analytics */}
      {googleAnalyticsId && (
        <>
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          />
          <Script
            id="google-analytics-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}', {
                  page_title: document.title,
                  page_location: window.location.href,
                  send_page_view: true
                });
              `,
            }}
          />
        </>
      )}

      {/* Google Ads */}
      {googleAdsId && (
        <>
          <Script
            id="google-ads"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
          />
          <Script
            id="google-ads-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAdsId}', {
                  send_page_view: false,
                  ${enableRemarketing ? 'allow_google_signals: true,' : ''}
                  ${enableConversionTracking ? 'allow_ad_personalization_signals: true,' : ''}
                });
              `,
            }}
          />
        </>
      )}

      {/* Cookie Consent Banner */}
      <CookieConsent
        enableGoogleAds={!!googleAdsId}
        enableAnalytics={!!googleAnalyticsId}
        enableMarketing={enableRemarketing}
      />
    </>
  )
}
