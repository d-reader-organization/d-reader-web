import { fetchMe } from '@/app/lib/api/user/queries'
import CreatorMetrics from '@/components/chart/CreatorMetrics'
import { CreatorDashboardLayout } from '@/components/layout/CreatorDashboardLayout'
import SignatureRequestsTable from '@/components/table/SignatureRequestsTable'
import { RoutePath } from '@/enums/routePath'
import React from 'react'

export default async function DashboardPage() {
  const me = await fetchMe()

  if (!me) return null

  return (
    <CreatorDashboardLayout title={`Welcome back ${me.displayName}!`} activePath={RoutePath.Dashboard}>
      <CreatorMetrics />
      <SignatureRequestsTable title='Signature requests' />
    </CreatorDashboardLayout>
  )
}
