# Unit Testing Guidelines 🧪

## 🎯 Overview

This document provides comprehensive guidelines for unit testing across all technologies, ensuring code quality, reliability, and maintainability.

## 🔗 Related Documentation

- **Testing Strategy**: [Testing Strategy](./testing-strategy.md)
- **Integration Testing**: [Integration Testing](./integration-testing.md)
- **E2E Testing**: [E2E Testing Standards](./e2e-testing.md)
- **Performance Testing**: [Performance Testing](./performance-testing.md)
- **Accessibility Testing**: [Accessibility Testing](./accessibility-testing.md)
- **Development**: [TypeScript Guidelines](../development/typescript-guidelines.md)
- **React Standards**: [React Development Standards](../development/react-standards.md)

## 📊 Coverage Requirements

### Coverage Targets
- **Critical Paths**: 90%+ coverage
- **Business Logic**: 85%+ coverage
- **Utility Functions**: 80%+ coverage
- **Overall Project**: 70%+ coverage

### Quality Gates
- **Unit Tests**: Must pass before merge
- **Coverage Threshold**: Minimum 70% overall
- **Critical Paths**: Must have 90%+ coverage
- **Test Execution**: < 30 seconds for full suite

## 🏗️ Testing Architecture

### Test Structure
```
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       ├── Button.test.tsx
│       └── __snapshots__/
├── hooks/
│   ├── useLocalStorage.ts
│   └── useLocalStorage.test.ts
├── services/
│   ├── UserService.ts
│   └── UserService.test.ts
└── utils/
    ├── validation.ts
    └── validation.test.ts
```

### Test File Naming
- **Component Tests**: `ComponentName.test.tsx`
- **Hook Tests**: `hookName.test.ts`
- **Service Tests**: `ServiceName.test.ts`
- **Utility Tests**: `utilityName.test.ts`

## 🧪 Testing Patterns

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

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Button ref={ref}>Button</Button>);
    expect(ref).toHaveBeenCalled();
  });

  it('handles keyboard events', () => {
    const handleKeyDown = jest.fn();
    render(<Button onKeyDown={handleKeyDown}>Button</Button>);
    
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalled();
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

  it('handles localStorage errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    // Mock localStorage to throw error
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => {
          throw new Error('Storage error');
        }),
        setItem: jest.fn(),
      },
      writable: true,
    });

    const { result } = renderHook(() => useLocalStorage('test', 'fallback'));
    expect(result.current[0]).toBe('fallback');
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('handles SSR environment', () => {
    // Mock window as undefined for SSR
    const originalWindow = global.window;
    delete (global as any).window;

    const { result } = renderHook(() => useLocalStorage('test', 'ssr-value'));
    expect(result.current[0]).toBe('ssr-value');

    // Restore window
    global.window = originalWindow;
  });
});
```

### Service Testing

```typescript
// src/services/UserService.test.ts
import { UserService } from './UserService';
import { mockUser, mockUsers } from '@/tests/mocks/users';

// Mock fetch globally
global.fetch = jest.fn();

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('fetches users successfully', async () => {
      const mockResponse = { data: mockUsers, success: true, message: 'Success' };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await UserService.getUsers();
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith('/api/users');
    });

    it('handles API errors', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({ error: 'Server error' }),
      });

      await expect(UserService.getUsers()).rejects.toThrow('Internal Server Error');
    });

    it('handles network errors', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(UserService.getUsers()).rejects.toThrow('Network error');
    });

    it('handles malformed JSON response', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      await expect(UserService.getUsers()).rejects.toThrow('Invalid JSON');
    });
  });

  describe('createUser', () => {
    it('creates user successfully', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };
      const mockResponse = { data: mockUser, success: true, message: 'User created' };
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await UserService.createUser(userData);
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
    });

    it('validates user data before sending', async () => {
      const invalidUserData = { name: '', email: 'invalid-email' };
      
      await expect(UserService.createUser(invalidUserData)).rejects.toThrow('Invalid user data');
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  describe('updateUser', () => {
    it('updates user successfully', async () => {
      const userId = '123';
      const updateData = { name: 'Jane Doe' };
      const mockResponse = { data: { ...mockUser, ...updateData }, success: true };
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await UserService.updateUser(userId, updateData);
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
    });
  });

  describe('deleteUser', () => {
    it('deletes user successfully', async () => {
      const userId = '123';
      const mockResponse = { success: true, message: 'User deleted' };
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await UserService.deleteUser(userId);
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(`/api/users/${userId}`, {
        method: 'DELETE',
      });
    });
  });
});
```

### Utility Function Testing

```typescript
// src/utils/validation.test.ts
import { validateEmail, validatePassword, validateUserData } from './validation';

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('validates correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
      ];

      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true);
      });
    });

    it('rejects invalid email addresses', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'user@',
        'user@.com',
        'user..name@example.com',
      ];

      invalidEmails.forEach(email => {
        expect(validateEmail(email)).toBe(false);
      });
    });

    it('handles edge cases', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail(null as any)).toBe(false);
      expect(validateEmail(undefined as any)).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('validates strong passwords', () => {
      const strongPasswords = [
        'SecurePass123!',
        'MyP@ssw0rd',
        'Str0ng#P@ss',
      ];

      strongPasswords.forEach(password => {
        expect(validatePassword(password)).toBe(true);
      });
    });

    it('rejects weak passwords', () => {
      const weakPasswords = [
        '123',
        'password',
        'abc123',
        'PASSWORD',
        'pass word',
      ];

      weakPasswords.forEach(password => {
        expect(validatePassword(password)).toBe(false);
      });
    });

    it('provides specific error messages', () => {
      const result = validatePassword('123');
      expect(result).toBe(false);
      // Assuming the function returns an object with error details
      // expect(result.errors).toContain('Password must be at least 8 characters');
    });
  });

  describe('validateUserData', () => {
    it('validates complete user data', () => {
      const validUserData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'SecurePass123!',
      };

      const result = validateUserData(validUserData);
      expect(result.isValid).toBe(true);
    });

    it('rejects incomplete user data', () => {
      const invalidUserData = {
        name: '',
        email: 'invalid-email',
        password: 'weak',
      };

      const result = validateUserData(invalidUserData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveProperty('name');
      expect(result.errors).toHaveProperty('email');
      expect(result.errors).toHaveProperty('password');
    });
  });
});
```

## 🔧 Testing Configuration

### Jest Configuration

```javascript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/index.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/coverage/',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/coverage/',
    '<rootDir>/jest.config.js',
    '<rootDir>/jest.setup.js',
  ],
};

