# E2E Testing Standards 🎯

## 🎯 Overview

This document provides comprehensive guidelines for End-to-End (E2E) testing using Playwright, ensuring complete user journey validation and real-world scenario testing.

## 🔗 Related Documentation

- **Testing Strategy**: [Testing Strategy](./testing-strategy.md)
- **Unit Testing**: [Unit Testing Guidelines](./unit-testing.md)
- **Integration Testing**: [Integration Testing](./integration-testing.md)
- **Performance Testing**: [Performance Testing](./performance-testing.md)
- **Accessibility Testing**: [Accessibility Testing](./accessibility-testing.md)
- **Playwright Configuration**: [Playwright Setup](./playwright-setup.md)

## 📊 E2E Testing Strategy

### Testing Pyramid - E2E Layer
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

### Coverage Requirements
- **Critical User Journeys**: 100% coverage
- **Cross-Browser Testing**: Chrome, Firefox, Safari, Edge
- **Mobile Responsiveness**: iOS Safari, Android Chrome
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Core Web Vitals validation

## 🎭 Playwright Configuration

### Playwright Setup

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
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
    timeout: 120 * 1000,
  },
});
```

### Test Utilities

```typescript
// tests/e2e/utils/test-helpers.ts
import { Page, expect } from '@playwright/test';

