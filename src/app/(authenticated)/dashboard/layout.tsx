import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'dReader - Creator Dashboard',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  description:
    'Publish your comic, manga, webcomic, or a graphic novel. Start engaging with your readers and monetizing your work!',
  keywords: 'NFT, asset, dReader, dPublisher, Comic, Solana, SOL, mint, collection, manga, manwha',
  openGraph: {
    type: 'website',
    title: 'dReader - Creator Dashboard',
    description:
      'Publish your comic, manga, webcomic, or a graphic novel. Start engaging with your readers and monetizing your work!',
    images: '/assets/images/metadata/metadata-home.jpg',
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
      'Publish your comic, manga, webcomic, or a graphic novel. Start engaging with your readers and monetizing your work!',
    card: 'summary_large_image',
    site: '@dReaderApp',
    creator: '@dReaderApp',
    images: '/assets/images/metadata/metadata-home.jpg',
  },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children
}
