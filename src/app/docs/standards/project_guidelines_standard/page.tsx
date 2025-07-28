import React from 'react';
import DocumentationViewer from '../../../../components/DocumentationViewer';
import Link from 'next/link';

export default function ProjectGuidelinesStandardPage() {
  const content = `# Project Guidelines Standard

## Overview

This document defines a meta-framework for project guidelines, ensuring consistency and quality across all projects. It outlines a standard project structure, required configuration files, documentation standards, quality assurance, development workflow, technology-specific standards, environment management, monitoring, performance, accessibility, security, and deployment standards.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Required Configuration Files](#required-configuration-files)
3. [Documentation Standards](#documentation-standards)
4. [Quality Assurance](#quality-assurance)
5. [Development Workflow](#development-workflow)
6. [Technology-Specific Standards](#technology-specific-standards)
7. [Environment Management](#environment-management)
8. [Monitoring and Observability](#monitoring-and-observability)
9. [Performance Standards](#performance-standards)
10. [Accessibility Standards](#accessibility-standards)
11. [Security Standards](#security-standards)
12. [Deployment Standards](#deployment-standards)
13. [Implementation Checklist](#implementation-checklist)
14. [Quality Metrics](#quality-metrics)

## Project Structure

### Standard Directory Layout

\`\`\`
project-root/
├── .cursorrules                    # AI development guidelines
├── .editorconfig                   # Editor configuration
├── .prettierrc                    # Code formatting rules
├── .eslintrc.js                   # Linting rules
├── .gitignore                     # Git ignore patterns
├── README.md                      # Project overview
├── CHANGELOG.md                   # Version history
├── CONTRIBUTING.md                # Contribution guidelines
├── SECURITY.md                    # Security policy
├── CODE_OF_CONDUCT.md             # Community guidelines
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── docs/                          # Documentation
│   ├── README.md                  # Documentation index
│   ├── architecture/              # System architecture docs
│   ├── development/               # Development guidelines
│   ├── testing/                   # Testing documentation
│   ├── security/                  # Security guidelines
│   ├── devops/                    # DevOps documentation
│   └── documentation/             # Documentation standards
├── src/                           # Source code
│   ├── components/                # Reusable components
│   ├── pages/                     # Page components
│   ├── lib/                       # Utility functions
│   ├── types/                     # Type definitions
│   └── styles/                    # Global styles
├── tests/                         # Test files
│   ├── unit/                      # Unit tests
│   ├── integration/               # Integration tests
│   └── e2e/                       # End-to-end tests
├── scripts/                       # Build and utility scripts
├── .github/                       # GitHub configuration
│   ├── workflows/                 # CI/CD workflows
│   └── ISSUE_TEMPLATE/            # Issue templates
└── public/                        # Static assets
\`\`\`

## Required Configuration Files

### .cursorrules
AI development guidelines for consistent code generation and review.

### .editorconfig
Ensures consistent coding styles across different editors and IDEs.

### .prettierrc
Code formatting configuration for consistent code style.

### .eslintrc.js
JavaScript/TypeScript linting rules and best practices.

### package.json
Project metadata, dependencies, and scripts.

## Documentation Standards

### README.md Requirements
- Project overview and purpose
- Quick start guide
- Installation instructions
- Usage examples
- Contributing guidelines
- License information

### CHANGELOG.md Requirements
- Follow Keep a Changelog format
- Use semantic versioning
- Include migration guides for breaking changes
- Reference issue numbers and PR links

### Documentation Structure
- Clear navigation and search
- Code examples and snippets
- Interactive demos where applicable
- Version-specific documentation
- API documentation with OpenAPI/Swagger

## Quality Assurance

### Code Review Checklist
- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] Security considerations addressed
- [ ] Performance impact assessed
- [ ] Accessibility requirements met

### Testing Requirements
- Unit test coverage: 80%+ for critical paths
- Integration tests for API endpoints
- E2E tests for user workflows
- Performance tests for critical paths
- Security tests for authentication/authorization

### Code Quality Gates
- ESLint passes with no errors
- TypeScript compilation successful
- All tests passing
- Code coverage meets minimum thresholds
- Security scan passes
- Performance benchmarks met

## Development Workflow

### Git Workflow
- Use Conventional Commits format
- Feature branch workflow
- Pull request reviews required
- Automated quality checks
- Semantic versioning for releases

### Branch Naming Convention
- \`feature/description\` for new features
- \`fix/description\` for bug fixes
- \`docs/description\` for documentation
- \`refactor/description\` for refactoring

### Commit Message Format
\`\`\`
type(scope): description

[optional body]

[optional footer]
\`\`\`

## Technology-Specific Standards

### JavaScript/TypeScript
- Use TypeScript for new projects
- Strict type checking enabled
- Path aliases for clean imports
- ESLint + Prettier for formatting
- Husky for pre-commit hooks

### React/Next.js
- Functional components with hooks
- TypeScript for type safety
- Component composition patterns
- Performance optimization
- Accessibility compliance

### Python
- Type hints for all functions
- Black for code formatting
- Pylint for linting
- pytest for testing
- Poetry for dependency management

## Environment Management

### Environment Variables
- Use .env files for local development
- Secure secret management in production
- Environment-specific configurations
- Validation of required variables

### Docker Configuration
- Multi-stage builds for optimization
- Security scanning in CI/CD
- Health checks for containers
- Resource limits and monitoring

## Monitoring and Observability

### Logging Standards
- Structured JSON logging
- Correlation IDs for request tracking
- Log levels: DEBUG, INFO, WARN, ERROR
- Centralized log aggregation

### Health Checks
- Application health endpoints
- Database connectivity checks
- External service dependencies
- Custom business logic health

### Metrics and Alerting
- Application performance metrics
- Business metrics tracking
- Automated alerting for critical issues
- Dashboard for real-time monitoring

## Performance Standards

### Web Performance
- Lighthouse score: 90+ for all metrics
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

### API Performance
- Response time: < 200ms for 95th percentile
- Throughput: Handle expected load + 50%
- Error rate: < 0.1% for production
- Availability: 99.9% uptime

## Accessibility Standards

### WCAG 2.1 AA Compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios
- Alternative text for images
- Focus management

### Testing Requirements
- Automated accessibility testing
- Manual testing with screen readers
- Keyboard-only navigation testing
- Color blindness simulation

## Security Standards

### Authentication & Authorization
- Secure token-based authentication
- Role-based access control
- Session management
- Multi-factor authentication support

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection
- Secure headers implementation

### Security Testing
- Automated vulnerability scanning
- Penetration testing
- Security code reviews
- Dependency vulnerability monitoring

## Deployment Standards

### CI/CD Pipeline
- Automated testing on all commits
- Staging environment deployment
- Production deployment with approval
- Rollback procedures
- Blue-green deployment strategy

### Infrastructure
- Infrastructure as Code
- Automated provisioning
- Monitoring and alerting
- Backup and disaster recovery
- Security compliance

## Implementation Checklist

### Phase 1: Foundation
- [ ] Set up project structure
- [ ] Configure essential tools
- [ ] Create initial documentation
- [ ] Set up version control
- [ ] Implement basic CI/CD

### Phase 2: Quality & Security
- [ ] Implement testing strategy
- [ ] Set up security scanning
- [ ] Configure monitoring
- [ ] Establish code review process
- [ ] Implement accessibility testing

### Phase 3: DevOps & Automation
- [ ] Complete CI/CD pipeline
- [ ] Set up production monitoring
- [ ] Implement automated deployments
- [ ] Configure backup systems
- [ ] Establish incident response

### Phase 4: Documentation & Collaboration
- [ ] Complete documentation system
- [ ] Set up team collaboration tools
- [ ] Implement knowledge sharing
- [ ] Establish release management
- [ ] Create onboarding materials

## Quality Metrics

### Code Quality
- Test coverage: 80%+
- Cyclomatic complexity: < 10
- Code duplication: < 5%
- Technical debt ratio: < 5%

### Performance
- Page load time: < 2 seconds
- API response time: < 200ms
- Error rate: < 0.1%
- Availability: 99.9%

### Security
- Zero critical vulnerabilities
- Security scan pass rate: 100%
- Dependency updates: Within 30 days
- Security review completion: 100%

### Documentation
- Documentation coverage: 100%
- API documentation: Complete
- User guides: Available
- Code comments: Comprehensive

---

This standard ensures consistent, high-quality development practices across all projects while maintaining flexibility for project-specific requirements.
`;

  const navigation = [
    { title: 'TypeScript Guidelines', href: '/docs/standards/typescript_guidelines' },
    { title: 'Testing Strategy', href: '/docs/testing/testing-strategy' },
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
              <h1 className="text-3xl font-bold text-gray-900">Project Guidelines Standard</h1>
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
          title="Project Guidelines Standard"
          navigation={navigation}
        />
      </main>
    </div>
  );
} 