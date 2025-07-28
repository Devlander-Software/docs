# TypeScript Development Guidelines 📝

> **Note**: This is a development-specific view of TypeScript guidelines. For the complete TypeScript standards, see [TypeScript Guidelines](../standards/typescript_guidelines.md).

## 🎯 Development Focus

This document provides TypeScript guidelines specifically for development workflows, building upon the comprehensive standards in the main TypeScript guidelines.

## 🔗 Related Documentation

- **Complete Standards**: [TypeScript Guidelines](../standards/typescript_guidelines.md)
- **Testing**: [Unit Testing Guidelines](../testing/unit-testing.md)
- **Code Quality**: [Code Quality Tools](../tools/code-quality-tools.md)
- **Project Setup**: [Project Setup](../project-management/project-setup.md)

## 🚀 Development Workflow Integration

### IDE Setup for Development

```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.fixAll.eslint": true
  },
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "typescript.suggest.paths": true
}
```

### Development Scripts

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write src/**/*.{ts,tsx}",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## 🔄 Development Best Practices

### Component Development

```typescript
// src/components/ui/Button/Button.tsx
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
        },
        {
          'h-9 px-3 text-sm': size === 'sm',
          'h-10 px-4 py-2': size === 'md',
          'h-11 px-8 text-lg': size === 'lg',
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner className="mr-2 h-4 w-4" />}
      {children}
    </button>
  );
}
```

### Hook Development

```typescript
// src/hooks/useLocalStorage.ts
import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        
        // Save to local storage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}
```

### Service Layer Development

```typescript
// src/services/api/BaseApiService.ts
import type { ApiResponse, ApiError } from '@/types/api';

export abstract class BaseApiService {
  protected static readonly BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

  protected static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error: ApiError = {
          message: response.statusText,
          status: response.status,
          data: await response.json().catch(() => null),
        };
        throw error;
      }

      const data = await response.json();
      return {
        data,
        success: true,
        message: 'Success',
      };
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  protected static get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  protected static post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  protected static put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  protected static delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}
```

## 🧪 Development Testing

### Component Testing

```typescript
// src/components/ui/Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary');
  });
});
```

### Hook Testing

```typescript
// src/hooks/useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'));
    
    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(JSON.parse(localStorage.getItem('test')!)).toBe('updated');
  });

  it('handles function updates', () => {
    const { result } = renderHook(() => useLocalStorage('test', 0));
    
    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });
});
```

## 🔧 Development Tools Integration

### ESLint Configuration for Development

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', 'testing-library'],
  rules: {
    // Development-specific rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'testing-library/await-async-queries': 'error',
    'testing-library/no-await-sync-queries': 'error',
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
```

### Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

## 📊 Development Metrics

### Code Quality Metrics
- **Type Coverage**: 100% for critical paths
- **Test Coverage**: 80%+ for components and hooks
- **Linting Score**: 0 violations
- **Bundle Size**: < 250KB (gzipped)

### Development Velocity
- **Component Development**: 2-4 hours per component
- **Hook Development**: 1-2 hours per hook
- **Service Development**: 4-8 hours per service
- **Testing**: 50% of development time

## 🔄 Development Workflow

### 1. Component Development
1. Create component with TypeScript interfaces
2. Implement with proper error handling
3. Add comprehensive tests
4. Document with JSDoc comments
5. Export through index file

### 2. Hook Development
1. Define hook interface and return types
2. Implement with proper cleanup
3. Add error boundaries
4. Test with different scenarios
5. Document usage examples

### 3. Service Development
1. Extend BaseApiService
2. Implement CRUD operations
3. Add proper error handling
4. Include retry logic
5. Add comprehensive tests

## 🔗 Related Development Areas

- **Testing**: [Unit Testing Guidelines](../testing/unit-testing.md)
- **Performance**: [Performance Optimization](../frontend/performance-optimization.md)
- **Security**: [Security Implementation](../security/security-implementation.md)
- **Documentation**: [Code Documentation](../documentation/code-documentation.md)

---

**Next Steps**: 
- Review [React Development Standards](./react-standards.md) for component patterns
- Check [Testing Strategy](../testing/testing-strategy.md) for comprehensive testing
- See [Code Quality Tools](../tools/code-quality-tools.md) for development tools 