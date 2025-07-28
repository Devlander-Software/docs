import React from 'react';
import Link from 'next/link';

export default function DocumentationIndex() {
  const categories = [
    {
      title: '🏗️ Architecture & Design',
      description: 'System architecture, database design, and API principles',
      href: '/docs/architecture',
      color: 'bg-blue-50 border-blue-200',
      icon: '🏗️',
      items: [
        { title: 'System Architecture', href: '/docs/architecture/system-architecture' },
        { title: 'Database Design', href: '/docs/architecture/database-design' },
        { title: 'API Design Principles', href: '/docs/architecture/api-design' },
        { title: 'Microservices vs Monolith', href: '/docs/architecture/microservices' },
      ]
    },
    {
      title: '🛠️ Development Standards',
      description: 'TypeScript, React, and development guidelines',
      href: '/docs/development',
      color: 'bg-green-50 border-green-200',
      icon: '🛠️',
      items: [
        { title: 'TypeScript Guidelines', href: '/docs/development/typescript-guidelines' },
        { title: 'React Standards', href: '/docs/development/react-standards' },
        { title: 'Code Organization', href: '/docs/development/code-organization' },
        { title: 'Naming Conventions', href: '/docs/development/naming-conventions' },
      ]
    },
    {
      title: '🧪 Testing & Quality',
      description: 'Unit, integration, E2E, and performance testing',
      href: '/docs/testing',
      color: 'bg-purple-50 border-purple-200',
      icon: '🧪',
      items: [
        { title: 'Testing Strategy', href: '/docs/testing/testing-strategy' },
        { title: 'Unit Testing', href: '/docs/testing/unit-testing' },
        { title: 'Integration Testing', href: '/docs/testing/integration-testing' },
        { title: 'E2E Testing', href: '/docs/testing/e2e-testing' },
      ]
    },
    {
      title: '🔒 Security & Compliance',
      description: 'Authentication, authorization, and security standards',
      href: '/docs/security',
      color: 'bg-red-50 border-red-200',
      icon: '🔒',
      items: [
        { title: 'Security Implementation', href: '/docs/security/security-implementation' },
        { title: 'Authentication', href: '/docs/security/authentication' },
        { title: 'Authorization', href: '/docs/security/authorization' },
        { title: 'Data Protection', href: '/docs/security/data-protection' },
      ]
    },
    {
      title: '🚀 DevOps & Deployment',
      description: 'CI/CD, containerization, and infrastructure',
      href: '/docs/devops',
      color: 'bg-orange-50 border-orange-200',
      icon: '🚀',
      items: [
        { title: 'CI/CD Pipeline', href: '/docs/devops/ci-cd-pipeline' },
        { title: 'Containerization', href: '/docs/devops/containerization' },
        { title: 'Infrastructure as Code', href: '/docs/devops/infrastructure' },
        { title: 'Monitoring & Observability', href: '/docs/devops/monitoring' },
      ]
    },
    {
      title: '📚 Documentation Standards',
      description: 'Writing guidelines and documentation best practices',
      href: '/docs/documentation',
      color: 'bg-indigo-50 border-indigo-200',
      icon: '📚',
      items: [
        { title: 'Documentation Guidelines', href: '/docs/documentation/guidelines' },
        { title: 'API Documentation', href: '/docs/documentation/api-docs' },
        { title: 'Code Documentation', href: '/docs/documentation/code-docs' },
        { title: 'User Guides', href: '/docs/documentation/user-guides' },
      ]
    },
  ];

  const quickLinks = [
    { title: 'Project Guidelines Standard', href: '/docs/standards/project_guidelines_standard' },
    { title: 'TypeScript Guidelines', href: '/docs/standards/typescript_guidelines' },
    { title: 'Testing Strategy', href: '/docs/testing/testing-strategy' },
    { title: 'Security Implementation', href: '/docs/security/security-implementation' },
    { title: 'Contributing Guidelines', href: '/CONTRIBUTING' },
    { title: 'Changelog', href: '/CHANGELOG' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-gray-500 hover:text-gray-700 mr-4">
                ← Back to Home
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/CONTRIBUTING" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Contributing
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Development Documentation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our interconnected documentation system covering all aspects of modern software development. 
              Each category contains detailed guidelines, best practices, and practical examples.
            </p>
          </div>
        </section>

        {/* Documentation Categories */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Documentation Categories
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories.map((category) => (
              <div key={category.href} className={`p-6 rounded-lg border-2 ${category.color} hover:shadow-lg transition-all duration-200`}>
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  <h4 className="text-xl font-semibold text-gray-900">{category.title}</h4>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="space-y-2">
                  {category.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                    >
                      • {item.title}
                    </Link>
                  ))}
                </div>
                <div className="mt-4">
                  <Link
                    href={category.href}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View all {category.title.split(' ')[0]} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Quick Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <h4 className="font-medium text-gray-900">{link.title}</h4>
              </Link>
            ))}
          </div>
        </section>

        {/* Getting Started */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Getting Started
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Choose Your Role</h4>
              <p className="text-gray-600 text-sm">
                Select the documentation category that matches your current role or area of focus.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Follow Guidelines</h4>
              <p className="text-gray-600 text-sm">
                Read through the guidelines and implement the standards in your projects.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Contribute</h4>
              <p className="text-gray-600 text-sm">
                Help improve the documentation by following our contributing guidelines.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 