export class TestHelpers {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    await this.page.goto('/login');
    await this.page.fill('[data-testid="email-input"]', email);
    await this.page.fill('[data-testid="password-input"]', password);
    await this.page.click('[data-testid="login-button"]');
    await this.page.waitForURL('/dashboard');
  }

  async logout() {
    await this.page.click('[data-testid="user-menu"]');
    await this.page.click('[data-testid="logout-button"]');
    await this.page.waitForURL('/login');
  }

  async createUser(email: string, password: string) {
    await this.page.goto('/register');
    await this.page.fill('[data-testid="name-input"]', 'Test User');
    await this.page.fill('[data-testid="email-input"]', email);
    await this.page.fill('[data-testid="password-input"]', password);
    await this.page.click('[data-testid="register-button"]');
    await this.page.waitForURL('/dashboard');
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async expectToBeVisible(selector: string) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async expectToHaveText(selector: string, text: string) {
    await expect(this.page.locator(selector)).toHaveText(text);
  }

  async expectToHaveValue(selector: string, value: string) {
    await expect(this.page.locator(selector)).toHaveValue(value);
  }
}
```

## 🧪 E2E Test Examples

### Authentication Flow

```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Authentication', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('user can register successfully', async ({ page }) => {
    const email = `test-${Date.now()}@example.com`;
    const password = 'SecurePass123!';

    await page.goto('/register');
    
    // Fill registration form
    await page.fill('[data-testid="name-input"]', 'John Doe');
    await page.fill('[data-testid="email-input"]', email);
    await page.fill('[data-testid="password-input"]', password);
    await page.fill('[data-testid="confirm-password-input"]', password);
    
    // Submit form
    await page.click('[data-testid="register-button"]');
    
    // Verify successful registration
    await page.waitForURL('/dashboard');
    await expect(page.locator('[data-testid="welcome-message"]')).toHaveText(
      'Welcome, John Doe!'
    );
    
    // Verify user is logged in
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('user can login successfully', async ({ page }) => {
    const email = 'test@example.com';
    const password = 'SecurePass123!';

    // Create user first
    await helpers.createUser(email, password);
    await helpers.logout();

    // Login
    await helpers.login(email, password);
    
    // Verify successful login
    await expect(page.locator('[data-testid="dashboard-title"]')).toHaveText(
      'Dashboard'
    );
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[data-testid="email-input"]', 'invalid@example.com');
    await page.fill('[data-testid="password-input"]', 'wrongpassword');
    await page.click('[data-testid="login-button"]');
    
    await expect(page.locator('[data-testid="error-message"]')).toHaveText(
      'Invalid email or password'
    );
  });

  test('validates form fields', async ({ page }) => {
    await page.goto('/login');
    
    // Try to submit empty form
    await page.click('[data-testid="login-button"]');
    
    await expect(page.locator('[data-testid="email-error"]')).toHaveText(
      'Email is required'
    );
    await expect(page.locator('[data-testid="password-error"]')).toHaveText(
      'Password is required'
    );
  });

  test('user can logout successfully', async ({ page }) => {
    // Login first
    await helpers.login('test@example.com', 'SecurePass123!');
    
    // Logout
    await helpers.logout();
    
    // Verify logout
    await expect(page.locator('[data-testid="login-form"]')).toBeVisible();
    await expect(page.locator('[data-testid="user-menu"]')).not.toBeVisible();
  });
});
```

### User Management Flow

```typescript
// tests/e2e/user-management.spec.ts
import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('User Management', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await helpers.login('admin@example.com', 'AdminPass123!');
  });

  test('admin can view user list', async ({ page }) => {
    await page.goto('/admin/users');
    
    await expect(page.locator('[data-testid="users-table"]')).toBeVisible();
    await expect(page.locator('[data-testid="user-row"]')).toHaveCount(5);
  });

  test('admin can create new user', async ({ page }) => {
    await page.goto('/admin/users/new');
    
    const email = `newuser-${Date.now()}@example.com`;
    
    await page.fill('[data-testid="name-input"]', 'New User');
    await page.fill('[data-testid="email-input"]', email);
    await page.selectOption('[data-testid="role-select"]', 'user');
    await page.click('[data-testid="create-user-button"]');
    
    await page.waitForURL('/admin/users');
    await expect(page.locator('[data-testid="success-message"]')).toHaveText(
      'User created successfully'
    );
    
    // Verify user appears in list
    await expect(page.locator(`[data-testid="user-email-${email}"]`)).toBeVisible();
  });

  test('admin can edit user', async ({ page }) => {
    await page.goto('/admin/users');
    
    // Click edit button for first user
    await page.click('[data-testid="edit-user-button"]').first();
    
    await page.fill('[data-testid="name-input"]', 'Updated Name');
    await page.selectOption('[data-testid="role-select"]', 'admin');
    await page.click('[data-testid="save-user-button"]');
    
    await expect(page.locator('[data-testid="success-message"]')).toHaveText(
      'User updated successfully'
    );
  });

  test('admin can delete user', async ({ page }) => {
    await page.goto('/admin/users');
    
    const initialCount = await page.locator('[data-testid="user-row"]').count();
    
    // Click delete button for first user
    await page.click('[data-testid="delete-user-button"]').first();
    
    // Confirm deletion
    await page.click('[data-testid="confirm-delete-button"]');
    
    await expect(page.locator('[data-testid="success-message"]')).toHaveText(
      'User deleted successfully'
    );
    
    // Verify user count decreased
    const finalCount = await page.locator('[data-testid="user-row"]').count();
    expect(finalCount).toBe(initialCount - 1);
  });
});
```

### E-commerce Flow

```typescript
// tests/e2e/ecommerce.spec.ts
import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('E-commerce Flow', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await helpers.login('customer@example.com', 'CustomerPass123!');
  });

  test('user can browse products', async ({ page }) => {
    await page.goto('/products');
    
    // Verify products are displayed
    await expect(page.locator('[data-testid="product-card"]')).toHaveCount(12);
    
    // Search for a product
    await page.fill('[data-testid="search-input"]', 'laptop');
    await page.click('[data-testid="search-button"]');
    
    await expect(page.locator('[data-testid="product-card"]')).toHaveCount(3);
  });

  test('user can add product to cart', async ({ page }) => {
    await page.goto('/products');
    
    // Add first product to cart
    await page.click('[data-testid="add-to-cart-button"]').first();
    
    // Verify cart count increased
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');
    
    // Open cart
    await page.click('[data-testid="cart-icon"]');
    
    await expect(page.locator('[data-testid="cart-item"]')).toBeVisible();
  });

  test('user can complete checkout', async ({ page }) => {
    // Add product to cart
    await page.goto('/products');
    await page.click('[data-testid="add-to-cart-button"]').first();
    
    // Go to checkout
    await page.click('[data-testid="checkout-button"]');
    
    // Fill shipping information
    await page.fill('[data-testid="shipping-name"]', 'John Doe');
    await page.fill('[data-testid="shipping-address"]', '123 Main St');
    await page.fill('[data-testid="shipping-city"]', 'New York');
    await page.fill('[data-testid="shipping-zip"]', '10001');
    
    // Fill payment information
    await page.fill('[data-testid="card-number"]', '4242424242424242');
    await page.fill('[data-testid="card-expiry"]', '12/25');
    await page.fill('[data-testid="card-cvc"]', '123');
    
    // Complete order
    await page.click('[data-testid="place-order-button"]');
    
    // Verify order confirmation
    await page.waitForURL('/order-confirmation');
    await expect(page.locator('[data-testid="order-success"]')).toBeVisible();
    await expect(page.locator('[data-testid="order-number"]')).toBeVisible();
  });

  test('user can view order history', async ({ page }) => {
    await page.goto('/orders');
    
    await expect(page.locator('[data-testid="order-item"]')).toHaveCount(3);
    
    // Click on first order
    await page.click('[data-testid="order-item"]').first();
    
    await expect(page.locator('[data-testid="order-details"]')).toBeVisible();
    await expect(page.locator('[data-testid="order-status"]')).toBeVisible();
  });
});
```

### Responsive Design Testing

```typescript
// tests/e2e/responsive.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('mobile navigation works correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Verify mobile menu is hidden initially
    await expect(page.locator('[data-testid="mobile-menu"]')).not.toBeVisible();
    
    // Open mobile menu
    await page.click('[data-testid="mobile-menu-button"]');
    
    // Verify menu is visible
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    
    // Navigate to a page
    await page.click('[data-testid="mobile-nav-products"]');
    await page.waitForURL('/products');
    
    // Verify menu closes after navigation
    await expect(page.locator('[data-testid="mobile-menu"]')).not.toBeVisible();
  });

  test('tablet layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/products');
    
    // Verify grid layout adapts
    await expect(page.locator('[data-testid="product-grid"]')).toHaveClass(/grid-cols-2/);
    
    // Verify sidebar is visible
    await expect(page.locator('[data-testid="filter-sidebar"]')).toBeVisible();
  });

  test('desktop layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/products');
    
    // Verify grid layout adapts
    await expect(page.locator('[data-testid="product-grid"]')).toHaveClass(/grid-cols-4/);
    
    // Verify full navigation is visible
    await expect(page.locator('[data-testid="desktop-nav"]')).toBeVisible();
  });
});
```

## 🔧 E2E Test Configuration

### Test Data Management

```typescript
// tests/e2e/fixtures/test-data.ts
export const testUsers = {
  admin: {
    email: 'admin@example.com',
    password: 'AdminPass123!',
    name: 'Admin User',
    role: 'admin',
  },
  customer: {
    email: 'customer@example.com',
    password: 'CustomerPass123!',
    name: 'Customer User',
    role: 'customer',
  },
  manager: {
    email: 'manager@example.com',
    password: 'ManagerPass123!',
    name: 'Manager User',
    role: 'manager',
  },
};

