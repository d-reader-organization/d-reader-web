import { ComicIssue } from '@/models/comicIssue'
import { GenreTags } from '../shared/GenresList'
import { ExpandableText } from '../shared/ExpandableText'
import { AudienceWidget } from '../shared/AudienceWidget'
import { ExternalLinkIcon } from '@/components/icons/theme/ExternalLinkIcon'
import { Divider } from '../shared/Divider'
import { CreatorInfoLink } from '../creator/InfoLink'
import React from 'react'
import { AudienceType } from '@/enums/audienceType'
import { RoutePath } from '@/enums/routePath'
import { ButtonLink } from '../ui/ButtonLink'

type Props = {
  comicIssue: ComicIssue
  targetBlank?: boolean
}

export const AboutIssueSection: React.FC<Props> = ({ comicIssue, targetBlank }) => (
  <div className='flex flex-col gap-6'>
    <h5 className='text-xl font-semibold leading-[20px] tracking-[0.04px]'>Description</h5>
    <GenreTags genres={comicIssue.genres ?? []} />
    <ExpandableText className='max-w-[440px] lg:max-w-[486px]' text={comicIssue.description} />
    <div className='flex justify-between'>
      <div className='flex gap-4 items-end'>
        <div className='text-base font-medium leading-[22.4px]'>
          <span>{comicIssue.stats?.totalPagesCount}&nbsp;</span>
          <span className='text-grey-100'>pages</span>
        </div>
        <AudienceWidget audience={comicIssue.comic?.audienceType ?? AudienceType.Everyone} />
      </div>
      <div className='flex flex-col gap-2'>
        <ButtonLink
          href={RoutePath.Comic(comicIssue.comicSlug)}
          prefetch={false}
          blank={targetBlank}
          className='font-medium h-9'
          Icon={ExternalLinkIcon}
          solid={false}
        >
          Explore series
        </ButtonLink>
      </div>
    </div>
    <Divider />
    <CreatorInfoLink creator={comicIssue.creator} />
  </div>
)
