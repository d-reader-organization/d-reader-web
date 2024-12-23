import { ComicIssue } from '@/models/comicIssue'
import { FavouritiseButton } from '../shared/buttons/FavouritiseButton'
import { RateButton } from '../shared/buttons/RateButton'
import { ShareButton } from '../shared/buttons/ShareButton'
import { StatsContainer, StatsItem } from '../shared/Stats'
import { Button } from '../ui'
import { Text } from '../ui'

type Props = {
  comicIssue: ComicIssue
}

export const IssueStatsSection: React.FC<Props> = ({ comicIssue }) => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-3 justify-end'>
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
        <ShareButton title={comicIssue.title} text={comicIssue.description} />
      </div>
      <StatsContainer>
        <StatsItem label='pages' value={comicIssue.stats?.totalPagesCount ?? ''} />
        <StatsItem label='copies' value={comicIssue.stats?.totalIssuesCount ?? ''} />
        <StatsItem label='floor price' value={comicIssue.stats?.price ?? ''} />
      </StatsContainer>
      <Button variant={'secondary'} size={'md'}>
        <Text as='span' styleVariant='body-normal'>
          Preview
        </Text>
      </Button>
    </div>
  )
}
