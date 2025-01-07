import { RoutePath } from '@/enums/routePath'
import { OwnedComicCard } from '../comic/cards/OwnedCard'
import { ButtonLink } from '../ui/ButtonLink'
import { Comic } from '@/models/comic'
import { Text } from '../ui'
import { sortAndGetLetterOccurrences, getSublistBoundaries } from '@/components/library/owned/ComicsContent'
import { DefaultComicCard } from '../comic/cards/DefaultCard'

interface Props {
  comics: Comic[]
}

export const FavoriteComicsContent: React.FC<Props> = ({ comics }) => {
  if (!comics.length) {
    return (
      <div className='flex flex-col gap-4 justify-center items-center h-full mt-6 md:mt-10'>
        <Text as='h4' styleVariant='secondary-heading'>
          Your library is empty
        </Text>
        <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-200'>
          Owned collectibles will be shown here
        </Text>
        <ButtonLink href={RoutePath.DiscoverComics} variant='outline' size='lg'>
          Discover Collectibles
        </ButtonLink>
      </div>
    )
  }

  // TODO think about better handling of this
  const sortedLetters = sortAndGetLetterOccurrences(comics)
  const sortedLettersEntries = Object.keys(sortedLetters)

  return sortedLettersEntries.map((letter, index) => {
    const { startAt, endAt } = getSublistBoundaries(sortedLetters, index)

    return (
      <div key={`${letter}-${index}`} className='flex justify-between gap-8 md:gap-16 py-10 border-b border-b-grey-300'>
        <Text className='w-fit' as='h4' styleVariant='secondary-heading'>
          {letter}
        </Text>
        <div className='grid grid-cols-5 gap-6 md:gap-10 w-full'>
          {comics.slice(startAt, endAt).map((comic) => (
            <DefaultComicCard key={`owned_${comic.slug}`} comic={comic} />
          ))}
        </div>
      </div>
    )
  })
}
