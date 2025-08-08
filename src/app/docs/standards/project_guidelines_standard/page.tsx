import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Guidelines Standard - Devlander Software',
  description: 'Standard project setup and guidelines for consistent development practices.',
};

export default function ProjectGuidelinesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/docs" className="text-gray-500 hover:text-gray-700 mr-4">
                ← Back to Documentation
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                Project Guidelines Standard
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Project Guidelines Standard
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              This document outlines the standard guidelines for setting up and maintaining projects 
              at Devlander Software. These guidelines ensure consistency, maintainability, and 
              high code quality across all our projects.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">📁 Project Structure</h3>
            <p className="text-gray-600 mb-4">
              Every project should follow a consistent directory structure:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`project-name/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── types/
│   └── styles/
├── public/
├── tests/
├── docs/
├── .github/
├── package.json
├── README.md
├── .gitignore
├── .eslintrc.js
├── .prettierrc
└── tsconfig.json`}
            </pre>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">🔧 Essential Dependencies</h3>
            <p className="text-gray-600 mb-4">
              All projects must include these core dependencies:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li><strong>TypeScript</strong> - For type safety and better development experience</li>
              <li><strong>ESLint</strong> - For code linting and style enforcement</li>
              <li><strong>Prettier</strong> - For consistent code formatting</li>
              <li><strong>Jest</strong> - For unit testing</li>
              <li><strong>Husky</strong> - For git hooks</li>
              <li><strong>lint-staged</strong> - For pre-commit linting</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">📝 Documentation Requirements</h3>
            <p className="text-gray-600 mb-4">
              Every project must include comprehensive documentation:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li><strong>README.md</strong> - Project overview, setup instructions, and usage examples</li>
              <li><strong>API Documentation</strong> - For backend projects with API endpoints</li>
              <li><strong>Component Documentation</strong> - For frontend projects with reusable components</li>
              <li><strong>Deployment Guide</strong> - Step-by-step deployment instructions</li>
              <li><strong>Contributing Guidelines</strong> - How to contribute to the project</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">🧪 Testing Standards</h3>
            <p className="text-gray-600 mb-4">
              All projects must maintain high test coverage:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li><strong>Unit Tests</strong> - Minimum 80% coverage for critical business logic</li>
              <li><strong>Integration Tests</strong> - For API endpoints and database operations</li>
              <li><strong>E2E Tests</strong> - For critical user workflows</li>
              <li><strong>Performance Tests</strong> - For high-traffic applications</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">🔒 Security Guidelines</h3>
            <p className="text-gray-600 mb-4">
              Security must be prioritized in all projects:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li><strong>Input Validation</strong> - All user inputs must be validated and sanitized</li>
              <li><strong>Authentication</strong> - Implement secure authentication mechanisms</li>
              <li><strong>Authorization</strong> - Proper role-based access control</li>
              <li><strong>Data Encryption</strong> - Sensitive data must be encrypted at rest and in transit</li>
              <li><strong>Security Headers</strong> - Implement proper security headers</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">🚀 Deployment Standards</h3>
            <p className="text-gray-600 mb-4">
              Consistent deployment practices across all projects:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li><strong>CI/CD Pipeline</strong> - Automated testing and deployment</li>
              <li><strong>Environment Management</strong> - Separate configs for dev, staging, and production</li>
              <li><strong>Monitoring</strong> - Application performance and error monitoring</li>
              <li><strong>Backup Strategy</strong> - Regular data backups and recovery procedures</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Code Quality Standards</h3>
            <p className="text-gray-600 mb-4">
              Maintain high code quality through:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li><strong>Code Reviews</strong> - All changes must be reviewed by at least one team member</li>
              <li><strong>Automated Linting</strong> - ESLint and Prettier configurations</li>
              <li><strong>Type Safety</strong> - Strict TypeScript configurations</li>
              <li><strong>Performance Optimization</strong> - Regular performance audits</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">
                💡 Quick Start Template
              </h4>
              <p className="text-blue-800 mb-4">
                Use our project template to quickly set up a new project with all these guidelines:
              </p>
              <code className="bg-blue-100 text-blue-900 px-3 py-1 rounded text-sm">
                npx create-devlander-project my-project
              </code>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Related Documentation</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/docs/standards/typescript_guidelines"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h5 className="font-semibold text-gray-900">TypeScript Guidelines</h5>
                  <p className="text-sm text-gray-600">TypeScript best practices and standards</p>
                </Link>
                <Link
                  href="/docs/testing/testing-strategy"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h5 className="font-semibold text-gray-900">Testing Strategy</h5>
                  <p className="text-sm text-gray-600">Comprehensive testing guidelines</p>
                </Link>
                <Link
                  href="/docs/security/security-implementation"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h5 className="font-semibold text-gray-900">Security Implementation</h5>
                  <p className="text-sm text-gray-600">Security best practices and implementation</p>
                </Link>
                <Link
                  href="/CONTRIBUTING"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h5 className="font-semibold text-gray-900">Contributing Guidelines</h5>
                  <p className="text-sm text-gray-600">How to contribute to our projects</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 