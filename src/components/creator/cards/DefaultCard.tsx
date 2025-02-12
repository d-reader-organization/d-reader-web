import Link from 'next/link'
import Image from 'next/image'
import { Text } from '@/components/ui'

import { AvatarImage } from '@/components/shared/AvatarImage'
import { Creator } from '@/models/creator'
import { RoutePath } from '@/enums/routePath'
import { CREATOR_BANNER_SIZE } from '@/constants/imageSizes'

import { pluralizeString } from '@/utils/helpers'
import { cn } from '@/lib/utils'
import { FollowCreatorButton } from '@/components/shared/buttons/FollowCreatorButton'
import { TextWithOverflow } from '@/components/ui/TextWithOverflow'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  creator: Creator
}

export const DefaultCreatorCard: React.FC<Props> = ({ creator, className }) => (
  <Link
    href={RoutePath.Creator(creator.handle)}
    prefetch={false}
    className={cn(
      'flex flex-col gap-3 md:gap-2 w-full rounded-2xl hover:brightness-110 border border-grey-300 p-2',
      className
    )}
  >
    <Image
      src={creator.banner}
      alt=''
      className='rounded-2xl w-full aspect-creator-banner object-cover object-top'
      {...CREATOR_BANNER_SIZE}
    />
    <div className='flex relative p-2 justify-between mt-4 gap-2 flex-col items-center pb-1 md:gap-0 md:flex-row md:items-start'>
      <AvatarImage
        src={creator.avatar}
        alt=''
        size='large'
        className='absolute max-md:-top-8 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:-translate-y-1/2 md:inset-x-6 md:-inset-y-14'
      />
      <div className='flex flex-col items-center gap-[2px] md:items-start'>
        <div className='flex md:w-28 1160:w-40'>
          <TextWithOverflow as='span' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-sm'>
            {creator.displayName}
          </TextWithOverflow>
        </div>
        <Text
          as='span'
          styleVariant='body-small'
          className='line-clamp-1 overflow-ellipsis max-sm:text-xs text-grey-100'
        >
          {creator.stats.followersCount + ' ' + pluralizeString('Follower', creator.stats.followersCount)}
        </Text>
      </div>
      <FollowCreatorButton
        creatorId={creator.id}
        isFollowing={creator.myStats?.isFollowing}
        className='max-sm:h-9 max-sm:min-w-[108px]'
      />
    </div>
  </Link>
)
