# Integration Testing Guidelines 🔗

## 🎯 Overview

This document provides comprehensive guidelines for integration testing, covering API testing, database integration, and service-to-service communication testing.

## 🔗 Related Documentation

- **Testing Strategy**: [Testing Strategy](./testing-strategy.md)
- **Unit Testing**: [Unit Testing Guidelines](./unit-testing.md)
- **E2E Testing**: [E2E Testing Standards](./e2e-testing.md)
- **Performance Testing**: [Performance Testing](./performance-testing.md)
- **API Testing**: [API Testing Guidelines](./api-testing.md)
- **Database Testing**: [Database Testing](./database-testing.md)

## 📊 Integration Testing Strategy

### Testing Pyramid - Integration Layer
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
- **API Endpoints**: 100% of endpoints tested
- **Database Operations**: All CRUD operations tested
- **Service Communication**: All service interactions tested
- **Error Scenarios**: All error paths tested
- **Performance**: Response time < 500ms for integration tests

## 🏗️ API Integration Testing

### API Test Structure

```typescript
// src/tests/integration/api/users.test.ts
import { createMocks } from 'node-mocks-http';
import { handler } from '@/pages/api/users';
import { prisma } from '@/lib/prisma';

describe('/api/users', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('GET /api/users', () => {
    it('returns empty array when no users exist', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.success).toBe(true);
      expect(data.data).toEqual([]);
    });

    it('returns all users when users exist', async () => {
      // Create test users
      const user1 = await prisma.user.create({
        data: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'hashedPassword',
        },
      });

      const user2 = await prisma.user.create({
        data: {
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: 'hashedPassword',
        },
      });

      const { req, res } = createMocks({
        method: 'GET',
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(2);
      expect(data.data[0].name).toBe('John Doe');
      expect(data.data[1].name).toBe('Jane Smith');
    });

    it('handles database errors gracefully', async () => {
      // Mock database error
      jest.spyOn(prisma.user, 'findMany').mockRejectedValueOnce(
        new Error('Database connection failed')
      );

      const { req, res } = createMocks({
        method: 'GET',
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(500);
      const data = JSON.parse(res._getData());
      expect(data.success).toBe(false);
      expect(data.message).toContain('Internal server error');
    });
  });

  describe('POST /api/users', () => {
    it('creates new user with valid data', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'SecurePass123!',
      };

      const { req, res } = createMocks({
        method: 'POST',
        body: userData,
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(201);
      const data = JSON.parse(res._getData());
      expect(data.success).toBe(true);
      expect(data.data.name).toBe(userData.name);
      expect(data.data.email).toBe(userData.email);

      // Verify user was created in database
      const createdUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });
      expect(createdUser).toBeTruthy();
      expect(createdUser?.name).toBe(userData.name);
    });

    it('returns 400 for invalid data', async () => {
      const invalidData = {
        name: '',
        email: 'invalid-email',
        password: 'weak',
      };

      const { req, res } = createMocks({
        method: 'POST',
        body: invalidData,
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(400);
      const data = JSON.parse(res._getData());
      expect(data.success).toBe(false);
      expect(data.errors).toHaveProperty('name');
      expect(data.errors).toHaveProperty('email');
      expect(data.errors).toHaveProperty('password');
    });

    it('returns 409 for duplicate email', async () => {
      // Create existing user
      await prisma.user.create({
        data: {
          name: 'Existing User',
          email: 'john@example.com',
          password: 'hashedPassword',
        },
      });

      const userData = {
        name: 'John Doe',
        email: 'john@example.com', // Duplicate email
        password: 'SecurePass123!',
      };

      const { req, res } = createMocks({
        method: 'POST',
        body: userData,
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(409);
      const data = JSON.parse(res._getData());
      expect(data.success).toBe(false);
      expect(data.message).toContain('Email already exists');
    });
  });

  describe('PUT /api/users/[id]', () => {
    it('updates user successfully', async () => {
      const user = await prisma.user.create({
        data: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'hashedPassword',
        },
      });

      const updateData = {
        name: 'John Updated',
        email: 'john.updated@example.com',
      };

      const { req, res } = createMocks({
        method: 'PUT',
        body: updateData,
        query: { id: user.id },
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.success).toBe(true);
      expect(data.data.name).toBe(updateData.name);
      expect(data.data.email).toBe(updateData.email);

      // Verify database was updated
      const updatedUser = await prisma.user.findUnique({
        where: { id: user.id },
      });
      expect(updatedUser?.name).toBe(updateData.name);
      expect(updatedUser?.email).toBe(updateData.email);
    });

    it('returns 404 for non-existent user', async () => {
      const updateData = {
        name: 'John Updated',
        email: 'john.updated@example.com',
      };

      const { req, res } = createMocks({
        method: 'PUT',
        body: updateData,
        query: { id: 'non-existent-id' },
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(404);
      const data = JSON.parse(res._getData());
      expect(data.success).toBe(false);
      expect(data.message).toContain('User not found');
    });
  });

  describe('DELETE /api/users/[id]', () => {
    it('deletes user successfully', async () => {
      const user = await prisma.user.create({
        data: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'hashedPassword',
        },
      });

      const { req, res } = createMocks({
        method: 'DELETE',
        query: { id: user.id },
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.success).toBe(true);
      expect(data.message).toContain('User deleted');

      // Verify user was deleted from database
      const deletedUser = await prisma.user.findUnique({
        where: { id: user.id },
      });
      expect(deletedUser).toBeNull();
    });

    it('returns 404 for non-existent user', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        query: { id: 'non-existent-id' },
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(404);
      const data = JSON.parse(res._getData());
      expect(data.success).toBe(false);
      expect(data.message).toContain('User not found');
    });
  });
});
```

