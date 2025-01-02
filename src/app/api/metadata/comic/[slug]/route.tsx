import { fetchComic } from '@/app/lib/api/comic/queries'
import { generateFallbackMetadataImage, generateMetadataImage } from '@/utils/metadata'
import { DefaultMetadataImage } from '@/components/shared/MetadataImage'

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const comic = await fetchComic({ slug: params.slug })

  if (!comic) return generateFallbackMetadataImage()

  return generateMetadataImage(
    <DefaultMetadataImage
      title={comic.title}
      caption={comic.creator?.name}
      image={comic.cover}
      backgroundImage={comic.banner}
    />
  )
}
