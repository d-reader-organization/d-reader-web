import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/Table'
import Image from 'next/image'
import { useToggle } from '@/hooks'
import { useFetchCollectibleComicListings } from '@/api/auctionHouse/queries'
import { ShowMoreButton } from '../../discover/ShowMoreButton'
import { ListedItem } from '@/models/auctionHouse/listedItem'
import { useFetchSupportedTokens } from '@/api/settings/queries/useFetchSupportedTokens'
import { SplToken } from '@/models/settings/splToken'
import { getTokenPrice, shortenAssetName, shortenSolanaAddress } from '@/utils/helpers'
import { format } from 'date-fns'
import { fetchDirectBuyTransaction } from '@/app/lib/api/transaction/queries'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { versionedTransactionFromBs64 } from '@/utils/transactions'
import { LoaderIcon } from '../../icons/theme/LoaderIcon'
import { ConnectButton } from '../../shared/buttons/ConnectButton'
import Link from 'next/link'
import { ExternalLinkIcon } from '@/components/icons/theme/ExternalLinkIcon'
import { InstantBuyParams } from '@/models/transaction/instantBuy'
import { Button, Text, toast } from '../../ui'
import { PLACEHOLDER_AVATAR, SOLANA_EXPLORER_BASE_LINK } from '@/constants/general'
import { useState } from 'react'
import { RarityChip } from '@/components/shared/chips/RarityChip'
import { SignedTraitChip } from '@/components/shared/chips/SignedTraitChip'
import { UsedTraitChip } from '@/components/shared/chips/UsedTraitChip'
import { COMIC_ISSUE_COVER_SIZE } from '@/constants/imageSizes'
import { CollectibleComic } from '@/models/asset'
import { useAuthStore } from '@/providers/AuthStoreProvider'
import { CheckCircleIcon } from '@/components/icons/theme/CheckCircleIcon'

export const ListingSection: React.FC<{ collectionAddress: string | undefined }> = ({ collectionAddress }) => {
  const { data: splTokens } = useFetchSupportedTokens()
  const [isLoading, toggleLoading] = useToggle()
  const { publicKey, signAllTransactions } = useWallet()
  const { connection } = useConnection()
  const [selectedListings, onSelectListing] = useState<ListedItem[]>([])

  const accessToken = useAuthStore((state) => state.accessToken)

  const handleSelectListing = (listing: ListedItem) => {
    onSelectListing((prev) => {
      if (prev.includes(listing)) {
        return prev.filter((item) => item !== listing)
      } else {
        return [...prev, listing]
      }
    })
  }
  const {
    flatData: listings,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetched,
  } = useFetchCollectibleComicListings({
    params: { skip: 0, take: 10, collectionAddress: collectionAddress || '', isSold: undefined },
  })

  const handleBuy = async () => {
    toggleLoading()
    if (!publicKey) {
      toast({ description: 'Connect you wallet to purchase', variant: 'error' })
      toggleLoading()
      return
    }
    const instantBuyParamsArray: InstantBuyParams[] = selectedListings.map((listing) => ({
      assetAddress: listing.collectibleComic.address,
      buyerAddress: publicKey.toString(),
    }))

    const { data: transactions, error } = await fetchDirectBuyTransaction({
      accessToken,
      params: {
        instantBuyParamsArray: JSON.stringify(instantBuyParamsArray), /// JSON stringify to pass array as params in get request
      },
    })

    if (error) {
      toast({ description: error, variant: 'error' })
      toggleLoading()
      return
    }

    const buyTransactions = transactions.map(versionedTransactionFromBs64)
    if (!buyTransactions.length) return

    if (!signAllTransactions) {
      toast({ description: 'Wallet does not support signing multiple transactions', variant: 'error' })
      return
    }

    try {
      const signedTransactions = await signAllTransactions(buyTransactions)
      for await (const signedTransaction of signedTransactions) {
        await connection.sendTransaction(signedTransaction, { skipPreflight: true })
      }

      toast({ description: 'Purchase compelete', variant: 'success' })
    } catch (_) {
      toast({ description: `Error while sending buy transaction, try again!`, variant: 'error' })
    } finally {
      toggleLoading()
    }
  }

  if (isFetching && !isFetched) {
    return (
      <div className='flex w-full'>
        <LoaderIcon className='size-5 m-auto' />
      </div>
    )
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className='border-grey-300'>
            <TableHead className='w-[100px]'>
              <Text as='p' styleVariant='body-normal' fontWeight='bold'>
                Comic
              </Text>
            </TableHead>
            <TableHead>
              <Text as='p' styleVariant='body-normal' fontWeight='bold'>
                Rarity
              </Text>
            </TableHead>
            <TableHead>
              <Text as='p' styleVariant='body-normal' fontWeight='bold'>
                Buy Now
              </Text>
            </TableHead>
            <TableHead>
              <Text as='p' styleVariant='body-normal' fontWeight='bold'>
                Owner
              </Text>
            </TableHead>
            <TableHead>
              <Text as='p' styleVariant='body-normal' fontWeight='bold' className='text-right'>
                Actions
              </Text>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {splTokens
            ? listings.map((listing) => (
                <ListedAssetRow
                  key={listing.id}
                  listing={listing}
                  splTokens={splTokens}
                  onSelectListing={handleSelectListing}
                  isSelected={selectedListings.includes(listing)}
                />
              ))
            : null}
        </TableBody>
      </Table>
      <div className='flex flex-col items-center pt-2 sm:pt-3'>
        <ShowMoreButton
          onClick={fetchNextPage}
          isFetching={isFetching}
          itemsFound={listings.length}
          hasNextPage={hasNextPage}
        />
      </div>
      {!publicKey ? (
        <ConnectButton size='lg' variant='primary' className='fixed bottom-1 w-[810px]'>
          Purchase
        </ConnectButton>
      ) : (
        <Button
          Icon={isLoading ? LoaderIcon : undefined}
          onClick={handleBuy}
          size='lg'
          variant='primary'
          className='fixed bottom-1 w-[810px]'
        >
          Purchase
        </Button>
      )}
    </div>
  )
}

