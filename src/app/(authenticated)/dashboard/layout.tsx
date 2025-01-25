import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'dReader - Creator Dashboard',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  description: 'TODO',
  keywords: 'NFT, asset, dReader, dPublisher, Comic, Solana, SOL, mint, collection, manga, manwha',
  openGraph: {
    type: 'website',
    title: 'dReader - Creator Dashboard',
    description:
      'Find answers to most common questions regarding dReader - next generation platform for digital comics!',
    images: '/assets/images/metadata-home.jpg',
    url: process.env.NEXT_PUBLIC_SITE_URL + '/dashboard',
    siteName: 'dReader',
  },
  appleWebApp: {
    title: 'dReader - Creator Dashboard',
    startupImage: '/assets/apple-touch-icon.png',
  },
  twitter: {
    title: 'dReader - Creator Dashboard',
    description:
      'Find answers to most common questions regarding dReader - next generation platform for digital comics!',
    card: 'summary_large_image',
    site: '@dReaderApp',
    creator: '@dReaderApp',
    images: '/assets/images/metadata-home.jpg',
  },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children
}