### Authentication API Testing

```typescript
// src/tests/integration/api/auth.test.ts
import { createMocks } from 'node-mocks-http';
import { handler } from '@/pages/api/auth/login';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

describe('/api/auth/login', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('authenticates user with valid credentials', async () => {
    const password = 'SecurePass123!';
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
      },
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'john@example.com',
        password: password,
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    expect(data.data.user.id).toBe(user.id);
    expect(data.data.user.email).toBe(user.email);
    expect(data.data.token).toBeDefined();
  });

  it('returns 401 for invalid credentials', async () => {
    const password = 'SecurePass123!';
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
      },
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'john@example.com',
        password: 'wrongpassword',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(false);
    expect(data.message).toContain('Invalid credentials');
  });

  it('returns 401 for non-existent user', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'nonexistent@example.com',
        password: 'SecurePass123!',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(false);
    expect(data.message).toContain('Invalid credentials');
  });

  it('returns 400 for missing fields', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'john@example.com',
        // Missing password
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(false);
    expect(data.message).toContain('Missing required fields');
  });
});
```

## 🗄️ Database Integration Testing

### Database Test Setup

```typescript
// src/tests/integration/database/setup.ts
import { prisma } from '@/lib/prisma';

export async function setupTestDatabase() {
  // Clean up all tables
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();
  await prisma.comment.deleteMany();
  
  // Reset auto-increment counters
  await prisma.$executeRaw`ALTER SEQUENCE users_id_seq RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE posts_id_seq RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE comments_id_seq RESTART WITH 1`;
}

export async function teardownTestDatabase() {
  await prisma.$disconnect();
}

export async function createTestUser(data: Partial<User> = {}) {
  return prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedPassword',
      ...data,
    },
  });
}

export async function createTestPost(data: Partial<Post> = {}) {
  return prisma.post.create({
    data: {
      title: 'Test Post',
      content: 'Test content',
      authorId: '1',
      ...data,
    },
  });
}
```

### Database Operation Testing

