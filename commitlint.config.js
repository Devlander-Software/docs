module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Enforce conventional commit format
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'perf',
        'ci',
        'build',
        'revert',
        'deps',
        'security'
      ]
    ],
    'type-case': [2, 'always', 'lower'],
    'type-empty': [2, 'never'],
    'subject-case': [2, 'always', 'lower'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 72],
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower'],
    'scope-empty': [2, 'never'],
    'scope-enum': [
      2,
      'always',
      [
        'auth',
        'api',
        'docs',
        'typescript',
        'react',
        'testing',
        'security',
        'performance',
        'build',
        'ci',
        'readme',
        'eslint',
        'webpack',
        'github',
        'deps'
      ]
    ]
  }
}; 