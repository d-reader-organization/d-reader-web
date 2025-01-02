import { fetchCreator } from '@/app/lib/api/creator/queries'
import { generateFallbackMetadataImage, generateMetadataImage } from '@/utils/metadata'
import { CreatorMetadataImage } from '@/components/creator/MetadataImage'

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const creator = await fetchCreator({ slug: params.slug })

  if (!creator) return generateFallbackMetadataImage()

  return generateMetadataImage(
    <CreatorMetadataImage name={creator.name} banner={creator.banner} avatar={creator.avatar} />
  )
}
