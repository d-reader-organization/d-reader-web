import { Text } from '@/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import React from 'react'
import { SoonTag } from '../shared/Tags'
import { cn } from '@/lib/utils'
import { Comic } from '@/models/comic'
import { OwnedComicsContent } from './owned/ComicsContent'
import { OwnedIssuesContent } from './owned/AssetsContent'
import { ComicIssue, OwnedComicIssue } from '@/models/comicIssue'
import { Nullable } from '@/models/common'
import { FavoriteComicsContent } from './FavoriteComicsContent'

const tabs: { title: string; value: string; isComingSoon?: boolean }[] = [
  {
    title: 'Owned',
    value: 'owned',
  },
  {
    title: 'Favorites',
    value: 'favorites',
  },
  {
    title: 'Creators',
    value: 'creators',
  },
]

type Props = {
  comics?: Comic[]
  comicIssue?: Nullable<ComicIssue>
  ownedIssues?: OwnedComicIssue[]
  favoriteComics?: Comic[]
} & React.HTMLAttributes<HTMLDivElement>

export const LibraryTabs: React.FC<Props> = ({ comics, comicIssue, ownedIssues, favoriteComics: favourisedComics }) => {
  return (
    <Tabs defaultValue={tabs.at(0)?.title.toLowerCase()} className='w-full max-w-screen-xl md:p-4'>
      <TabsList className='w-full justify-between items-start'>
        <div className='flex gap-[40px] w-full max-md:justify-between'>
          {tabs.map((tab) => (
            <TabTrigger key={tab.title} title={tab.title} value={tab.value} isComingSoon={tab.isComingSoon} />
          ))}
        </div>
      </TabsList>
      <TabsContent className='mt-0 border-t border-grey-300 w-full' value='owned'>
        {comics ? (
          <OwnedComicsContent comics={comics} />
        ) : comicIssue && ownedIssues ? (
          <OwnedIssuesContent comicIssue={comicIssue} ownedIssues={ownedIssues} />
        ) : null}
      </TabsContent>
      <TabsContent className='mt-0 pt-4 border-t border-grey-300' value='favorites'>
        {favourisedComics ? <FavoriteComicsContent comics={favourisedComics} /> : 'null'}
      </TabsContent>
      <TabsContent className='mt-0 pt-4 border-t border-grey-300' value='creators'></TabsContent>
    </Tabs>
  )
}

type TabTriggerProps = {
  isComingSoon?: boolean
  title: string
  value: string
}

const TabTrigger: React.FC<TabTriggerProps> = ({ isComingSoon, title, value }) => (
  <TabsTrigger
    className={cn(
      'flex flex-col sm:flex-row sm:gap-2 w-fit text-grey-200 data-[state=active]:text-white pb-4 md:px-0',
      isComingSoon && 'pointer-events-none'
    )}
    value={value}
  >
    <Text as='h4' styleVariant='secondary-heading'>
      {title}
    </Text>
    {isComingSoon ? <SoonTag /> : null}
  </TabsTrigger>
)
