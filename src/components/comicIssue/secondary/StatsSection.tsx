import { findCollectibleComicRarityStats } from '@/app/lib/api/asset/queries'
import { Divider } from '@/components/shared/Divider'
import { Loader } from '@/components/shared/Loader'
import { Text } from '@/components/ui'
import { CollectibleComicRarityStats } from '@/models/asset/collectibleComicRarityStats'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export const StatsSection: React.FC<{ collectionAddress: string | undefined }> = ({ collectionAddress }) => {
  const [statsList, setStatsList] = useState<CollectibleComicRarityStats[]>()

  useEffect(() => {
    if (!collectionAddress) return

    const fetchStats = async () => {
      const stats = await findCollectibleComicRarityStats(collectionAddress)
      setStatsList(stats)
    }

    fetchStats()
  }, [collectionAddress])

  return (
    <div className='flex flex-col gap-4'>
      {collectionAddress ? (
        statsList?.map((stats, index) => <CollectibleComicStats key={index} stats={stats} />)
      ) : (
        <Loader className='self-center' />
      )}
    </div>
  )
}

export const CollectibleComicStats: React.FC<{ stats: CollectibleComicRarityStats }> = ({ stats }) => {
  return (
    <div className='flex flex-col'>
      <Image
        src={stats.image}
        width='0'
        height='0'
        alt={stats.rarity + ' cover'}
        sizes='(max-width: 128px) 100vw'
        className='rounded-sm max-w-32 object-cover'
      />
      <div>
        <Text as='p' styleVariant='body-normal' fontWeight='semibold'>
          Rarity: {stats.rarity}
        </Text>
        <Text as='p' styleVariant='body-normal' fontWeight='semibold'>
          Used: {stats.used}
        </Text>
        <Text as='p' styleVariant='body-normal' fontWeight='semibold'>
          Signed: {stats.signed}
        </Text>
      </div>
      <Divider />
    </div>
  )
}
