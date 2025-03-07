import { fetchComicIssue, fetchComicIssuePages } from '@/app/lib/api/comicIssue/queries'
import { ComicIssueBanner } from '@/components/comicIssue/Banner'
import { ComicIssuePageParams } from '@/models/common'
import React from 'react'
import { CandyMachineStoreProvider } from '@/providers/CandyMachineStoreProvider'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { CoverCarousel } from '@/components/mint/CoverCarousel'
import { Text } from '@/components/ui'
import { CandyMachineDetails } from '@/components/shared/CandyMachineDetails'
import { Divider } from '@/components/shared/Divider'
import { AboutIssueSection } from '@/components/mint/AboutIssueSection'
import { PagesPreview } from '@/components/mint/PagesPreview'
import { RoutePath } from '@/enums/routePath'
import { Metadata } from 'next'
import { RateButton } from '@/components/shared/buttons/RateButton'
import { FavouritiseButton } from '@/components/shared/buttons/FavouritiseButton'
import { ShareButton } from '@/components/shared/buttons/ShareButton'
import { getAccessToken } from '@/app/lib/utils/auth'
import { fetchCandyMachine } from '@/app/lib/api/candyMachine/queries'
import { SecondaryMarketplace } from '@/components/comicIssue/secondary/SecondaryMarketplace'
import { ChevronRightIcon } from '@/components/icons/theme/ChevronRightIcon'
import { ButtonLink } from '@/components/ui/ButtonLink'

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params
  const metadataImagePath = `/api/metadata/comic-issue/${params.id}`

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

export default async function ComicIssuePage(props: ComicIssuePageParams) {
  const params = await props.params

  const { id } = params

  const accessToken = await getAccessToken()
  const comicIssue = await fetchComicIssue({ accessToken, id })

  if (!comicIssue || !comicIssue.stats) return null

  const pages = await fetchComicIssuePages({ accessToken, id: comicIssue.id })

  const candyMachine = await fetchCandyMachine({
    params: { candyMachineAddress: comicIssue.collectibleInfo?.activeCandyMachineAddress ?? '' },
  })

  return (
    <BaseLayout>
      <ComicIssueBanner cover={comicIssue.cover} />
      <div className='flex flex-col max-md:items-center md:flex-row md:justify-center gap-6 md:gap-10 w-full mb-2'>
        <div className='flex flex-col gap-4'>
          <CoverCarousel candyMachine={candyMachine} covers={comicIssue.statelessCovers ?? []} />
          <ButtonLink
            href={RoutePath.ReadComicIssue(comicIssue.id)}
            prefetch={false}
            Icon={ChevronRightIcon}
            iconPosition='right'
            variant='primary'
          >
            Read episode
          </ButtonLink>
          <div className='flex gap-1 md:gap-2 justify-between md:justify-around'>
            <RateButton
              comicIssueId={comicIssue.id}
              averageRating={comicIssue.stats?.averageRating}
              rating={comicIssue.myStats?.rating}
            />
            <FavouritiseButton
              comicIssueId={comicIssue.id}
              isFavourite={comicIssue.myStats?.isFavourite}
              favouritesCount={comicIssue.stats?.favouritesCount}
            />
            <ShareButton title={comicIssue.title} text={comicIssue.description} />
          </div>
        </div>
        <div className='flex flex-col gap-6 w-full max-w-[800px] pb-20'>
          <div className='flex flex-col max-md:self-center gap-4'>
            <div className='flex gap-12 text-base md:text-lg font-medium leading-[22.4px] md:leading-[25.2px] text-grey-100'>
              <span>{comicIssue.comic?.title}</span>
              <span>EP {comicIssue.number}</span>
            </div>
            <Text as='h3' styleVariant='primary-heading'>
              {comicIssue.title}
            </Text>
          </div>
          <div className='flex flex-col 1160:flex-row gap-10 justify-between'>
            <AboutIssueSection comicIssue={comicIssue} />
            {pages.length ? <PagesPreview comicIssueId={comicIssue.id} pages={pages} /> : null}
          </div>
          <Divider className='max-md:hidden' />
          <CandyMachineStoreProvider comicIssue={comicIssue}>
            <CandyMachineDetails comicIssue={comicIssue} />
          </CandyMachineStoreProvider>
        </div>
      </div>
      {false && comicIssue?.collectibleInfo?.isSecondarySaleActive && (
        <SecondaryMarketplace collectionAddress={comicIssue?.collectibleInfo?.collectionAddress} />
      )}
    </BaseLayout>
  )
}
