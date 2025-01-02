import { fetchComicIssue } from '@/app/lib/api/comicIssue/queries'
import { generateFallbackMetadataImage, generateMetadataImage } from '@/utils/metadata'
import { getStatelessCoverFromComicIssue } from '@/utils/covers'
import { DefaultMetadataImage } from '@/components/shared/MetadataImage'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const url = new URL(request.url)
  const rarity = url.searchParams.get('rarity')
  const comicIssue = await fetchComicIssue({ id: params.id })

  if (!comicIssue) return generateFallbackMetadataImage()

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
    />
  )
}
