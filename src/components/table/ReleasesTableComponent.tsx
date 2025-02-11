import Image from 'next/image'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/Table'
import { ASPECT_RATIO } from '@/constants/general'
import { TextWithOverflow } from '../ui/TextWithOverflow'
import { format } from 'date-fns'
import { VerificationStatusChip } from '../shared/chips/VerificationStatusChip'
import { FavouritesChip } from '../shared/chips/FavouritesChip'
import { StarRatingChip } from '../shared/chips/StarRatingChip'
import { ReadersChip } from '../shared/chips/ReadersChip'
import { RawComicIssue } from '@/models/comicIssue/rawComicIssue'

type Props = { releases: RawComicIssue[] }

export const ReleasesTableComponent: React.FC<Props> = ({ releases }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Date published</TableHead>
          <TableHead className='text-center'>Pages</TableHead>
          <TableHead className='text-center'>{/* Readers */}</TableHead>
          <TableHead className='text-center'>{/* Likes */}</TableHead>
          <TableHead className='text-center'>{/* Rating */}</TableHead>
          {/* <TableHead className='text-center'>Bookmarks</TableHead> */}
          <TableHead>{/* Status */}</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {releases.map((release) => {
          const key = `${release.id}-${release.slug}`
          return (
            <TableRow key={key}>
              <TableCell>
                <div className='flex items-center gap-2 relative'>
                  <Image
                    src={release.cover}
                    alt=''
                    {...ASPECT_RATIO.COMIC_COVER}
                    className='rounded-sm h-14 w-auto aspect-comic-cover'
                  />
                  <div className='flex flex-col w-full max-w-[240px] lg:max-w-[320px] pr-12'>
                    <TextWithOverflow as='span' styleVariant='body-small' className='text-grey-200'>
                      {release.title}
                    </TextWithOverflow>
                    <TextWithOverflow as='span' styleVariant='body-small' fontWeight='medium'>
                      @{release.slug}
                    </TextWithOverflow>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className='text-nowrap'>{format(new Date(release.publishedAt), 'Pp')}</span>
              </TableCell>
              <TableCell className='text-center'>{release.stats.totalPagesCount}</TableCell>
              <TableCell className='text-center'>
                <ReadersChip count={release.stats.readersCount} />
              </TableCell>
              <TableCell className='text-center'>
                <FavouritesChip count={release.stats.favouritesCount} />
              </TableCell>
              <TableCell className='text-center'>
                <StarRatingChip rating={release.stats.averageRating} />
              </TableCell>
              {/* <TableCell className='text-center'>TODO: {comic.stats.bookmarksCount}</TableCell> */}
              <TableCell>
                <VerificationStatusChip isVerified={!!release.verifiedAt} />
              </TableCell>
              <TableCell>Buttons</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
