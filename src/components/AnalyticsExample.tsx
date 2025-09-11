// Analytics Example Component - Demonstration of Analytics Usage
// LastEdited: 2024-12-19T10:45:00Z
// Editor: TypeScript React Component

'use client'

import { useAnalytics, useFormTracking, useButtonTracking, useDownloadTracking, useSearchTracking } from '../hooks/useAnalytics'

/**
 * Analytics Example Component
 * 
 * Demonstrates how to use the various analytics hooks
 * for tracking user interactions
 */
export default function AnalyticsExample() {
  const { isEnabled, trackEvent, trackConversion } = useAnalytics()
  const { handleFormSubmit } = useFormTracking('contact-form', 'contact-form-1')
  const { handleClick } = useButtonTracking('cta-button', 'cta-1')
  const { handleDownload } = useDownloadTracking()
  const { handleSearch } = useSearchTracking()

  const handleCustomEvent = () => {
    trackEvent('custom_interaction', {
      component: 'AnalyticsExample',
      action: 'button_clicked'
    }, 'engagement', 'example-component')
  }

  const handleConversion = () => {
    trackConversion(undefined, undefined, 99.99, 'USD')
  }

  const handleFormSubmitExample = () => {
    handleFormSubmit({
      form_type: 'contact',
      user_agent: navigator.userAgent,
      timestamp: Date.now()
    })
  }

  const handleButtonClickExample = () => {
    handleClick({
      button_type: 'primary',
      page_section: 'hero',
      timestamp: Date.now()
    })
  }

  const handleDownloadExample = () => {
    handleDownload('example-document.pdf', 'pdf', {
      file_size: '2.5MB',
      download_source: 'example-page'
    })
  }

  const handleSearchExample = () => {
    handleSearch('analytics integration', 15, {
      search_type: 'internal',
      user_location: 'US'
    })
  }

  if (!isEnabled) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          Analytics Disabled
        </h3>
        <p className="text-yellow-700">
          Analytics tracking is currently disabled. Please accept cookies to enable tracking.
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Analytics Integration Example
      </h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            ✅ Analytics Enabled
          </h3>
          <p className="text-green-700">
            All tracking functions are active and ready to use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleCustomEvent}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Track Custom Event
          </button>

          <button
            onClick={handleConversion}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Track Conversion
          </button>

          <button
            onClick={handleFormSubmitExample}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Track Form Submit
          </button>

          <button
            onClick={handleButtonClickExample}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Track Button Click
          </button>

          <button
            onClick={handleDownloadExample}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Track Download
          </button>

          <button
            onClick={handleSearchExample}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Track Search
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Usage Instructions:
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Click any button to trigger analytics tracking</li>
            <li>• Check browser console for debug messages (in development)</li>
            <li>• All events respect cookie consent settings</li>
            <li>• Page views are automatically tracked on route changes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
