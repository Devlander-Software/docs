import React from 'react';
import DocumentationViewer from '../../../../components/DocumentationViewer';
import Link from 'next/link';

export default function TestingStrategyPage() {
  const content = `# Testing Strategy

## Overview

This document outlines our comprehensive testing strategy, covering unit, integration, end-to-end, performance, and accessibility testing. Our approach follows the testing pyramid to ensure robust, maintainable, and reliable software.

## Table of Contents

1. [Testing Pyramid](#testing-pyramid)
2. [Unit Testing](#unit-testing)
3. [Integration Testing](#integration-testing)
4. [End-to-End Testing](#end-to-end-testing)
5. [Performance Testing](#performance-testing)
6. [Accessibility Testing](#accessibility-testing)
7. [Security Testing](#security-testing)
8. [Test Organization](#test-organization)
9. [Coverage Requirements](#coverage-requirements)
10. [CI/CD Integration](#cicd-integration)

## Testing Pyramid

Our testing strategy follows the testing pyramid approach:

- **Unit Tests** (70%): Fast, isolated tests for individual components
- **Integration Tests** (20%): Tests for component interactions
- **E2E Tests** (10%): Critical user journey tests

### Coverage Targets

- **Unit Tests**: 80%+ coverage for critical paths
- **Integration Tests**: All API endpoints and data flows
- **E2E Tests**: Critical user workflows
- **Performance Tests**: Load testing for production scenarios

## Unit Testing

### Framework: Jest + React Testing Library

\`\`\`typescript
// Example unit test
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
\`\`\`

### Best Practices

- **Isolation**: Each test should be independent
- **Descriptive Names**: Use clear, descriptive test names
- **AAA Pattern**: Arrange, Act, Assert
- **Mock External Dependencies**: Use mocks for API calls, timers, etc.

## Integration Testing

### API Testing

\`\`\`typescript
// Example API integration test
import { render, screen, waitFor } from '@testing-library/react';
import { UserList } from './UserList';

describe('UserList Integration', () => {
  it('fetches and displays users', async () => {
    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
\`\`\`

### Database Testing

- Use test databases with known state
- Clean up after each test
- Use transactions for rollback

## End-to-End Testing

### Framework: Playwright

\`\`\`typescript
// Example E2E test
import { test, expect } from '@playwright/test';

test('user can complete checkout process', async ({ page }) => {
  await page.goto('/products');
  await page.click('[data-testid="add-to-cart"]');
  await page.click('[data-testid="checkout"]');
  
  await page.fill('[data-testid="email"]', 'test@example.com');
  await page.fill('[data-testid="card-number"]', '4242424242424242');
  await page.click('[data-testid="pay"]');
  
  await expect(page).toHaveURL('/confirmation');
});
\`\`\`

### Critical Paths to Test

1. **User Registration/Login**
2. **Product Purchase Flow**
3. **Payment Processing**
4. **Account Management**
5. **Search and Filtering**

## Performance Testing

### Load Testing with k6

\`\`\`javascript
// Example k6 load test
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 0 },
  ],
};

export default function () {
  const response = http.get('https://api.example.com/products');
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1);
}
\`\`\`

### Performance Benchmarks

- **Response Time**: < 200ms for API calls
- **Page Load**: < 2 seconds for initial load
- **Time to Interactive**: < 3 seconds
- **Lighthouse Score**: > 90 for all metrics

## Accessibility Testing

### Automated Testing

\`\`\`typescript
// Example accessibility test
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { LoginForm } from './LoginForm';

expect.extend(toHaveNoViolations);

describe('LoginForm Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<LoginForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
\`\`\`

### Manual Testing Checklist

- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Color contrast meets WCAG standards
- [ ] Focus indicators are visible
- [ ] Alt text for images

## Security Testing

### OWASP Top 10 Testing

\`\`\`typescript
// Example security test
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm Security', () => {
  it('prevents XSS attacks', () => {
    render(<LoginForm />);
    
    const maliciousInput = '<script>alert("xss")</script>';
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: maliciousInput },
    });
    
    expect(screen.getByDisplayValue(maliciousInput)).toBeInTheDocument();
    // Verify the script is not executed
  });
});
\`\`\`

### Security Test Categories

1. **Input Validation**
2. **Authentication Testing**
3. **Authorization Testing**
4. **Session Management**
5. **Data Protection**

## Test Organization

### File Structure

\`\`\`
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── Button.stories.tsx
├── __tests__/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── tests/
    ├── fixtures/
    ├── mocks/
    └── utils/
\`\`\`

### Naming Conventions

- **Unit Tests**: \`ComponentName.test.tsx\`
- **Integration Tests**: \`ComponentName.integration.test.tsx\`
- **E2E Tests**: \`ComponentName.e2e.test.ts\`

## Coverage Requirements

### Minimum Coverage

- **Critical Paths**: 90%+
- **Business Logic**: 80%+
- **Overall Project**: 70%+

### Coverage Exclusions

- Generated files
- Configuration files
- Test utilities
- Type definitions

## CI/CD Integration

### GitHub Actions Workflow

\`\`\`yaml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run unit tests
      run: npm run test:unit
    
    - name: Run integration tests
      run: npm run test:integration
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Generate coverage report
      run: npm run test:coverage
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
\`\`\`

### Quality Gates

- All tests must pass
- Coverage must meet minimum requirements
- No security vulnerabilities
- Performance benchmarks met

## Best Practices

### Test Writing

1. **Write tests first** (TDD approach)
2. **Keep tests simple and focused**
3. **Use descriptive test names**
4. **Test behavior, not implementation**
5. **Maintain test data separately**

### Test Maintenance

1. **Update tests when requirements change**
2. **Refactor tests with code changes**
3. **Remove obsolete tests**
4. **Keep test data current**

### Performance

1. **Run tests in parallel when possible**
2. **Use test databases for isolation**
3. **Mock external services**
4. **Optimize test execution time**

---

This testing strategy ensures we deliver high-quality, reliable software that meets user needs and business requirements.
`;

  const navigation = [
    { title: 'Project Guidelines Standard', href: '/docs/standards/project_guidelines_standard' },
    { title: 'TypeScript Guidelines', href: '/docs/standards/typescript_guidelines' },
    { title: 'Security Implementation', href: '/docs/security/security-implementation' },
    { title: 'Contributing Guidelines', href: '/CONTRIBUTING' },
    { title: 'Changelog', href: '/CHANGELOG' },
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
              <h1 className="text-3xl font-bold text-gray-900">Testing Strategy</h1>
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
          title="Testing Strategy"
          navigation={navigation}
        />
      </main>
    </div>
  );
} 