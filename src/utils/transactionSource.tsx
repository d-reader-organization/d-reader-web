import { TransactionSource } from '@/enums/transactionSource'
import { MoneyPouchIcon } from '@/components/icons/theme/MoneyPouchIcon'
import { RoyaltyIcon } from '@/components/icons/theme/RoyaltyIcon'

export const getTransactionSourceIcon = (source: TransactionSource) => {
  switch (source) {
    case TransactionSource.Sale:
      return <MoneyPouchIcon />
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
