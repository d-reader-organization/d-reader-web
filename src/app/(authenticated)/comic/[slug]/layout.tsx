import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const ogImagePath = `/api/og/comic/${params.slug}`

  return {
    openGraph: {
      images: ogImagePath,
    },
    twitter: {
      card: 'summary_large_image',
      images: ogImagePath,
    },
  }
}

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
