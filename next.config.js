const withMDX = require('@next/mdx')()
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  mode: 'production',
})
const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/privacy-policy',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
  eslint: {
    dirs: ['src'],
  },
  env: {
    TIPLINK_CLIENT_ID: process.env.TIPLINK_CLIENT_ID,
    SPHERE_APPLICATION_ID: process.env.SPHERE_APPLICATION_ID,
  },
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // experimental: {
  // 	missingSuspenseWithCSRBailout: false,
  // },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  logging: {
    fetches: { fullUrl: true },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'arweave.net',
      },
      {
        protocol: 'https',
        hostname: 'gateway.irys.xyz',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  webpack(config) {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    config.externals.push('pino-pretty', 'encoding')
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })

    return config
  },
}

module.exports = withPWA(withMDX(nextConfig))
