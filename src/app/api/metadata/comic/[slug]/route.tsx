import { fetchComic } from '@/app/lib/api/comic/queries'
import { generateMetadataImage } from '@/utils/helpers'
import { DefaultMetadataImage } from '@/components/metadata/DefaultImage'
import { FallbackMetadataImage } from '@/components/metadata/FallbackImage'

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const comic = await fetchComic({ slug: params.slug })

  if (!comic) return generateMetadataImage(<FallbackMetadataImage />)

  return generateMetadataImage(
    <DefaultMetadataImage
      title={comic.title}
      caption={comic.creator?.name}
      image={comic.cover}
      backgroundImage={comic.banner}
      logo
    />
  )
}
