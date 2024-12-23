import { ComicIssue } from '@/models/comicIssue'
import { Text } from '../ui'
import { AudienceType } from '@/enums/audienceType'
import { RoutePath } from '@/enums/routePath'
import { ChevronRight } from 'lucide-react'
import { AudienceWidget } from '../shared/AudienceWidget'
import { Divider } from '../shared/Divider'
import { ExpandableText } from '../shared/ExpandableText'
import { ButtonLink } from '../ui/ButtonLink'
import { cn } from '@/lib/utils'
import { AvatarImage } from '../shared/AvatarImage'
import Link from 'next/link'
import { Dot } from 'lucide-react'
import { TextWithViewMoreButton } from '../ui/TextWithViewMoreButton'

type Props = {
  comicIssue: ComicIssue
}

//TODO: Update GenreTags component, use it on Comic and ComicIssue pages(?).. 'tis not standardized?
//TODO: Think about ExpandableText and TextWithViewMoreButton components, not both are needed
export const AboutIssueSection: React.FC<Props> = ({ comicIssue }) => (
  <div className='flex flex-col gap-6 w-full max-w-[800px]'>
    <div className='flex flex-col max-md:self-center gap-4'>
      <div className='flex gap-3 text-grey-100 items-center'>
        <Text as='span' styleVariant='body-normal'>
          {comicIssue.comic?.title}
        </Text>
        <Dot className='size-3' />
        <Text as='span' styleVariant='body-normal'>
          EP {comicIssue.number}
        </Text>
      </div>
      <Text as='h3' styleVariant='primary-heading'>
        {comicIssue.title}
      </Text>
    </div>
    <div className='flex flex-col 1160:flex-row gap-10 justify-between'>
      <div className='flex flex-col gap-6'>
        {comicIssue.genres && (
          <div className='flex flex-wrap gap-[6px] sm:gap-2'>
            {comicIssue.genres.map((genre, index) => (
              <div
                className={cn('flex justify-center items-center px-2 py-[2px] rounded-lg bg-grey-300 bg-opacity-30 backdrop-blur-lg')}
                key={`${genre}-${index}`}
              >
                <Text as='span' styleVariant='body-normal' className='text-grey-100 max-sm:text-sm'>
                  {genre.name}
                </Text>
              </div>
            ))}
            <AudienceWidget audience={comicIssue.comic?.audienceType ?? AudienceType.Everyone} />
          </div>
        )}
        <ExpandableText className='max-w-[440px] lg:max-w-[486px]' text={comicIssue.description} />
        {/* <TextWithViewMoreButton
          as='p'
          styleVariant='body-normal'
          className='text-grey-100'

          maxLength={140}
        >{comicIssue.description}</TextWithViewMoreButton> */}
        <div className='flex justify-between items-center'>
          <div className='flex justify-center'>
          <Text as='span' styleVariant='body-normal'>
            {comicIssue.stats?.totalPagesCount}&nbsp;
          </Text>
          <Text as='span' styleVariant='body-normal' className='text-grey-100'>
            pages
          </Text>
          </div>
          <ButtonLink
            icon={ChevronRight}
            variant='secondary'
            subVariant={1}
            size='sm'
            href={RoutePath.Comic(comicIssue.comicSlug)}
            prefetch={false}
            target='_blank'
            className='bg-grey-500 bg-opacity-100 border-none text-grey-100 rounded-xl'
          >
            <Text as='span' styleVariant='body-small'>
              Explore Collection
            </Text>
          </ButtonLink>
        </div>
        <Divider />
        {comicIssue.creator && (
          <Link
            prefetch={false}
            href={RoutePath.Creator(comicIssue.creator.slug)}
            className='flex items-center gap-3 w-fit'
          >
            <AvatarImage
              src={comicIssue.creator.avatar}
              size='small'
              className='border-grey-300 border max-sm:size-8'
            />
            <Text as='p' styleVariant='body-normal' fontWeight='bold'>
              {comicIssue.creator.name}
            </Text>
          </Link>
        )}
      </div>
    </div>
  </div>
)
