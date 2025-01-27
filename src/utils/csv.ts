import { TransactionHistoryItem } from '@/models/transaction/transactionHistory'

export const downloadTransactionsReportCSV = (transactions: TransactionHistoryItem[]) => {
  const headers = ['Transaction Link', 'Date', 'Customer', 'Wallet Address', 'Source', 'Product', 'Amount', 'Currency']

  const rows = transactions.map((tx) => [
    tx.id,
    new Date(tx.confirmedAt).toLocaleString(),
    tx.buyer?.username,
    tx.buyerAddress,
    tx.source,
    tx.product,
    tx.amount,
    'SOL',
  ])

  // Combine headers and rows
  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
