import { fetchCreator } from '@/app/lib/api/creator/queries'
import { generateMetadataImage } from '@/utils/metadata'
import { CreatorMetadataImage } from '@/components/metadata/CreatorImage'
import { FallbackMetadataImage } from '@/components/metadata/FallbackImage'

export async function GET(request: Request, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const creator = await fetchCreator({ slug: params.slug })

  if (!creator) return generateMetadataImage(<FallbackMetadataImage />)

  return generateMetadataImage(
    <CreatorMetadataImage name={creator.displayName} banner={creator.banner} avatar={creator.avatar} logo />
  )
}
