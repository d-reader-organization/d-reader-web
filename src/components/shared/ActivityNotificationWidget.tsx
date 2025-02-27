'use client'

import { BasicUser } from '@/models/user'
import { UserPlusIcon } from '../icons/theme/UserPlusIcon'
import { Button, Text, toast } from '../ui'
import { ButtonLink } from '../ui/ButtonLink'
import { StarIcon } from '../icons/theme/StarIcon'
import { BookmarkIcon } from '../icons/theme/BookmarkIcon'
import { HeartIcon } from '../icons/theme/HeartIcon'
import { cn } from '@/lib/utils'
import { RoutePath } from '@/enums/routePath'
import { favouritiseComic } from '@/app/lib/api/comic/mutations'
import { expressInterest } from '@/app/lib/api/campaign/mutations'
import { followCreator } from '@/app/lib/api/creator/mutations'
import { ExpressInterestIcon } from '../icons/theme/ExpressInterestIcon'

export type ActivityNotification = {
  user: BasicUser
  type: ActivityNotificationType
  targetId: string
  targetTitle: string
  createdAt: Date | string
}

type Props = { notifications?: ActivityNotification[] }

export enum ActivityNotificationType {
  ComicRated = 'ComicRated',
  ComicLiked = 'ComicLiked',
  ComicBookmarked = 'ComicBookmarked',
  ComicIssueLiked = 'ComicIssueLiked',
  ComicIssueRated = 'ComicIssueRated',
  CollectibleComicMinted = 'CollectibleComicMinted',
  CreatorFollow = 'CreatorFollow',
  ExpressedInterest = 'ExpressedInterest',
  //   WheelSpun = 'WheelSpun',
}

type StaticData = {
  bgColor: string
  buttonText: string
  textColor: string
  icon: typeof StarIcon
}

const STATIC_ACTIVITY_DATA: Record<ActivityNotificationType, StaticData> = {
  [ActivityNotificationType.CollectibleComicMinted]: {
    bgColor: 'bg-purple-200',
    buttonText: 'Mint now',
    textColor: 'text-purple-200',
    icon: BookmarkIcon,
  },
  [ActivityNotificationType.ComicRated]: {
    bgColor: 'bg-yellow-300',
    textColor: 'text-yellow-300',
    icon: StarIcon,
    buttonText: 'Check out',
  },
  [ActivityNotificationType.ComicLiked]: {
    bgColor: 'bg-orange-300',
    textColor: 'text-orange-300',
    icon: HeartIcon,
    buttonText: 'See why',
  },
  [ActivityNotificationType.ComicBookmarked]: {
    bgColor: 'bg-green-accent',
    textColor: 'text-green-accent',
    icon: BookmarkIcon,
    buttonText: 'Favorite',
  },
  [ActivityNotificationType.ComicIssueLiked]: {
    bgColor: 'bg-orange-300',
    textColor: 'text-orange-300',
    icon: HeartIcon,
    buttonText: 'See why',
  },
  [ActivityNotificationType.ComicIssueRated]: {
    bgColor: 'bg-yellow-300',
    textColor: 'text-yellow-300',
    icon: StarIcon,
    buttonText: 'Check out',
  },
  [ActivityNotificationType.CreatorFollow]: {
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-100',
    icon: UserPlusIcon,
    buttonText: 'Follow',
  },
  [ActivityNotificationType.ExpressedInterest]: {
    bgColor: 'bg-green-accent',
    textColor: 'text-green-accent',
    icon: ExpressInterestIcon,
    buttonText: 'Favorite',
  },
}

type DescriptionContentType = {
  userDisplayName: string
  middleText: string
  target: string
}

function buildDescriptionContent({
  keyword,
  notifications,
}: {
  keyword: string
  notifications: ActivityNotification[]
}): DescriptionContentType {
  const firstNotif = notifications.at(0)
  return {
    middleText: notifications.length > 1 ? `and ${notifications.length - 1} more ${keyword}` : keyword,
    target: firstNotif?.targetTitle ?? '',
    userDisplayName: firstNotif?.user.displayName ?? '',
  }
}

