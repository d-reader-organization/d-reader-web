import { fetchCreator } from '@/app/lib/api/creator/queries'
import { generateMetadataImage } from '@/utils/helpers'
import { CreatorMetadataImage } from '@/components/metadata/CreatorImage'
import { FallbackMetadataImage } from '@/components/metadata/FallbackImage'

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const creator = await fetchCreator({ slug: params.slug })

  if (!creator) return generateMetadataImage(<FallbackMetadataImage />)

  return generateMetadataImage(
    <CreatorMetadataImage name={creator.name} banner={creator.banner} avatar={creator.avatar} logo />
  )
}
