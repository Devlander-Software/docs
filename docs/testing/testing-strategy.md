# Testing Strategy 🧪

## 🎯 Overview

This document establishes a comprehensive testing strategy that ensures code quality, reliability, and maintainability across all development phases.

## 🔗 Related Documentation

- **Unit Testing**: [Unit Testing Guidelines](./unit-testing.md)
- **Integration Testing**: [Integration Testing](./integration-testing.md)
- **E2E Testing**: [E2E Testing Standards](./e2e-testing.md)
- **Performance Testing**: [Performance Testing](./performance-testing.md)
- **Accessibility Testing**: [Accessibility Testing](./accessibility-testing.md)
- **Development**: [TypeScript Guidelines](../development/typescript-guidelines.md)
- **React Standards**: [React Development Standards](../development/react-standards.md)

## 🏗️ Testing Pyramid

```
                    E2E Tests
                   (Few, Slow)
                ┌─────────────┐
                │             │
                │   E2E Tests │
                │             │
                └─────────────┘
               
            Integration Tests
           (Some, Medium)
        ┌─────────────────────┐
        │                     │
        │  Integration Tests  │
        │                     │
        └─────────────────────┘
       
        Unit Tests
       (Many, Fast)
    ┌─────────────────────────┐
    │                         │
    │      Unit Tests         │
    │                         │
    └─────────────────────────┘
```

## 📊 Testing Coverage Targets

### Coverage Requirements
- **Unit Tests**: 80%+ for critical paths, 70%+ overall
- **Integration Tests**: All API endpoints and workflows
- **E2E Tests**: Critical user journeys
- **Performance Tests**: All production endpoints
- **Accessibility Tests**: All user-facing components

### Quality Gates
- **Unit Tests**: Must pass before merge
- **Integration Tests**: Must pass before deployment
- **E2E Tests**: Must pass before production release
- **Performance Tests**: Must meet performance budgets
- **Accessibility Tests**: Must meet WCAG 2.1 AA standards

## 🧪 Unit Testing

### Component Testing Standards

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
});
```

### Hook Testing Standards

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
});
```

### Service Testing Standards

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
  });
});
```

## 🔗 Integration Testing

### API Integration Testing

```typescript
// src/tests/integration/api.test.ts
import { createMocks } from 'node-mocks-http';
import { handler } from '@/pages/api/users';

describe('/api/users', () => {
  it('GET returns users list', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
  });

  it('POST creates new user', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    const { req, res } = createMocks({
      method: 'POST',
      body: userData,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    expect(data.data.name).toBe(userData.name);
  });

  it('returns 400 for invalid data', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { name: '' }, // Invalid data
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(false);
  });
});
```

### Database Integration Testing

```typescript
// src/tests/integration/database.test.ts
import { prisma } from '@/lib/prisma';
import { UserService } from '@/services/UserService';

describe('Database Integration', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('creates and retrieves user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedPassword',
    };

    const user = await prisma.user.create({
      data: userData,
    });

    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);

    const retrievedUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    expect(retrievedUser).toEqual(user);
  });

  it('handles unique constraint violations', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedPassword',
    };

    await prisma.user.create({ data: userData });

    await expect(
      prisma.user.create({ data: userData })
    ).rejects.toThrow();
  });
});
```

## 🌐 E2E Testing

### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### E2E Test Examples

```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('user can sign up', async ({ page }) => {
    await page.goto('/signup');
    
    await page.fill('[data-testid="name-input"]', 'John Doe');
    await page.fill('[data-testid="email-input"]', 'john@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    
    await page.click('[data-testid="signup-button"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-name"]')).toContainText('John Doe');
  });

  test('user can sign in', async ({ page }) => {
    await page.goto('/signin');
    
    await page.fill('[data-testid="email-input"]', 'john@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    
    await page.click('[data-testid="signin-button"]');
    
    await expect(page).toHaveURL('/dashboard');
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/signin');
    
    await page.fill('[data-testid="email-input"]', 'invalid@example.com');
    await page.fill('[data-testid="password-input"]', 'wrongpassword');
    
    await page.click('[data-testid="signin-button"]');
    
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Invalid credentials');
  });
});

