import Link from 'next/link'
import Image from 'next/image'
import { Text } from '../../ui'
import { PriceTag } from '../../shared/tags/PriceTag'
import { ComicIssue } from '@/models/comicIssue'
import { RoutePath } from '@/enums/routePath'
import { cn } from '@/lib/utils'
import { TextWithOverflow } from '@/components/ui/TextWithOverflow'
import { ASPECT_RATIO } from '@/constants/general'
//import { TextWithOverflow } from '@/components/ui/TextWithOverflow'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  comicIssue: ComicIssue
}

export const DefaultComicIssueCard: React.FC<Props> = ({ comicIssue, className }) => {
  const isFree = comicIssue.stats?.price == null || comicIssue.stats.price === 0

  return (
    <Link
      href={RoutePath.ComicIssue(comicIssue.id)}
      className={cn(
        'flex relative flex-col w-full p-2 border border-grey-300 rounded-2xl hover:brightness-110',
        className
      )}
    >
      <Image
        src={comicIssue.cover}
        alt=''
        {...ASPECT_RATIO.COMIC_ISSUE_COVER}
        className='rounded-2xl h-auto w-full aspect-comic-issue-cover'
      />
      {isFree && (
        <Text
          as='span'
          styleVariant='body-small'
          fontWeight='bold'
          className='bg-yellow-300 rounded-xl p-1 px-2 text-black absolute right-3 top-3 max-sm:text-xxs'
        >
          FREE
        </Text>
      )}
      <div className='flex flex-col text-white px-2 pt-2'>
        {comicIssue.comic && (
          <Text
            as='span'
            styleVariant='body-small'
            className='text-grey-100 line-clamp-1 overflow-ellipsis max-sm:text-xs'
          >
            {comicIssue.comic.title}
          </Text>
        )}
        <TextWithOverflow as='span' styleVariant='body-normal' fontWeight='bold'>
          {comicIssue.title}
        </TextWithOverflow>
        {comicIssue.stats && (
          <div className='flex relative w-full justify-between text-white'>
            <Text as='span' styleVariant='body-small' className='text-grey-100 max-sm:text-xs'>
              EP {comicIssue.number}/{comicIssue.stats.totalIssuesCount}
            </Text>
            {!isFree && (
              <PriceTag
                styleVariant='body-small'
                fontWeight='bold'
                inline={false}
                icon
                price={comicIssue.stats.price}
                className='max-sm:text-xs'
                size='medium'
              />
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
