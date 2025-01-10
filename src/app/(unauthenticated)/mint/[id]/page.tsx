import { fetchCandyMachine } from '@/app/lib/api/candyMachine/queries'
import { fetchComicIssuePages } from '@/app/lib/api/comicIssue/queries'
import { fetchPublicComicIssue } from '@/app/lib/api/comicIssue/queries'
import { getAccessToken, isAuthenticatedUser } from '@/app/lib/utils/auth'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { MintAboutIssueSection } from '@/components/mint/AboutIssueSection'
import { CoverCarousel } from '@/components/mint/CoverCarousel'
import { PagesPreview } from '@/components/mint/PagesPreview'
import { CandyMachineDetails } from '@/components/shared/CandyMachineDetails'
import { MintPageWelcomeDialog } from '@/components/shared/dialogs/MintPageWelcomeDialog'
import { Divider } from '@/components/shared/Divider'
import { Text } from '@/components/ui'
import { ComicRarity } from '@/enums/comicRarity'
import { ComicIssuePageParams } from '@/models/common'
import { CandyMachineStoreProvider } from '@/providers/CandyMachineStoreProvider'
import { Metadata } from 'next'

export async function generateMetadata(props: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ rarity: ComicRarity }>
}): Promise<Metadata> {
  const searchParams = await props.searchParams
  const params = await props.params
  const metadataImagePath = searchParams.rarity
    ? `/api/metadata/comic-issue/${params.id}?rarity=${searchParams.rarity}`
    : `/api/metadata/comic-issue/${params.id}`

  return {
    openGraph: {
      images: metadataImagePath,
    },
    twitter: {
      card: 'summary_large_image',
      images: metadataImagePath,
    },
  }
}

export default async function MintPage(props: ComicIssuePageParams) {
  const params = await props.params
  const accessToken = await getAccessToken()
  const comicIssue = await fetchPublicComicIssue(params.id)

  if (!comicIssue || !comicIssue.comic) return null

  const pages = await fetchComicIssuePages({ id: comicIssue.id, accessToken })
  const candyMachine = await fetchCandyMachine({
    params: { candyMachineAddress: comicIssue.collectibleInfo?.activeCandyMachineAddress ?? '' },
  })
  const isAuthenticated = await isAuthenticatedUser()
  return (
    <BaseLayout>
      <MintPageWelcomeDialog />
      <div className='flex flex-col max-md:items-center md:flex-row md:justify-center gap-6 md:gap-10 w-full mb-2'>
        <CoverCarousel candyMachine={candyMachine} covers={comicIssue.statelessCovers ?? []} />
        <div className='flex flex-col gap-6 w-full max-w-[800px]'>
          <div className='flex flex-col max-md:self-center gap-4'>
            <div className='flex gap-12 text-base md:text-lg font-medium leading-[22.4px] md:leading-[25.2px] text-grey-100'>
              <span>{comicIssue.comic.title}</span>
              <span>EP {comicIssue.number}</span>
            </div>
            <Text as='h3' styleVariant='primary-heading'>
              {comicIssue.title}
            </Text>
          </div>
          <CandyMachineStoreProvider accessToken={accessToken} comicIssue={comicIssue}>
            <CandyMachineDetails accessToken={accessToken} comicIssue={comicIssue} isAuthenticated={isAuthenticated} />
          </CandyMachineStoreProvider>
          <Divider className='max-md:hidden' />
          <div className='flex flex-col 1160:flex-row gap-10 justify-between'>
            <MintAboutIssueSection comicIssue={comicIssue} />
            {pages.length ? <PagesPreview comicIssueId={comicIssue.id} pages={pages} /> : null}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
