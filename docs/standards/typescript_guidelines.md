# TypeScript Development Guidelines 📝

## 🎯 Overview

This document establishes TypeScript-specific development guidelines with a strong emphasis on using path aliases instead of relative paths for better code organization, maintainability, and developer experience.

## 🚫 Relative Paths - What to Avoid

### ❌ Bad Examples

```typescript
// Avoid deep relative paths
import { UserService } from '../../../services/UserService';
import { Button } from '../../../../components/ui/Button';
import { utils } from '../../../../../utils/helpers';

// Avoid inconsistent relative paths
import { config } from './config';
import { logger } from '../utils/logger';
import { types } from '../../types';
```

### ✅ Good Examples with Aliases

```typescript
// Use path aliases for clean imports
import { UserService } from '@/services/UserService';
import { Button } from '@/components/ui/Button';
import { utils } from '@/utils/helpers';
import { config } from '@/config';
import { logger } from '@/utils/logger';
import { types } from '@/types';
```

## 🔧 Path Alias Configuration

### TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/pages/*": ["src/pages/*"],
      "@/services/*": ["src/services/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/styles/*": ["src/styles/*"],
      "@/assets/*": ["src/assets/*"],
      "@/config/*": ["src/config/*"],
      "@/constants/*": ["src/constants/*"],
      "@/lib/*": ["src/lib/*"],
      "@/api/*": ["src/api/*"],
      "@/store/*": ["src/store/*"],
      "@/middleware/*": ["src/middleware/*"]
    },
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "build"]
}
```

### Next.js Configuration (`next.config.js`)

```javascript
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
```

### Vite Configuration (`vite.config.ts`)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/styles': path.resolve(__dirname, './src/styles'),
      '@/assets': path.resolve(__dirname, './src/assets'),
      '@/config': path.resolve(__dirname, './src/config'),
      '@/constants': path.resolve(__dirname, './src/constants'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/api': path.resolve(__dirname, './src/api'),
      '@/store': path.resolve(__dirname, './src/store'),
      '@/middleware': path.resolve(__dirname, './src/middleware'),
    },
  },
});
```

### ESLint Configuration (`.eslintrc.js`)

```javascript
module.exports = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // Enforce absolute imports over relative imports
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../*', './*'],
            message: 'Use absolute imports with @ alias instead of relative imports.',
          },
        ],
      },
    ],
    // Enforce consistent import order
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
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
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
```

## 📁 Recommended Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── layout/
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Sidebar/
│   └── features/
│       ├── auth/
│       ├── dashboard/
│       └── settings/
├── pages/
│   ├── api/
│   ├── auth/
│   └── dashboard/
├── services/
│   ├── api/
│   ├── auth/
│   └── storage/
├── utils/
│   ├── helpers.ts
│   ├── validation.ts
│   └── constants.ts
├── types/
│   ├── api.ts
│   ├── auth.ts
│   └── common.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useApi.ts
│   └── useLocalStorage.ts
├── styles/
│   ├── globals.css
│   └── components.css
├── assets/
│   ├── images/
│   └── icons/
├── config/
│   ├── constants.ts
│   └── environment.ts
├── lib/
│   ├── api.ts
│   └── utils.ts
├── api/
│   ├── endpoints.ts
│   └── client.ts
├── store/
│   ├── slices/
│   └── index.ts
└── middleware/
    ├── auth.ts
    └── logging.ts
```

## 🔄 Import/Export Guidelines

### ✅ Preferred Import Patterns

```typescript
// 1. Absolute imports with aliases
import { Button } from '@/components/ui/Button';
import { UserService } from '@/services/UserService';
import { useAuth } from '@/hooks/useAuth';
import { UserType } from '@/types/auth';

// 2. Index file exports for clean imports
import { Button, Input, Modal } from '@/components/ui';
import { UserService, AuthService } from '@/services';
import { useAuth, useApi, useLocalStorage } from '@/hooks';

// 3. Type imports
import type { User, UserRole } from '@/types/auth';
import type { ApiResponse } from '@/types/api';

// 4. Utility imports
import { formatDate, validateEmail } from '@/utils/helpers';
import { API_ENDPOINTS } from '@/config/constants';
```

### ❌ Avoid These Patterns

```typescript
// Don't use relative paths
import { Button } from '../../../components/ui/Button';
import { UserService } from '../../services/UserService';

// Don't use default exports for components
export default function Button() { ... }

// Don't import from deep nested paths
import { utils } from '../../../../utils/helpers';
```

## 📦 Index File Strategy

### Component Index Files

```typescript
// src/components/ui/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { Modal } from './Modal';
export { Card } from './Card';

// src/components/layout/index.ts
export { Header } from './Header';
export { Footer } from './Footer';
export { Sidebar } from './Sidebar';
```

### Service Index Files

```typescript
// src/services/index.ts
export { UserService } from './UserService';
export { AuthService } from './AuthService';
export { ApiService } from './ApiService';
```

### Hook Index Files

```typescript
// src/hooks/index.ts
export { useAuth } from './useAuth';
export { useApi } from './useApi';
export { useLocalStorage } from './useLocalStorage';
export { useDebounce } from './useDebounce';
```

## 🎯 TypeScript Best Practices

### Type Definitions

```typescript
// src/types/auth.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'admin' | 'user' | 'moderator';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// src/types/api.ts
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

