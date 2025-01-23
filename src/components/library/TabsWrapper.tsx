import { Text } from '@/components/ui'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { SoonTag } from '../shared/Tags'
import { cn } from '@/lib/utils'
import { LIBRARY_PAGE_TABS as tabs } from '@/constants/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import { fetchFavoriteComics } from '@/app/lib/api/comic/queries'
import { fetchFollowedCreators } from '@/app/lib/api/creator/queries'
import { SortOrder } from '@/enums/sortOrder'
import { ComicSortTag } from '@/models/comic/comicParams'
import { CreatorSortTag } from '@/models/creator/creatorParams'
import { DefaultComicCard } from '../comic/cards/DefaultCard'
import { ComicsByAlphabet } from './ComicsByAlphabet'
import { CreatorsContent } from './CreatorsContent'
import { EmptyLibrarySection } from './EmptySection'
import { BaseLayout } from '../layout/BaseLayout'
import { RoutePath } from '@/enums/routePath'

interface Props extends React.PropsWithChildren {
  userId: number
  isComingSoon?: boolean
  title?: string
  value?: string
}

export const LibraryTabsWrapper: React.FC<Props> = async ({ children, userId }) => {
  const favoriteComics = await fetchFavoriteComics({
    params: { skip: 0, take: 20, sortTag: ComicSortTag.Title, sortOrder: SortOrder.DESC },
    userId: userId,
  })
  const followedCreators = await fetchFollowedCreators({
    params: { skip: 0, take: 20, sortTag: CreatorSortTag.Name, sortOrder: SortOrder.DESC },
    userId: userId,
  })

  return (
    <BaseLayout showFooter>
      <div className='flex flex-col max-w-screen-xl w-full gap-5'>
        <Text as='h1' styleVariant='primary-heading' className='max-sm:text-20'>
          My Library
        </Text>
        <Tabs defaultValue={tabs.at(0)?.title.toLowerCase()}>
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
              <ComicsByAlphabet comics={favoriteComics} ComicCard={DefaultComicCard} />
            ) : (
              <EmptyLibrarySection
                title='You have no comics bookmarked.'
                subtitle='Explore comics and mark some as favorite!'
                href={RoutePath.DiscoverComics}
                buttonLinkText='Discover Comics'
              />
            )}
          </TabsContent>
          <TabsContent className='mt-0 pt-4 border-t border-grey-300' value='creators'>
            {followedCreators.length ? (
              <CreatorsContent creators={followedCreators} />
            ) : (
              <EmptyLibrarySection
                title="You don't follow any creators."
                subtitle='Explore creators and mark some as favorite!'
                buttonLinkText='Discover Creators'
                href={RoutePath.DiscoverCreators}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </BaseLayout>
  )
}
