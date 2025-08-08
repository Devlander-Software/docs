#!/bin/bash

# GitHub Pages Deployment Script
# This script builds and prepares the site for GitHub Pages deployment

set -e

echo "🚀 Starting GitHub Pages deployment preparation..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next out

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting and type checking
echo "🔍 Running quality checks..."
npm run lint
npm run type-check

# Build the site
echo "🏗️ Building the site..."
npm run build

# Verify the build output
if [ ! -d "out" ]; then
    echo "❌ Error: Build failed - 'out' directory not found"
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Build output is in the 'out' directory"
echo "🌐 The site is ready for GitHub Pages deployment"

# Show build info
echo ""
echo "📊 Build Information:"
echo "   - Build directory: out/"
echo "   - Base path: /docs"
echo "   - Static export: enabled"
echo "   - Image optimization: disabled (for static export)"

echo ""
echo "🎯 Next steps:"
echo "   1. Commit and push your changes to the 'production' branch"
echo "   2. GitHub Actions will automatically deploy to GitHub Pages"
echo "   3. Your site will be available at: https://[username].github.io/docs" 