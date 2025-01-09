import { fetchComic } from '@/app/lib/api/comic/queries'
import { generateMetadataImage } from '@/utils/metadata'
import { DefaultMetadataImage } from '@/components/metadata/DefaultImage'
import { FallbackMetadataImage } from '@/components/metadata/FallbackImage'

export async function GET(request: Request, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const comic = await fetchComic({ slug: params.slug })

  if (!comic) return generateMetadataImage(<FallbackMetadataImage />)

  return generateMetadataImage(
    <DefaultMetadataImage
      title={comic.title}
      body={`by ${comic.creator?.name}`}
      image={comic.cover}
      backgroundImage={comic.banner}
      altBodyColor
      withLogo
    />
  )
}
