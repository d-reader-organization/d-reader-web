import React from 'react'
import { DiscoverPageWrapper } from '@/components/discover/DiscoverPageWrapper'
import { CreatorGrid } from '@/components/discover/CreatorGrid'
import { getAccessToken } from '@/app/lib/utils/auth'

export default async function DiscoverCreatorsPage() {
  const accessToken = await getAccessToken()
  return (
    <DiscoverPageWrapper>
      <CreatorGrid accessToken={accessToken} />
    </DiscoverPageWrapper>
  )
}
