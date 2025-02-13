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
import { expressInterest } from '@/app/lib/api/invest/mutations'
import { followCreator } from '@/app/lib/api/creator/mutations'

export type ActivityNotification = {
  user: BasicUser
  type: ActivityNotificationType
  targetId: string
  targetTitle: string
  createdAt: Date | string
}

type Props = { action?: () => void; href?: string; notification: ActivityNotification }

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
    bgColor: 'bg-red-300',
    textColor: 'text-red-300',
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
    bgColor: 'bg-red-300',
    textColor: 'text-red-300',
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
    icon: BookmarkIcon,
    buttonText: 'Favorite',
  },
}

function getNotificationData(notification: ActivityNotification): {
  buttonText: string
  descriptionText: string
  hrefOrAction:
    | string
    | (() => Promise<{
        errorMessage?: string
      }>)
} {
  switch (notification.type) {
    case ActivityNotificationType.ComicRated:
      return {
        buttonText: 'Check out',
        descriptionText: 'rated',
        hrefOrAction: RoutePath.Comic(notification.targetId),
      }
    case ActivityNotificationType.ComicLiked:
      return {
        buttonText: 'See why',
        descriptionText: 'liked',
        hrefOrAction: RoutePath.Comic(notification.targetId),
      }
    case ActivityNotificationType.ComicBookmarked:
      return {
        buttonText: 'Favorite',
        descriptionText: 'favorited',
        hrefOrAction: async () => {
          return favouritiseComic(notification.targetId)
        },
      }
    case ActivityNotificationType.ComicIssueLiked:
      return {
        buttonText: 'See why',
        descriptionText: 'liked',
        hrefOrAction: RoutePath.ComicIssue(notification.targetId),
      }
    case ActivityNotificationType.ComicIssueRated:
      return {
        buttonText: 'Check out',
        descriptionText: 'rated',
        hrefOrAction: RoutePath.ComicIssue(notification.targetId),
      }
    case ActivityNotificationType.CollectibleComicMinted:
      return {
        buttonText: 'Mint now',
        descriptionText: 'minted',
        hrefOrAction: RoutePath.Mint(notification.targetId),
      }
    case ActivityNotificationType.CreatorFollow:
      return {
        buttonText: 'Follow',
        descriptionText: 'followed',
        hrefOrAction: async () => {
          return followCreator(+notification.targetId)
        },
      }
    case ActivityNotificationType.ExpressedInterest:
      return {
        buttonText: 'Express interest',
        descriptionText: 'expressed interest in',
        hrefOrAction: async () => {
          return expressInterest({ request: { expressedAmount: 1 }, slug: notification.targetId })
        },
      }
  }
}

type ActivityNotificationDescriptionProps = {
  userDisplayName: string
  description: string
  targetTitle: string
}

const ActivityNotificationDescription: React.FC<ActivityNotificationDescriptionProps> = ({
  description,
  targetTitle,
  userDisplayName,
}) => (
  <>
    <div className='flex flex-wrap max-h-10'>
      <Text as='span' styleVariant='body-small' fontWeight='bold'>
        {userDisplayName}&nbsp;
      </Text>
      <Text as='p' styleVariant='body-small' className='text-ellipsis'>
        {description}&nbsp;
      </Text>
      <Text as='span' styleVariant='body-small' fontWeight='bold' className='underline text-ellipsis'>
        {targetTitle}
      </Text>
    </div>
  </>
)

export const ActivityNotificationWidget: React.FC<Props> = ({ notification }) => {
  const staticData = STATIC_ACTIVITY_DATA[notification.type]
  const IconWidget = staticData.icon
  const { buttonText, descriptionText, hrefOrAction } = getNotificationData(notification)

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
        <ActivityNotificationDescription
          description={descriptionText}
          targetTitle={notification.targetTitle}
          userDisplayName={notification.user.displayName}
        />
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
              description: response.errorMessage ?? `You ${descriptionText} ${notification.targetTitle}`,
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
