import React from 'react';
import DocumentationViewer from '../../components/DocumentationViewer';
import Link from 'next/link';

export default function ContributingPage() {
  const content = `# Contributing Guidelines

## Overview

Thank you for your interest in contributing to our development documentation system! This document provides comprehensive guidelines for contributing to our projects, ensuring consistency and quality across all contributions.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Commit Message Standards](#commit-message-standards)
5. [Pull Request Process](#pull-request-process)
6. [Documentation Standards](#documentation-standards)
7. [Testing Requirements](#testing-requirements)
8. [Review Process](#review-process)
9. [Release Process](#release-process)
10. [Getting Help](#getting-help)

## Code of Conduct

### Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to a positive environment for our community include:

- Using welcoming and inclusive language
- Being respectful of differing opinions, viewpoints, and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior include:

- The use of sexualized language or imagery, and sexual attention or advances
- Trolling, insulting or derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **VS Code** (recommended) with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features

### Setup

1. **Fork the repository**
   \`\`\`bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/your-username/project-name.git
   cd project-name
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up Git hooks**
   \`\`\`bash
   npm run setup-hooks
   # or
   yarn setup-hooks
   \`\`\`

4. **Verify setup**
   \`\`\`bash
   npm run verify-setup
   # or
   yarn verify-setup
   \`\`\`

## Development Workflow

### Branching Strategy

We follow a feature branch workflow:

1. **Create a feature branch** from the main branch
   \`\`\`bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   \`\`\`

2. **Make your changes** following our coding standards

3. **Commit your changes** using conventional commits
   \`\`\`bash
   git add .
   git commit -m "feat: add new documentation section"
   \`\`\`

4. **Push your branch** and create a pull request
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`

### Naming Conventions

**Branch Names:**
- \`feature/description\` - New features
- \`fix/description\` - Bug fixes
- \`docs/description\` - Documentation updates
- \`refactor/description\` - Code refactoring
- \`test/description\` - Adding or updating tests
- \`chore/description\` - Maintenance tasks

**File Names:**
- Use kebab-case for file names: \`user-profile.tsx\`
- Use PascalCase for component files: \`UserProfile.tsx\`
- Use camelCase for utility files: \`formatDate.ts\`

## Commit Message Standards

### Conventional Commits Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

\`\`\`
type(scope): description

[optional body]

[optional footer]
\`\`\`

### Commit Types

- \`feat\` - New features
- \`fix\` - Bug fixes
- \`docs\` - Documentation changes
- \`style\` - Code style changes (formatting, etc.)
- \`refactor\` - Code refactoring
- \`test\` - Adding or updating tests
- \`chore\` - Maintenance tasks
- \`perf\` - Performance improvements
- \`ci\` - CI/CD changes
- \`build\` - Build system changes
- \`revert\` - Reverting previous commits
- \`deps\` - Dependency updates
- \`security\` - Security-related changes

### Commit Examples

\`\`\`bash
# Feature commit
git commit -m "feat(auth): add OAuth2 authentication"

# Bug fix commit
git commit -m "fix(api): resolve user data loading issue"

# Documentation commit
git commit -m "docs(readme): update installation instructions"

# Breaking change commit
git commit -m "feat(api)!: change user endpoint response format

BREAKING CHANGE: The user endpoint now returns a different response format.
Migration guide: https://example.com/migration-guide"

# Commit with body
git commit -m "feat(ui): add dark mode support

- Add theme toggle component
- Implement CSS variables for theming
- Update all components to support dark mode
- Add theme persistence in localStorage

Closes #123"
\`\`\`

### Scope Examples

- \`auth\` - Authentication related
- \`api\` - API related
- \`ui\` - User interface
- \`docs\` - Documentation
- \`test\` - Testing
- \`ci\` - Continuous integration
- \`deps\` - Dependencies

## Pull Request Process

### Before Submitting

- [ ] **Code follows style guidelines**
  - ESLint passes with no errors
  - Prettier formatting applied
  - TypeScript compilation successful

- [ ] **Tests are included and passing**
  - Unit tests for new functionality
  - Integration tests for API changes
  - E2E tests for UI changes

- [ ] **Documentation is updated**
  - README updated if needed
  - API documentation updated
  - Code comments added

- [ ] **Security considerations addressed**
  - Input validation implemented
  - Authentication/authorization checked
  - Security headers configured

- [ ] **Performance impact assessed**
  - No significant performance regression
  - Bundle size impact considered
  - Database query optimization

### Pull Request Template

\`\`\`markdown
## Description

Brief description of the changes made.

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Checklist

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

## Additional Notes

Any additional information or context that reviewers should know.
\`\`\`

### Review Process

1. **Automated Checks**
   - CI/CD pipeline runs automatically
   - Code quality checks (ESLint, TypeScript)
   - Test coverage verification
   - Security vulnerability scanning

2. **Code Review**
   - At least one approval required
   - Address all review comments
   - Update PR based on feedback

3. **Final Checks**
   - All tests passing
   - No merge conflicts
   - Documentation updated
   - Performance benchmarks met

## Documentation Standards

### Writing Guidelines

- **Clear and concise** - Write for your audience
- **Consistent formatting** - Follow markdown standards
- **Code examples** - Include working code snippets
- **Screenshots** - Add visual aids when helpful
- **Links and references** - Cross-reference related docs

### Documentation Structure

\`\`\`markdown
# Title

## Overview

Brief description of the topic.

## Table of Contents

1. [Section 1](#section-1)
2. [Section 2](#section-2)

## Section 1

Content with examples:

\`\`\`typescript
// Code example
const example = () => {
  return 'Hello World';
};
\`\`\`

## Section 2

More content...

## Related Links

- [Related Documentation](#)
- [External Resources](#)
\`\`\`

### Code Documentation

- **JSDoc comments** for functions and classes
- **TypeScript interfaces** for type definitions
- **README files** for each major component
- **API documentation** with OpenAPI/Swagger

## Testing Requirements

### Test Coverage

- **Unit tests**: 80%+ coverage for critical paths
- **Integration tests**: All API endpoints
- **E2E tests**: Critical user workflows
- **Performance tests**: Load testing for APIs

### Test Structure

\`\`\`typescript
// Example test structure
describe('UserService', () => {
  describe('getUserById', () => {
    it('should return user when valid ID provided', async () => {
      // Test implementation
    });

    it('should throw error when invalid ID provided', async () => {
      // Test implementation
    });
  });
});
\`\`\`

### Testing Best Practices

- **Arrange-Act-Assert** pattern
- **Descriptive test names**
- **Mock external dependencies**
- **Test edge cases**
- **Fast and reliable tests**

## Review Process

### Code Review Checklist

**Functionality:**
- [ ] Code works as intended
- [ ] Edge cases handled
- [ ] Error handling implemented
- [ ] Performance considered

**Code Quality:**
- [ ] Follows style guidelines
- [ ] Proper naming conventions
- [ ] No code duplication
- [ ] Appropriate abstractions

**Security:**
- [ ] Input validation
- [ ] Authentication/authorization
- [ ] No sensitive data exposure
- [ ] Security headers

**Testing:**
- [ ] Tests included
- [ ] Tests pass
- [ ] Coverage adequate
- [ ] Edge cases tested

**Documentation:**
- [ ] Code comments
- [ ] README updated
- [ ] API docs updated
- [ ] Migration guide (if breaking change)

## Release Process

### Version Management

We use [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality
- **PATCH** version for backwards-compatible bug fixes

### Release Steps

1. **Create release branch**
   \`\`\`bash
   git checkout -b release/v1.2.0
   \`\`\`

2. **Update version**
   \`\`\`bash
   npm version patch  # or minor/major
   \`\`\`

3. **Generate changelog**
   \`\`\`bash
   npm run changelog:generate
   \`\`\`

4. **Create pull request**
   - Review changes
   - Update documentation
   - Run full test suite

5. **Merge and tag**
   \`\`\`bash
   git tag v1.2.0
   git push origin v1.2.0
   \`\`\`

6. **Deploy**
   - Automated deployment via CI/CD
   - Monitor deployment health
   - Verify functionality

## Getting Help

### Communication Channels

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and discussions
- **Pull Request Reviews** - Code review feedback
- **Documentation** - Self-service help

### Issue Templates

We provide issue templates for:
- **Bug Report** - For reporting bugs
- **Feature Request** - For requesting new features
- **Documentation** - For documentation issues
- **Performance** - For performance issues

### Support Guidelines

- **Search existing issues** before creating new ones
- **Provide detailed information** when reporting bugs
- **Include reproduction steps** for bug reports
- **Be respectful and patient** with maintainers

---

Thank you for contributing to our project! Your contributions help make our development standards better for everyone.
`;

  const navigation = [
    { title: 'Project Guidelines Standard', href: '/docs/standards/project_guidelines_standard' },
    { title: 'TypeScript Guidelines', href: '/docs/standards/typescript_guidelines' },
    { title: 'Testing Strategy', href: '/docs/testing/testing-strategy' },
    { title: 'Security Implementation', href: '/docs/security/security-implementation' },
    { title: 'Changelog', href: '/CHANGELOG' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-gray-500 hover:text-gray-700 mr-4">
                ← Back to Home
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Contributing Guidelines</h1>
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
          title="Contributing Guidelines"
          navigation={navigation}
        />
      </main>
    </div>
  );
} 