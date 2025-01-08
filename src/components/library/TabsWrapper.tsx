import { Text } from '@/components/ui'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { SoonTag } from '../shared/Tags'
import { cn } from '@/lib/utils'
import { LIBRARY_PAGE_TABS as tabs } from '@/constants/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import { fetchFavoriteComics } from '@/app/lib/api/comic/queries'
import { fetchFollowedCreators } from '@/app/lib/api/creator/queries'
import { EMPTY_SECTION_STATES } from '@/constants/library'
import { SortOrder } from '@/enums/sortOrder'
import { ComicSortTag } from '@/models/comic/comicParams'
import { CreatorSortTag } from '@/models/creator/creatorParams'
import { DefaultComicCard } from '../comic/cards/DefaultCard'
import { ComicsContent } from './ComicsContent'
import { CreatorsContent } from './CreatorsContent'
import { EmptyLibrarySection } from './EmptySection'
import { fetchMe } from '@/app/lib/api/user/queries'
import { BaseLayout } from '../layout/BaseLayout'

interface Props extends React.PropsWithChildren {
  isComingSoon?: boolean
  title?: string
  value?: string
}

export const LibraryTabsWrapper: React.FC<Props> = async ({ children }) => {
  const me = await fetchMe()

  if (!me) return null

  const favoriteComics = await fetchFavoriteComics({
    params: { skip: 0, take: 20, sortTag: ComicSortTag.Title, sortOrder: SortOrder.DESC },
    userId: me.id,
  })
  const followedCreators = await fetchFollowedCreators({
    params: { skip: 0, take: 20, sortTag: CreatorSortTag.Name, sortOrder: SortOrder.DESC },
    userId: me.id,
  })

  return (
    <BaseLayout showFooter>
      <Tabs defaultValue={tabs.at(0)?.title.toLowerCase()} className='w-full max-w-screen-xl md:p-4'>
        <TabsList className='w-full justify-between items-start'>
          <div className='flex gap-[20px] md:gap-[40px] w-full'>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.title}
                className={cn(
                  'flex flex-col sm:flex-row sm:gap-2 w-fit text-grey-200 data-[state=active]:text-white pb-4 md:px-0',
                  tab.isComingSoon && 'pointer-events-none'
                )}
                value={tab.value}
              >
                <Text as='h4' styleVariant='secondary-heading' className='text-base'>
                  {tab.title}
                </Text>
                {tab.isComingSoon && <SoonTag />}
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
        {children}
        <TabsContent className='mt-0 pt-4 border-t border-grey-300' value='favorites'>
          {favoriteComics.length ? (
            <ComicsContent comics={favoriteComics} ComicCard={DefaultComicCard} />
          ) : (
            <EmptyLibrarySection emptySectionState={EMPTY_SECTION_STATES.favorites} />
          )}
        </TabsContent>
        <TabsContent className='mt-0 pt-4 border-t border-grey-300' value='creators'>
          {followedCreators.length ? (
            <CreatorsContent creators={followedCreators} />
          ) : (
            <EmptyLibrarySection emptySectionState={EMPTY_SECTION_STATES.creators} />
          )}
        </TabsContent>
      </Tabs>
    </BaseLayout>
  )
}