// tests/e2e/dashboard.spec.ts
test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Sign in user
    await page.goto('/signin');
    await page.fill('[data-testid="email-input"]', 'john@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="signin-button"]');
  });

  test('displays user information', async ({ page }) => {
    await expect(page.locator('[data-testid="user-name"]')).toContainText('John Doe');
    await expect(page.locator('[data-testid="user-email"]')).toContainText('john@example.com');
  });

  test('allows user to update profile', async ({ page }) => {
    await page.click('[data-testid="edit-profile-button"]');
    
    await page.fill('[data-testid="name-input"]', 'Jane Doe');
    await page.click('[data-testid="save-button"]');
    
    await expect(page.locator('[data-testid="user-name"]')).toContainText('Jane Doe');
  });
});
```

## ⚡ Performance Testing

### Lighthouse CI Configuration

```yaml
# .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000', 'http://localhost:3000/dashboard'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

### API Performance Testing

```typescript
// tests/performance/api.test.ts
import { check } from 'k6';
import http from 'k6/http';

export const options = {
  stages: [
    { duration: '2m', target: 10 }, // Ramp up
    { duration: '5m', target: 10 }, // Stay at 10 users
    { duration: '2m', target: 0 },  // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.1'],    // Error rate must be below 10%
  },
};

export default function () {
  const baseUrl = 'http://localhost:3000/api';
  
  // Test user list endpoint
  const usersResponse = http.get(`${baseUrl}/users`);
  check(usersResponse, {
    'users endpoint status is 200': (r) => r.status === 200,
    'users endpoint response time < 200ms': (r) => r.timings.duration < 200,
  });

  // Test user creation endpoint
  const userData = JSON.stringify({
    name: 'Test User',
    email: `test-${Date.now()}@example.com`,
  });
  
  const createResponse = http.post(`${baseUrl}/users`, userData, {
    headers: { 'Content-Type': 'application/json' },
  });
  
  check(createResponse, {
    'create user status is 201': (r) => r.status === 201,
    'create user response time < 300ms': (r) => r.timings.duration < 300,
  });
}
```

## ♿ Accessibility Testing

### Automated Accessibility Testing

```typescript
// tests/accessibility/accessibility.test.ts
import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('homepage meets accessibility standards', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('dashboard meets accessibility standards', async ({ page }) => {
    // Sign in first
    await page.goto('/signin');
    await page.fill('[data-testid="email-input"]', 'john@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="signin-button"]');
    
    await page.goto('/dashboard');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    expect(await page.locator(':focus')).toBeVisible();
    
    // Test skip links
    await page.keyboard.press('Tab');
    const skipLink = page.locator('[data-testid="skip-to-main"]');
    expect(skipLink).toBeVisible();
  });
});
```

## 🔧 Testing Tools Configuration

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
```

## 📊 Testing Metrics

### Quality Metrics
- **Test Coverage**: 80%+ for critical paths
- **Test Execution Time**: < 30 seconds for unit tests
- **E2E Test Reliability**: 95%+ pass rate
- **Performance Test Compliance**: 100% of budgets met
- **Accessibility Compliance**: 100% WCAG 2.1 AA

### Development Metrics
- **Test Development Time**: 50% of feature development time
- **Bug Detection Rate**: 90%+ bugs caught by tests
- **Regression Prevention**: 95%+ regression prevention rate
- **Deployment Confidence**: 99%+ deployment success rate

## 🔄 Testing Workflow

### 1. Unit Testing Workflow
1. Write tests before implementation (TDD)
2. Implement feature with tests
3. Ensure all tests pass
4. Refactor with confidence
5. Update tests as needed

### 2. Integration Testing Workflow
1. Identify critical workflows
2. Create integration test suites
3. Test API endpoints and database interactions
4. Verify error handling
5. Test performance under load

### 3. E2E Testing Workflow
1. Identify critical user journeys
2. Create E2E test scenarios
3. Test across multiple browsers
4. Verify accessibility compliance
5. Monitor test reliability

## 🔗 Related Areas

- **Unit Testing**: [Unit Testing Guidelines](./unit-testing.md)
- **Integration Testing**: [Integration Testing](./integration-testing.md)
- **E2E Testing**: [E2E Testing Standards](./e2e-testing.md)
- **Performance Testing**: [Performance Testing](./performance-testing.md)
- **Accessibility Testing**: [Accessibility Testing](./accessibility-testing.md)
- **Development**: [TypeScript Guidelines](../development/typescript-guidelines.md)
- **React Standards**: [React Development Standards](../development/react-standards.md)

---

**Next Steps**:
- Review [Unit Testing Guidelines](./unit-testing.md) for detailed unit testing practices
- Check [Integration Testing](./integration-testing.md) for API and database testing
- See [E2E Testing Standards](./e2e-testing.md) for user journey testing 