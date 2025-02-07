import { fetchComic } from '@/app/lib/api/comic/queries'
import { generateMetadataImage } from '@/utils/metadata'
import { DefaultMetadataImage } from '@/components/metadata/DefaultImage'
import { FallbackMetadataImage } from '@/components/metadata/FallbackImage'

export async function GET(request: Request, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const comic = await fetchComic({ slug: params.slug })

  if (!comic) return generateMetadataImage(<FallbackMetadataImage />)
  console.log(`return here`)
  return generateMetadataImage(
    <DefaultMetadataImage
      title={comic.title}
      caption={comic.creator?.handle}
      image={comic.cover}
      backgroundImage={comic.banner}
      logo
    />
  )
}
