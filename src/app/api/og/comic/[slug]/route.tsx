import { ImageResponse } from 'next/og'
import { METADATA_IMAGE_SIZE } from '@/constants/general'
import { fetchComic } from '@/app/lib/api/comic/queries'
import { getAccessToken } from '@/app/lib/utils/auth'
import { Comic } from '@/models/comic'

const defaultTextStyles: React.CSSProperties = {
  fontFamily: 'Satoshi',
  position: 'absolute',
  left: 471,
  padding: 0,
  margin: 0,
  width: 680,
  color: 'white',
  lineHeight: '1.2',
  fontSize: '50px',
  fontWeight: 500,
  display: 'flex',
  flexWrap: 'wrap',
  overflow: 'hidden',
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const comic = await fetchComic({ slug: params.slug, accessToken: getAccessToken() })

  if (!comic) {
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

  return generateImage(comic)
}

function generateImage(comic: Comic) {
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
          height='100%'
          width='100%'
          src={comic.banner}
          alt=''
          style={{ position: 'absolute', opacity: 0.05, objectFit: 'cover' }}
        />
        <img
          width='351px'
          height='507px'
          src={comic.cover}
          alt=''
          style={{ position: 'absolute', top: 60, left: 60, borderRadius: 8 }}
        />
        <p style={{ ...defaultTextStyles, top: 130, color: '#c2c5ce' }}>{comic.creator?.name || ''}</p>
        <p
          style={{
            ...defaultTextStyles,
            top: 214,
            fontSize: '58px',
            fontWeight: 'bold',
          }}
        >
          {comic.title}
        </p>
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
