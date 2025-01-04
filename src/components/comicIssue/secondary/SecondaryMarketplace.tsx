'use client'

import { Text } from '../../ui'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { ListingSection } from './ListingSection'
import { StatsSection } from './StatsSection'
import { WalletAssetSection } from './UserAssetSection'

type Props = {
  accessToken: string
  collectionAddress: string | undefined
}

export const SecondaryMarketplace: React.FC<Props> = ({ collectionAddress, accessToken }) => {
  return (
    <div className='flex flex-col gap-4'>
      <Text as='h4' styleVariant='primary-heading'>
        Secondary Market
      </Text>
      <Tabs defaultValue='1'>
        <TabsList className='border-b-2 border-grey-300 w-full flex gap-4 justify-start'>
          <TabsTrigger value='1' className='tab-button text-white font-bold text-sm sm:text-base'>
            Listings
          </TabsTrigger>
          <TabsTrigger value='2' className='tab-button text-white font-bold text-sm sm:text-base'>
            Traits
          </TabsTrigger>
          <TabsTrigger value='3' className='tab-button text-white font-bold text-sm sm:text-base'>
            Your Items
          </TabsTrigger>
        </TabsList>
        <TabsContent value='1'>
          <ListingSection collectionAddress={collectionAddress} accessToken={accessToken} />
        </TabsContent>
        <TabsContent value='2'>
          <StatsSection collectionAddress={collectionAddress} />
        </TabsContent>
        <TabsContent value='3'>
          <WalletAssetSection collectionAddress={collectionAddress} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