export function getNotificationData(notifications: ActivityNotification[]): {
  buttonText: string
  descriptionContent: DescriptionContentType
  hrefOrAction:
    | string
    | (() => Promise<{
        errorMessage?: string
      }>)
} {
  const notification = notifications.at(0)!
  switch (notification.type) {
    case ActivityNotificationType.ComicRated:
      return {
        buttonText: 'Check out',
        descriptionContent: buildDescriptionContent({ keyword: 'rated', notifications }),
        hrefOrAction: RoutePath.Comic(notification.targetId),
      }
    case ActivityNotificationType.ComicLiked:
      return {
        buttonText: 'See why',
        descriptionContent: buildDescriptionContent({ keyword: 'liked', notifications }),
        hrefOrAction: RoutePath.Comic(notification.targetId),
      }
    case ActivityNotificationType.ComicBookmarked:
      return {
        buttonText: 'Favorite',
        descriptionContent: buildDescriptionContent({ keyword: 'favorited', notifications }),
        hrefOrAction: async () => {
          return favouritiseComic(notification.targetId)
        },
      }
    case ActivityNotificationType.ComicIssueLiked:
      return {
        buttonText: 'See why',
        descriptionContent: buildDescriptionContent({ keyword: 'liked', notifications }),
        hrefOrAction: RoutePath.ComicIssue(notification.targetId),
      }
    case ActivityNotificationType.ComicIssueRated:
      return {
        buttonText: 'Check out',
        descriptionContent: buildDescriptionContent({ keyword: 'rated', notifications }),
        hrefOrAction: RoutePath.ComicIssue(notification.targetId),
      }
    case ActivityNotificationType.CollectibleComicMinted:
      return {
        buttonText: 'Mint now',
        descriptionContent: buildDescriptionContent({ keyword: 'minted', notifications }),
        hrefOrAction: RoutePath.Mint(notification.targetId),
      }
    case ActivityNotificationType.CreatorFollow:
      return {
        buttonText: 'Follow',
        descriptionContent: buildDescriptionContent({ keyword: 'followed', notifications }),
        hrefOrAction: async () => {
          return followCreator(+notification.targetId)
        },
      }
    case ActivityNotificationType.ExpressedInterest:
      return {
        buttonText: 'Subscribe',
        descriptionContent: buildDescriptionContent({ keyword: 'expressed interest in', notifications }),
        hrefOrAction: async () => {
          // TODO (Luka): IF the user is not on the campaign page, display a push notification which redirects to the campaign page after clicking the 'Express Interest' button.
          // IF the user is on the campaign page, display a different component for this notification (Athar's Twitch stream GIF)
          return expressInterest({ request: { expressedAmount: 1 }, slug: notification.targetId })
        },
      }
  }
}

type ActivityNotificationDescriptionProps = {
  descriptionContent: DescriptionContentType
}

const ActivityNotificationDescription: React.FC<ActivityNotificationDescriptionProps> = ({ descriptionContent }) => {
  return (
    <div className='flex flex-wrap max-h-10'>
      <Text as='span' styleVariant='body-small' fontWeight='bold'>
        {descriptionContent.userDisplayName}&nbsp;
      </Text>
      <Text as='p' styleVariant='body-small' className='text-ellipsis'>
        {descriptionContent.middleText}&nbsp;
      </Text>
      <Text as='span' styleVariant='body-small' fontWeight='bold' className='underline text-ellipsis'>
        {descriptionContent.target}
      </Text>
    </div>
  )
}

export const ActivityNotificationWidget: React.FC<Props> = ({ notifications }) => {
  if (!notifications?.length) {
    return null
  }

  const notification = notifications.at(0)!
  const staticData = STATIC_ACTIVITY_DATA[notifications[0].type]
  const IconWidget = staticData.icon
  const { buttonText, descriptionContent, hrefOrAction } = getNotificationData(notifications)

  return (
    <div className='flex gap-2 justify-between items-center w-[380px]'>
      <div className='flex gap-3 items-center'>
        <div
          className={cn(
            'rounded-lg  bg-opacity-40 p-2 flex justify-center items-center size-[38px]',
            staticData.bgColor
          )}
        >
          <IconWidget className={cn('size-4.5', staticData.textColor)} />
        </div>
        <ActivityNotificationDescription descriptionContent={descriptionContent} />
      </div>
      {typeof hrefOrAction === 'string' ? (
        <ButtonLink
          href={hrefOrAction}
          variant={notification.type === ActivityNotificationType.ComicBookmarked ? 'white' : 'outline'}
        >
          {buttonText}
        </ButtonLink>
      ) : (
        <Button
          variant={notification.type === ActivityNotificationType.ExpressedInterest ? 'primary' : 'white'}
          className={cn(
            notification.type === ActivityNotificationType.ExpressedInterest
              ? 'bg-green-genesis border-t-0 justify-self-end'
              : ''
          )}
          onClick={async () => {
            const response = await hrefOrAction()
            const isError = !!response.errorMessage
            toast({
              variant: isError ? 'error' : 'success',
              title: isError ? 'Error' : 'Success',
              description: response.errorMessage ?? `You ${descriptionContent.middleText} ${descriptionContent.target}`,
            })
            if (response.errorMessage) {
            }
          }}
        >
          {buttonText}
        </Button>
      )}
    </div>
  )
}
