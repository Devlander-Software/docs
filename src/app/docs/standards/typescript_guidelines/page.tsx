import React from 'react';
import DocumentationViewer from '../../../../components/DocumentationViewer';
import Link from 'next/link';

export default function TypeScriptGuidelinesPage() {
  const content = `# TypeScript Development Guidelines

## Overview

This document provides comprehensive guidelines for TypeScript development, with a strong emphasis on using path aliases instead of relative paths. It covers configuration, best practices, project structure, and migration strategies.

## Table of Contents

1. [Path Aliases vs Relative Paths](#path-aliases-vs-relative-paths)
2. [Configuration](#configuration)
3. [Project Structure](#project-structure)
4. [Import/Export Guidelines](#importexport-guidelines)
5. [Type Definitions](#type-definitions)
6. [Best Practices](#best-practices)
7. [Migration Guide](#migration-guide)

## Path Aliases vs Relative Paths

### Why Use Path Aliases?

**❌ Avoid Relative Paths:**
\`\`\`typescript
// Hard to maintain and understand
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../../hooks/useAuth';
import { apiClient } from '../../../../lib/api-client';
\`\`\`

**✅ Use Path Aliases:**
\`\`\`typescript
// Clean, maintainable, and self-documenting
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/lib/api-client';
\`\`\`

### Benefits of Path Aliases

1. **Maintainability**: No need to update imports when moving files
2. **Readability**: Clear indication of import source
3. **Refactoring**: Easier to move files without breaking imports
4. **IDE Support**: Better autocomplete and navigation
5. **Team Consistency**: Standardized import patterns

## Configuration

### tsconfig.json

\`\`\`json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/lib/*": ["src/lib/*"],
      "@/types/*": ["src/types/*"],
      "@/utils/*": ["src/utils/*"],
      "@/styles/*": ["src/styles/*"],
      "@/pages/*": ["src/pages/*"],
      "@/api/*": ["src/api/*"],
      "@/constants/*": ["src/constants/*"]
    },
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", ".next", "out"]
}
\`\`\`

### Next.js Configuration

\`\`\`javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};

module.exports = nextConfig;
\`\`\`

### ESLint Configuration

\`\`\`javascript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
  ],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../*', './*'],
            message: 'Use path aliases instead of relative imports',
          },
        ],
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
\`\`\`

## Project Structure

### Recommended Directory Structure

\`\`\`
src/
├── components/           # Reusable UI components
│   ├── ui/             # Basic UI components
│   ├── forms/          # Form components
│   └── layout/         # Layout components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── styles/             # Global styles and themes
├── pages/              # Page components (Next.js)
├── api/                # API-related code
├── constants/          # Application constants
└── services/           # Business logic services
\`\`\`

### Index Files Strategy

Create index files for clean imports:

\`\`\`typescript
// src/components/ui/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { Modal } from './Modal';

// src/hooks/index.ts
export { useAuth } from './useAuth';
export { useLocalStorage } from './useLocalStorage';
export { useDebounce } from './useDebounce';
\`\`\`

## Import/Export Guidelines

### Import Order

1. **Built-in modules** (Node.js, React)
2. **External dependencies** (third-party packages)
3. **Internal modules** (your application code)
4. **Relative imports** (same directory)

\`\`\`typescript
// ✅ Correct import order
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/lib/api-client';
import { User } from '@/types/user';

import { formatDate } from './utils';
\`\`\`

### Export Patterns

\`\`\`typescript
// ✅ Named exports (preferred)
export const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export const useAuth = () => {
  // hook implementation
};

// ✅ Default exports (for main components)
const UserProfile = () => {
  return <div>User Profile</div>;
};

export default UserProfile;

// ✅ Re-export pattern
export { Button } from './Button';
export { Input } from './Input';
\`\`\`

## Type Definitions

### Interface vs Type

**Use interfaces for object shapes:**
\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface UserProps {
  user: User;
  onEdit?: (user: User) => void;
}
\`\`\`

**Use types for unions, intersections, and complex types:**
\`\`\`typescript
type Status = 'loading' | 'success' | 'error';

type ApiResponse<T> = {
  data: T;
  status: Status;
  message?: string;
};

type ButtonVariant = 'primary' | 'secondary' | 'danger';
\`\`\`

### Generic Types

\`\`\`typescript
// Generic component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

const List = <T,>({ items, renderItem, keyExtractor }: ListProps<T>) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
};
\`\`\`

## Best Practices

### Component Patterns

**Functional Components with Hooks:**
\`\`\`typescript
import React, { useState, useEffect } from 'react';
import { User } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

interface UserProfileProps {
  userId: string;
  onUpdate?: (user: User) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId, onUpdate }) => {
  const { user, loading, error } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <Button onClick={() => setIsEditing(true)}>
        Edit Profile
      </Button>
    </div>
  );
};
\`\`\`

### Custom Hooks

\`\`\`typescript
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
\`\`\`

### Service Layer

\`\`\`typescript
// src/services/userService.ts
import { User, CreateUserRequest, UpdateUserRequest } from '@/types/user';
import { apiClient } from '@/lib/api-client';

export class UserService {
  static async getUsers(): Promise<User[]> {
    const response = await apiClient.get('/users');
    return response.data;
  }

  static async getUserById(id: string): Promise<User> {
    const response = await apiClient.get(\`/users/\${id}\`);
    return response.data;
  }

  static async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await apiClient.post('/users', userData);
    return response.data;
  }

  static async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    const response = await apiClient.put(\`/users/\${id}\`, userData);
    return response.data;
  }

  static async deleteUser(id: string): Promise<void> {
    await apiClient.delete(\`/users/\${id}\`);
  }
}
\`\`\`

## Migration Guide

### From Relative to Path Aliases

1. **Update tsconfig.json** with path mappings
2. **Update ESLint configuration** to enforce path aliases
3. **Run migration script** to update imports
4. **Update VS Code settings** for better IntelliSense

### Migration Script

\`\`\`javascript
// scripts/migrate-imports.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const updateImports = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace relative imports with path aliases
  content = content.replace(
    /from ['"]\.\.\/\.\.\/\.\.\/components\/([^'"]+)['"]/g,
    "from '@/components/$1'"
  );
  
  content = content.replace(
    /from ['"]\.\.\/\.\.\/hooks\/([^'"]+)['"]/g,
    "from '@/hooks/$1'"
  );
  
  content = content.replace(
    /from ['"]\.\.\/\.\.\/lib\/([^'"]+)['"]/g,
    "from '@/lib/$1'"
  );
  
  fs.writeFileSync(filePath, content);
};

// Find all TypeScript files
const files = glob.sync('src/**/*.{ts,tsx}');
files.forEach(updateImports);
\`\`\`

### VS Code Settings

\`\`\`json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "path-intellisense.mappings": {
    "@": "\${workspaceFolder}/src"
  }
}
\`\`\`

## Quality Assurance

### ESLint Rules

- Enforce path aliases over relative imports
- Maintain consistent import order
- Prevent unused imports
- Enforce naming conventions

### Pre-commit Hooks

\`\`\`json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
\`\`\`

### Automated Checks

- TypeScript compilation
- ESLint validation
- Import path validation
- Code formatting with Prettier

---

This guide ensures consistent, maintainable TypeScript code with clean import paths and proper project structure.
`;

  const navigation = [
    { title: 'Project Guidelines Standard', href: '/docs/standards/project_guidelines_standard' },
    { title: 'React Standards', href: '/docs/development/react-standards' },
    { title: 'Testing Strategy', href: '/docs/testing/testing-strategy' },
    { title: 'Security Implementation', href: '/docs/security/security-implementation' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/docs" className="text-gray-500 hover:text-gray-700 mr-4">
                ← Back to Documentation
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">TypeScript Guidelines</h1>
            </div>
            <nav className="flex space-x-8">
              <Link href="/docs" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Documentation
              </Link>
              <Link href="/" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DocumentationViewer
          content={content}
          title="TypeScript Guidelines"
          navigation={navigation}
        />
      </main>
    </div>
  );
} 