export const testProducts = [
  {
    name: 'Laptop Pro',
    price: 1299.99,
    category: 'electronics',
    description: 'High-performance laptop',
  },
  {
    name: 'Wireless Headphones',
    price: 199.99,
    category: 'electronics',
    description: 'Premium wireless headphones',
  },
  {
    name: 'Coffee Maker',
    price: 89.99,
    category: 'home',
    description: 'Automatic coffee maker',
  },
];
```

### Visual Regression Testing

```typescript
// tests/e2e/visual-regression.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  test('homepage matches design', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      threshold: 0.1,
    });
  });

  test('product page matches design', async ({ page }) => {
    await page.goto('/products/1');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('product-page.png', {
      fullPage: true,
      threshold: 0.1,
    });
  });

  test('mobile layout matches design', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      threshold: 0.1,
    });
  });
});
```

## 📊 E2E Test Metrics

### Performance Requirements
- **Page Load Time**: < 3 seconds
- **Time to Interactive**: < 5 seconds
- **Test Execution**: < 2 minutes for full suite
- **Cross-Browser**: All major browsers supported

### Quality Metrics
- **Test Reliability**: 95%+ pass rate
- **Coverage**: 100% of critical user journeys
- **Accessibility**: WCAG 2.1 AA compliance
- **Mobile**: Responsive design validation

## 🔄 E2E Testing Workflow

### 1. Test Development Process
1. **Identify User Journeys**: Map critical user paths
2. **Create Test Scenarios**: Define realistic test cases
3. **Set Up Test Data**: Prepare test environment
4. **Write Tests**: Implement E2E test cases
5. **Validate Results**: Ensure tests are reliable

### 2. Test Maintenance
1. **Regular Review**: Review E2E tests monthly
2. **Update Selectors**: Keep selectors up-to-date
3. **Monitor Performance**: Track test execution times
4. **Optimize Flakiness**: Reduce test instability

### 3. Environment Management
1. **Test Environment**: Use isolated test environment
2. **Data Cleanup**: Reset state between tests
3. **Configuration**: Use test-specific configuration
4. **Monitoring**: Monitor test environment health

## 🔗 Related Areas

- **Testing Strategy**: [Testing Strategy](./testing-strategy.md)
- **Unit Testing**: [Unit Testing Guidelines](./unit-testing.md)
- **Integration Testing**: [Integration Testing](./integration-testing.md)
- **Performance Testing**: [Performance Testing](./performance-testing.md)
- **Accessibility Testing**: [Accessibility Testing](./accessibility-testing.md)
- **Playwright Setup**: [Playwright Configuration](./playwright-setup.md)

---

**Next Steps**:
- Review [Performance Testing](./performance-testing.md) for performance validation
- Check [Accessibility Testing](./accessibility-testing.md) for accessibility compliance
- See [Playwright Setup](./playwright-setup.md) for detailed configuration 