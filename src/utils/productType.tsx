import { ComicProductIcon } from '@/components/icons/ComicProductIcon'
import { DigitalArtIcon } from '@/components/icons/DigitalArtIcon'
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
