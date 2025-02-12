import { fetchCreator } from '@/app/lib/api/creator/queries'
import { BaseLayout } from '@/components/layout/BaseLayout'
import React from 'react'
import { CreatorBanner } from '@/components/creator/Banner'
import { CreatorHeader } from '@/components/creator/Header'
import { Tabs } from '@/components/shared/Tabs'
import { creatorPageTabs } from '@/constants/tabs'
import { PreviewComicCard } from '@/components/comic/cards/PreviewCard'
import { fetchComics } from '@/app/lib/api/comic/queries'
import { notFound } from 'next/navigation'
import { getAccessToken } from '@/app/lib/utils/auth'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function CreatorReleasesPage(props: Props) {
  const params = await props.params

  const { slug } = params
  const accessToken = await getAccessToken()
  const creator = await fetchCreator({ slug, accessToken })

  if (!creator) {
    notFound()
  }

  const comics = await fetchComics({ creatorId: creator.id, skip: 0, take: 4 })
  const tabs = creatorPageTabs(slug)

  if (!creator) {
    notFound()
  }

  return (
    <BaseLayout>
      <div className='flex flex-col max-w-screen-xl w-full gap-4 sm:gap-6 md:gap-7'>
        <CreatorBanner creator={creator} />
        <CreatorHeader creator={creator} />
        <Tabs tabs={tabs} />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-7 md:gap-9'>
          {comics.map((comic) => (
            <PreviewComicCard key={comic.slug} comic={comic} />
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}
