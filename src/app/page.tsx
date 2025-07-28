import React from 'react';
import Link from 'next/link';

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
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Comprehensive Development Standards
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A complete documentation system with interconnected guidelines covering all aspects 
              of modern software development. Eliminate duplication, maintain high standards, 
              and provide clear navigation for your team.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link
                href="/docs"
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Browse Documentation
              </Link>
              <Link
                href="/docs/standards/project_guidelines_standard"
                className="bg-gray-600 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
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
            Key Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">50+ Documents</h4>
              <p className="text-gray-600 text-sm">
                Comprehensive coverage of all development areas
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Interconnected</h4>
              <p className="text-gray-600 text-sm">
                Cross-referenced documentation with no duplication
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Role-Based</h4>
              <p className="text-gray-600 text-sm">
                Different entry points for different team members
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Automated</h4>
              <p className="text-gray-600 text-sm">
                Tools and scripts for standards adoption
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
              Development Documentation System v1.0.0
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 