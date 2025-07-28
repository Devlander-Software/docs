# Deployment Guide - GitHub Pages

This guide will help you deploy your documentation website to GitHub Pages.

## Prerequisites

1. **GitHub Repository**: Your project must be in a GitHub repository
2. **GitHub Pages Enabled**: Pages must be enabled in your repository settings
3. **GitHub Actions**: Actions must be enabled for your repository

## Step 1: Enable GitHub Pages

1. Go to your repository: https://github.com/Devlander-Software/docs
2. Click **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

## Step 2: Set Production Branch as Default

1. In **Settings** → **General**
2. Scroll to **Default branch**
3. Ensure it's set to `production`
4. Click **Update** (if needed)

## Step 3: Push Your Code

The deployment will happen automatically when you push to the `production` branch:

```bash
# Add all changes
git add .

# Commit with conventional commit format
git commit -m "feat: add new documentation"

# Push to production branch
git push origin production
```

## Step 4: Monitor Deployment

1. Go to **Actions** tab in your repository
2. You should see "Deploy to GitHub Pages" workflow running
3. Wait for completion (2-3 minutes)

## Step 5: Access Your Website

Once deployment is complete, your site will be available at:
```
https://devlander-software.github.io/docs/
```

## Configuration Files

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/docs' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/docs' : '',
  // ... other configuration
};
```

### .github/workflows/deploy.yml
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ production ]  # Deploy from production branch
  pull_request:
    branches: [ production ]
  workflow_dispatch:

# ... rest of workflow configuration
```

## Troubleshooting

### Common Issues

1. **Page not found (404)**
   - Ensure GitHub Pages is enabled in repository settings
   - Check that the repository is public
   - Verify the workflow completed successfully

2. **Build failures**
   - Check the Actions tab for error logs
   - Ensure all dependencies are in package.json
   - Verify TypeScript compilation passes

3. **Styling issues**
   - Check that Tailwind CSS is properly configured
   - Verify that all CSS files are being built

### Manual Deployment

If automatic deployment fails, you can manually trigger it:

1. Go to **Actions** tab
2. Click on "Deploy to GitHub Pages" workflow
3. Click **Run workflow**
4. Select `production` branch
5. Click **Run workflow**

## Environment Variables

The following environment variables are used during build:

- `NODE_ENV=production` - Ensures production build
- `GITHUB_TOKEN` - Automatically provided by GitHub Actions

## Performance Optimization

- Images are optimized automatically by Next.js
- CSS is minified and optimized
- JavaScript is bundled and minified
- Static assets are cached by CDN

## Security

- Security headers are automatically added
- HTTPS is enforced
- Content Security Policy is configured

## Monitoring

- Monitor deployment status in GitHub Actions
- Check website performance with browser dev tools
- Use GitHub's built-in analytics for traffic insights 