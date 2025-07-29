import React from 'react';
import DocumentationViewer from '../../../../components/DocumentationViewer';
import Link from 'next/link';

export default function SecurityImplementationPage() {
  const content = `# Security Implementation

## Overview

This document provides comprehensive security implementation guidelines covering authentication, authorization, data protection, and security best practices. Our security approach follows OWASP guidelines and industry standards to protect against common vulnerabilities.

## Table of Contents

1. [Authentication](#authentication)
2. [Authorization](#authorization)
3. [Data Protection](#data-protection)
4. [Input Validation](#input-validation)
5. [API Security](#api-security)
6. [Session Management](#session-management)
7. [Security Headers](#security-headers)
8. [Monitoring & Logging](#monitoring--logging)
9. [Security Testing](#security-testing)
10. [Incident Response](#incident-response)

## Authentication

### JWT Implementation

\`\`\`typescript
// JWT authentication service
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface User {
  id: string;
  email: string;
  role: string;
}

class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET!;
  private readonly JWT_EXPIRES_IN = '24h';

  async generateToken(user: User): Promise<string> {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      iat: Date.now(),
    };

    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN,
    });
  }

  async verifyToken(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as any;
      return {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      };
    } catch (error) {
      return null;
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
\`\`\`

### Multi-Factor Authentication

\`\`\`typescript
// MFA implementation
import { authenticator } from 'otplib';

class MFAService {
  generateSecret(userId: string): string {
    return authenticator.generateSecret();
  }

  generateQRCode(secret: string, email: string): string {
    const otpauth = authenticator.keyuri(email, 'YourApp', secret);
    return \`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=\${otpauth}\`;
  }

  verifyToken(token: string, secret: string): boolean {
    return authenticator.verify({ token, secret });
  }
}
\`\`\`

## Authorization

### Role-Based Access Control (RBAC)

\`\`\`typescript
// RBAC implementation
enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

interface Permission {
  resource: string;
  action: string;
}

class AuthorizationService {
  private rolePermissions: Record<UserRole, Permission[]> = {
    [UserRole.ADMIN]: [
      { resource: '*', action: '*' },
    ],
    [UserRole.MODERATOR]: [
      { resource: 'posts', action: 'read' },
      { resource: 'posts', action: 'update' },
      { resource: 'comments', action: 'delete' },
    ],
    [UserRole.USER]: [
      { resource: 'posts', action: 'read' },
      { resource: 'comments', action: 'create' },
      { resource: 'comments', action: 'read' },
    ],
  };

  can(userRole: UserRole, resource: string, action: string): boolean {
    const permissions = this.rolePermissions[userRole] || [];
    
    return permissions.some(permission => 
      (permission.resource === '*' || permission.resource === resource) &&
      (permission.action === '*' || permission.action === action)
    );
  }
}
\`\`\`

### Route Protection

\`\`\`typescript
// Protected route component
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  if (requiredRole && user.role !== requiredRole) {
    router.push('/unauthorized');
    return null;
  }

  return <>{children}</>;
}
\`\`\`

## Data Protection

### Encryption

\`\`\`typescript
// Data encryption service
import crypto from 'crypto';

class EncryptionService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');

  encrypt(text: string): { encryptedData: string; iv: string; authTag: string } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(this.algorithm, this.key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
      encryptedData: encrypted,
      iv: iv.toString('hex'),
      authTag: cipher.getAuthTag().toString('hex'),
    };
  }

  decrypt(encryptedData: string, iv: string, authTag: string): string {
    const decipher = crypto.createDecipher(this.algorithm, this.key, Buffer.from(iv, 'hex'));
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}
\`\`\`

### Data Sanitization

\`\`\`typescript
// Data sanitization utilities
import DOMPurify from 'dompurify';
import { z } from 'zod';

class SanitizationService {
  sanitizeHTML(html: string): string {
    return DOMPurify.sanitize(html);
  }

  sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '');
  }

  validateEmail(email: string): boolean {
    const emailSchema = z.string().email();
    return emailSchema.safeParse(email).success;
  }

  validatePassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
}
\`\`\`

## Input Validation

### Schema Validation

\`\`\`typescript
// Input validation schemas
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  name: z.string().min(2).max(50),
  age: z.number().min(13).max(120),
});

const PostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(10000),
  tags: z.array(z.string()).max(10),
});

// Validation middleware
export function validateRequest(schema: z.ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      res.status(400).json({ error: 'Invalid input data' });
    }
  };
}
\`\`\`

### XSS Prevention

\`\`\`typescript
// XSS prevention utilities
import { escape } from 'html-escaper';

class XSSPrevention {
  escapeHTML(text: string): string {
    return escape(text);
  }

  sanitizeUserInput(input: string): string {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '');
  }

  validateURL(url: string): boolean {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  }
}
\`\`\`

## API Security

### Rate Limiting

\`\`\`typescript
// Rate limiting implementation
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

const limiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rate-limit:',
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply to all routes
app.use(limiter);

// Specific route limiter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 attempts per 15 minutes
  message: 'Too many login attempts',
});
\`\`\`

### CORS Configuration

\`\`\`typescript
// CORS configuration
import cors from 'cors';

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-Total-Count'],
};

app.use(cors(corsOptions));
\`\`\`

## Session Management

### Secure Session Configuration

\`\`\`typescript
// Session configuration
import session from 'express-session';
import RedisStore from 'connect-redis';

const sessionConfig = {
  store: new RedisStore({ client: redis }),
  secret: process.env.SESSION_SECRET!,
  name: 'sessionId',
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
  resave: false,
  saveUninitialized: false,
  rolling: true,
};

app.use(session(sessionConfig));
\`\`\`

### Session Security

\`\`\`typescript
// Session security utilities
class SessionSecurity {
  regenerateSession(req: Request): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.regenerate((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  destroySession(req: Request): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  setSessionData(req: Request, data: any): void {
    req.session.user = data;
  }

  getSessionData(req: Request): any {
    return req.session.user;
  }
}
\`\`\`

## Security Headers

### Helmet Configuration

\`\`\`typescript
// Security headers with Helmet
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  noSniff: true,
  xssFilter: true,
  frameguard: {
    action: 'deny',
  },
}));
\`\`\`

### Custom Security Headers

\`\`\`typescript
// Custom security headers middleware
export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  next();
}
\`\`\`

## Monitoring & Logging

### Security Logging

\`\`\`typescript
// Security logging service
import winston from 'winston';

class SecurityLogger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.File({ filename: 'security.log' }),
        new winston.transports.Console(),
      ],
    });
  }

  logSecurityEvent(event: string, details: any): void {
    this.logger.info('Security Event', {
      event,
      details,
      timestamp: new Date().toISOString(),
      ip: details.ip,
      userAgent: details.userAgent,
    });
  }

  logFailedLogin(email: string, ip: string): void {
    this.logSecurityEvent('failed_login', { email, ip });
  }

  logSuspiciousActivity(activity: string, details: any): void {
    this.logSecurityEvent('suspicious_activity', { activity, details });
  }
}
\`\`\`

### Audit Trail

\`\`\`typescript
// Audit trail service
interface AuditEvent {
  userId: string;
  action: string;
  resource: string;
  details: any;
  timestamp: Date;
}

class AuditService {
  async logEvent(event: AuditEvent): Promise<void> {
    // Store in database
    await db.auditLogs.create({
      userId: event.userId,
      action: event.action,
      resource: event.resource,
      details: event.details,
      timestamp: event.timestamp,
    });
  }

  async getAuditTrail(userId: string, limit = 100): Promise<AuditEvent[]> {
    return db.auditLogs.findAll({
      where: { userId },
      order: [['timestamp', 'DESC']],
      limit,
    });
  }
}
\`\`\`

## Security Testing

### Automated Security Tests

\`\`\`typescript
// Security test examples
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm Security', () => {
  it('prevents SQL injection', () => {
    render(<LoginForm />);
    
    const maliciousInput = "'; DROP TABLE users; --";
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: maliciousInput },
    });
    
    // Verify the input is properly escaped
    expect(screen.getByDisplayValue(maliciousInput)).toBeInTheDocument();
  });

  it('prevents XSS attacks', () => {
    render(<LoginForm />);
    
    const maliciousInput = '<script>alert("xss")</script>';
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: maliciousInput },
    });
    
    // Verify the script is not executed
    expect(screen.getByDisplayValue(maliciousInput)).toBeInTheDocument();
  });
});
\`\`\`

### Penetration Testing Checklist

- [ ] Authentication bypass testing
- [ ] Authorization testing
- [ ] Input validation testing
- [ ] SQL injection testing
- [ ] XSS testing
- [ ] CSRF testing
- [ ] Session management testing
- [ ] File upload security testing

## Incident Response

### Security Incident Response Plan

1. **Detection**: Monitor logs and alerts
2. **Assessment**: Evaluate the severity and scope
3. **Containment**: Isolate affected systems
4. **Eradication**: Remove the threat
5. **Recovery**: Restore normal operations
6. **Lessons Learned**: Document and improve

### Security Contact Information

- **Security Team**: security@company.com
- **Emergency Contact**: +1-555-0123
- **Bug Bounty**: security@company.com

---

This security implementation ensures comprehensive protection against common vulnerabilities while maintaining usability and performance.
`;

  const navigation = [
    { title: 'Project Guidelines Standard', href: '/docs/standards/project_guidelines_standard' },
    { title: 'TypeScript Guidelines', href: '/docs/standards/typescript_guidelines' },
    { title: 'Testing Strategy', href: '/docs/testing/testing-strategy' },
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
              <h1 className="text-3xl font-bold text-gray-900">Security Implementation</h1>
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
          title="Security Implementation"
          navigation={navigation}
        />
      </main>
    </div>
  );
} 