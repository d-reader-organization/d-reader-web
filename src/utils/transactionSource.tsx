import { TransactionSource } from '@/enums/transactionSource'
import { SaleIcon } from '@/components/icons/SaleIcon'
import { RoyaltyIcon } from '@/components/icons/RoyaltyIcon'

export const getTransactionSourceIcon = (source: TransactionSource) => {
  switch (source) {
    case TransactionSource.Sale:
      return <SaleIcon />
    case TransactionSource.Royalty:
      return <RoyaltyIcon />
  }
}

export const getTransactionSourceColor = (source: TransactionSource) => {
  switch (source) {
    case TransactionSource.Sale:
      return 'bg-green-accent'
    case TransactionSource.Royalty:
      return 'bg-yellow-300'
  }
}

export const getTransactionSourceTextColor = (source: TransactionSource) => {
  switch (source) {
    case TransactionSource.Sale:
      return 'text-green-accent'
    case TransactionSource.Royalty:
      return 'text-yellow-300'
  }
}
