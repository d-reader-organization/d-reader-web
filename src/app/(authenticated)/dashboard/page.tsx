import { CreatorDashboardLayout } from '@/components/layout/CreatorDashboardLayout'
import TransactionHistoryTable from '@/components/table/TransactionHistoryTable'
import React from 'react'

export function DashboardPage() {
  return (
    <CreatorDashboardLayout>
      <TransactionHistoryTable />
    </CreatorDashboardLayout>
  )
}

export default DashboardPage
