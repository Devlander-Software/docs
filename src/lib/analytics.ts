// Analytics and Conversion Tracking Utilities
// LastEdited: 2024-12-19T10:45:00Z
// Editor: TypeScript Utility Library

import { hasCookieConsent } from '../components/CookieConsent'

// Configuration interface
interface AnalyticsConfig {
  googleAdsId?: string
  googleAnalyticsId?: string
  conversionId?: string
  conversionLabel?: string
  enableDebug?: boolean
}

// Default configuration
const config: AnalyticsConfig = {
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  conversionId: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID,
  conversionLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL,
  enableDebug: process.env.NODE_ENV === 'development'
}

/**
 * Initialize analytics tracking - Commented out
 */
export function initializeAnalytics() {
  if (typeof window === 'undefined') return

  // Check cookie consent
  if (!hasCookieConsent()) {
    if (config.enableDebug) {
      console.log('Analytics: Cookie consent not given, skipping initialization')
    }
    return
  }

  // Initialize gtag if not already loaded
  if (!window.gtag) {
    window.gtag = function() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }
    window.dataLayer = window.dataLayer || []
  }

  if (config.enableDebug) {
    console.log('Analytics: Initialized with config', config)
  }
}

/**
 * Track page view
 */
export function trackPageView(pagePath: string, pageTitle?: string) {
  if (typeof window === 'undefined' || !window.gtag || !hasCookieConsent()) return

  const parameters: any = {
    page_path: pagePath,
    page_title: pageTitle
  }

  // Track for Google Analytics
  if (config.googleAnalyticsId) {
    window.gtag('config', config.googleAnalyticsId, parameters)
  }

  // Track for Google Ads
  if (config.googleAdsId) {
    window.gtag('config', config.googleAdsId, {
      send_page_view: false
    })
    window.gtag('event', 'page_view', parameters)
  }

  if (config.enableDebug) {
    console.log('Analytics: Page view tracked', { pagePath, pageTitle })
  }
}

/**
 * Track custom event
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, any>,
  eventCategory?: string,
  eventLabel?: string,
  value?: number
) {
  if (typeof window === 'undefined' || !window.gtag || !hasCookieConsent()) return

  const eventData: any = {
    event_category: eventCategory,
    event_label: eventLabel,
    value: value,
    ...parameters
  }

  window.gtag('event', eventName, eventData)

  if (config.enableDebug) {
    console.log('Analytics: Event tracked', { eventName, eventData })
  }
}

/**
 * Track conversion
 */
export function trackConversion(
  conversionId?: string,
  conversionLabel?: string,
  value?: number,
  currency: string = 'USD'
) {
  if (typeof window === 'undefined' || !window.gtag || !hasCookieConsent()) return

  const id = conversionId || config.conversionId
  const label = conversionLabel || config.conversionLabel

  if (!id || !label) {
    if (config.enableDebug) {
      console.warn('Analytics: Conversion tracking requires conversionId and conversionLabel')
    }
    return
  }

  const conversionData: any = {
    send_to: `${id}/${label}`,
    value: value,
    currency: currency
  }

  window.gtag('event', 'conversion', conversionData)

  if (config.enableDebug) {
    console.log('Analytics: Conversion tracked', conversionData)
  }
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string, formId?: string) {
  trackEvent('form_submit', {
    form_name: formName,
    form_id: formId
  }, 'engagement', formName)
}

/**
 * Track button click
 */
export function trackButtonClick(buttonName: string, buttonId?: string) {
  trackEvent('button_click', {
    button_name: buttonName,
    button_id: buttonId
  }, 'engagement', buttonName)
}

/**
 * Track download
 */
export function trackDownload(fileName: string, fileType?: string) {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType
  }, 'engagement', fileName)
}

/**
 * Track search
 */
export function trackSearch(searchTerm: string, resultsCount?: number) {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount
  }, 'engagement', searchTerm)
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: number) {
  trackEvent('scroll', {
    scroll_depth: depth
  }, 'engagement', `${depth}%`)
}

/**
 * Track time on page
 */
export function trackTimeOnPage(timeInSeconds: number) {
  trackEvent('timing_complete', {
    name: 'time_on_page',
    value: timeInSeconds
  }, 'timing', 'page_duration')
}

/**
 * Track outbound link click
 */
export function trackOutboundLink(url: string, linkText?: string) {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: url,
    link_text: linkText
  }, 'engagement', url)
}

/**
 * Track video engagement
 */
export function trackVideoEngagement(
  videoTitle: string,
  action: 'play' | 'pause' | 'complete' | 'seek',
  currentTime?: number,
  duration?: number
) {
  trackEvent('video_engagement', {
    video_title: videoTitle,
    action: action,
    current_time: currentTime,
    duration: duration
  }, 'engagement', videoTitle)
}

/**
 * Track e-commerce transaction
 */
export function trackTransaction(
  transactionId: string,
  value: number,
  currency: string = 'USD',
  items?: Array<{
    item_id: string
    item_name: string
    category: string
    quantity: number
    price: number
  }>
) {
  trackEvent('purchase', {
    transaction_id: transactionId,
    value: value,
    currency: currency,
    items: items
  }, 'ecommerce', transactionId, value)
}

/**
 * Get analytics configuration
 */
export function getAnalyticsConfig(): AnalyticsConfig {
  return { ...config }
}

/**
 * Check if analytics is enabled
 */
export function isAnalyticsEnabled(): boolean {
  return hasCookieConsent() && (!!config.googleAdsId || !!config.googleAnalyticsId)
}

// Global gtag function type declaration
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}
