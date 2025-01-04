import { useFetchAssets } from '@/api/asset/queries'
import { OwnedAssetCard } from '@/components/digital-asset/OwnedAssetCard'
import { ShowMoreButton } from '@/components/discover/ShowMoreButton'
import { Loader } from '@/components/shared/Loader'
import { useWallet } from '@solana/wallet-adapter-react'
import { Fragment } from 'react'

type Props = {
  collectionAddress: string | undefined
}

export const WalletAssetSection: React.FC<Props> = ({ collectionAddress }) => {
  const { publicKey } = useWallet()

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
