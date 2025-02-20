import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toast/Toaster'
import ClientContextProvider from '@/providers/ClientContextProvider'
import { obviouslyNarrow, satoshi } from './fonts'
import { getAccessToken, isAuthenticatedUser } from './lib/utils/auth'
import { AuthStoreProvider } from '@/providers/AuthStoreProvider'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'dReader',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  description:
    '📚 Affordable, Authentic & Limited Edition - from manga to comics. dReader is a new kind of platform for discovering, trading, collecting, and reading digital comics.',
  keywords: 'NFT, asset, dReader, dPublisher, Comic, Solana, SOL, mint, collection, manga, manwha',
  openGraph: {
    type: 'website',
    title: 'dReader',
    description:
      '📚 Affordable, Authentic & Limited Edition - from manga to comics. dReader is a new kind of platform for discovering, trading, collecting, and reading digital comics.',
    images: '/assets/images/metadata-home.jpg',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'dReader',
  },
  appleWebApp: {
    title: 'dReader',
    startupImage: '/assets/apple-touch-icon.png',
  },
  twitter: {
    title: 'dReader',
    description:
      '📚 Affordable, Authentic & Limited Edition - from manga to comics. dReader is a new kind of platform for discovering, trading, collecting, and reading digital comics.',
    card: 'summary_large_image',
    site: '@dReaderApp',
    creator: '@dReaderApp',
    images: '/assets/images/metadata-home.jpg',
  },
  manifest: '/manifest.json',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [accessToken, isAuthenticated] = await Promise.all([getAccessToken(), isAuthenticatedUser()])
  return (
    <html className='max-md:scrollbar-none' lang='en'>
      <body className={`${satoshi.className} ${obviouslyNarrow.variable}`}>
        <AuthStoreProvider accessToken={accessToken} isAuthenticated={isAuthenticated}>
          <ClientContextProvider>
            {children}
            <Analytics />
            <Toaster />
          </ClientContextProvider>
        </AuthStoreProvider>
      </body>
    </html>
  )
}