### Service Layer

```typescript
// src/services/UserService.ts
import type { User, ApiResponse } from '@/types';

export class UserService {
  private static readonly BASE_URL = '/api/users';

  static async getUsers(): Promise<ApiResponse<User[]>> {
    const response = await fetch(this.BASE_URL);
    return response.json();
  }

  static async getUserById(id: string): Promise<ApiResponse<User>> {
    const response = await fetch(`${this.BASE_URL}/${id}`);
    return response.json();
  }

  static async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<User>> {
    const response = await fetch(this.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  }
}
```

### Custom Hooks

```typescript
// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import type { User, AuthState } from '@/types/auth';
import { AuthService } from '@/services/AuthService';

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        setState({
          user,
          isAuthenticated: !!user,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Authentication failed',
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const user = await AuthService.login(email, password);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
    }
  };

  const logout = async () => {
    await AuthService.logout();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  return {
    ...state,
    login,
    logout,
  };
}
```

## 🔧 Development Tools

### VS Code Settings (`.vscode/settings.json`)

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "typescript.preferences.includePackageJsonAutoImports": "auto"
}
```

### Path Intellisense Configuration (`.vscode/settings.json`)

```json
{
  "path-intellisense.mappings": {
    "@": "${workspaceFolder}/src",
    "@/components": "${workspaceFolder}/src/components",
    "@/pages": "${workspaceFolder}/src/pages",
    "@/services": "${workspaceFolder}/src/services",
    "@/utils": "${workspaceFolder}/src/utils",
    "@/types": "${workspaceFolder}/src/types",
    "@/hooks": "${workspaceFolder}/src/hooks",
    "@/styles": "${workspaceFolder}/src/styles",
    "@/assets": "${workspaceFolder}/src/assets",
    "@/config": "${workspaceFolder}/src/config",
    "@/constants": "${workspaceFolder}/src/constants",
    "@/lib": "${workspaceFolder}/src/lib",
    "@/api": "${workspaceFolder}/src/api",
    "@/store": "${workspaceFolder}/src/store",
    "@/middleware": "${workspaceFolder}/src/middleware"
  }
}
```

## 🚀 Migration Script

### Convert Relative to Absolute Imports

```typescript
// scripts/migrate-imports.ts
import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

const SRC_DIR = 'src';
const ALIAS_MAP = {
  '@/components': 'src/components',
  '@/pages': 'src/pages',
  '@/services': 'src/services',
  '@/utils': 'src/utils',
  '@/types': 'src/types',
  '@/hooks': 'src/hooks',
  '@/styles': 'src/styles',
  '@/assets': 'src/assets',
  '@/config': 'src/config',
  '@/constants': 'src/constants',
  '@/lib': 'src/lib',
  '@/api': 'src/api',
  '@/store': 'src/store',
  '@/middleware': 'src/middleware',
};

function convertRelativeToAbsolute(filePath: string): void {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const updatedLines = lines.map(line => {
    // Match relative imports
    const relativeImportRegex = /import\s+.*\s+from\s+['"](\.\.\/)+([^'"]+)['"]/g;
    
    return line.replace(relativeImportRegex, (match, dots, importPath) => {
      const depth = dots.length / 3; // Count '../'
      const currentDir = path.dirname(filePath);
      
      // Calculate the absolute path
      let absolutePath = currentDir;
      for (let i = 0; i < depth; i++) {
        absolutePath = path.dirname(absolutePath);
      }
      absolutePath = path.join(absolutePath, importPath);
      
      // Find the appropriate alias
      for (const [alias, aliasPath] of Object.entries(ALIAS_MAP)) {
        if (absolutePath.startsWith(aliasPath)) {
          const relativeToAlias = path.relative(aliasPath, absolutePath);
          return match.replace(`'${dots}${importPath}'`, `'${alias}/${relativeToAlias}'`);
        }
      }
      
      return match;
    });
  });
  
  fs.writeFileSync(filePath, updatedLines.join('\n'));
}

// Find all TypeScript files
const files = glob.sync(`${SRC_DIR}/**/*.{ts,tsx}`);
files.forEach(convertRelativeToAbsolute);

console.log(`✅ Migrated ${files.length} files from relative to absolute imports`);
```

## 📋 Checklist

### Setup Checklist
- [ ] Configure `tsconfig.json` with path aliases
- [ ] Update build tool configuration (Next.js, Vite, etc.)
- [ ] Configure ESLint rules for import restrictions
- [ ] Set up VS Code settings for better DX
- [ ] Create index files for clean exports
- [ ] Update existing imports to use aliases

### Code Review Checklist
- [ ] No relative imports in new code
- [ ] All imports use `@/` aliases
- [ ] Index files are used for clean imports
- [ ] Type imports are properly separated
- [ ] Import order follows guidelines
- [ ] No unused imports

### Migration Checklist
- [ ] Run migration script on existing code
- [ ] Update all import statements
- [ ] Test build and development
- [ ] Update documentation
- [ ] Train team on new patterns

---

**Remember**: Using path aliases instead of relative paths makes your code more maintainable, easier to refactor, and provides better developer experience. Always prefer absolute imports with aliases over relative paths. 