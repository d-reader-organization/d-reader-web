import { METADATA_IMAGE_SIZE } from '@/constants/general'
import { ImageResponse } from 'next/og'

export const generateMetadataImage = (Component: React.ReactElement) => {
  return new ImageResponse(Component, METADATA_IMAGE_SIZE)
}
