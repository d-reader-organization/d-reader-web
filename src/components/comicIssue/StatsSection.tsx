import { ComicIssue } from '@/models/comicIssue'
import { FavouritiseButton } from '../shared/buttons/FavouritiseButton'
import { RateButton } from '../shared/buttons/RateButton'
import { ShareButton } from '../shared/buttons/ShareButton'
import { StatsContainer, StatsItem } from '../shared/Stats'
import { Text } from '../ui'
import { ButtonLink } from '../ui/ButtonLink'
import { RoutePath } from '@/enums/routePath'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/utils/numbers'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  comicIssue: ComicIssue
}

export const IssueStatsSection: React.FC<Props> = ({ comicIssue, className }) => {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className='flex gap-3 max-1160:justify-start 1160:justify-end'>
        <RateButton
          comicIssueId={comicIssue.id}
          averageRating={comicIssue.stats?.averageRating}
          rating={comicIssue.myStats?.rating}
        />
        <FavouritiseButton
          comicIssueId={comicIssue.id}
          isFavourite={comicIssue.myStats?.isFavourite}
          favouritesCount={comicIssue.stats?.favouritesCount}
        />
        <ShareButton
          title={comicIssue.title}
          text={comicIssue.description}
          className='border-none bg-grey-400 bg-opacity-100 shadow-none'
        />
      </div>
      <StatsContainer className='sm:max-w-full'>
        <StatsItem label='pages' value={comicIssue.stats?.totalPagesCount ?? ''} />
        <StatsItem label='copies' value={comicIssue.stats?.totalIssuesCount ?? ''} />
        <StatsItem
          label='floor price'
          value={formatCurrency({ value: comicIssue.stats?.price ?? 0, currency: '◎', fractionDigits: 0, divisor: 9 })}
        />
      </StatsContainer>
      <ButtonLink
        href={RoutePath.ReadComicIssue(comicIssue.id)}
        prefetch={false}
        variant={comicIssue.isFreeToRead ? 'primary' : 'secondary'}
        size={'lg'}
        target='_blank'
      >
        <Text as='span' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-sm'>
          {comicIssue.isFreeToRead ? 'Read for Free!' : comicIssue.myStats?.canRead ? 'Read' : 'Preview'}
        </Text>
      </ButtonLink>
    </div>
  )
}
