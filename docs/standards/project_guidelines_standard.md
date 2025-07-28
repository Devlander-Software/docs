# Project Guidelines Standard 📋

## 🎯 Overview

This document establishes a comprehensive standard for project guidelines that ensures consistency, quality, and maintainability across all projects. It serves as a meta-framework for creating and maintaining project-specific guidelines.

## 📋 Standard Structure

### 1. Project-Specific Guidelines Template

Every project should include the following files in their root directory:

```
project-root/
├── .cursorrules                    # AI development guidelines
├── .editorconfig                   # Editor configuration
├── .prettierrc                    # Code formatting rules
├── .eslintrc.js                   # Linting rules (if applicable)
├── .gitignore                     # Git ignore patterns
├── README.md                      # Project documentation
├── CHANGELOG.md                   # Change tracking
├── CONTRIBUTING.md                # Contribution guidelines
├── SECURITY.md                    # Security policies
├── CODE_OF_CONDUCT.md            # Community guidelines
├── docs/
│   ├── ARCHITECTURE.md           # Architecture decisions
│   ├── API.md                    # API documentation
│   ├── DEPLOYMENT.md             # Deployment guides
│   └── TROUBLESHOOTING.md        # Common issues and solutions
└── .github/
    ├── ISSUE_TEMPLATE/           # Issue templates
    └── workflows/                # CI/CD workflows
```

### 2. Required Configuration Files

#### `.cursorrules` - AI Development Guidelines
- **Purpose**: Define AI-assisted development standards
- **Required Sections**:
  - Core principles and reasoning approach
  - Code quality and standards
  - Architecture and planning
  - Testing and quality assurance
  - Security best practices
  - Documentation standards
  - Version control practices

#### `.editorconfig` - Editor Configuration
```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{js,jsx,ts,tsx,json,css,scss,html,md}]
indent_style = space
indent_size = 2

[*.{py,rst}]
indent_style = space
indent_size = 4

[*.{java,c,cpp,h,hpp}]
indent_style = space
indent_size = 4

[Makefile]
indent_style = tab
```

#### `.prettierrc` - Code Formatting
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### 3. Documentation Standards

#### README.md Template
```markdown
# Project Name

Brief description of the project.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- Docker (optional)

### Installation
```bash
git clone <repository-url>
cd <project-name>
npm install
```

### Development
```bash
npm run dev
```

### Testing
```bash
npm test
```

### Building
```bash
npm run build
```

## 📚 Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [API Reference](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
```

#### CHANGELOG.md Template
```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New features

### Changed
- Changes in existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security vulnerability fixes

## [1.0.0] - 2024-01-01

### Added
- Initial release
```

### 4. Quality Assurance Standards

#### Code Review Checklist
- [ ] Code follows project style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] Security considerations addressed
- [ ] Performance implications considered
- [ ] Accessibility requirements met
- [ ] Error handling implemented
- [ ] Logging added where appropriate

#### Testing Standards
- **Unit Tests**: 80%+ coverage on critical paths
- **Integration Tests**: All API endpoints covered
- **E2E Tests**: Critical user journeys tested
- **Performance Tests**: Load testing for production endpoints
- **Security Tests**: Vulnerability scanning and penetration testing

#### Security Standards
- **Input Validation**: All inputs validated and sanitized
- **Authentication**: Secure authentication mechanisms
- **Authorization**: Role-based access control
- **Data Protection**: Encryption for sensitive data
- **Dependency Management**: Regular security updates
- **Security Headers**: CSP, HSTS, etc.

### 5. Development Workflow Standards

#### Git Workflow
```bash
# Feature development
git checkout -b feature/feature-name
# Make changes
git add .
git commit -m "feat(scope): description"
git push origin feature/feature-name
# Create pull request

# Bug fixes
git checkout -b fix/bug-description
# Make changes
git commit -m "fix(scope): description"
git push origin fix/bug-description
```

#### Conventional Commits
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `perf:` - Performance improvements
- `ci:` - CI/CD changes
- `build:` - Build system changes
- `revert:` - Reverting previous commits
- `deps:` - Dependency updates
- `security:` - Security-related changes

### 6. Technology-Specific Standards

#### JavaScript/TypeScript Projects
```json
// package.json standards
{
  "scripts": {
    "dev": "development server",
    "build": "production build",
    "test": "run tests",
    "test:watch": "run tests in watch mode",
    "test:coverage": "run tests with coverage",
    "lint": "run linter",
    "lint:fix": "fix linting issues",
    "format": "format code",
    "type-check": "run type checking"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
```

#### Python Projects
```toml
# pyproject.toml standards
[tool.poetry]
name = "project-name"
version = "0.1.0"
description = "Project description"
authors = ["Your Name <your.email@example.com>"]

[tool.poetry.dependencies]
python = "^3.9"

[tool.poetry.dev-dependencies]
pytest = "^7.0.0"
black = "^22.0.0"
flake8 = "^4.0.0"
mypy = "^0.991"

[tool.black]
line-length = 88
target-version = ['py39']

[tool.mypy]
python_version = "3.9"
warn_return_any = true
warn_unused_configs = true
```

