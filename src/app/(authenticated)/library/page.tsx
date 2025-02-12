import { fetchComicsByOwner } from '@/app/lib/api/comic/queries'
import { fetchMe } from '@/app/lib/api/user/queries'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { LibraryTabs } from '@/components/library/Tabs'
import { SortOrder } from '@/enums/sort'
import { ComicSortTag } from '@/models/comic/comicParams'
import React from 'react'

export default async function LibraryPage() {
  const me = await fetchMe()
  if (!me) {
    return null
  }
  const ownedComics = await fetchComicsByOwner({
    params: { skip: 0, take: 20, sortTag: ComicSortTag.Title, sortOrder: SortOrder.DESC },
    userId: me.id,
  })

  return (
    <BaseLayout showFooter>
      <LibraryTabs comics={ownedComics} />
    </BaseLayout>
  )
}
