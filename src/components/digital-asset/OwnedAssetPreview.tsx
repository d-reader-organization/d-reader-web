import React from 'react'
import Image from 'next/image'
import { RarityChip } from '@/components/shared/chips/RarityChip'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/Dialog'
import { OwnedAssetCard } from './OwnedAssetCard'
import { toast } from '../ui/toast'
import { Circle, Copy, ExternalLink } from 'lucide-react'
import { Text } from '../ui/Text'
import { shortenAssetName, shortenSolanaAddress } from '@/utils/helpers'
import { GenreTags } from '../shared/GenresList'
import { ExpandableText } from '../shared/ExpandableText'
import { Divider } from '../shared/Divider'
import { AudienceWidget } from '../shared/AudienceWidget'
import { AudienceType } from '@/enums/audienceType'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { RoyaltyChip } from '../shared/chips/Royalty'
import { CreatorInfoLink } from '../creator/InfoLink'
import { ComicIssue } from '@/models/comicIssue'
import { Button } from '../ui'
import { useToggle } from '@/hooks'
import { requestAutograph } from '@/app/lib/api/asset/mutations'
import { Loader } from '../shared/Loader'
import SignedIcon from 'public/assets/vector-icons/signed-icon.svg'
import { UsedTraitChip } from '../shared/chips/UsedTraitChip'
import { SignedTraitChip } from '../shared/chips/SignedTraitChip'
import { CollectibleComic } from '@/models/asset'

type Props = {
  collectibleComic: CollectibleComic
  comicIssue: ComicIssue
}

export const OwnedAssetPreview: React.FC<Props> = ({ collectibleComic, comicIssue }) => {
  const [showLoader, toggleLoader] = useToggle()

  const handleRequestAutograph = async () => {
    toggleLoader()
    try {
      const { errorMessage } = await requestAutograph(collectibleComic.address)
      if (errorMessage) {
        toast({ description: errorMessage, variant: 'error' })
      } else {
        toast({ description: 'Autograph requested successfully, wait for creator to sign it ✍️', variant: 'success' })
      }
    } catch (e) {
      console.error(e)
      toast({ description: `Error requesting autograph for ${collectibleComic.name}`, variant: 'error' })
    }

    toggleLoader()
  }

  return (
    <Dialog>
      <DialogTrigger>
        <OwnedAssetCard asset={collectibleComic} />
      </DialogTrigger>
      <DialogContent
        className='bg-grey-500 rounded-3xl justify-start max-w-screen-md flex flex-col items-center gap-6 md:flex-row md:justify-center md:items-start md:gap-10 w-full p-4 md:p-10 max-h-full'
        aria-describedby={undefined}
      >
        <DialogTitle className='sr-only'>Owned asset preview dialog</DialogTitle>
        <div className='flex flex-col gap-6 md:gap-8 items-center max-sm:mt-6 h-full'>
          <Image
            alt={'asset ' + shortenAssetName(collectibleComic.name)}
            width={223}
            height={322}
            src={collectibleComic.image}
          />
          <div className='flex gap-4 max-h-12 sm:max-h-[52px] w-full'>
            {/* <Button className='w-full rounded-xl' size='normal' variant='outline'>
              <Text as='p' styleVariant='body-normal' fontWeight='medium'>
                List
              </Text>
            </Button> */}
            <Link
              className='bg-yellow-300 w-full flex justify-center items-center h-10 sm:h-[52px] p-1 sm:p-4 rounded-xl'
              href={RoutePath.ReadComicIssue(collectibleComic.comicIssueId)}
              prefetch={false}
            >
              <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-600'>
                Read
              </Text>
            </Link>
          </div>
        </div>
        <div className='flex flex-col gap-2 w-full max-w-fit'>
          <div className='flex items-center gap-4 flex-wrap'>
            <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
              {collectibleComic.comicTitle}
            </Text>
            <Circle className='size-2' fill='#D9D9D9' />
            <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
              {collectibleComic.comicIssueTitle}
            </Text>
            <Circle className='size-2' fill='#D9D9D9' />
            <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
              {shortenAssetName(collectibleComic.name)}
            </Text>
          </div>
          <div className='flex flex-col gap-3'>
            <Text as='h3' styleVariant='primary-heading' className='line-clamp-1 text-ellipsis'>
              {collectibleComic.comicIssueTitle}
            </Text>
            <GenreTags className='bg-grey-400' genres={comicIssue?.genres ?? []} />
            <ExpandableText className='max-w-[440px] lg:max-w-[486px]' text={comicIssue.description} />
            <div className='flex justify-between'>
              <div className='flex gap-4 items-center'>
                <div className='text-base font-medium leading-[22.4px]'>
                  <span>{comicIssue?.stats?.totalPagesCount}&nbsp;</span>
                  <span className='text-grey-100'>pages</span>
                </div>
                <AudienceWidget audience={comicIssue?.comic?.audienceType ?? AudienceType.Everyone} />
              </div>
              {comicIssue?.comicSlug ? (
                <Link
                  className='max-h-9 px-3 py-2 flex gap-2 justify-center items-center rounded-lg bg-grey-500'
                  href={RoutePath.Comic(comicIssue.comicSlug)}
                >
                  <ExternalLink className='text-grey-100' size={20} />
                  <span className='text-base font-medium leading-[22.4px] text-grey-100'>Explore series</span>
                </Link>
              ) : null}
            </div>
            <div className='flex items-center gap-2 flex-wrap'>
              <RoyaltyChip royalty={collectibleComic.royalties} />
              <RarityChip rarity={collectibleComic.rarity} />
              <UsedTraitChip used={collectibleComic.isUsed} />
              <SignedTraitChip signed={collectibleComic.isSigned} />
            </div>
            <Divider />
            <div className='flex justify-between'>
              <CreatorInfoLink creator={comicIssue?.creator} />
              {!collectibleComic.isSigned && (
                <Button variant='white' onClick={handleRequestAutograph} disabled={showLoader} className='min-w-44'>
                  {showLoader ? (
                    <Loader />
                  ) : (
                    <div className='flex sm:gap-2 xs:gap-1 items-center'>
                      <SignedIcon />
                      <Text as='p' styleVariant='body-small' fontWeight='semibold'>
                        Request signature
                      </Text>
                    </div>
                  )}
                </Button>
              )}
            </div>
            <Divider />
            <AddressContainer address={collectibleComic.ownerAddress} title='Owner' />
            <AddressContainer address={collectibleComic.address} title='Asset Address' />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

type AddressContainerProps = {
  address: string
  title: string
}

const AddressContainer: React.FC<AddressContainerProps> = ({ address, title }) => (
  <div className='flex px-4 py-1 items-center justify-between gap-4 bg-grey-600 rounded-xl max-h-14 h-full'>
    <div className='flex flex-col'>
      <Text as='p' styleVariant='body-large' fontWeight='bold'>
        {title}
      </Text>
      <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-200 line-clamp-1 text-ellipsis'>
        {shortenSolanaAddress({
          address,
          slice: 8,
        })}
      </Text>
    </div>
    <button
      className='flex justify-center items-center p-4 rounded-md bg-grey-300'
      onClick={() => {
        navigator.clipboard.writeText(address)
        toast({ description: 'Copied to clipboard' })
      }}
    >
      <Copy className='size-3 text-grey-100' />
    </button>
  </div>
)
