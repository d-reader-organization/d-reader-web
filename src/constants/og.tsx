import { ImageResponse } from 'next/og'
import { METADATA_IMAGE_SIZE } from './general'

export const defaultTextStyles: React.CSSProperties = {
  position: 'absolute',
  fontFamily: 'Satoshi',
  color: 'white',
  fontSize: '56px',
  fontWeight: 'bold',
  lineHeight: '1.2',
  display: 'flex',
  flexWrap: 'wrap',
  overflow: 'hidden',
  left: '50%',
  top: '70%',
  transform: 'translate(-50%, -50%)',
}

export function generateDefaultImage() {
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
