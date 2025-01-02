'use client'

import { Text, toast } from '../ui'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table'
import { ComicRarity } from '@/enums/comicRarity'
import { getRarityIcon } from '@/utils/rarity'
import MintIcon from 'public/assets/vector-icons/mint-icon.svg'
import SignedIcon from 'public/assets/vector-icons/signed-icon.svg'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import ANON_BUNNY from 'public/assets/images/anon-bunny.png'
import { useToggle } from '@/hooks'
import { useFetchCollectibleComicListings } from '@/api/auctionHouse/queries'
import { ShowMoreButton } from '../discover/ShowMoreButton'
import { ListedItem } from '@/models/auctionHouse/listedItem'
import { CollectibleComic } from '@/models/comic/collectibleComic'
import { useFetchSupportedTokens } from '@/api/settings/queries/useFetchSupportedTokens'
import { SplToken } from '@/models/settings/splToken'
import { getTokenPrice, shortenSolanaAddress } from '@/utils/helpers'
import { format } from 'date-fns'
import { fetchDirectBuyTransaction } from '@/app/lib/api/transaction/queries'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { versionedTransactionFromBs64 } from '@/utils/transactions'
import { Loader } from '../shared/Loader'
import { ConnectButton } from '../shared/buttons/ConnectButton'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { InstantBuyParams } from '@/models/transaction/instantBuy'

type Props = {
  accessToken: string
  collectionAddress: string | undefined
}

const traitLabelStyle = `bg-transparent rounded-lg border border-solid text-xs flex items-center gap-0.5 [&>svg]:size-3 p-1`

export const SecondaryMarketplaceSection: React.FC<Props> = ({ collectionAddress, accessToken }) => {
  const { data: splTokens } = useFetchSupportedTokens()

  const {
    flatData: listings,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetched,
  } = useFetchCollectibleComicListings({
    params: { skip: 0, take: 10, collectionAddress: collectionAddress || '', isSold: undefined },
  })

  if (isFetching && !isFetched) {
    return <Loader className='mx-auto pt-6 sm:pt-8' />
  }

  return (
    <div className='flex flex-col gap-4'>
      <Text as='h4' styleVariant='primary-heading'>
        Secondary Market
      </Text>
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
                <ListedAssetRow key={listing.id} listing={listing} splTokens={splTokens} accessToken={accessToken} />
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
    </div>
  )
}

const ListedAssetRow: React.FC<{ listing: ListedItem; splTokens: SplToken[]; accessToken: string }> = ({
  listing,
  splTokens,
  accessToken,
}) => {
  const [showBuyButton, toggleShowBuyButton] = useToggle()
  const [showLoader, toggleLoader] = useToggle()

  const { publicKey, signAllTransactions } = useWallet()
  const { connection } = useConnection()

  const collectibleComic = listing.collectibleComic
  const splToken = splTokens.find((token) => token.address == listing.splTokenAddress)

  const handleBuy = async () => {
    toggleLoader()
    if (!publicKey) {
      toast({ description: 'Connect you wallet to purchase', variant: 'error' })
      toggleLoader()
      return
    }
    const instantBuyParams: InstantBuyParams = {
      assetAddress: collectibleComic.address,
      buyerAddress: publicKey.toString(),
    }
    const { data: transactions, error } = await fetchDirectBuyTransaction({
      accessToken,
      params: {
        instantBuyParamsArray: [JSON.stringify(instantBuyParams)],
      },
    })

    if (error) {
      toast({ description: error, variant: 'error' })
      toggleLoader()
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
    } catch (e) {
      toast({ description: 'Error while sending buy transaction, try again!', variant: 'error' })
    } finally {
      toggleLoader()
    }
  }

  return (
    <TableRow
      onMouseEnter={toggleShowBuyButton}
      onMouseLeave={toggleShowBuyButton}
      className={` border-grey-300 ${showBuyButton || showLoader ? 'brightness-125 bg-grey-700' : ''}`}
    >
      <TableCell>
        <CollectibleComicImageCell collectibleComic={collectibleComic} />
      </TableCell>
      <TableCell>
        <CollectibleComicMetadataCell
          isSigned={collectibleComic.isSigned}
          isUsed={collectibleComic.isUsed}
          rarity={collectibleComic.rarity}
        />
      </TableCell>
      <TableCell>
        <div className='flex gap-1 items-center'>
          <Text as='p' styleVariant='body-normal' fontWeight='medium'>
            {getTokenPrice(listing.price, splToken?.decimals || 9)}
          </Text>
          {splToken ? <Image src={splToken?.icon} alt='SOL' width={14} height={14} className='size-4' /> : null}
        </div>
      </TableCell>
      <TableCell>
        <OwnerDetailsCell sellerAddress={listing.seller.address} />
      </TableCell>
      <TableCell className='py-1 text-right w-36'>
        {showBuyButton || showLoader ? (
          <ConnectButton size='sm' variant='secondary' onClick={handleBuy}>
            {showLoader ? (
              <Loader className='scale-75' />
            ) : (
              <Text as='p' styleVariant='body-small' fontWeight='medium'>
                Buy
              </Text>
            )}
          </ConnectButton>
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
        src={ANON_BUNNY}
        width={32}
        height={32}
        className='size-7 object-cover rounded-full border border-black'
      />
      <Link
        className='flex gap-1 items-center'
        href={`https://explorer.solana.com/address/${sellerAddress}`}
        target='_blank'
      >
        <Text as='p' styleVariant='body-small' fontWeight='semibold'>
          {shortenSolanaAddress({ address: sellerAddress })}
        </Text>
        <ExternalLink className='text-grey-100' size={15} />
      </Link>
    </div>
  )
}

const CollectibleComicImageCell: React.FC<{ collectibleComic: CollectibleComic }> = ({ collectibleComic }) => {
  return (
    <div className='flex gap-1 items-center'>
      <Image
        alt='comic'
        src={collectibleComic.image}
        width={32}
        height={32}
        className='size-7 object-cover rounded-full border border-black'
      />
      <Text as='p' styleVariant='body-normal' fontWeight='bold'>
        #{collectibleComic.name.split('#')[1]}
      </Text>
    </div>
  )
}

type CollectibleComicMetadataProps = {
  isUsed: boolean
  isSigned: boolean
  rarity: ComicRarity
}

const CollectibleComicMetadataCell: React.FC<CollectibleComicMetadataProps> = ({ isUsed, isSigned, rarity }) => {
  return (
    <div className='flex flex-wrap gap-2 '>
      {!isUsed && (
        <div className={cn(traitLabelStyle, 'border-green-500')}>
          <MintIcon className='text-green-500' />
        </div>
      )}
      {isSigned && (
        <div className={cn(traitLabelStyle, 'border-orange-500')}>
          <SignedIcon className='text-orange-500' />
        </div>
      )}
      {rarity && (
        <div
          className={cn(
            traitLabelStyle,
            rarity === ComicRarity.Common && 'border-white',
            rarity === ComicRarity.Uncommon && 'border-yellow-50',
            rarity === ComicRarity.Rare && 'border-blue-500',
            rarity === ComicRarity.Epic && 'border-pink-500',
            rarity === ComicRarity.Legendary && 'border-purple-500'
          )}
        >
          {getRarityIcon(rarity)} {rarity}
        </div>
      )}
    </div>
  )
}
