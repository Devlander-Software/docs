/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  // Configure for GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/docs' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/docs' : '',
  // Note: Headers are not supported in static export
  // Security headers should be configured at the hosting level
  // Configure webpack for markdown processing
  webpack: (config, { isServer }) => {
    // Add markdown loader
    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: 'markdown-loader',
          options: {
            html: true,
            linkify: true,
            typographer: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig; 