'use client'

import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import { UnwrapIssueDialogItem } from '@/components/comicIssue/UnwrapIssueDialogItem'
import { useToggle } from '@/hooks/useToggle'
import { Text } from '@/components/ui'
import { CollectibleComic } from '@/models/asset'
import { ComicRarity } from '@/enums/comicRarity'

export const dummyCollectibleComics: CollectibleComic[] = [
  {
    address: '0x123456789abcdef123456789abcdef123456789a',
    uri: 'https://example.com/comic1.json',
    image: 'https://example.com/comic1.jpg',
    name: 'The Galactic Chronicles #1',
    description: 'A thrilling space adventure featuring Captain Nova.',
    ownerAddress: '0xabcdefabcdefabcdefabcdefabcdefabcd',
    royalties: 5,
    isUsed: false,
    isSigned: true,
    rarity: ComicRarity.Legendary,
    comicIssueId: 101,
    isListed: true,
    comicTitle: 'The Galactic Chronicles',
    comicIssueTitle: 'The Beginning',
  },
  {
    address: '0xabcdefabcdefabcdefabcdefabcdefabcd',
    uri: 'https://example.com/comic2.json',
    image: 'https://example.com/comic2.jpg',
    name: 'Mystic Realms #7',
    description: 'A magical journey through enchanted lands.',
    ownerAddress: '0x987654321abcdef987654321abcdef987654321a',
    royalties: 7.5,
    isUsed: true,
    isSigned: false,
    rarity: ComicRarity.Rare,
    comicIssueId: 202,
    isListed: false,
    comicTitle: 'Mystic Realms',
    comicIssueTitle: 'The Dark Prophecy',
  },
  {
    address: '0x789abcdef123456789abcdef123456789abcd',
    uri: 'https://example.com/comic3.json',
    image: 'https://example.com/comic3.jpg',
    name: 'Cyberpunk Saga #3',
    description: 'A neon-drenched dystopian adventure.',
    ownerAddress: '0x456123789abcdef456123789abcdef456123789a',
    royalties: 10,
    isUsed: false,
    isSigned: true,
    rarity: ComicRarity.Epic,
    comicIssueId: 303,
    isListed: true,
    comicTitle: 'Cyberpunk Saga',
    comicIssueTitle: 'Neon Revolt',
  },
  {
    address: '0x321654987abcdef321654987abcdef321654987a',
    uri: 'https://example.com/comic4.json',
    image: 'https://example.com/comic4.jpg',
    name: 'Shadow Assassins #12',
    description: 'A tale of vengeance and honor in a feudal world.',
    ownerAddress: '0x741852963abcdef741852963abcdef741852963a',
    royalties: 3,
    isUsed: true,
    isSigned: false,
    rarity: ComicRarity.Uncommon,
    comicIssueId: 404,
    isListed: false,
    comicTitle: 'Shadow Assassins',
    comicIssueTitle: 'The Silent Blade',
  },
]

type Props = {
  collectibleComics: CollectibleComic[]
  showUnwrapButton?: boolean
}

export const UnwrapIssueDialog: React.FC<Props> = ({ collectibleComics, showUnwrapButton = true }) => {
  const [unwrapIssueDialog, toggleDialog, closeDialog] = useToggle()
  const unusedCollectibleComics = dummyCollectibleComics // collectibleComics.filter((collectibleComic) => !collectibleComic.isUsed)
  return (
    <Dialog open={unwrapIssueDialog} onOpenChange={toggleDialog}>
      {showUnwrapButton && (
        <DialogTrigger className='bg-yellow-300 rounded-lg text-black p-2 font-semibold text-base min-w-28 w-min mx-auto'>
          Unwrap
        </DialogTrigger>
      )}
      <DialogContent
        aria-describedby=''
        className='flex flex-col justify-between items-center gap-4 bg-grey-400 p-5 rounded-lg max-w-[500px] max-h-[600px] overflow-y-scroll'
      >
        <DialogTitle className='sr-only'>Unwrap issue dialog</DialogTitle>
        <Text as='h3' styleVariant='primary-heading'>
          Choose to open
        </Text>
        <Text as='p' styleVariant='body-large' className='text-center'>
          This episode is a digital collectible, In order to read the full episode you need to &quot;unwrap&quot; at
          least one copy. This action is irreversible and will make the selected copy lose the mint condition.
        </Text>
        {unusedCollectibleComics.map((collectibleComic) => (
          <UnwrapIssueDialogItem
            key={collectibleComic.address}
            collectibleComic={collectibleComic}
            closeDialog={closeDialog}
          />
        ))}
      </DialogContent>
    </Dialog>
  )
}
