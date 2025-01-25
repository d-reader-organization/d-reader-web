import { useFetchAssets } from '@/api/asset/queries'
import { fetchListAssetTransaction } from '@/app/lib/api/transaction/queries'
import { OwnedAssetCard } from '@/components/digital-asset/OwnedAssetCard'
import { ShowMoreButton } from '@/components/discover/ShowMoreButton'
import { Loader } from '@/components/shared/Loader'
import { toast } from '@/components/ui'
import { SOL_ADDRESS } from '@/constants/general'
import { versionedTransactionFromBs64 } from '@/utils/transactions'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Fragment } from 'react'

type Props = {
  collectionAddress: string | undefined
  accessToken: string
}

export const WalletAssetSection: React.FC<Props> = ({ collectionAddress, accessToken }) => {
  const { publicKey, signTransaction } = useWallet()
  const { connection } = useConnection()

  const enabled = !!(collectionAddress && publicKey)
  const {
    flatData: assets,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetched,
  } = useFetchAssets({
    params: { skip: 0, take: 10, collectionAddress: collectionAddress || '', ownerAddress: publicKey?.toString() },
    enabled,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleListingAsset = async (assetAddress: string) => {
    if (!publicKey) {
      toast({ description: 'Connect you wallet to purchase', variant: 'error' })
      return
    }

    const { data: listTransaction, error } = await fetchListAssetTransaction({
      params: { assetAddress, splTokenAddress: SOL_ADDRESS, price: 2000 },
      accessToken,
    })
    if (error) {
      toast({ description: error, variant: 'error' })
      return
    }

    if (!listTransaction) return

    if (!signTransaction) {
      toast({ description: 'Wallet does not support signing transaction', variant: 'error' })
      return
    }

    const transaction = versionedTransactionFromBs64(listTransaction)
    try {
      const signedTransaction = await signTransaction(transaction)
      await connection.sendTransaction(signedTransaction, { skipPreflight: true })

      toast({ description: 'Item listed succesfully', variant: 'success' })
    } catch (_) {
      toast({ description: 'Error while sending buy transaction, try again!', variant: 'error' })
    }
  }

  if (isFetching && !isFetched) {
    return (
      <div className='flex w-full'>
        <Loader className='m-auto' />
      </div>
    )
  }

  return (
    <Fragment>
      <div className='grid grid-cols-3 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-4 pt-1 sm:pt-2'>
        {assets.map((asset, index) => (
          <OwnedAssetCard key={index} asset={asset} />
        ))}
      </div>
      <div className='flex flex-col items-center pt-2 sm:pt-3'>
        <ShowMoreButton
          onClick={fetchNextPage}
          isFetching={isFetching}
          itemsFound={assets.length}
          hasNextPage={hasNextPage}
        />
      </div>
    </Fragment>
  )
}
