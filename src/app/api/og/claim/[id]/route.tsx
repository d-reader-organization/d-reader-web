import { ImageResponse } from 'next/og'
import { ComicIssue } from '@/models/comicIssue'
import { COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'
import { METADATA_IMAGE_SIZE } from '@/constants/general'

const { COMIC_ISSUE, GET_PUBLIC } = COMIC_ISSUE_QUERY_KEYS

const defaultTextStyles: React.CSSProperties = {
  position: 'absolute',
  left: 471,
  padding: 0,
  margin: 0,
  width: 680,
  color: 'white',
  fontSize: '50px',
  fontWeight: 'bold',
  display: 'flex',
  flexWrap: 'wrap',
  overflow: 'hidden',
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const url = new URL(request.url)
  const rarity = url.searchParams.get('rarity')

  const comicIssue: ComicIssue = await (
    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${COMIC_ISSUE}/${GET_PUBLIC}/${params.id}`)
  ).json()

  const statelessCover = comicIssue.statelessCovers?.find(
    (cover) => cover.rarity.toLowerCase() === rarity?.toLowerCase()
  )
  const cover = statelessCover?.image || comicIssue.cover

  return generateImage(comicIssue, cover)
}

function generateImage(comicIssue: ComicIssue, coverImage: string) {
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
        <img width='100%' src={coverImage} alt='' style={{ position: 'absolute', opacity: 0.05 }} />
        <img
          width='351px'
          height='507px'
          src={coverImage}
          alt=''
          style={{ position: 'absolute', top: 60, left: 60, borderRadius: 8 }}
        />
        <p style={{ ...defaultTextStyles, top: 100, color: '#c2c5ce' }}>{comicIssue.creator?.name || ''}</p>
        <p
          style={{
            ...defaultTextStyles,
            top: 184,
            fontSize: '58px',
            fontWeight: 'bolder',
          }}
        >
          {comicIssue.comic?.title || ''}
        </p>
        <p style={{ ...defaultTextStyles, top: 280 }}>
          {comicIssue.title || ''} (EP{comicIssue.number})
        </p>
        {comicIssue.collectibleInfo?.activeCandyMachineAddress && (
          <p
            style={{
              position: 'absolute',
              left: 471,
              top: 380,
              display: 'flex',
              height: '52px',
              alignItems: 'center',
              backgroundColor: '#fceb54',
              color: 'black',
              fontSize: '32px',
              fontWeight: 'bold',
              padding: '8px',
              borderRadius: '8px',
            }}
          >
            <svg
              style={{ marginRight: '8px', marginBottom: '2px' }}
              viewBox='0 0 44 44'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M9.08759 21.6247H14.4937' stroke='black' stroke-width='2.70306' stroke-linecap='round' />
              <path d='M21.7019 9.0105V14.4166' stroke='black' stroke-width='2.70306' stroke-linecap='round' />
              <path d='M34.3162 21.6249H28.91' stroke='black' stroke-width='2.70306' stroke-linecap='round' />
              <path d='M21.7019 34.239V28.8329' stroke='black' stroke-width='2.70306' stroke-linecap='round' />
              <path d='M12.7819 30.5443L16.6046 26.7216' stroke='black' stroke-width='2.70306' stroke-linecap='round' />
              <path d='M12.7819 12.7052L16.6046 16.5279' stroke='black' stroke-width='2.70306' stroke-linecap='round' />
              <path d='M30.622 12.7052L26.7993 16.5279' stroke='black' stroke-width='2.70306' stroke-linecap='round' />
              <path d='M30.622 30.5443L26.7993 26.7216' stroke='black' stroke-width='2.70306' stroke-linecap='round' />
            </svg>
            MINTING LIVE
          </p>
        )}

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
