import React from 'react'
import Image from 'next/image'
import { RarityChip } from '@/components/shared/chips/RarityChip'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/Dialog'
import { OwnedCollectibleComicCard } from './OwnedCollectibleComicCard'
import { toast } from '../ui/toast'
import { ExternalLinkIcon } from '@/components/icons/theme/ExternalLinkIcon'
import { Text } from '../ui/Text'
import { shortenAssetName, shortenSolanaAddress } from '@/utils/helpers'
import { GenreTags } from '../shared/GenresList'
import { ExpandableText } from '../shared/ExpandableText'
import { Divider } from '../shared/Divider'
import { AudienceWidget } from '../shared/AudienceWidget'
import { AudienceType } from '@/enums/audienceType'
import { RoutePath } from '@/enums/routePath'
import { RoyaltyChip } from '../shared/chips/Royalty'
import { CreatorInfoLink } from '../creator/InfoLink'
import { ComicIssue } from '@/models/comicIssue'
import { Button } from '../ui'
import { useToggle } from '@/hooks'
import { requestAutograph } from '@/app/lib/api/asset/mutations'
import { LoaderIcon } from '../icons/theme/LoaderIcon'
import { UsedTraitChip } from '../shared/chips/UsedTraitChip'
import { SignedTraitChip } from '../shared/chips/SignedTraitChip'
import { CollectibleComic } from '@/models/asset'
import { CopyButton } from '../shared/CopyButton'
import { CircleIcon } from '../icons/theme/CircleIcon'
import { PencilIcon } from '../icons/theme/PencilIcon'
import { ButtonLink } from '../ui/ButtonLink'
import { ASPECT_RATIO } from '@/constants/general'

type Props = {
  collectibleComic: CollectibleComic
  comicIssue: ComicIssue
}

// TODO: this should be renamed to a Dialog component
export const OwnedCollectibleComicPreview: React.FC<Props> = ({ collectibleComic, comicIssue }) => {
  const [isLoading, toggleLoading] = useToggle()

  const handleRequestAutograph = async () => {
    toggleLoading()
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

    toggleLoading()
  }

  return (
    <Dialog>
      <DialogTrigger>
        <OwnedCollectibleComicCard collectibleComic={collectibleComic} />
      </DialogTrigger>
      <DialogContent
        className='rounded-3xl justify-start max-w-screen-md flex flex-col items-center gap-6 md:flex-row md:justify-center md:items-start md:gap-8 w-full p-4 md:p-10 max-h-full'
        aria-describedby={undefined}
      >
        <DialogTitle className='sr-only'>Owned asset preview dialog</DialogTitle>
        <div className='flex flex-col gap-4 items-center h-full'>
          <Image
            alt={'asset ' + shortenAssetName(collectibleComic.name)}
            {...ASPECT_RATIO.COMIC_ISSUE_COVER}
            src={collectibleComic.image}
          />
          <div className='flex gap-2 w-full'>
            {/* <Button className='w-full' variant='white'>
              List
            </Button> */}
            <ButtonLink
              variant='primary'
              className='w-full'
              href={RoutePath.ReadComicIssue(collectibleComic.comicIssueId)}
            >
              Read
            </ButtonLink>
          </div>
        </div>

        <div className='flex flex-col gap-2 w-full max-w-fit'>
          <div className='flex items-center gap-4 flex-wrap'>
            <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
              {collectibleComic.comicTitle}
            </Text>
            <CircleIcon className='size-2' solid />
            <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
              {shortenAssetName(collectibleComic.name)}
            </Text>
          </div>
          <div className='flex flex-col gap-4'>
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
                <ButtonLink
                  href={RoutePath.Comic(comicIssue.comicSlug)}
                  prefetch={false}
                  Icon={ExternalLinkIcon}
                  solid={false}
                  variant='outline'
                >
                  Explore series
                </ButtonLink>
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
                <Button
                  variant='white'
                  onClick={handleRequestAutograph}
                  Icon={isLoading ? LoaderIcon : PencilIcon}
                  disabled={isLoading}
                >
                  Request signature
                </Button>
              )}
            </div>
            <Divider />
            <div className='flex flex-col gap-1'>
              <AddressContainer address={collectibleComic.ownerAddress} title='Owner' />
              <AddressContainer address={collectibleComic.address} title='Asset Address' />
            </div>
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
  <div className='flex px-4 py-2 items-center justify-between gap-2 bg-grey-600 rounded-xl max-h-14 h-full'>
    <div className='flex items-center gap-4'>
      <Text as='p' styleVariant='body-large' fontWeight='bold'>
        {title}
      </Text>
      <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-200 line-clamp-1 text-ellipsis'>
        {shortenSolanaAddress({ address, slice: 6 })}
      </Text>
    </div>
    <CopyButton variant='inline' clipboard={address} />
  </div>
)
