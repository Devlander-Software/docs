import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TypeScript Guidelines - Devlander Software',
  description: 'Comprehensive TypeScript guidelines and best practices for consistent development.',
};

export default function TypeScriptGuidelinesPage() {
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
                TypeScript Guidelines
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
              TypeScript Guidelines
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              This document outlines the TypeScript guidelines and best practices used at Devlander Software. 
              These guidelines ensure type safety, maintainable code, and consistent development practices.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">⚙️ Configuration</h3>
            <p className="text-gray-600 mb-4">
              Use strict TypeScript configuration for maximum type safety:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`}
            </pre>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">📝 Type Definitions</h3>
            <p className="text-gray-600 mb-4">
              Always define explicit types for better code clarity and maintainability:
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">✅ Good</h4>
                <pre className="bg-green-50 p-3 rounded text-sm">
{`interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

function createUser(userData: Omit<User, 'id' | 'createdAt'>): User {
  return {
    id: generateId(),
    ...userData,
    createdAt: new Date()
  };
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">❌ Avoid</h4>
                <pre className="bg-red-50 p-3 rounded text-sm">
{`function createUser(userData: any): any {
  return {
    id: generateId(),
    ...userData,
    createdAt: new Date()
  };
}`}
                </pre>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">🔧 Utility Types</h3>
            <p className="text-gray-600 mb-4">
              Leverage TypeScript utility types for better type manipulation:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li><strong>Partial&lt;T&gt;</strong> - Make all properties optional</li>
              <li><strong>Required&lt;T&gt;</strong> - Make all properties required</li>
              <li><strong>Pick&lt;T, K&gt;</strong> - Select specific properties</li>
              <li><strong>Omit&lt;T, K&gt;</strong> - Exclude specific properties</li>
              <li><strong>Record&lt;K, T&gt;</strong> - Create object type with specific keys</li>
              <li><strong>ReturnType&lt;T&gt;</strong> - Extract return type of function</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 Function Types</h3>
            <p className="text-gray-600 mb-4">
              Use explicit function types and avoid implicit any:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// ✅ Good - Explicit function type
type EventHandler = (event: MouseEvent) => void;

const handleClick: EventHandler = (event) => {
  console.log('Clicked:', event.target);
};

// ✅ Good - Generic function
function mapArray<T, U>(array: T[], mapper: (item: T) => U): U[] {
  return array.map(mapper);
}

// ❌ Avoid - Implicit any
const handleClick = (event) => {
  console.log('Clicked:', event.target);
};`}
            </pre>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">🏗️ Component Types</h3>
            <p className="text-gray-600 mb-4">
              Define proper types for React components:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick
}) => {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};`}
            </pre>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">🔒 Strict Null Checks</h3>
            <p className="text-gray-600 mb-4">
              Always handle null and undefined explicitly:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// ✅ Good - Explicit null handling
function getUserName(user: User | null): string {
  if (!user) {
    return 'Unknown User';
  }
  return user.name;
}

// ✅ Good - Optional chaining
const userName = user?.name ?? 'Unknown User';

// ❌ Avoid - Implicit null handling
function getUserName(user: User | null): string {
  return user.name; // Error: Object is possibly null
}`}
            </pre>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">📦 Module Organization</h3>
            <p className="text-gray-600 mb-4">
              Organize types and interfaces in dedicated files:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export type UserRole = 'admin' | 'user' | 'guest';

// types/api.ts
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// types/events.ts
export interface FormEvent {
  target: HTMLFormElement;
  preventDefault: () => void;
}`}
            </pre>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">🧪 Testing with Types</h3>
            <p className="text-gray-600 mb-4">
              Use TypeScript in your tests for better type safety:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct props', () => {
    const mockOnClick = jest.fn();
    
    render(
      <Button
        variant="primary"
        size="medium"
        onClick={mockOnClick}
      >
        Click me
      </Button>
    );
    
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});`}
            </pre>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">🚫 Common Anti-patterns</h3>
            <p className="text-gray-600 mb-4">
              Avoid these common TypeScript anti-patterns:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li><strong>Using any</strong> - Always prefer specific types</li>
              <li><strong>Type assertions without checks</strong> - Use type guards instead</li>
              <li><strong>Ignoring compiler errors</strong> - Fix type issues properly</li>
              <li><strong>Overly complex types</strong> - Keep types simple and readable</li>
              <li><strong>Not using utility types</strong> - Leverage built-in utility types</li>
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-yellow-900 mb-2">
                💡 Best Practices Summary
              </h4>
              <ul className="list-disc pl-6 text-yellow-800">
                <li>Always use strict TypeScript configuration</li>
                <li>Define explicit types for all functions and variables</li>
                <li>Use utility types to manipulate existing types</li>
                <li>Handle null and undefined explicitly</li>
                <li>Organize types in dedicated files</li>
                <li>Write tests with proper TypeScript types</li>
                <li>Avoid the <code>any</code> type whenever possible</li>
              </ul>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Related Documentation</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/docs/standards/project_guidelines_standard"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h5 className="font-semibold text-gray-900">Project Guidelines</h5>
                  <p className="text-sm text-gray-600">Standard project setup and guidelines</p>
                </Link>
                <Link
                  href="/docs/development/react-standards"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h5 className="font-semibold text-gray-900">React Standards</h5>
                  <p className="text-sm text-gray-600">React development guidelines</p>
                </Link>
                <Link
                  href="/docs/testing/testing-strategy"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h5 className="font-semibold text-gray-900">Testing Strategy</h5>
                  <p className="text-sm text-gray-600">Comprehensive testing guidelines</p>
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