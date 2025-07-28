/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: ['localhost'],
  },
  // Enable static export for documentation
  output: 'export',
  trailingSlash: true,

  // Configure for documentation site
  basePath: process.env.NODE_ENV === 'production' ? '/docs' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/docs' : '',
  // Add custom headers for documentation
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
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