### 7. Environment Management Standards

#### Environment Variables
```bash
# .env.example template
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

# External Services
API_KEY=your-api-key
WEBHOOK_URL=https://example.com/webhook

# Application
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
```

#### Docker Standards
```dockerfile
# Dockerfile template
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### 8. Monitoring and Observability Standards

#### Logging Standards
```javascript
// Logging configuration
const logger = {
  info: (message, meta = {}) => {
    console.log(JSON.stringify({
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      ...meta
    }));
  },
  error: (message, error = {}, meta = {}) => {
    console.error(JSON.stringify({
      level: 'error',
      message,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      ...meta
    }));
  }
};
```

#### Health Check Endpoints
```javascript
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    uptime: process.uptime()
  });
});
```

### 9. Performance Standards

#### Performance Budgets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **Bundle Size**: < 250KB (gzipped)

#### Caching Strategies
```javascript
// Cache headers
app.use((req, res, next) => {
  // Static assets
  if (req.path.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
  // API responses
  else if (req.path.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'private, max-age=300');
  }
  next();
});
```

### 10. Accessibility Standards

#### WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 for normal text
- **Keyboard Navigation**: All interactive elements accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators
- **Alternative Text**: All images have alt text

#### Accessibility Testing
```javascript
// Accessibility testing with axe-core
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 11. Security Standards

#### Security Headers
```javascript
// Security middleware
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
    preload: true
  }
}));
```

#### Input Validation
```javascript
// Input validation with Joi
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required(),
  age: Joi.number().integer().min(0).max(120)
});
```

### 12. Deployment Standards

#### CI/CD Pipeline
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run test:coverage
      - run: npm run build

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run security audit
        run: npm audit --audit-level=moderate
      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

### 13. Documentation Standards

#### API Documentation
```javascript
// OpenAPI/Swagger documentation
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
```

#### Code Documentation
```javascript
/**
 * Calculates the total price including tax and discounts
 * @param {number} basePrice - The base price of the item
 * @param {number} taxRate - The tax rate as a decimal (e.g., 0.08 for 8%)
 * @param {number} discountRate - The discount rate as a decimal (e.g., 0.1 for 10%)
 * @returns {number} The final price after tax and discounts
 * @throws {Error} If any parameter is negative
 * @example
 * const finalPrice = calculateTotalPrice(100, 0.08, 0.1);
 * console.log(finalPrice); // 97.2
 */
function calculateTotalPrice(basePrice, taxRate, discountRate) {
  if (basePrice < 0 || taxRate < 0 || discountRate < 0) {
    throw new Error('All parameters must be non-negative');
  }
  
  const discountedPrice = basePrice * (1 - discountRate);
  return discountedPrice * (1 + taxRate);
}
```

## 🔄 Implementation Checklist

### For New Projects
- [ ] Initialize project with standard structure
- [ ] Configure all required configuration files
- [ ] Set up CI/CD pipeline
- [ ] Implement testing framework
- [ ] Configure linting and formatting
- [ ] Set up monitoring and logging
- [ ] Create initial documentation
- [ ] Configure security scanning
- [ ] Set up accessibility testing
- [ ] Implement error tracking

### For Existing Projects
- [ ] Audit current structure against standards
- [ ] Update configuration files
- [ ] Implement missing quality gates
- [ ] Update documentation
- [ ] Configure automated testing
- [ ] Set up monitoring
- [ ] Implement security measures
- [ ] Add accessibility features
- [ ] Configure deployment pipeline

## 📊 Quality Metrics

### Code Quality
- **Test Coverage**: ≥ 80% for critical paths
- **Linting Score**: 0 violations
- **Type Safety**: 100% for TypeScript projects
- **Documentation Coverage**: ≥ 90%

### Performance
- **Lighthouse Score**: ≥ 90 for all categories
- **Bundle Size**: Within performance budget
- **API Response Time**: < 200ms for 95th percentile

### Security
- **Vulnerability Scan**: 0 high/critical issues
- **Dependency Updates**: < 30 days old
- **Security Headers**: All required headers present

### Accessibility
- **WCAG Compliance**: AA level
- **Screen Reader Testing**: All features accessible
- **Keyboard Navigation**: 100% coverage

## 🚀 Continuous Improvement

### Monthly Reviews
- Update dependencies
- Review security policies
- Assess performance metrics
- Update documentation
- Review accessibility compliance

### Quarterly Assessments
- Evaluate technology stack
- Review architecture decisions
- Assess team productivity
- Update standards based on industry trends

### Annual Reviews
- Comprehensive security audit
- Performance optimization review
- Technology migration planning
- Standards evolution planning

---

**Remember**: This standard should be treated as a living document that evolves with your projects and industry best practices. Regular reviews and updates ensure continued relevance and effectiveness. 