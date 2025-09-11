// Cookie Consent Component for GDPR Compliance
// LastEdited: 2024-12-19T10:45:00Z
// Editor: TypeScript React Component

'use client'

import { useState, useEffect } from 'react'

interface CookieConsentProps {
  onAccept?: () => void
  onDecline?: () => void
  enableGoogleAds?: boolean
  enableAnalytics?: boolean
  enableMarketing?: boolean
}

/**
 * Cookie Consent Component
 * 
 * Provides GDPR-compliant cookie consent management for Google Ads and Analytics
 * 
 * @param onAccept - Callback when user accepts cookies
 * @param onDecline - Callback when user declines cookies
 * @param enableGoogleAds - Enable Google Ads cookies
 * @param enableAnalytics - Enable Google Analytics cookies
 * @param enableMarketing - Enable marketing cookies
 */
export default function CookieConsent({
  onAccept,
  onDecline,
  enableGoogleAds = true,
  enableAnalytics = true,
  enableMarketing = true
}: CookieConsentProps) {
  const [showConsent, setShowConsent] = useState(false)
  const [consentGiven, setConsentGiven] = useState(false)

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem('cookie-consent')
    if (consent) {
      setConsentGiven(true)
      setShowConsent(false)
    } else {
      setShowConsent(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('cookie-consent-timestamp', Date.now().toString())
    setConsentGiven(true)
    setShowConsent(false)
    onAccept?.()
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    localStorage.setItem('cookie-consent-timestamp', Date.now().toString())
    setConsentGiven(false)
    setShowConsent(false)
    onDecline?.()
  }

  const handleManagePreferences = () => {
    // Open cookie preferences modal or page
    // This would typically open a modal with detailed cookie settings
    console.log('Open cookie preferences')
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Cookie Consent
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              We use cookies to enhance your browsing experience, serve personalized content,
              and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
            </p>
            <div className="text-xs text-gray-500">
              <button
                onClick={handleManagePreferences}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Manage Preferences
              </button>
              {' • '}
              <a
                href="/privacy-policy"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Privacy Policy
              </a>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Check if user has given cookie consent
 */
export function hasCookieConsent(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('cookie-consent') === 'accepted'
}

/**
 * Get cookie consent timestamp
 */
export function getCookieConsentTimestamp(): number | null {
  if (typeof window === 'undefined') return null
  const timestamp = localStorage.getItem('cookie-consent-timestamp')
  return timestamp ? parseInt(timestamp, 10) : null
}

/**
 * Clear cookie consent data
 */
export function clearCookieConsent(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('cookie-consent')
  localStorage.removeItem('cookie-consent-timestamp')
}
