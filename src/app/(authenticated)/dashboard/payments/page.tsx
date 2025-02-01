import { fetchMe } from '@/app/lib/api/user/queries'
import { CreatorDashboardLayout } from '@/components/layout/CreatorDashboardLayout'
import TransactionHistoryTable from '@/components/table/TransactionHistoryTable'
import { RoutePath } from '@/enums/routePath'
import React from 'react'

export const PaymentsPage: React.FC = async () => {
  const me = await fetchMe()

  if (!me) return null

  return (
    <CreatorDashboardLayout title='Payouts' activePath={RoutePath.DashboardPayments}>
      <TransactionHistoryTable title='Transactions' />
    </CreatorDashboardLayout>
  )
}

export default PaymentsPage
