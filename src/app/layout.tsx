import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import AnalyticsProvider from '../components/AnalyticsProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Devlander Software - Development Guidelines',
    template: '%s | Devlander Software'
  },
  description: 'Internal development standards and guidelines for Devlander Software team. Covering TypeScript, React, testing, security, and DevOps best practices.',
  keywords: [
    'devlander software',
    'development',
    'documentation',
    'standards',
    'guidelines',
    'typescript',
    'react',
    'testing',
    'security',
    'devops',
    'software development',
    'best practices',
    'code quality',
    'programming standards',
    'internal guidelines'
  ],
  authors: [{ name: 'Devlander Software Team' }],
  creator: 'Devlander Software Team',
  publisher: 'Devlander Software Team',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com',
    title: 'Devlander Software - Development Guidelines',
    description: 'Internal development standards and guidelines for Devlander Software team.',
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Devlander Software',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Devlander Software - Development Guidelines',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devlander Software - Development Guidelines',
    description: 'Internal development standards and guidelines for Devlander Software team.',
    images: ['/og-image.png'],
    creator: '@devlandersoftware',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Development Documentation',
  other: {
    'theme-color': '#3B82F6',
    'msapplication-TileColor': '#3B82F6',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Dev Docs',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="theme-color" content="#3B82F6" />
        
        {/* Google AdSense Script */}
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT && (
          <Script
            id="adsense-script"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Devlander Software - Development Guidelines",
              "description": "Internal development standards and guidelines for Devlander Software team",
              "url": "https://your-domain.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://your-domain.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Devlander Software Team",
                "url": "https://your-domain.com"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Ads and Analytics Integration */}
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