```typescript
// src/tests/integration/database/users.test.ts
import { prisma } from '@/lib/prisma';
import { setupTestDatabase, teardownTestDatabase, createTestUser } from './setup';

describe('User Database Operations', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  afterAll(async () => {
    await teardownTestDatabase();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  describe('User Creation', () => {
    it('creates user with valid data', async () => {
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
      expect(user.id).toBeDefined();
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
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

    it('validates required fields', async () => {
      await expect(
        prisma.user.create({
          data: {
            name: 'John Doe',
            // Missing email
            password: 'hashedPassword',
          },
        })
      ).rejects.toThrow();
    });
  });

  describe('User Retrieval', () => {
    it('finds user by ID', async () => {
      const createdUser = await createTestUser();

      const foundUser = await prisma.user.findUnique({
        where: { id: createdUser.id },
      });

      expect(foundUser).toEqual(createdUser);
    });

    it('finds user by email', async () => {
      const createdUser = await createTestUser({
        email: 'unique@example.com',
      });

      const foundUser = await prisma.user.findUnique({
        where: { email: 'unique@example.com' },
      });

      expect(foundUser).toEqual(createdUser);
    });

    it('returns null for non-existent user', async () => {
      const foundUser = await prisma.user.findUnique({
        where: { id: 'non-existent-id' },
      });

      expect(foundUser).toBeNull();
    });
  });

  describe('User Updates', () => {
    it('updates user successfully', async () => {
      const user = await createTestUser();

      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: 'Jane Doe',
          email: 'jane@example.com',
        },
      });

      expect(updatedUser.name).toBe('Jane Doe');
      expect(updatedUser.email).toBe('jane@example.com');
      expect(updatedUser.updatedAt.getTime()).toBeGreaterThan(
        user.updatedAt.getTime()
      );
    });

    it('throws error for non-existent user', async () => {
      await expect(
        prisma.user.update({
          where: { id: 'non-existent-id' },
          data: { name: 'Jane Doe' },
        })
      ).rejects.toThrow();
    });
  });

  describe('User Deletion', () => {
    it('deletes user successfully', async () => {
      const user = await createTestUser();

      await prisma.user.delete({
        where: { id: user.id },
      });

      const deletedUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      expect(deletedUser).toBeNull();
    });

    it('throws error for non-existent user', async () => {
      await expect(
        prisma.user.delete({
          where: { id: 'non-existent-id' },
        })
      ).rejects.toThrow();
    });
  });

  describe('User Queries', () => {
    it('finds users with pagination', async () => {
      // Create multiple users
      await Promise.all([
        createTestUser({ name: 'User 1', email: 'user1@example.com' }),
        createTestUser({ name: 'User 2', email: 'user2@example.com' }),
        createTestUser({ name: 'User 3', email: 'user3@example.com' }),
      ]);

      const users = await prisma.user.findMany({
        take: 2,
        skip: 0,
        orderBy: { name: 'asc' },
      });

      expect(users).toHaveLength(2);
      expect(users[0].name).toBe('User 1');
      expect(users[1].name).toBe('User 2');
    });

    it('filters users by criteria', async () => {
      await Promise.all([
        createTestUser({ name: 'John Doe', email: 'john@example.com' }),
        createTestUser({ name: 'Jane Smith', email: 'jane@example.com' }),
        createTestUser({ name: 'Bob Johnson', email: 'bob@example.com' }),
      ]);

      const johnUsers = await prisma.user.findMany({
        where: {
          name: {
            contains: 'John',
          },
        },
      });

      expect(johnUsers).toHaveLength(1);
      expect(johnUsers[0].name).toBe('John Doe');
    });
  });
});
```

## 🔄 Service Integration Testing

### Service-to-Service Communication

```typescript
// src/tests/integration/services/user-service.test.ts
import { UserService } from '@/services/UserService';
import { AuthService } from '@/services/AuthService';
import { EmailService } from '@/services/EmailService';
import { prisma } from '@/lib/prisma';

// Mock external services
jest.mock('@/services/EmailService');
jest.mock('@/services/AuthService');

describe('UserService Integration', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('User Registration Flow', () => {
    it('completes full registration process', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'SecurePass123!',
      };

      // Mock email service
      (EmailService.sendWelcomeEmail as jest.Mock).mockResolvedValue(true);
      
      // Mock auth service
      (AuthService.hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
      (AuthService.generateToken as jest.Mock).mockResolvedValue('jwt-token');

      const result = await UserService.registerUser(userData);

      expect(result.success).toBe(true);
      expect(result.user.name).toBe(userData.name);
      expect(result.user.email).toBe(userData.email);
      expect(result.token).toBe('jwt-token');

      // Verify database operation
      const dbUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });
      expect(dbUser).toBeTruthy();
      expect(dbUser?.name).toBe(userData.name);

      // Verify email was sent
      expect(EmailService.sendWelcomeEmail).toHaveBeenCalledWith(
        userData.email,
        userData.name
      );

      // Verify password was hashed
      expect(AuthService.hashPassword).toHaveBeenCalledWith(userData.password);
    });

    it('handles email service failure gracefully', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'SecurePass123!',
      };

      // Mock email service failure
      (EmailService.sendWelcomeEmail as jest.Mock).mockRejectedValue(
        new Error('Email service unavailable')
      );
      
      (AuthService.hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
      (AuthService.generateToken as jest.Mock).mockResolvedValue('jwt-token');

      const result = await UserService.registerUser(userData);

      // User should still be created even if email fails
      expect(result.success).toBe(true);
      expect(result.user.email).toBe(userData.email);

      // Verify user was created in database
      const dbUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });
      expect(dbUser).toBeTruthy();

      // Verify email service was called
      expect(EmailService.sendWelcomeEmail).toHaveBeenCalled();
    });
  });

  describe('User Authentication Flow', () => {
    it('authenticates user with valid credentials', async () => {
      const password = 'SecurePass123!';
      const hashedPassword = await AuthService.hashPassword(password);

      const user = await prisma.user.create({
        data: {
          name: 'John Doe',
          email: 'john@example.com',
          password: hashedPassword,
        },
      });

      (AuthService.verifyPassword as jest.Mock).mockResolvedValue(true);
      (AuthService.generateToken as jest.Mock).mockResolvedValue('jwt-token');

      const result = await UserService.authenticateUser({
        email: 'john@example.com',
        password: password,
      });

      expect(result.success).toBe(true);
      expect(result.user.id).toBe(user.id);
      expect(result.token).toBe('jwt-token');

      expect(AuthService.verifyPassword).toHaveBeenCalledWith(
        password,
        hashedPassword
      );
      expect(AuthService.generateToken).toHaveBeenCalledWith({
        userId: user.id,
        email: user.email,
      });
    });

    it('handles authentication failure', async () => {
      const password = 'SecurePass123!';
      const hashedPassword = await AuthService.hashPassword(password);

      await prisma.user.create({
        data: {
          name: 'John Doe',
          email: 'john@example.com',
          password: hashedPassword,
        },
      });

      (AuthService.verifyPassword as jest.Mock).mockResolvedValue(false);

      const result = await UserService.authenticateUser({
        email: 'john@example.com',
        password: 'wrongpassword',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid credentials');
    });
  });
});
```

