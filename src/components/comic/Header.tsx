import React from 'react'
import { Text } from '../ui/Text'
import { Comic } from '@/models/comic'
import { Socials } from '../shared/Socials'
import { AvatarImage } from '../shared/AvatarImage'
import { cn } from '@/lib/utils'
import { AudienceWidget } from '../shared/AudienceWidget'
import { StatsContainer, StatsItem } from '../shared/Stats'
import { RateButton } from '../shared/buttons/RateButton'
import { FavouritiseButton } from '../shared/buttons/FavouritiseButton'
import { BookmarkButton } from '../shared/buttons/BookmarkButton'
import { TextWithViewMoreButton } from '../ui/TextWithViewMoreButton'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'

type Props = {
  comic: Comic
}

export const ComicHeader: React.FC<Props> = ({ comic }) => (
  <div className='flex flex-col items-center gap-3 sm:gap-8 sm:flex-row sm:justify-between sm:h-[500px] sm:pb-8 sm:items-end'>
    <LeftSection comic={comic} />
    <RightSection comic={comic} />
  </div>
)

const LeftSection: React.FC<Props> = ({ comic }) => (
  <div className='flex flex-col gap-3 sm:gap-7 w-full sm:max-w-[500px] lg:max-w-[680px] max-sm:items-start sm:justify-end'>
    <Socials website={comic.website} instagram={comic.instagram} twitter={comic.twitter} className='sm:hidden' />
    <Text as='h3' styleVariant='primary-heading'>
      {comic.title}
    </Text>
    <div className='flex flex-col gap-3 sm:min-h-[124px] max-sm:pt-2'>
      {comic.genres && (
        <div className='flex flex-wrap gap-[6px] sm:gap-2'>
          {comic.genres.map((genre, index) => (
            <div
              className={cn('flex justify-center items-center px-2 py-[2px] rounded-lg bg-grey-500')}
              key={`${genre}-${index}`}
            >
              <Text as='span' styleVariant='body-normal' className='text-grey-100 max-sm:text-sm'>
                {genre.name}
              </Text>
            </div>
          ))}
          <AudienceWidget audience={comic.audienceType} />
        </div>
      )}
      <TextWithViewMoreButton
        as='p'
        className='whitespace-pre-wrap text-grey-100 max-sm:text-sm'
        styleVariant='body-normal'
      >
        {comic.description}
      </TextWithViewMoreButton>
    </div>
    {comic.creator && (
      <Link prefetch={false} href={RoutePath.Creator(comic.creator.slug)} className='flex items-center gap-3 w-fit'>
        <AvatarImage src={comic.creator.avatar} size='small' className='border-grey-300 border max-sm:size-8' />
        <Text as='p' styleVariant='body-normal' fontWeight='bold'>
          {comic.creator.name}
        </Text>
      </Link>
    )}
  </div>
)

const RightSection: React.FC<Props> = ({ comic }) => (
  <div className='flex flex-col w-full gap-3 sm:max-w-[282px] sm:gap-5 items-end'>
    <Socials website={comic.website} instagram={comic.instagram} twitter={comic.twitter} className='max-sm:hidden' />
    <div className='flex max-sm:gap-2 sm:justify-between w-full ACTIONBUTTONSWRAPPER'>
      <RateButton comicSlug={comic.slug} averageRating={comic.stats?.averageRating} rating={comic.myStats?.rating} />
      <FavouritiseButton
        comicSlug={comic.slug}
        isFavourite={comic.myStats?.isFavourite}
        favouritesCount={comic.stats?.favouritesCount}
      />
      <BookmarkButton comicSlug={comic.slug} isBookmarked={comic.myStats?.isBookmarked} />
    </div>
    <StatsContainer>
      <StatsItem label='Episodes' value={comic.stats?.issuesCount} />
      <StatsItem label='Readers' value={comic.stats?.readersCount} />
      <StatsItem label='Series' value={comic.isCompleted ? 'Completed' : 'Ongoing'} />
    </StatsContainer>
  </div>
)
