import { ImageResponse } from 'next/og'
import { METADATA_IMAGE_SIZE } from '@/constants/general'
import { fetchCreator } from '@/app/lib/api/creator/queries'

const defaultTextStyles: React.CSSProperties = {
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

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const creator = await fetchCreator({ slug: params.slug })

  if (!creator) {
    return new ImageResponse(
      (
        <img
          src={process.env.NEXT_PUBLIC_SITE_URL + '/assets/images/metadata-home.jpg'}
          alt=''
          style={{ width: '100%', height: '100%' }}
        />
      ),
      {
        ...METADATA_IMAGE_SIZE,
      }
    )
  }

  return generateImage(creator?.name, creator?.banner, creator?.avatar)
}

function generateImage(creatorName: string, creatorBanner: string, creatorAvatar: string) {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: 'rgb(21, 23, 28)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          width='100%'
          height='100%'
          src={creatorBanner}
          alt=''
          style={{ position: 'absolute', opacity: 0.1, objectFit: 'cover' }}
        />
        <img
          src={creatorAvatar}
          alt=''
          style={{
            width: '244px',
            height: '244px',
            borderRadius: '9999px',
            bottom: '50px',
          }}
        />
        <p style={{ ...defaultTextStyles }}>{creatorName}</p>
        <svg
          style={{ position: 'absolute', bottom: 60, right: 60 }}
          width={41}
          height={40}
          color='white'
          fill='white'
          id='Layer_1'
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 298.49 275.62'
        >
          <path d='M271.22,43.88a32.9,32.9,0,0,0-65.79,0v78.26c-1.45-.08-2.9-.13-4.36-.13H142V43.88a32.89,32.89,0,0,0-65.78,0v79.44A71.31,71.31,0,0,0,89.83,264.63H201.07c39.38,0,70.07-31.93,70.07-71.31C271.14,188.92,271.22,43.88,271.22,43.88ZM102.81,192.94H70.69a12.59,12.59,0,1,1,0-25.18h32.12a12.59,12.59,0,1,1,0,25.18Zm89.3,0H160a12.59,12.59,0,1,1,0-25.18h32.12a12.59,12.59,0,0,1,0,25.18Z' />
        </svg>
      </div>
    ),
    {
      ...METADATA_IMAGE_SIZE,
    }
  )
}
