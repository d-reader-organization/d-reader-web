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
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { ChevronRightIcon } from 'lucide-react'
import { Metadata } from 'next'
import { RateButton } from '@/components/shared/buttons/RateButton'
import { FavouritiseButton } from '@/components/shared/buttons/FavouritiseButton'
import { ShareButton } from '@/components/shared/buttons/ShareButton'
import { getAccessToken, isAuthenticatedUser } from '@/app/lib/utils/auth'
import { fetchCandyMachine } from '@/app/lib/api/candyMachine/queries'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
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

export default async function ComicIssuePage({ params: { id } }: ComicIssuePageParams) {
  const accessToken = getAccessToken()
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
          <Link
            href={RoutePath.ReadComicIssue(comicIssue.id)}
            prefetch={false}
            className='flex justify-center items-center gap-2 self-stretch rounded-xl bg-yellow-500 py-3 pr-2 pl-4 hover:brightness-125 max-h-[36px] md:max-h-[42px]'
          >
            <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-600'>
              Read episode
            </Text>
            <ChevronRightIcon className='text-grey-600' />
          </Link>
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
          <CandyMachineStoreProvider comicIssue={comicIssue} accessToken={accessToken}>
            <CandyMachineDetails
              accessToken={accessToken}
              comicIssue={comicIssue}
              isAuthenticated={isAuthenticatedUser()}
            />
          </CandyMachineStoreProvider>
        </div>
      </div>
    </BaseLayout>
  )
}
