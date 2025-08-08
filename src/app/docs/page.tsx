import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation - Devlander Software',
  description: 'Comprehensive development documentation covering TypeScript, React, testing, security, and DevOps best practices.',
};

export default function DocsPage() {
  const docCategories = [
    {
      title: '🏗️ Architecture & Design',
      description: 'System architecture, database design, and API principles',
      href: '/docs/architecture',
      color: 'bg-blue-50 border-blue-200',
      icon: '🏗️',
      articles: [
        { title: 'Database Design Principles', href: '/docs/architecture/database-design' },
        { title: 'API Design Guidelines', href: '/docs/architecture/api-design' },
        { title: 'System Architecture Patterns', href: '/docs/architecture/patterns' }
      ]
    },
    {
      title: '🛠️ Development Standards',
      description: 'TypeScript, React, and development guidelines',
      href: '/docs/development',
      color: 'bg-green-50 border-green-200',
      icon: '🛠️',
      articles: [
        { title: 'TypeScript Guidelines', href: '/docs/standards/typescript_guidelines' },
        { title: 'React Best Practices', href: '/docs/development/react-standards' },
        { title: 'Code Style Guide', href: '/docs/development/code-style' }
      ]
    },
    {
      title: '🧪 Testing & Quality',
      description: 'Unit, integration, E2E, and performance testing',
      href: '/docs/testing',
      color: 'bg-purple-50 border-purple-200',
      icon: '🧪',
      articles: [
        { title: 'Testing Strategy', href: '/docs/testing/testing-strategy' },
        { title: 'Unit Testing Guide', href: '/docs/testing/unit-testing' },
        { title: 'Integration Testing', href: '/docs/testing/integration-testing' },
        { title: 'E2E Testing', href: '/docs/testing/e2e-testing' }
      ]
    },
    {
      title: '🔒 Security & Compliance',
      description: 'Authentication, authorization, and security standards',
      href: '/docs/security',
      color: 'bg-red-50 border-red-200',
      icon: '🔒',
      articles: [
        { title: 'Security Implementation', href: '/docs/security/security-implementation' },
        { title: 'Authentication Guidelines', href: '/docs/security/authentication' },
        { title: 'Authorization Best Practices', href: '/docs/security/authorization' }
      ]
    },
    {
      title: '🚀 DevOps & Deployment',
      description: 'CI/CD, containerization, and infrastructure',
      href: '/docs/devops',
      color: 'bg-orange-50 border-orange-200',
      icon: '🚀',
      articles: [
        { title: 'CI/CD Pipeline Setup', href: '/docs/devops/cicd' },
        { title: 'Docker Guidelines', href: '/docs/devops/docker' },
        { title: 'Deployment Strategies', href: '/docs/devops/deployment' }
      ]
    },
    {
      title: '📚 Documentation Standards',
      description: 'Writing guidelines and documentation best practices',
      href: '/docs/documentation',
      color: 'bg-indigo-50 border-indigo-200',
      icon: '📚',
      articles: [
        { title: 'Documentation Guidelines', href: '/docs/documentation/guidelines' },
        { title: 'API Documentation', href: '/docs/documentation/api-docs' },
        { title: 'README Standards', href: '/docs/documentation/readme' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
                ← Back to Home
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Documentation
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Devlander Software Documentation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive development standards and guidelines covering all aspects of modern software development.
            These guidelines are used internally by our team and you&apos;re welcome to reference them for your projects.
          </p>
        </div>

        {/* Documentation Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {docCategories.map((category) => (
            <div key={category.href} className={`rounded-lg border-2 p-6 ${category.color} hover:shadow-lg transition-all duration-200`}>
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{category.icon}</span>
                <h3 className="text-xl font-semibold text-gray-900">
                  {category.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-6">{category.description}</p>
              
              <div className="space-y-2">
                {category.articles.map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="block text-blue-600 hover:text-blue-800 font-medium hover:underline"
                  >
                    {article.title}
                  </Link>
                ))}
              </div>
              
              <div className="mt-6">
                <Link
                  href={category.href}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                >
                  View all {category.title.split(' ')[1]} articles
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quick Access
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/docs/standards/project_guidelines_standard"
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              <h4 className="font-semibold text-gray-900">Project Guidelines</h4>
              <p className="text-sm text-gray-600 mt-1">Standard project setup</p>
            </Link>
            <Link
              href="/docs/standards/typescript_guidelines"
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              <h4 className="font-semibold text-gray-900">TypeScript Guide</h4>
              <p className="text-sm text-gray-600 mt-1">TypeScript best practices</p>
            </Link>
            <Link
              href="/docs/testing/testing-strategy"
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              <h4 className="font-semibold text-gray-900">Testing Strategy</h4>
              <p className="text-sm text-gray-600 mt-1">Comprehensive testing guide</p>
            </Link>
            <Link
              href="/docs/security/security-implementation"
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              <h4 className="font-semibold text-gray-900">Security Guide</h4>
              <p className="text-sm text-gray-600 mt-1">Security implementation</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 