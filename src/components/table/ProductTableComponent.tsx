import React from 'react'
import Image from 'next/image'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/Table'
import { ASPECT_RATIO } from '@/constants/general'
import { TextWithOverflow } from '../ui/TextWithOverflow'
import { RawComic } from '@/models/comic/rawComic'
import { format } from 'date-fns'
import { VerificationStatusChip } from '../shared/chips/VerificationStatusChip'

type Props = { comics: RawComic[] }

export const ProducTableComponent: React.FC<Props> = ({ comics }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Date published</TableHead>
          <TableHead className='text-center'>Episodes</TableHead>
          <TableHead className='text-center'>Likes</TableHead>
          <TableHead className='text-center'>Readers</TableHead>
          <TableHead className='text-center'>Rating</TableHead>
          {/* <TableHead className='text-center'>Bookmarks</TableHead> */}
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {comics.map((comic) => (
          <TableRow key={comic.slug}>
            <TableCell>
              <div className='flex items-center gap-2 relative'>
                <Image
                  src={comic.cover}
                  alt=''
                  {...ASPECT_RATIO.COMIC_COVER}
                  className='rounded-sm h-14 w-auto aspect-comic-cover'
                />
                <div className='flex flex-col w-full max-w-[240px] lg:max-w-[320px] pr-12'>
                  <TextWithOverflow as='span' styleVariant='body-small' className='text-grey-200'>
                    {comic.title}
                  </TextWithOverflow>
                  <TextWithOverflow as='span' styleVariant='body-small' fontWeight='medium'>
                    @{comic.slug}
                  </TextWithOverflow>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <span className='text-nowrap'>{format(new Date(comic.publishedAt), 'Pp')}</span>
            </TableCell>
            <TableCell className='text-center'>{comic.stats.issuesCount}</TableCell>
            <TableCell className='text-center'>{comic.stats.favouritesCount}</TableCell>
            <TableCell className='text-center'>{comic.stats.readersCount}</TableCell>
            <TableCell className='text-center'>{comic.stats.averageRating}</TableCell>
            {/* <TableCell className='text-center'>TODO: {comic.stats.bookmarksCount}</TableCell> */}
            <TableCell>
              <VerificationStatusChip isVerified={!!comic.verifiedAt} />
            </TableCell>
            <TableCell>Buttons</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ProducTableComponent
