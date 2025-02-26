import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'dReader - FAQ',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  description: 'Find answers to most common questions regarding dReader - next generation platform for digital comics!',
  keywords: 'NFT, asset, dReader, dPublisher, Comic, Solana, SOL, mint, collection, manga, manwha',
  openGraph: {
    type: 'website',
    title: 'dReader - FAQ',
    description:
      'Find answers to most common questions regarding dReader - next generation platform for digital comics!',
    images: '/assets/images/metadata/metadata-faq.jpg',
    url: process.env.NEXT_PUBLIC_SITE_URL + '/faq',
    siteName: 'dReader',
  },
  appleWebApp: {
    title: 'dReader - FAQ',
    startupImage: '/assets/apple-touch-icon.png',
  },
  twitter: {
    title: 'dReader - FAQ',
    description:
      'Find answers to most common questions regarding dReader - next generation platform for digital comics!',
    card: 'summary_large_image',
    site: '@dReaderApp',
    creator: '@dReaderApp',
    images: '/assets/images/metadata/metadata-faq.jpg',
  },
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children
}