## 🔧 Integration Test Configuration

### Test Environment Setup

```typescript
// src/tests/integration/setup.ts
import { prisma } from '@/lib/prisma';
import { server } from './mocks/server';

beforeAll(async () => {
  // Start MSW server for API mocking
  server.listen();
  
  // Connect to test database
  await prisma.$connect();
});

afterAll(async () => {
  // Clean up
  server.close();
  await prisma.$disconnect();
});

beforeEach(async () => {
  // Reset database state
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();
  
  // Reset MSW handlers
  server.resetHandlers();
});
```

### Database Test Configuration

```javascript
// jest.integration.config.js
module.exports = {
  ...require('./jest.config.js'),
  testMatch: [
    '<rootDir>/src/tests/integration/**/*.test.{js,jsx,ts,tsx}',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/src/tests/integration/setup.ts',
  ],
  testEnvironment: 'node',
  testTimeout: 10000, // 10 seconds for integration tests
};
```

## 📊 Integration Test Metrics

### Performance Requirements
- **API Response Time**: < 500ms for integration tests
- **Database Query Time**: < 100ms per query
- **Test Execution Time**: < 30 seconds for full integration suite
- **Memory Usage**: < 100MB per test

### Quality Metrics
- **Test Reliability**: 95%+ pass rate
- **Coverage**: 100% of API endpoints
- **Error Scenarios**: All error paths tested
- **Data Integrity**: All database operations verified

## 🔄 Integration Testing Workflow

### 1. Test Development Process
1. **Identify Integration Points**: Map service interactions
2. **Create Test Data**: Set up realistic test scenarios
3. **Mock External Services**: Isolate system under test
4. **Verify End-to-End Flow**: Test complete user journeys
5. **Validate Data Consistency**: Ensure data integrity

### 2. Test Maintenance
1. **Regular Review**: Review integration tests monthly
2. **Update Mocks**: Keep service mocks up-to-date
3. **Monitor Performance**: Track test execution times
4. **Optimize Database**: Clean up test data efficiently

### 3. Environment Management
1. **Test Database**: Use isolated test database
2. **Service Mocks**: Mock external dependencies
3. **Data Cleanup**: Reset state between tests
4. **Configuration**: Use test-specific configuration

## 🔗 Related Areas

- **Testing Strategy**: [Testing Strategy](./testing-strategy.md)
- **Unit Testing**: [Unit Testing Guidelines](./unit-testing.md)
- **E2E Testing**: [E2E Testing Standards](./e2e-testing.md)
- **Performance Testing**: [Performance Testing](./performance-testing.md)
- **API Testing**: [API Testing Guidelines](./api-testing.md)
- **Database Testing**: [Database Testing](./database-testing.md)

---

**Next Steps**:
- Review [E2E Testing Standards](./e2e-testing.md) for user journey testing
- Check [Performance Testing](./performance-testing.md) for performance validation
- See [API Testing Guidelines](./api-testing.md) for detailed API testing 