# React Development Standards ⚛️

## 🎯 Overview

This document establishes comprehensive React development standards focusing on modern patterns, performance optimization, and maintainable code architecture.

## 🔗 Related Documentation

- **TypeScript Integration**: [TypeScript Guidelines](./typescript-guidelines.md)
- **Testing**: [Unit Testing Guidelines](../testing/unit-testing.md)
- **Performance**: [Performance Optimization](../frontend/performance-optimization.md)
- **State Management**: [State Management](../frontend/state-management.md)
- **Component Design**: [Component Design](../frontend/component-design.md)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Modal/
│   ├── layout/                # Layout components
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Sidebar/
│   └── features/              # Feature-specific components
│       ├── auth/
│       ├── dashboard/
│       └── settings/
├── hooks/                     # Custom React hooks
├── pages/                     # Page components (Next.js)
├── services/                  # API services
├── store/                     # State management
├── types/                     # TypeScript type definitions
├── utils/                     # Utility functions
└── styles/                    # Global styles
```

## 🎯 Component Standards

### Functional Components with TypeScript

```typescript
// src/components/ui/Button/Button.tsx
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
          },
          {
            'h-9 px-3 text-sm': size === 'sm',
            'h-10 px-4 py-2': size === 'md',
            'h-11 px-8 text-lg': size === 'lg',
          },
          className
        )}
        disabled={loading}
        {...props}
      >
        {loading && <Spinner className="mr-2 h-4 w-4" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Compound Components

```typescript
// src/components/ui/Card/Card.tsx
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Card = ({ className, children, ...props }: CardProps) => (
  <div
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ className, children, ...props }: CardHeaderProps) => (
  <div
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({ className, children, ...props }: CardContentProps) => (
  <div className={cn('p-6 pt-0', className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({ className, children, ...props }: CardFooterProps) => (
  <div
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  >
    {children}
  </div>
);

export { Card, CardHeader, CardContent, CardFooter };
```

### Custom Hooks

```typescript
// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// src/hooks/useLocalStorage.ts
import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
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

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        
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

## 🎨 State Management

### Context API for Global State

```typescript
// src/store/AuthContext.tsx
import { createContext, useContext, useReducer, ReactNode } from 'react';
import type { User, AuthState, AuthAction } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const user = await AuthService.login(email, password);
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ 
        type: 'AUTH_FAILURE', 
        payload: error instanceof Error ? error.message : 'Login failed' 
      });
    }
  };

  const logout = async () => {
    await AuthService.logout();
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  const register = async (userData: RegisterData) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const user = await AuthService.register(userData);
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ 
        type: 'AUTH_FAILURE', 
        payload: error instanceof Error ? error.message : 'Registration failed' 
      });
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

### Redux Toolkit (Alternative)

```typescript
// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { User, AuthState } from '@/types/auth';
import { AuthService } from '@/services/AuthService';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const user = await AuthService.login(email, password);
    return user;
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    await AuthService.logout();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
```

## ⚡ Performance Optimization

### React.memo for Component Memoization

```typescript
// src/components/ui/UserCard/UserCard.tsx
import { memo } from 'react';
import type { User } from '@/types/auth';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export const UserCard = memo<UserCardProps>(({ user, onEdit, onDelete }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(user)}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
});

UserCard.displayName = 'UserCard';
```

### useMemo and useCallback

```typescript
// src/components/UserList/UserList.tsx
import { useMemo, useCallback } from 'react';
import { UserCard } from '@/components/ui/UserCard';
import type { User } from '@/types/auth';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  searchTerm: string;
}

export function UserList({ users, onEdit, onDelete, searchTerm }: UserListProps) {
  // Memoize filtered users
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Memoize callback functions
  const handleEdit = useCallback((user: User) => {
    onEdit(user);
  }, [onEdit]);

  const handleDelete = useCallback((userId: string) => {
    onDelete(userId);
  }, [onDelete]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredUsers.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

### Lazy Loading

```typescript
// src/pages/Dashboard.tsx
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const UserManagement = lazy(() => import('@/components/features/UserManagement'));
const Analytics = lazy(() => import('@/components/features/Analytics'));

export function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <Suspense fallback={<LoadingSpinner />}>
        <UserManagement />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Analytics />
      </Suspense>
    </div>
  );
}
```

## 🧪 Testing Standards

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
});
```

## 🔧 Development Tools

### ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
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
  "jsxSingleQuote": true
}
```

## 📊 Performance Metrics

### Bundle Analysis
- **Initial Bundle Size**: < 200KB (gzipped)
- **Lazy Loaded Chunks**: < 50KB each
- **Tree Shaking**: 95%+ unused code elimination
- **Code Splitting**: Route-based and component-based

### Runtime Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3s
- **Memory Usage**: < 50MB for typical app

## 🔄 Development Workflow

### 1. Component Development
1. Create TypeScript interfaces
2. Implement functional component
3. Add comprehensive tests
4. Document with JSDoc
5. Export through index file

### 2. State Management
1. Choose appropriate state management solution
2. Implement with proper error handling
3. Add loading states
4. Test state transitions
5. Document state shape

### 3. Performance Optimization
1. Identify performance bottlenecks
2. Implement memoization where needed
3. Add lazy loading for large components
4. Optimize bundle size
5. Monitor performance metrics

## 🔗 Related Areas

- **TypeScript**: [TypeScript Guidelines](./typescript-guidelines.md)
- **Testing**: [Unit Testing Guidelines](../testing/unit-testing.md)
- **Performance**: [Performance Optimization](../frontend/performance-optimization.md)
- **State Management**: [State Management](../frontend/state-management.md)
- **Component Design**: [Component Design](../frontend/component-design.md)

---

**Next Steps**:
- Review [Next.js Best Practices](./nextjs-best-practices.md) for full-stack development
- Check [Testing Strategy](../testing/testing-strategy.md) for comprehensive testing
- See [Performance Optimization](../frontend/performance-optimization.md) for advanced optimization 