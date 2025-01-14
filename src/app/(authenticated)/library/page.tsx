import { fetchComicsByOwner } from '@/app/lib/api/comic/queries'
import { fetchMe } from '@/app/lib/api/user/queries'
import { OwnedComicCard } from '@/components/comic/cards/OwnedCard'
import { ComicsByAlphabet } from '@/components/library/ComicsByAlphabet'
import { EmptyLibrarySection } from '@/components/library/EmptySection'
import { LibraryTabsWrapper } from '@/components/library/TabsWrapper'
import { RoutePath } from '@/enums/routePath'
import { SortOrder } from '@/enums/sortOrder'
import { ComicSortTag } from '@/models/comic/comicParams'
import { TabsContent } from '@radix-ui/react-tabs'

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
    <LibraryTabsWrapper userId={me.id}>
      <TabsContent className='mt-0 pt-4 border-t border-grey-300' value='owned'>
        {ownedComics.length ? (
          <ComicsByAlphabet comics={ownedComics} ComicCard={OwnedComicCard} />
        ) : (
          <EmptyLibrarySection
            title='Your library is empty'
            subtitle='Your collectibles will be shown here once you own any.'
            href={RoutePath.DiscoverComicIssues}
            buttonLinkText='Discover Collectibles'
          />
        )}
      </TabsContent>
    </LibraryTabsWrapper>
  )
}
