import { fetchComic } from '@/app/lib/api/comic/queries'
import { fetchComicIssues } from '@/app/lib/api/comicIssue/queries'
import { getAccessToken } from '@/app/lib/utils/auth'
import { ComicBanner } from '@/components/comic/Banner'
import { ComicHeader } from '@/components/comic/Header'
import { DefaultComicIssueCard } from '@/components/comicIssue/cards/DefaultCard'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { Tabs } from '@/components/shared/Tabs'
import { comicPageTabs } from '@/constants/tabs'
import React from 'react'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function ComicEpisodesPage(props: Props) {
  const params = await props.params

  const { slug } = params

  const comic = await fetchComic({ accessToken: await getAccessToken(), slug })
  if (!comic || !comic.stats) {
    return null
  }

  const tabs = comicPageTabs(slug)
  const comicIssues = await fetchComicIssues({ comicSlug: slug, skip: 0, take: 6 })

  return (
    <BaseLayout>
      <ComicBanner banner={comic.banner} cover={comic.cover} logo={comic.logo} />
      <div className='flex flex-col gap-3 px-1 w-full max-w-screen-xl -mt-[180px] sm:px-2 sm:-mt-[380px] sm:gap-7'>
        <ComicHeader comic={comic} />
        <Tabs tabs={tabs} />
        <div className='grid grid-cols-2 md:grid-cols-3 1160:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-9'>
          {comicIssues.map((comicIssue) => (
            <DefaultComicIssueCard key={comicIssue.slug} comicIssue={comicIssue} />
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}
