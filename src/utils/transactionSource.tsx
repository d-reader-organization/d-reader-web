import SaleIcon from 'public/assets/vector-icons/sale-icon.svg'
import RoyaltyIcon from 'public/assets/vector-icons/royalty-icon.svg'
import { TransactionSource } from '@/enums/transactionSource'

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
