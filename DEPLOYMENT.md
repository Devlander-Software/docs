# Deployment Guide - GitHub Pages

This guide will help you deploy your documentation website to GitHub Pages.

## Prerequisites

1. **GitHub Repository**: Your project must be in a GitHub repository
2. **GitHub Pages Enabled**: Pages must be enabled in your repository settings
3. **GitHub Actions**: Actions must be enabled for your repository

## Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

## Step 2: Configure Repository Settings

### Enable GitHub Actions

1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select **Allow GitHub Actions to create and approve pull requests**
3. Click **Save**

### Configure Pages Settings

1. Go to **Settings** → **Pages**
2. Under **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` (will be created automatically)
   - **Folder**: `/ (root)`
3. Click **Save**

## Step 3: Push Your Code

The deployment will happen automatically when you push to the `main` branch:

```bash
# Add all changes
git add .

# Commit with conventional commit format
git commit -m "feat: add GitHub Pages deployment"

# Push to main branch
git push origin main
```

## Step 4: Monitor Deployment

1. Go to **Actions** tab in your repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Click on it to monitor the progress
4. Wait for the deployment to complete (usually 2-3 minutes)

## Step 5: Access Your Website

Once deployment is complete, your website will be available at:

```
https://[your-username].github.io/[repository-name]/
```

For example:
```
https://landonjohnson.github.io/docs/
```

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check the Actions logs for specific errors
   - Ensure all dependencies are properly installed
   - Verify TypeScript compilation passes

2. **404 Errors**
   - Make sure the `basePath` in `next.config.js` matches your repository name
   - Check that the `out` directory is being generated correctly

3. **Styling Issues**
   - Verify that CSS is being loaded correctly
   - Check that asset paths are correct for GitHub Pages

### Manual Deployment

If automatic deployment fails, you can deploy manually:

```bash
# Build the project
npm run build

# The built files will be in the `out` directory
# You can manually upload these to GitHub Pages
```

## Configuration Files

### next.config.js

The configuration is already set up for GitHub Pages:

```javascript
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/docs' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/docs' : '',
};
```

### .github/workflows/deploy.yml

The GitHub Actions workflow handles:
- Installing dependencies
- Running tests and linting
- Building the application
- Deploying to GitHub Pages

## Custom Domain (Optional)

To use a custom domain:

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Add a `CNAME` file to your repository root with your domain
4. Configure DNS settings with your domain provider

## Environment Variables

The following environment variables are used during build:

- `NODE_ENV=production` - Enables production optimizations
- `GITHUB_PAGES=true` - Indicates GitHub Pages deployment

## Performance Optimization

The deployment includes several optimizations:

- **Static Export**: All pages are pre-rendered as static HTML
- **Asset Optimization**: Images and CSS are optimized
- **Caching**: Proper cache headers for better performance
- **Compression**: Assets are compressed for faster loading

## Security

The deployment includes security headers:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`

## Monitoring

After deployment, monitor your website:

1. **Performance**: Use Lighthouse to check performance scores
2. **Accessibility**: Verify WCAG compliance
3. **SEO**: Check meta tags and structured data
4. **Analytics**: Set up Google Analytics if needed

## Updating Your Website

To update your website:

1. Make your changes locally
2. Test with `npm run dev`
3. Commit and push to `main` branch
4. GitHub Actions will automatically deploy the updates

## Support

If you encounter issues:

1. Check the GitHub Actions logs
2. Verify your repository settings
3. Ensure all dependencies are up to date
4. Test the build locally with `npm run build`

---

Your documentation website will be live and accessible to anyone with the URL! 