import { Metadata } from 'next'
import { metadata } from '../layout'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const metadataImagePath = `/api/metadata/invest/${params.slug}`

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: metadataImagePath,
    },
    twitter: {
      ...metadata.twitter,
      card: 'summary_large_image',
      images: metadataImagePath,
    },
  }
}

export default function InvestSlugLayout({ children }: { children: React.ReactNode }) {
  return children
}
