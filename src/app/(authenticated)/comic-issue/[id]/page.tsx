import { fetchComicIssue } from '@/app/lib/api/comicIssue/queries'
import { ComicIssueBanner } from '@/components/comicIssue/Banner'
import { ComicIssuePageParams } from '@/models/common'
import React from 'react'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { CoverCarousel } from '@/components/mint/CoverCarousel'
import { AboutIssueSection } from '@/components/comicIssue/AboutSection'
import { Metadata } from 'next'
import { getAccessToken } from '@/app/lib/utils/auth'
import { fetchCandyMachine } from '@/app/lib/api/candyMachine/queries'
import { IssueStatsSection } from '@/components/comicIssue/StatsSection'

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

//TODO enable the buttons when the API is ready
export default async function ComicIssuePage(props: ComicIssuePageParams) {
  const params = await props.params
  const { id } = params
  const accessToken = await getAccessToken()

  const comicIssue = await fetchComicIssue({ accessToken, id })
  if (!comicIssue || !comicIssue.stats) return null
  const candyMachine = await fetchCandyMachine({
    params: { candyMachineAddress: comicIssue.collectibleInfo?.activeCandyMachineAddress ?? '' },
  })

  return (
    <BaseLayout transparent>
      <ComicIssueBanner cover={comicIssue.cover} />
      <div className='flex flex-col w-full max-w-screen-xl mt-28 md:mt-24 md:flex-row md:justify-center gap-2 md:gap-6 lg:gap-10'>
        {/* <ButtonLink
          href='#'
          prefetch={false}
          variant='ghost'
          size='lg'
          iconOnly
          icon={ChevronLeft}
          className='self-center w-min sm:px-0 max-md:hidden'
        /> */}
        <CoverCarousel candyMachine={candyMachine} covers={comicIssue.statelessCovers ?? []} />
        <AboutIssueSection comicIssue={comicIssue} />
        <IssueStatsSection comicIssue={comicIssue} className='max-1160:hidden' />
        {/* <ButtonLink
          href='#'
          prefetch={false}
          variant='ghost'
          size='lg'
          iconOnly
          icon={ChevronRight}
          className='self-center w-min sm:px-0 max-md:hidden'
        /> */}
      </div>
      <IssueStatsSection
        comicIssue={comicIssue}
        className='1160:hidden self-start md:px-16 w-full'
        statsContainerClassName='sm:max-w-full'
      />
    </BaseLayout>
  )
}
