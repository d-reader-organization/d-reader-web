import type { Metadata } from 'next'
import { ActivitySocketProvider } from '@/providers/ActivitySocketContextProvider'
import { fetchMe } from '@/app/lib/api/user/queries'

export const metadata: Metadata = {
  title: 'Genesis',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  description:
    'Vote on new talent. Kickstart upcoming IP! Support creators which you feel have the potential to produce, direct & sell a captivating story.',
  keywords: 'NFT, asset, dReader, dPublisher, Comic, Solana, SOL, mint, collection, manga, manwha',
  openGraph: {
    type: 'website',
    title: 'Genesis',
    description:
      'Vote on new talent. Kickstart upcoming IP! Support creators which you feel have the potential to produce, direct & sell a captivating story.',
    images: '/assets/images/metadata/metadata-invest.png',
    url: process.env.NEXT_PUBLIC_SITE_URL + '/invest',
    siteName: 'Genesis',
  },
  appleWebApp: {
    title: 'Genesis',
    startupImage: '/assets/apple-touch-icon.png',
  },
  twitter: {
    title: 'Genesis',
    description:
      'Vote on new talent. Kickstart upcoming IP! Support creators which you feel have the potential to produce, direct & sell a captivating story.',
    card: 'summary_large_image',
    site: '@GenesisApp',
    creator: '@GenesisApp',
    images: '/assets/images/metadata/metadata-invest.png',
  },
  manifest: '/manifest.json',
}

export default async function InvestLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const me = await fetchMe()
  return <ActivitySocketProvider me={me}>{children}</ActivitySocketProvider>
}
