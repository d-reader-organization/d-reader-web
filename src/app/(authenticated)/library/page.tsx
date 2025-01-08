import { fetchComicsByOwner } from '@/app/lib/api/comic/queries'
import { fetchMe } from '@/app/lib/api/user/queries'
import { OwnedComicCard } from '@/components/comic/cards/OwnedCard'
import { ComicsContent } from '@/components/library/ComicsContent'
import { EmptyLibrarySection } from '@/components/library/EmptySection'
import { LibraryTabsWrapper } from '@/components/library/TabsWrapper'
import { EMPTY_SECTION_STATES } from '@/constants/library'
import { SortOrder } from '@/enums/sortOrder'
import { ComicSortTag } from '@/models/comic/comicParams'
import { TabsContent } from '@radix-ui/react-tabs'

export default async function LibraryPage() {
  const me = await fetchMe()

  if (!me) return null

  const ownedComics = await fetchComicsByOwner({
    params: { skip: 0, take: 20, sortTag: ComicSortTag.Title, sortOrder: SortOrder.DESC },
    userId: me.id,
  })

  return (
    <LibraryTabsWrapper>
      <TabsContent className='mt-0 border-t border-grey-300 w-full' value='owned'>
        {ownedComics.length ? (
          <ComicsContent comics={ownedComics} ComicCard={OwnedComicCard} />
        ) : (
          <EmptyLibrarySection emptySectionState={EMPTY_SECTION_STATES.owned} />
        )}
      </TabsContent>
    </LibraryTabsWrapper>
  )
}
