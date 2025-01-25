import { CreatorDashboardLayout } from '@/components/layout/CreatorDashboardLayout'
import ProductsTable from '@/components/table/ProductsTable'
import SignatureRequestsTable from '@/components/table/SignatureRequestsTable'
import TransactionHistoryTable from '@/components/table/TransactionHistoryTable'
import React from 'react'

export function DashboardPage() {
  return (
    <CreatorDashboardLayout>
      <ProductsTable />
      <div className='my-6' />
      <SignatureRequestsTable />
      <div className='my-6' />
      <TransactionHistoryTable />
    </CreatorDashboardLayout>
  )
}

export default DashboardPage
