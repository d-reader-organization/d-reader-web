import React from 'react'
import { DiscoverPageWrapper } from '@/components/discover/DiscoverPageWrapper'
import { CreatorGrid } from '@/components/discover/CreatorGrid'

export default async function DiscoverCreatorsPage() {
  return (
    <DiscoverPageWrapper>
      <CreatorGrid />
    </DiscoverPageWrapper>
  )
}
