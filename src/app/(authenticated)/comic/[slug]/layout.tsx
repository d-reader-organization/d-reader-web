import { Metadata } from 'next'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
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
