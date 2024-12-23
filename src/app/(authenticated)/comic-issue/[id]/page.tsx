import { fetchComicIssue } from '@/app/lib/api/comicIssue/queries'
import { ComicIssueBanner } from '@/components/comicIssue/Banner'
import { ComicIssuePageParams } from '@/models/common'
import React from 'react'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { CoverCarousel } from '@/components/mint/CoverCarousel'
import { AboutIssueSection } from '@/components/comicIssue/AboutSection'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Metadata } from 'next'
import { getAccessToken } from '@/app/lib/utils/auth'
import { fetchCandyMachine } from '@/app/lib/api/candyMachine/queries'
import { IssueStatsSection } from '@/components/comicIssue/StatsSection'
import { ButtonLink } from '@/components/ui/ButtonLink'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const ogImagePath = `/api/og/${params.id}`

  return {
    openGraph: {
      images: ogImagePath,
    },
    twitter: {
      card: 'summary_large_image',
      images: ogImagePath,
    },
  }
}

export default async function ComicIssuePage({ params: { id } }: ComicIssuePageParams) {
  const accessToken = getAccessToken()
  const comicIssue = await fetchComicIssue({ accessToken, id })
  if (!comicIssue || !comicIssue.stats) return null
  const candyMachine = await fetchCandyMachine({
    params: { candyMachineAddress: comicIssue.collectibleInfo?.activeCandyMachineAddress ?? '' },
  })

  return (
    <BaseLayout transparent>
      <ComicIssueBanner cover={comicIssue.cover} />
      <div className='flex flex-col w-full max-w-screen-xl mt-24 md:flex-row md:justify-center gap-2 md:gap-3 lg:gap-10'>
        <ButtonLink
          href='#'
          prefetch={false}
          variant='ghost'
          size='lg'
          iconOnly
          icon={ChevronLeft}
          className='self-center w-min sm:px-0'
        />
        <CoverCarousel candyMachine={candyMachine} covers={comicIssue.statelessCovers ?? []} />
        <AboutIssueSection comicIssue={comicIssue} />
        <IssueStatsSection comicIssue={comicIssue} />
        <ButtonLink
          href='#'
          prefetch={false}
          variant='ghost'
          size='lg'
          iconOnly
          icon={ChevronRight}
          className='self-center w-min sm:px-0'
        />
      </div>
    </BaseLayout>
  )
}
