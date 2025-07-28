# Security Implementation 🔒

## 🎯 Overview

This document establishes comprehensive security implementation guidelines covering authentication, authorization, data protection, and security best practices for modern web applications.

## 🔗 Related Documentation

- **Authentication**: [Authentication & Authorization](./auth-guidelines.md)
- **Data Protection**: [Data Protection](./data-protection.md)
- **API Security**: [API Security](./api-security.md)
- **Compliance**: [Compliance Standards](./compliance-standards.md)
- **Development**: [TypeScript Guidelines](../development/typescript-guidelines.md)
- **Testing**: [Security Testing](../testing/security-testing.md)

## 🛡️ Security Architecture

### Security Layers

```
┌─────────────────────────────────────┐
│           Application Layer         │
│  • Input Validation                │
│  • Output Encoding                 │
│  • Session Management              │
│  • Error Handling                  │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│           Transport Layer           │
│  • HTTPS/TLS                      │
│  • Certificate Management          │
│  • Secure Headers                 │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│           Network Layer             │
│  • Firewall Configuration          │
│  • DDoS Protection                │
│  • Rate Limiting                  │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│           Infrastructure Layer      │
│  • Access Control                  │
│  • Monitoring & Logging            │
│  • Backup & Recovery              │
└─────────────────────────────────────┘
```

## 🔐 Authentication & Authorization

### JWT Implementation

```typescript
// src/lib/auth/jwt.ts
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import type { User } from '@/types/auth';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export class JWTService {
  static async sign(payload: Omit<User, 'password'>): Promise<string> {
    return promisify(jwt.sign)(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'your-app',
      audience: 'your-app-users',
    });
  }

  static async verify(token: string): Promise<Omit<User, 'password'>> {
    try {
      const decoded = await promisify(jwt.verify)(token, JWT_SECRET, {
        issuer: 'your-app',
        audience: 'your-app-users',
      });
      return decoded as Omit<User, 'password'>;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  static async refresh(token: string): Promise<string> {
    const decoded = await this.verify(token);
    return this.sign(decoded);
  }
}
```

### Password Hashing

```typescript
// src/lib/auth/password.ts
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

export class PasswordService {
  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  static async verify(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static validate(password: string): boolean {
    // Minimum 8 characters, at least one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
}
```

### Session Management

```typescript
// src/lib/auth/session.ts
import { Redis } from 'ioredis';
import { JWTService } from './jwt';

const redis = new Redis(process.env.REDIS_URL!);

export class SessionService {
  static async createSession(userId: string, token: string): Promise<void> {
    const key = `session:${userId}`;
    const expiresIn = 24 * 60 * 60; // 24 hours in seconds
    
    await redis.setex(key, expiresIn, token);
  }

  static async validateSession(userId: string, token: string): Promise<boolean> {
    const key = `session:${userId}`;
    const storedToken = await redis.get(key);
    
    return storedToken === token;
  }

  static async invalidateSession(userId: string): Promise<void> {
    const key = `session:${userId}`;
    await redis.del(key);
  }

  static async refreshSession(userId: string): Promise<string> {
    const key = `session:${userId}`;
    const currentToken = await redis.get(key);
    
    if (!currentToken) {
      throw new Error('Session not found');
    }

    const decoded = await JWTService.verify(currentToken);
    const newToken = await JWTService.sign(decoded);
    
    await this.createSession(userId, newToken);
    return newToken;
  }
}
```

## 🛡️ Input Validation & Sanitization

### Validation Middleware

```typescript
// src/middleware/validation.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export function validateRequest(schema: z.ZodSchema) {
  return async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    try {
      const validatedData = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.query,
      });

      req.validatedData = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.errors,
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };
}

// Validation schemas
export const userSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});
```

### XSS Protection

