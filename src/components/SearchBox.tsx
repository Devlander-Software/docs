"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SearchResult {
  title: string;
  description: string;
  href: string;
  category: string;
}

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Mock search data - in a real app, this would come from an API or search service
  const searchData: SearchResult[] = [
    {
      title: 'Project Guidelines Standard',
      description: 'Meta-framework for project consistency and quality standards',
      href: '/docs/standards/project_guidelines_standard',
      category: 'Standards'
    },
    {
      title: 'TypeScript Guidelines',
      description: 'Comprehensive TypeScript development standards with path aliases',
      href: '/docs/standards/typescript_guidelines',
      category: 'Development'
    },
    {
      title: 'Testing Strategy',
      description: 'Multi-level testing approach with unit, integration, and E2E testing',
      href: '/docs/testing/testing-strategy',
      category: 'Testing'
    },
    {
      title: 'Security Implementation',
      description: 'Authentication, authorization, and security best practices',
      href: '/docs/security/security-implementation',
      category: 'Security'
    },
    {
      title: 'Contributing Guidelines',
      description: 'How to contribute to the development documentation system',
      href: '/CONTRIBUTING',
      category: 'Process'
    },
    {
      title: 'Changelog',
      description: 'Track all changes and updates to the documentation system',
      href: '/CHANGELOG',
      category: 'Process'
    }
  ];

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filteredResults = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filteredResults);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      window.location.href = results[0].href;
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <Link
              key={index}
              href={result.href}
              className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{result.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{result.description}</p>
                  <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                    {result.category}
                  </span>
                </div>
                <div className="ml-2">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchBox; 