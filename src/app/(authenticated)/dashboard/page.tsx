import CreatorMetrics from '@/components/chart/CreatorMetrics'
import { CreatorDashboardLayout } from '@/components/layout/CreatorDashboardLayout'
import ProductsTable from '@/components/table/ProductsTable'
import SignatureRequestsTable from '@/components/table/SignatureRequestsTable'
import TransactionHistoryTable from '@/components/table/TransactionHistoryTable'
import React from 'react'

export default function DashboardPage() {
  return (
    <CreatorDashboardLayout>
      <CreatorMetrics />
      <div className='my-6' />
      <ProductsTable title='My products' />
      <div className='my-6' />
      <SignatureRequestsTable title='Signature requests' />
      <div className='my-6' />
      <TransactionHistoryTable title='Transactions' />
    </CreatorDashboardLayout>
  )
}
