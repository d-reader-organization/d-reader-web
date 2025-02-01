import { fetchMe } from '@/app/lib/api/user/queries'
import { CreatorDashboardLayout } from '@/components/layout/CreatorDashboardLayout'
import ProductsTable from '@/components/table/ProductsTable'
import SignatureRequestsTable from '@/components/table/SignatureRequestsTable'
import { RoutePath } from '@/enums/routePath'
import React from 'react'

export const ProductsPage: React.FC = async () => {
  const me = await fetchMe()

  if (!me) return null

  return (
    <CreatorDashboardLayout title='Products' activePath={RoutePath.DashboardProducts}>
      <ProductsTable title='' />
      <SignatureRequestsTable title='Signature requests' />
    </CreatorDashboardLayout>
  )
}

export default ProductsPage
