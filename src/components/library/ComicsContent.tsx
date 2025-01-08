import { Comic } from '@/models/comic'
import { Text } from '../ui'
import { getComicsMappedByLetter } from '@/utils/helpers'
import { DefaultComicCard } from '../comic/cards/DefaultCard'
import { OwnedComicCard } from '../comic/cards/OwnedCard'
import { cn } from '@/lib/utils'

interface Props {
  comics: Comic[]
  ComicCard: ComicCardComponent
}

type ComicCardComponent = typeof DefaultComicCard | typeof OwnedComicCard

export const ComicsContent: React.FC<Props> = ({ comics, ComicCard }) => {
  const comicsMappedByLetter = getComicsMappedByLetter(comics)

  return (
    <>
      <div className='md:hidden grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6'>
        {comics.map((comic) => (
          <ComicCard key={`owned_${comic.slug}`} comic={comic} className='max-md:max-h-fit' />
        ))}
      </div>
      <div className='max-md:hidden'>
        {Object.entries(comicsMappedByLetter).map(([letter, comics]) => (
          <div
            key={letter}
            className={cn(
              'grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full',
              Object.keys(comicsMappedByLetter)[0] === letter ? 'pb-7 pt-3' : 'py-7',
              Object.keys(comicsMappedByLetter)[Object.keys(comicsMappedByLetter).length - 1] !== letter &&
                'border-b border-grey-300'
            )}
          >
            <Text as='h5' styleVariant='secondary-heading' className='col-span-1'>
              {letter}
            </Text>
            <div className='grid grid-cols-2 col-span-2 sm:grid-cols-3 sm:col-span-3 lg:grid-cols-4 lg:col-span-4 xl:grid-cols-5 xl:col-span-5 gap-8'>
              {comics.map((comic) => (
                <ComicCard key={`owned_${comic.slug}`} comic={comic} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
