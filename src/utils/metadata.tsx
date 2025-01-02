import { ImageResponse } from 'next/og'
import { METADATA_IMAGE_SIZE } from '../constants/general'

export const generateMetadataImage = (Component: React.ReactElement) => {
  return new ImageResponse(Component, METADATA_IMAGE_SIZE)
}

export function generateFallbackMetadataImage() {
  return new ImageResponse(
    (
      <img
        src={process.env.NEXT_PUBLIC_SITE_URL + '/assets/images/metadata-home.jpg'}
        alt=''
        style={{ width: '100%', height: '100%' }}
      />
    ),
    METADATA_IMAGE_SIZE
  )
}
