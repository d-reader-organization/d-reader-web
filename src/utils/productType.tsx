import ComicProductIcon from 'public/assets/vector-icons/comic-product-icon.svg'
import DigitalArtIcon from 'public/assets/vector-icons/digital-art-icon.svg'
import { ProductType } from '@/enums/productType'

export const getProductTypeIcon = (source: ProductType) => {
  switch (source) {
    case ProductType.Comic:
      return <ComicProductIcon />
    case ProductType.DigitalArt:
      return <DigitalArtIcon />
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