const ListedAssetRow: React.FC<{
  listing: ListedItem
  splTokens: SplToken[]
  onSelectListing: (listedItem: ListedItem) => void
  isSelected: boolean
}> = ({ listing, splTokens, onSelectListing, isSelected }) => {
  const collectibleComic = listing.collectibleComic
  const splToken = splTokens.find((token) => token.address == listing.splTokenAddress)

  return (
    <TableRow
      onClick={() => onSelectListing(listing)}
      className={` border-grey-300 hover:brightness-125 hover:bg-grey-700 ${isSelected ? 'brightness-125 bg-grey-700' : ''}`}
    >
      <TableCell>
        <CollectibleComicImageCell collectibleComic={collectibleComic} />
      </TableCell>
      <TableCell>
        <div className='flex flex-wrap gap-1 '>
          <UsedTraitChip used={collectibleComic.isUsed} />
          <SignedTraitChip signed={collectibleComic.isSigned} />
          <RarityChip rarity={collectibleComic.rarity} />
        </div>
      </TableCell>
      <TableCell>
        <div className='flex gap-1 items-center'>
          <Text as='p' styleVariant='body-normal' fontWeight='medium'>
            {getTokenPrice(listing.price, splToken?.decimals || 9)}
          </Text>
          {splToken ? <Image src={splToken?.icon} alt='SOL' width={16} height={16} className='size-4' /> : null}
        </div>
      </TableCell>
      <TableCell>
        <OwnerDetailsCell sellerAddress={listing.sellerAddress} />
      </TableCell>
      <TableCell className='flex py-1 justify-end'>
        {isSelected ? (
          <CheckCircleIcon className='size-5 text-green-500' />
        ) : (
          <Text as='p' styleVariant='body-small' fontWeight='medium'>
            {format(listing.createdAt, 'dd MMM yyyy')}
          </Text>
        )}
      </TableCell>
    </TableRow>
  )
}

const OwnerDetailsCell: React.FC<{ sellerAddress: string }> = ({ sellerAddress }) => {
  return (
    <div className='flex gap-2 items-center'>
      <Image
        alt='avatar'
        src={PLACEHOLDER_AVATAR}
        width={32}
        height={32}
        className='size-7 object-cover rounded-full border border-black'
      />
      <Link
        className='flex gap-1 items-center'
        href={`${SOLANA_EXPLORER_BASE_LINK}/address/${sellerAddress}`}
        target='_blank'
      >
        <Text as='p' styleVariant='body-small' fontWeight='semibold'>
          {shortenSolanaAddress({ address: sellerAddress })}
        </Text>
        <ExternalLinkIcon className='text-grey-100 size-4' />
      </Link>
    </div>
  )
}

const CollectibleComicImageCell: React.FC<{ collectibleComic: CollectibleComic }> = ({ collectibleComic }) => {
  return (
    <div className='flex gap-1 items-center'>
      <Image
        src={collectibleComic.image}
        {...COMIC_ISSUE_COVER_SIZE}
        alt={collectibleComic.rarity + ' cover'}
        sizes='(max-width: 30px) 100vw'
        className='rounded-sm max-w-7 object-cover'
      />
      <Text as='p' styleVariant='body-normal' fontWeight='bold'>
        {shortenAssetName(collectibleComic.name)}
      </Text>
    </div>
  )
}