module.exports = createJestConfig(customJestConfig);
```

### Testing Library Setup

```javascript
// jest.setup.js
import '@testing-library/jest-dom';
import { server } from './src/tests/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock console methods in tests
const originalError = console.error;
const originalWarn = console.warn;

beforeEach(() => {
  console.error = jest.fn();
  console.warn = jest.fn();
});

afterEach(() => {
  console.error = originalError;
  console.warn = originalWarn;
});
```

## 📊 Test Quality Standards

### Test Structure Guidelines

1. **Describe Blocks**: Group related tests logically
2. **Test Names**: Use descriptive, behavior-focused names
3. **Arrange-Act-Assert**: Follow AAA pattern
4. **Isolation**: Each test should be independent
5. **Cleanup**: Clean up after each test

### Best Practices

```typescript
// Good test structure
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', async () => {
      // Arrange
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'SecurePass123!'
      };
      const mockResponse = { id: '123', ...userData };

      // Act
      const result = await UserService.createUser(userData);

      // Assert
      expect(result).toEqual(mockResponse);
    });

    it('should throw error for invalid email', async () => {
      // Arrange
      const userData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'SecurePass123!'
      };

      // Act & Assert
      await expect(UserService.createUser(userData))
        .rejects
        .toThrow('Invalid email address');
    });
  });
});
```

### Mocking Guidelines

```typescript
// Good mocking practices
describe('Component with API calls', () => {
  beforeEach(() => {
    // Mock external dependencies
    jest.clearAllMocks();
  });

  it('should handle API success', async () => {
    // Mock successful API response
    mockApi.getUsers.mockResolvedValue(mockUsers);

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('should handle API error', async () => {
    // Mock API error
    mockApi.getUsers.mockRejectedValue(new Error('API Error'));

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('Error loading users')).toBeInTheDocument();
    });
  });
});
```

## 🔄 Testing Workflow

### 1. Test Development Process
1. **Write Test First**: Follow TDD when possible
2. **Implement Feature**: Write code to make test pass
3. **Refactor**: Improve code while keeping tests green
4. **Repeat**: Continue for all features

### 2. Test Maintenance
1. **Regular Review**: Review test quality monthly
2. **Update Tests**: Update tests when requirements change
3. **Remove Dead Tests**: Remove tests for removed features
4. **Optimize**: Improve test performance regularly

### 3. Coverage Monitoring
1. **Track Coverage**: Monitor coverage metrics
2. **Identify Gaps**: Find untested code paths
3. **Add Tests**: Fill coverage gaps
4. **Maintain Quality**: Ensure test quality over quantity

## 🔗 Related Areas

- **Testing Strategy**: [Testing Strategy](./testing-strategy.md)
- **Integration Testing**: [Integration Testing](./integration-testing.md)
- **E2E Testing**: [E2E Testing Standards](./e2e-testing.md)
- **Performance Testing**: [Performance Testing](./performance-testing.md)
- **Accessibility Testing**: [Accessibility Testing](./accessibility-testing.md)
- **Development**: [TypeScript Guidelines](../development/typescript-guidelines.md)
- **React Standards**: [React Development Standards](../development/react-standards.md)

---

**Next Steps**:
- Review [Integration Testing](./integration-testing.md) for API and database testing
- Check [E2E Testing Standards](./e2e-testing.md) for user journey testing
- See [Performance Testing](./performance-testing.md) for performance validation 