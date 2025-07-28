#!/bin/bash

# Deployment script for GitHub Pages
# This script helps prepare and deploy the documentation website

set -e

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "❌ Error: Git is not installed or not in PATH."
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository. Please initialize git first."
    exit 1
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Warning: You're not on the main branch. Current branch: $CURRENT_BRANCH"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled."
        exit 1
    fi
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes."
    git status --short
    read -p "Commit changes before deploying? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📝 Committing changes..."
        git add .
        read -p "Enter commit message: " COMMIT_MESSAGE
        git commit -m "$COMMIT_MESSAGE"
    else
        echo "❌ Deployment cancelled. Please commit your changes first."
        exit 1
    fi
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run quality checks
echo "🔍 Running quality checks..."
npm run lint
npm run type-check
npm run test:unit

# Build the application
echo "🏗️  Building application..."
npm run build

# Check if build was successful
if [ ! -d "out" ]; then
    echo "❌ Error: Build failed. 'out' directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"

# Check if we have a remote repository
if ! git remote get-url origin &> /dev/null; then
    echo "❌ Error: No remote repository configured."
    echo "Please add a remote repository:"
    echo "git remote add origin https://github.com/your-username/your-repo.git"
    exit 1
fi

# Push to remote
echo "🚀 Pushing to remote repository..."
git push origin main

echo "✅ Deployment process completed!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Navigate to Settings → Pages"
echo "3. Set source to 'GitHub Actions'"
echo "4. Wait for the deployment to complete (check Actions tab)"
echo "5. Your website will be available at: https://[username].github.io/[repo-name]/"
echo ""
echo "🔗 Monitor deployment: https://github.com/[username]/[repo-name]/actions" 