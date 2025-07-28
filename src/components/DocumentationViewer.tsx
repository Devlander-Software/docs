import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Link from 'next/link';

interface NavigationItem {
  title: string;
  href: string;
  description?: string;
}

interface DocumentationViewerProps {
  content: string;
  title: string;
  navigation?: NavigationItem[];
}

const DocumentationViewer: React.FC<DocumentationViewerProps> = ({
  content,
  title,
  navigation = [],
}) => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Configure marked for syntax highlighting
    marked.setOptions({
      highlight: (code, lang) => {
        if (lang && SyntaxHighlighter.supportedLanguages.includes(lang)) {
          return SyntaxHighlighter.highlight(code, { language: lang }, tomorrow);
        }
        return code;
      },
      breaks: true,
      gfm: true,
    });

    const html = marked(content);
    setHtmlContent(html);
  }, [content]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {title}
              </h1>
            </div>
            <nav className="flex space-x-8">
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/docs"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Documentation
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar Navigation */}
          {navigation.length > 0 && (
            <aside className="hidden lg:block lg:col-span-3">
              <nav className="sticky top-8">
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                  Navigation
                </h3>
                <ul className="mt-4 space-y-2">
                  {navigation.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                      >
                        {item.title}
                        {item.description && (
                          <p className="text-xs text-gray-500 mt-1">
                            {item.description}
                          </p>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

          {/* Main Content */}
          <main className={`${navigation.length > 0 ? 'lg:col-span-9' : 'lg:col-span-12'}`}>
            <div className="prose prose-lg max-w-none">
              <div
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DocumentationViewer; 