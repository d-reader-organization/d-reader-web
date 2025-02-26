import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'dReader - Register',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  description: 'Register to dReader to gain access to affordable, authentic & limited edition comics and manga!',
  keywords: 'NFT, asset, dReader, dPublisher, Comic, Solana, SOL, mint, collection, manga, manwha',
  openGraph: {
    type: 'website',
    title: 'dReader - Register',
    description: 'Register to dReader to gain access to affordable, authentic & limited edition comics and manga!',
    images: '/assets/images/metadata/metadata-register.jpg',
    url: process.env.NEXT_PUBLIC_SITE_URL + '/register',
    siteName: 'dReader',
  },
  appleWebApp: {
    title: 'dReader - Register',
    startupImage: '/assets/apple-touch-icon.png',
  },
  twitter: {
    title: 'dReader - Register',
    description: 'Register to dReader to gain access to affordable, authentic & limited edition comics and manga!',
    card: 'summary_large_image',
    site: '@dReaderApp',
    creator: '@dReaderApp',
    images: '/assets/images/metadata/metadata-register.jpg',
  },
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children
}
