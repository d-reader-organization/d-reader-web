import React from 'react'
import Image from 'next/image'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/Table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ASPECT_RATIO, PLACEHOLDER_AVATAR } from '@/constants/general'
import { TextWithOverflow } from '../ui/TextWithOverflow'
import { RawComic } from '@/models/comic/rawComic'

type Props = { comics: RawComic[] }

export const ProducTableComponent: React.FC<Props> = ({ comics }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Traits</TableHead>
          <TableHead>Date</TableHead>
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
                  className='rounded-sm h-auto w-10 aspect-comic-cover'
                />
                <div className='flex flex-col w-full max-lg:max-w-[240px] pr-12'>
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
              <div className='flex items-center gap-2 text-nowrap'>
                <Avatar className='size-6'>
                  <AvatarImage src={PLACEHOLDER_AVATAR} />
                  <AvatarFallback>
                    {/** fallback to 'G' as guest */}
                    JD
                  </AvatarFallback>
                </Avatar>
                John Doe
              </div>
            </TableCell>
            <TableCell>TODO</TableCell>
            <TableCell>TODO</TableCell>
            <TableCell>TODO</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ProducTableComponent
