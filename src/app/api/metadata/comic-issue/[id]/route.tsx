import { fetchComicIssue } from '@/app/lib/api/comicIssue/queries'
import { generateMetadataImage } from '@/utils/metadata'
import { getStatelessCoverFromComicIssue } from '@/utils/covers'
import { DefaultMetadataImage } from '@/components/metadata/DefaultImage'
import { FallbackMetadataImage } from '@/components/metadata/FallbackImage'

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const url = new URL(request.url)
  const rarity = url.searchParams.get('rarity')
  const comicIssue = await fetchComicIssue({ id: params.id })

  if (!comicIssue) return generateMetadataImage(<FallbackMetadataImage />)

  const statelessCover = getStatelessCoverFromComicIssue(comicIssue, rarity)
  const cover = statelessCover || comicIssue.cover

  return generateMetadataImage(
    <DefaultMetadataImage
      title={comicIssue.title}
      caption={comicIssue.comic?.title}
      body={`EP ${comicIssue.number}`}
      image={cover}
      backgroundImage={comicIssue.cover}
      isMinting={!!comicIssue.collectibleInfo?.activeCandyMachineAddress}
      withLogo
    />
  )
}
