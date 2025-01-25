import SaleIcon from 'public/assets/vector-icons/common-rarity-icon.svg'
import RoyaltyIcon from 'public/assets/vector-icons/uncommon-rarity-icon.svg'
import { ProductType } from '@/enums/productType'

/** TODO: product type icons */
export const getProductTypeIcon = (source: ProductType) => {
  switch (source) {
    case ProductType.Comic:
      return <SaleIcon />
    case ProductType.DigitalArt:
      return <RoyaltyIcon />
    default:
      return <SaleIcon />
  }
}

export const getProductTypeColor = (source: ProductType) => {
  switch (source) {
    case ProductType.Comic:
      return 'bg-blue-100'
    case ProductType.DigitalArt:
      return 'bg-purple-100'
  }
}

export const getProductTypeTextColor = (source: ProductType) => {
  switch (source) {
    case ProductType.Comic:
      return 'text-blue-100'
    case ProductType.DigitalArt:
      return 'text-purple-100'
  }
}
