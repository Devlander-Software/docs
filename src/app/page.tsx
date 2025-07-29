import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import SearchBox from '../components/SearchBox';

export const metadata: Metadata = {
  title: 'Development Documentation System',
  description: 'Comprehensive development standards and guidelines for modern software development teams. Covering TypeScript, React, testing, security, and DevOps best practices.',
  keywords: [
    'development documentation',
    'software development standards',
    'typescript guidelines',
    'react best practices',
    'testing strategy',
    'security implementation',
    'devops guidelines',
    'code quality standards',
    'programming best practices',
    'development workflow',
    'software engineering standards',
    'technical documentation',
    'development guidelines',
    'coding standards',
    'software architecture',
    'development tools',
    'code review process',
    'quality assurance',
    'development methodology',
    'technical standards'
  ],
  openGraph: {
    title: 'Development Documentation System',
    description: 'Comprehensive development standards and guidelines for modern software development teams.',
    type: 'website',
    url: 'https://your-domain.com',
    siteName: 'Development Documentation System',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Development Documentation System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Development Documentation System',
    description: 'Comprehensive development standards and guidelines for modern software development teams.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://your-domain.com',
  },
  other: {
    'article:published_time': new Date().toISOString(),
    'article:modified_time': new Date().toISOString(),
    'article:author': 'Development Standards Team',
    'article:section': 'Technology',
    'article:tag': 'development,documentation,standards,guidelines,typescript,react,testing,security,devops',
  },
};

export default function HomePage() {
  const documentationSections = [
    {
      title: '🏗️ Architecture & Design',
      description: 'System architecture, database design, and API principles',
      href: '/docs/architecture',
      color: 'bg-blue-50 border-blue-200',
      icon: '🏗️'
    },
    {
      title: '🛠️ Development Standards',
      description: 'TypeScript, React, and development guidelines',
      href: '/docs/development',
      color: 'bg-green-50 border-green-200',
      icon: '🛠️'
    },
    {
      title: '🧪 Testing & Quality',
      description: 'Unit, integration, E2E, and performance testing',
      href: '/docs/testing',
      color: 'bg-purple-50 border-purple-200',
      icon: '🧪'
    },
    {
      title: '🔒 Security & Compliance',
      description: 'Authentication, authorization, and security standards',
      href: '/docs/security',
      color: 'bg-red-50 border-red-200',
      icon: '🔒'
    },
    {
      title: '🚀 DevOps & Deployment',
      description: 'CI/CD, containerization, and infrastructure',
      href: '/docs/devops',
      color: 'bg-orange-50 border-orange-200',
      icon: '🚀'
    },
    {
      title: '📚 Documentation Standards',
      description: 'Writing guidelines and documentation best practices',
      href: '/docs/documentation',
      color: 'bg-indigo-50 border-indigo-200',
      icon: '📚'
    }
  ];

  const quickLinks = [
    { title: 'Project Guidelines Standard', href: '/docs/standards/project_guidelines_standard' },
    { title: 'TypeScript Guidelines', href: '/docs/standards/typescript_guidelines' },
    { title: 'Testing Strategy', href: '/docs/testing/testing-strategy' },
    { title: 'Security Implementation', href: '/docs/security/security-implementation' },
    { title: 'Contributing Guidelines', href: '/CONTRIBUTING' },
    { title: 'Changelog', href: '/CHANGELOG' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Development Documentation System
              </h1>
            </div>
            <nav className="flex space-x-8">
              <Link
                href="/docs"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Documentation
              </Link>
              <Link
                href="/CONTRIBUTING"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contributing
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Comprehensive Development Standards
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A complete documentation system providing standards, guidelines, and automation tools 
              for modern software development teams. Covering everything from TypeScript and React 
              to testing, security, and DevOps best practices.
            </p>
            
            {/* Search Box */}
            <div className="max-w-md mx-auto mb-8">
              <SearchBox />
            </div>
            
            <div className="flex justify-center space-x-4">
              <Link
                href="/docs"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Documentation
              </Link>
              <Link
                href="/docs/standards/project_guidelines_standard"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Documentation Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentationSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className={`block p-6 rounded-lg border-2 hover:shadow-lg transition-all duration-200 ${section.color}`}
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{section.icon}</span>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {section.title}
                  </h4>
                </div>
                <p className="text-gray-600">{section.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Quick Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h4 className="font-medium text-gray-900">{link.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Our Documentation System?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Comprehensive</h4>
              <p className="text-gray-600 text-sm">
                Covering all aspects of modern software development
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Interconnected</h4>
              <p className="text-gray-600 text-sm">
                Cross-referenced content with clear navigation
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Practical</h4>
              <p className="text-gray-600 text-sm">
                Real-world examples and actionable guidelines
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Up-to-Date</h4>
              <p className="text-gray-600 text-sm">
                Regularly updated with latest best practices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-300">
              © 2024 Development Documentation System. All rights reserved.
            </p>
            <div className="mt-4 space-x-4">
              <Link href="/docs" className="text-gray-300 hover:text-white">
                Documentation
              </Link>
              <Link href="/CONTRIBUTING" className="text-gray-300 hover:text-white">
                Contributing
              </Link>
              <Link href="/CHANGELOG" className="text-gray-300 hover:text-white">
                Changelog
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 