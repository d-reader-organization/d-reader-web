import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const metadataImagePath = `/api/metadata/comic/${params.slug}`

  return {
    openGraph: {
      images: metadataImagePath,
    },
    twitter: {
      card: 'summary_large_image',
      images: metadataImagePath,
    },
  }
}

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
