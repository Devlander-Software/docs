// Analytics Hook for React Components
// LastEdited: 2024-12-19T10:45:00Z
// Editor: TypeScript React Hook

'use client'

import { useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { 
  trackPageView, 
  trackEvent, 
  trackConversion,
  trackFormSubmission,
  trackButtonClick,
  trackDownload,
  trackSearch,
  trackScrollDepth,
  trackTimeOnPage,
  trackOutboundLink,
  trackVideoEngagement,
  trackTransaction,
  isAnalyticsEnabled
} from '../lib/analytics'

/**
 * Custom hook for analytics tracking
 * 
 * Provides easy-to-use functions for tracking various user interactions
 * and automatically tracks page views when the route changes
 */
export function useAnalytics() {
  const pathname = usePathname()

  // Track page view when pathname changes
  useEffect(() => {
    if (pathname) {
      trackPageView(pathname, document.title)
    }
  }, [pathname])

  // Memoized tracking functions for better performance
  const handleTrackEvent = useCallback((
    eventName: string,
    parameters?: Record<string, any>,
    eventCategory?: string,
    eventLabel?: string,
    value?: number
  ) => {
    trackEvent(eventName, parameters, eventCategory, eventLabel, value)
  }, [])

  const handleTrackPageView = useCallback((pagePath: string, pageTitle?: string) => {
    trackPageView(pagePath, pageTitle)
  }, [])

  const handleTrackConversion = useCallback((
    conversionId?: string,
    conversionLabel?: string,
    value?: number,
    currency?: string
  ) => {
    trackConversion(conversionId, conversionLabel, value, currency)
  }, [])

  const handleTrackFormSubmit = useCallback((formName: string, formId?: string) => {
    trackFormSubmission(formName, formId)
  }, [])

  const handleTrackButton = useCallback((buttonName: string, buttonId?: string) => {
    trackButtonClick(buttonName, buttonId)
  }, [])

  const handleTrackDownload = useCallback((fileName: string, fileType?: string) => {
    trackDownload(fileName, fileType)
  }, [])

  const handleTrackSearch = useCallback((searchTerm: string, resultsCount?: number) => {
    trackSearch(searchTerm, resultsCount)
  }, [])

  const handleTrackOutboundLink = useCallback((url: string, linkText?: string) => {
    trackOutboundLink(url, linkText)
  }, [])

  const handleTrackVideo = useCallback((
    videoTitle: string,
    action: 'play' | 'pause' | 'complete' | 'seek',
    currentTime?: number,
    duration?: number
  ) => {
    trackVideoEngagement(videoTitle, action, currentTime, duration)
  }, [])

  const handleTrackPurchase = useCallback((
    transactionId: string,
    value: number,
    currency?: string,
    items?: Array<{
      item_id: string
      item_name: string
      category: string
      quantity: number
      price: number
    }>
  ) => {
    trackTransaction(transactionId, value, currency, items)
  }, [])

  return {
    // Core tracking functions
    trackEvent: handleTrackEvent,
    trackPageView: handleTrackPageView,
    trackConversion: handleTrackConversion,
    
    // Specific tracking functions
    trackFormSubmit: handleTrackFormSubmit,
    trackButton: handleTrackButton,
    trackDownload: handleTrackDownload,
    trackSearch: handleTrackSearch,
    trackOutboundLink: handleTrackOutboundLink,
    trackVideo: handleTrackVideo,
    trackPurchase: handleTrackPurchase,
    
    // Utility functions
    isEnabled: isAnalyticsEnabled(),
  }
}

/**
 * Hook for tracking form interactions
 */
export function useFormTracking(formName: string, formId?: string) {
  const { trackFormSubmit, trackButton } = useAnalytics()

  const handleFormSubmit = useCallback((additionalData?: Record<string, any>) => {
    trackFormSubmit(formName, formId)
    if (additionalData) {
      trackEvent('form_submit_data', additionalData, 'engagement', formName)
    }
  }, [trackFormSubmit, formName, formId])

  const handleButtonClick = useCallback((buttonName: string, buttonId?: string) => {
    trackButton(buttonName, buttonId)
  }, [trackButton])

  return {
    handleFormSubmit,
    handleButtonClick,
  }
}

/**
 * Hook for tracking button clicks
 */
export function useButtonTracking(buttonName: string, buttonId?: string) {
  const { trackButton } = useAnalytics()

  const handleClick = useCallback((additionalData?: Record<string, any>) => {
    trackButton(buttonName, buttonId)
    if (additionalData) {
      trackEvent('button_click_data', additionalData, 'engagement', buttonName)
    }
  }, [trackButton, buttonName, buttonId])

  return { handleClick }
}

/**
 * Hook for tracking downloads
 */
export function useDownloadTracking() {
  const { trackDownload } = useAnalytics()

  const handleDownload = useCallback((fileName: string, fileType?: string, additionalData?: Record<string, any>) => {
    trackDownload(fileName, fileType)
    if (additionalData) {
      trackEvent('download_data', additionalData, 'engagement', fileName)
    }
  }, [trackDownload])

  return { handleDownload }
}

/**
 * Hook for tracking search queries
 */
export function useSearchTracking() {
  const { trackSearch } = useAnalytics()

  const handleSearch = useCallback((searchTerm: string, resultsCount?: number, additionalData?: Record<string, any>) => {
    trackSearch(searchTerm, resultsCount)
    if (additionalData) {
      trackEvent('search_data', additionalData, 'engagement', searchTerm)
    }
  }, [trackSearch])

  return { handleSearch }
}
