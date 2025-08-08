# Deployment Guide

## GitHub Pages Deployment

This documentation site is configured for automatic deployment to GitHub Pages.

### 🚀 Automatic Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `production` branch.

**Deployment URL**: `https://[username].github.io/docs`

### 📋 Prerequisites

1. **GitHub Pages Enabled**: Ensure GitHub Pages is enabled in your repository settings
2. **Branch Protection**: The `production` branch should be protected
3. **GitHub Actions**: Ensure GitHub Actions are enabled for the repository

### 🔧 Manual Deployment

To manually trigger a deployment:

1. **Build locally**:
   ```bash
   npm run deploy:pages
   ```

2. **Push to production branch**:
   ```bash
   git add .
   git commit -m "feat(deploy): update documentation site"
   git push origin production
   ```

3. **Monitor deployment**:
   - Check the GitHub Actions tab in your repository
   - Look for the "Deploy Next.js site to Pages" workflow

### ⚙️ Configuration

The site is configured with the following settings for GitHub Pages:

- **Static Export**: Enabled (`output: 'export'`)
- **Base Path**: `/docs` (for repository name)
- **Trailing Slash**: Enabled for better compatibility
- **Image Optimization**: Disabled (required for static export)

### 🔍 Troubleshooting

#### Common Issues

1. **Build Failures**:
   - Check GitHub Actions logs for specific errors
   - Ensure all dependencies are properly installed
   - Verify TypeScript compilation passes

2. **404 Errors**:
   - Ensure `basePath` is correctly set to `/docs`
   - Check that all internal links use the correct base path
   - Verify the `out` directory is generated correctly

3. **Styling Issues**:
   - Ensure CSS is properly bundled
   - Check that static assets are in the correct location
   - Verify image paths are correct

#### Debugging Steps

1. **Local Build Test**:
   ```bash
   npm run build
   npm run start
   ```

2. **Check Build Output**:
   ```bash
   ls -la out/
   ```

3. **Verify Configuration**:
   - Check `next.config.js` for correct settings
   - Ensure `.nojekyll` file exists in `public/`
   - Verify GitHub Actions workflow is correct

### 📊 Monitoring

- **Deployment Status**: Check GitHub Actions for deployment status
- **Site Performance**: Use browser dev tools to monitor loading times
- **Error Tracking**: Monitor browser console for any JavaScript errors

### 🔄 Update Process

1. Make changes to documentation
2. Test locally: `npm run dev`
3. Build and test: `npm run deploy:pages`
4. Commit and push to `production` branch
5. Monitor GitHub Actions deployment
6. Verify changes on live site

### 🛡️ Security

- All deployments go through GitHub Actions with proper permissions
- Static export ensures no server-side vulnerabilities
- Security headers are configured in `next.config.js`
- No sensitive data is exposed in the build output 