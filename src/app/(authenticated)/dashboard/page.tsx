import { CreatorDashboardLayout } from '@/components/layout/CreatorDashboardLayout'
import SignatureRequestsTable from '@/components/table/SignatureRequestsTable'
import TransactionHistoryTable from '@/components/table/TransactionHistoryTable'
import React from 'react'

export function DashboardPage() {
  return (
    <CreatorDashboardLayout>
      <SignatureRequestsTable />
      <div className='my-6' />
      <TransactionHistoryTable />
    </CreatorDashboardLayout>
  )
}

export default DashboardPage