```typescript
// src/lib/security/xss.ts
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window as any);

export class XSSProtection {
  static sanitizeHTML(html: string): string {
    return purify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
      ALLOWED_ATTR: ['href'],
    });
  }

  static sanitizeText(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  static validateInput(input: string, type: 'email' | 'url' | 'text'): boolean {
    switch (type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input);
      case 'url':
        try {
          new URL(input);
          return true;
        } catch {
          return false;
        }
      case 'text':
        return input.length <= 1000; // Max length
      default:
        return false;
    }
  }
}
```

## 🔒 API Security

### Rate Limiting

```typescript
// src/middleware/rateLimit.ts
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redis } from '@/lib/redis';

export const createRateLimiter = (
  windowMs: number = 15 * 60 * 1000, // 15 minutes
  max: number = 100 // limit each IP to 100 requests per windowMs
) => {
  return rateLimit({
    store: new RedisStore({
      sendCommand: (...args: string[]) => redis.call(...args),
    }),
    windowMs,
    max,
    message: {
      success: false,
      message: 'Too many requests, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Specific limiters
export const authLimiter = createRateLimiter(15 * 60 * 1000, 5); // 5 attempts per 15 minutes
export const apiLimiter = createRateLimiter(15 * 60 * 1000, 100); // 100 requests per 15 minutes
export const uploadLimiter = createRateLimiter(60 * 60 * 1000, 10); // 10 uploads per hour
```

### CORS Configuration

```typescript
// src/lib/security/cors.ts
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:3000',
  'https://yourdomain.com',
  'https://www.yourdomain.com',
];

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
  ],
  exposedHeaders: ['X-Total-Count'],
  maxAge: 86400, // 24 hours
};
```

### Security Headers

```typescript
// src/middleware/securityHeaders.ts
import { NextApiRequest, NextApiResponse } from 'next';

export function securityHeaders(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';"
  );

  // HTTP Strict Transport Security
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // X-Content-Type-Options
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // X-Frame-Options
  res.setHeader('X-Frame-Options', 'DENY');

  // X-XSS-Protection
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions Policy
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  );

  next();
}
```

## 🔍 Security Monitoring

### Audit Logging

```typescript
// src/lib/security/audit.ts
import { prisma } from '@/lib/prisma';

export interface AuditLog {
  userId?: string;
  action: string;
  resource: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

export class AuditService {
  static async log(auditData: Omit<AuditLog, 'timestamp'>): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          ...auditData,
          timestamp: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to log audit event:', error);
      // Don't throw - audit logging should not break the application
    }
  }

  static async getAuditTrail(
    userId?: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<AuditLog[]> {
    const where: any = {};
    
    if (userId) {
      where.userId = userId;
    }
    
    if (startDate || endDate) {
      where.timestamp = {};
      if (startDate) where.timestamp.gte = startDate;
      if (endDate) where.timestamp.lte = endDate;
    }

    return prisma.auditLog.findMany({
      where,
      orderBy: { timestamp: 'desc' },
    });
  }
}
```

### Security Monitoring

```typescript
// src/lib/security/monitoring.ts
import { AuditService } from './audit';

export class SecurityMonitoring {
  static async detectSuspiciousActivity(
    userId: string,
    action: string,
    ipAddress: string
  ): Promise<boolean> {
    // Check for unusual patterns
    const recentActions = await AuditService.getAuditTrail(
      userId,
      new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
    );

    const failedLogins = recentActions.filter(
      (log) => log.action === 'LOGIN_FAILED'
    ).length;

    const unusualIPs = recentActions.filter(
      (log) => log.ipAddress !== ipAddress
    ).length;

    // Alert if suspicious activity detected
    if (failedLogins > 5 || unusualIPs > 3) {
      await this.alertSecurityTeam(userId, action, ipAddress);
      return true;
    }

    return false;
  }

  static async alertSecurityTeam(
    userId: string,
    action: string,
    ipAddress: string
  ): Promise<void> {
    // Send alert to security team
    console.warn(`Suspicious activity detected for user ${userId}`);
    
    // In production, send to security monitoring system
    // await sendSecurityAlert({ userId, action, ipAddress });
  }
}
```

