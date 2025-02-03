import { fetchMe } from '@/app/lib/api/user/queries'
import { CreatorDashboardLayout } from '@/components/layout/CreatorDashboardLayout'
import ProductsTable from '@/components/table/ProductsTable'
import SignatureRequestsTable from '@/components/table/SignatureRequestsTable'
import { RoutePath } from '@/enums/routePath'
import React from 'react'

export default async function ProductsPage() {
  const me = await fetchMe()

  if (!me) return null

  return (
    <CreatorDashboardLayout title='Products' activePath={RoutePath.DashboardProducts}>
      <ProductsTable title='My comics & art' />
      <SignatureRequestsTable title='Signature requests' />
    </CreatorDashboardLayout>
  )
}
