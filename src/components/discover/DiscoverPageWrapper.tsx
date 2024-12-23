import React from 'react'
import { Tabs } from '@/components/shared/Tabs'
import { DiscoverQueryBar } from './DiscoverQueryBar'
import { DISCOVER_PAGE_TABS } from '@/constants/tabs'
import { DiscoverQueryStoreProvider } from '@/providers/DiscoverQueryStoreProvider'
import { Text } from '../ui'
import { BaseLayout } from '../layout/BaseLayout'

type Props = React.PropsWithChildren & { mainClassName?: string }

export const DiscoverPageWrapper: React.FC<Props> = async ({ children }) => (
  <BaseLayout>
    <div className='flex flex-col max-w-screen-xl w-full gap-3'>
      <Text
        as='h1'
        fontWeight='semibold'
        styleVariant='primary-heading'
        className='text-white max-sm:text-20 max-sm:tracking-0048'
      >
        Discover
      </Text>
      <Tabs tabs={DISCOVER_PAGE_TABS} />
      <DiscoverQueryStoreProvider>
        <DiscoverQueryBar />
        {children}
      </DiscoverQueryStoreProvider>
    </div>
  </BaseLayout>
)