## 🧪 Security Testing

### Security Test Examples

```typescript
// tests/security/auth.test.ts
import request from 'supertest';
import { app } from '@/app';

describe('Authentication Security', () => {
  it('should prevent brute force attacks', async () => {
    const email = 'test@example.com';
    const wrongPassword = 'wrongpassword';

    // Attempt multiple failed logins
    for (let i = 0; i < 6; i++) {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email, password: wrongPassword });

      if (i < 5) {
        expect(response.status).toBe(401);
      } else {
        // 6th attempt should be blocked
        expect(response.status).toBe(429);
      }
    }
  });

  it('should validate password strength', async () => {
    const weakPasswords = ['123', 'password', 'abc123'];

    for (const password of weakPasswords) {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Password');
    }
  });

  it('should prevent SQL injection', async () => {
    const maliciousInput = "'; DROP TABLE users; --";

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: maliciousInput,
        password: 'password',
      });

    expect(response.status).toBe(400);
  });
});
```

### XSS Testing

```typescript
// tests/security/xss.test.ts
import { render, screen } from '@testing-library/react';
import { UserProfile } from '@/components/UserProfile';

describe('XSS Protection', () => {
  it('should sanitize user input', () => {
    const maliciousUser = {
      name: '<script>alert("xss")</script>',
      email: 'test@example.com',
    };

    render(<UserProfile user={maliciousUser} />);

    // Should not contain script tags
    expect(screen.getByText(maliciousUser.name)).toBeInTheDocument();
    expect(screen.queryByText('<script>')).not.toBeInTheDocument();
  });

  it('should escape HTML entities', () => {
    const userWithSpecialChars = {
      name: 'John & Jane <script>alert("xss")</script>',
      email: 'test@example.com',
    };

    render(<UserProfile user={userWithSpecialChars} />);

    const nameElement = screen.getByText(/John & Jane/);
    expect(nameElement).toBeInTheDocument();
    expect(nameElement.innerHTML).not.toContain('<script>');
  });
});
```

## 📊 Security Metrics

### Security KPIs
- **Authentication Failures**: < 5% of total attempts
- **Rate Limit Violations**: < 1% of requests
- **Security Incidents**: 0 critical incidents per month
- **Vulnerability Response Time**: < 24 hours for critical issues
- **Security Patch Deployment**: < 48 hours for critical patches

### Monitoring Metrics
- **Failed Login Attempts**: Track by IP and user
- **Unusual Access Patterns**: Geographic anomalies
- **API Rate Limit Hits**: Monitor abuse patterns
- **Security Header Compliance**: 100% implementation
- **SSL/TLS Certificate Status**: Monitor expiration

## 🔄 Security Workflow

### 1. Security Review Process
1. Code review with security focus
2. Automated security scanning
3. Manual penetration testing
4. Security audit documentation
5. Remediation tracking

### 2. Incident Response
1. Detection and classification
2. Immediate containment
3. Investigation and analysis
4. Remediation and recovery
5. Post-incident review

### 3. Security Maintenance
1. Regular security updates
2. Dependency vulnerability scanning
3. Security configuration review
4. Access control audit
5. Security training updates

## 🔗 Related Areas

- **Authentication**: [Authentication & Authorization](./auth-guidelines.md)
- **Data Protection**: [Data Protection](./data-protection.md)
- **API Security**: [API Security](./api-security.md)
- **Compliance**: [Compliance Standards](./compliance-standards.md)
- **Testing**: [Security Testing](../testing/security-testing.md)
- **Development**: [TypeScript Guidelines](../development/typescript-guidelines.md)

---

**Next Steps**:
- Review [Authentication & Authorization](./auth-guidelines.md) for detailed auth implementation
- Check [Data Protection](./data-protection.md) for data security practices
- See [API Security](./api-security.md) for API-specific security measures 