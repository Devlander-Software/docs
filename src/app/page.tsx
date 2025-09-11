import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import SearchBox from '../components/SearchBox';
import AnalyticsExample from '../components/AnalyticsExample';

export const metadata: Metadata = {
  title: 'Devlander Software - Development Guidelines',
  description: 'Internal development standards and guidelines for Devlander Software team. Covering TypeScript, React, testing, security, and DevOps best practices.',
  keywords: [
    'devlander software',
    'development guidelines',
    'internal standards',
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
    title: 'Devlander Software - Development Guidelines',
    description: 'Internal development standards and guidelines for Devlander Software team.',
    type: 'website',
    url: 'https://your-domain.com',
    siteName: 'Devlander Software',
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
  },
  alternates: {
    canonical: 'https://your-domain.com',
  },
  other: {
    'article:published_time': new Date().toISOString(),
    'article:modified_time': new Date().toISOString(),
    'article:author': 'Devlander Software Team',
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

  const mediumArticles = {
    'NPM & Package Development': [
      {
        title: 'How to Add TypeScript to Your npm Package',
        url: 'https://medium.com/devlander/how-to-add-typescript-to-your-npm-package-272d013809b9',
        description: 'Step-by-step guide to integrate TypeScript into existing NPM packages',
        date: 'Jan 22, 2025'
      },
      {
        title: 'Testing and Deploying Your NPM Package with Jest and Unit Testing',
        url: 'https://medium.com/@techwithlandon/testing-and-deploying-your-npm-package-with-jest-and-unit-testing-ca4acc0af641',
        description: 'Add Jest and unit testing to your NPM package for reliable deployment',
        date: 'Jan 2025'
      },
      {
        title: 'How to Build Your First NPM Package: validators',
        url: 'https://medium.com/@techwithlandon/how-to-build-your-first-npm-package-validators-ad7d72d303d2',
        description: 'Complete guide to building your first NPM package with practical examples',
        date: 'Jan 2025'
      },
      {
        title: 'How to Plan and Structure Your NPM Package for Success',
        url: 'https://medium.com/devlander/how-to-plan-and-structure-your-npm-package-for-success-956991cb6768',
        description: 'Best practices for creating robust, maintainable NPM packages',
        date: 'Jan 8, 2025'
      },
      {
        title: 'NPM Packages: What They Are, Where They Came From, and When to Use Them',
        url: 'https://medium.com/devlander/npm-packages-what-they-are-where-they-came-from-and-when-to-use-them-7304c411c1c5',
        description: 'Comprehensive overview of NPM packages and their ecosystem',
        date: 'Jan 2025'
      },
      {
        title: 'Setting up ESLint and Prettier for Your NPM Package',
        url: 'https://medium.com/@techwithlandon/setting-up-eslint-and-prettier-for-your-npm-package-9e5e549f7b3e',
        description: 'Configure code quality tools for your NPM package development',
        date: 'Jan 2025'
      }
    ],
    'Database & Architecture': [
      {
        title: 'The Unspoken Rules of Database Design',
        url: 'https://medium.com/@techwithlandon/the-unspoken-rules-of-database-design-everything-youll-regret-not-doing-e0c137394591',
        description: 'Essential database design principles and best practices',
        date: 'Jan 2025'
      },
      {
        title: 'How to Design a Scalable Database That Can Be Offline-First and Syncable',
        url: 'https://medium.com/@techwithlandon/how-to-design-a-scalable-database-that-can-be-offline-first-and-syncable-98e0731e3f93',
        description: 'Advanced database architecture for offline-first applications',
        date: 'Jan 2025'
      }
    ],
    'React & Frontend Development': [
      {
        title: 'What Are Higher-Order Components (HOCs)? A Comprehensive Guide',
        url: 'https://medium.com/devlander/what-are-higher-order-components-hocs-a-comprehensive-guide-d17fa1ca99cf',
        description: 'Deep dive into React HOCs with practical examples',
        date: 'Jan 2025'
      },
      {
        title: 'You\'re Using Context Providers the Wrong Way. Here\'s How to Fix It',
        url: 'https://medium.com/devlander/youre-using-context-providers-the-wrong-way-here-s-how-to-fix-it-c91247b6e828',
        description: 'Common React Context mistakes and how to avoid them',
        date: 'Jan 2025'
      }
    ],
    'Security & API Development': [
      {
        title: 'A Comprehensive Guide to Securing Your API for Web and Mobile Applications Using Express.js',
        url: 'https://medium.com/devlander/a-comprehensive-guide-to-securing-your-api-for-web-and-mobile-applications-using-expressjs-12123cfedf06',
        description: 'Complete security guide for Express.js APIs',
        date: 'Jan 2025'
      }
    ],
    'Development Tools & Setup': [
      {
        title: 'How to Answer Apple\'s Encryption Question When Submitting Your iOS App',
        url: 'https://medium.com/@techwithlandon/how-to-answer-apples-encryption-question-when-submitting-your-ios-app-4eb888ab9261',
        description: 'iOS app submission guide for encryption compliance',
        date: 'Jan 2025'
      },
      {
        title: 'What is Git? A Complete Beginner\'s Guide to Version Control and GitHub',
        url: 'https://medium.com/@techwithlandon/what-is-git-a-complete-beginners-guide-to-version-control-and-github-3327797528a5',
        description: 'Comprehensive Git and GitHub tutorial for beginners',
        date: 'Jan 2025'
      },
      {
        title: 'Install Docker on Windows 11: Step-by-Step Guide for a Fresh WSL 2 Setup',
        url: 'https://medium.com/devlander/install-docker-on-windows-11-step-by-step-guide-for-a-fresh-wsl-2-setup-8945d1830c41',
        description: 'Complete Docker setup guide for Windows 11 with WSL 2',
        date: 'Jan 2025'
      },
      {
        title: 'Master Python Version Management on macOS',
        url: 'https://medium.com/@techwithlandon/master-python-version-management-on-macos-a-step-by-step-guide-to-pyenv-virtualenv-348b81712063',
        description: 'Step-by-step guide to pyenv and virtualenv on macOS',
        date: 'Jan 2025'
      },
      {
        title: 'How to Install Git on Your Mac and Windows',
        url: 'https://medium.com/devlander/how-to-install-git-on-your-mac-and-windows-1dc13b49e42e',
        description: 'Git installation guide for both macOS and Windows',
        date: 'Jan 2025'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Devlander Software
              </h1>
              <span className="ml-4 text-lg text-gray-600 font-medium">
                Development Guidelines
              </span>
            </div>
            <nav className="flex space-x-8">
              <Link
                href="/docs"
                className="nav-link"
              >
                Documentation
              </Link>
              <Link
                href="/CONTRIBUTING"
                className="nav-link"
              >
                Contributing
              </Link>
              <Link
                href="/CHANGELOG"
                className="nav-link"
              >
                Changelog
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Internal Development Guidelines
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Welcome to Devlander Software&apos;s internal development standards and guidelines. 
              These guidelines are used by our team internally and you&apos;re welcome to reference 
              them for your projects. Covering everything from TypeScript and React to testing, 
              security, and DevOps best practices.
            </p>
            
            {/* Search Box */}
            <div className="max-w-md mx-auto mb-8">
              <SearchBox />
            </div>
            
            <div className="flex justify-center space-x-4">
              <Link
                href="/docs"
                className="btn-primary"
              >
                Browse Documentation
              </Link>
              <Link
                href="/docs/standards/project_guidelines_standard"
                className="btn-secondary"
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
                className={`block p-6 rounded-lg border-2 hover:shadow-lg transition-all duration-200 card-hover ${section.color}`}
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

      {/* Analytics Example */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnalyticsExample />
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            About Our Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Internal Use</h4>
              <p className="text-gray-600 text-sm">
                Used by Devlander Software team internally
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Reference Available</h4>
              <p className="text-gray-600 text-sm">
                You&apos;re welcome to reference for your projects
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

      {/* Medium Articles */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            📝 Our Medium Articles
          </h3>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Explore our comprehensive guides and tutorials covering NPM packages, React development, 
            database design, security, and development tools. All articles are written by our team 
            and published on Medium.
          </p>
          
          {Object.entries(mediumArticles).map(([category, articles]) => (
            <div key={category} className="mb-12">
              <h4 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                {category}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <a
                    key={index}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-md"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="font-medium text-gray-900 line-clamp-2">
                        {article.title}
                      </h5>
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                        {article.date}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {article.description}
                    </p>
                    <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                      <span>Read on Medium</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
          
          <div className="text-center mt-12">
            <a
              href="https://medium.com/@techwithlandon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <span>View All Articles on Medium</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-300">
              © 2024 Devlander Software. Internal development guidelines.
            </p>
            <div className="mt-4 space-x-4">
              <Link href="/docs" className="text-gray-300 hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="/CONTRIBUTING" className="text-gray-300 hover:text-white transition-colors">
                Contributing
              </Link>
              <Link href="/CHANGELOG" className="text-gray-300 hover:text-white transition-colors">
                Changelog
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 