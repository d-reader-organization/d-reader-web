import { NextConfig } from 'next'
import * as path from 'path'
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

const nextConfig: NextConfig = {
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
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
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
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
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

const withMDX = createMDX({ options: { rehypePlugins: [rehypeRaw], remarkPlugins: [remarkGfm] } })
export default withMDX(nextConfig)
