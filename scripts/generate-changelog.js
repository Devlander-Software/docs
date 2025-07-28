#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Generate changelog from conventional commits
 */
function generateChangelog() {
  try {
    console.log('🔄 Generating changelog from conventional commits...');

    // Get the latest version from package.json
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const currentVersion = packageJson.version;

    // Get commits since the last tag
    const lastTag = getLastTag();
    const commits = getCommitsSince(lastTag);

    // Parse commits and categorize them
    const categorizedCommits = categorizeCommits(commits);

    // Generate changelog content
    const changelogContent = generateChangelogContent(currentVersion, categorizedCommits);

    // Update CHANGELOG.md
    updateChangelog(changelogContent);

    console.log('✅ Changelog generated successfully!');
  } catch (error) {
    console.error('❌ Error generating changelog:', error.message);
    process.exit(1);
  }
}

/**
 * Get the last git tag
 */
function getLastTag() {
  try {
    return execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

/**
 * Get commits since the last tag
 */
function getCommitsSince(tag) {
  const range = tag ? `${tag}..HEAD` : 'HEAD';
  const commits = execSync(`git log ${range} --pretty=format:"%H|%s|%b"`, { encoding: 'utf8' });
  return commits.split('\n').filter(Boolean);
}

/**
 * Categorize commits by type
 */
function categorizeCommits(commits) {
  const categories = {
    feat: [],
    fix: [],
    docs: [],
    style: [],
    refactor: [],
    test: [],
    chore: [],
    perf: [],
    ci: [],
    build: [],
    revert: [],
    deps: [],
    security: []
  };

  commits.forEach(commit => {
    const [hash, subject, body] = commit.split('|');
    
    // Parse conventional commit
    const match = subject.match(/^(\w+)(?:\(([^)]+)\))?:\s*(.+)$/);
    if (match) {
      const [, type, scope, description] = match;
      const commitInfo = {
        hash: hash.substring(0, 8),
        type,
        scope,
        description,
        body: body || '',
        breaking: subject.includes('BREAKING CHANGE') || body?.includes('BREAKING CHANGE')
      };

      if (categories[type]) {
        categories[type].push(commitInfo);
      }
    }
  });

  return categories;
}

/**
 * Generate changelog content
 */
function generateChangelogContent(version, categorizedCommits) {
  const date = new Date().toISOString().split('T')[0];
  let content = `## [${version}] - ${date}\n\n`;

  // Add sections for each category that has commits
  const sections = [
    { key: 'feat', title: '### Added' },
    { key: 'fix', title: '### Fixed' },
    { key: 'docs', title: '### Documentation' },
    { key: 'style', title: '### Style' },
    { key: 'refactor', title: '### Refactored' },
    { key: 'test', title: '### Testing' },
    { key: 'chore', title: '### Maintenance' },
    { key: 'perf', title: '### Performance' },
    { key: 'ci', title: '### CI/CD' },
    { key: 'build', title: '### Build' },
    { key: 'revert', title: '### Reverted' },
    { key: 'deps', title: '### Dependencies' },
    { key: 'security', title: '### Security' }
  ];

  sections.forEach(({ key, title }) => {
    const commits = categorizedCommits[key];
    if (commits && commits.length > 0) {
      content += `${title}\n`;
      commits.forEach(commit => {
        const scope = commit.scope ? `(${commit.scope})` : '';
        const breaking = commit.breaking ? ' **BREAKING CHANGE**' : '';
        content += `- ${commit.description}${scope}${breaking}\n`;
      });
      content += '\n';
    }
  });

  return content;
}

/**
 * Update CHANGELOG.md
 */
function updateChangelog(newContent) {
  const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
  let changelog = '';

  if (fs.existsSync(changelogPath)) {
    changelog = fs.readFileSync(changelogPath, 'utf8');
  } else {
    changelog = `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

`;
  }

  // Insert new content after the header
  const headerEnd = changelog.indexOf('## [');
  if (headerEnd !== -1) {
    changelog = changelog.slice(0, headerEnd) + newContent + changelog.slice(headerEnd);
  } else {
    changelog += newContent;
  }

  fs.writeFileSync(changelogPath, changelog);
}

/**
 * Main execution
 */
if (require.main === module) {
  generateChangelog();
}

module.exports = {
  generateChangelog,
  categorizeCommits,
  generateChangelogContent
}; 