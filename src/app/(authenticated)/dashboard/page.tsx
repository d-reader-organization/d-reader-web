import { fetchMe } from '@/app/lib/api/user/queries'
import CreatorMetrics from '@/components/chart/CreatorMetrics'
import { CreatorDashboardLayout } from '@/components/layout/CreatorDashboardLayout'
import ProductsTable from '@/components/table/ProductsTable'
import SignatureRequestsTable from '@/components/table/SignatureRequestsTable'
import TransactionHistoryTable from '@/components/table/TransactionHistoryTable'
import React from 'react'

export const DashboardPage: React.FC = async () => {
  const me = await fetchMe()

  if (!me) return null

  return (
    <CreatorDashboardLayout title={`Welcome back ${me.displayName}!`}>
      <CreatorMetrics />
      <ProductsTable title='My products' />
      <SignatureRequestsTable title='Signature requests' />
      <TransactionHistoryTable title='Transactions' />
    </CreatorDashboardLayout>
  )
}

export default DashboardPage
