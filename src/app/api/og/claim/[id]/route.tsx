import { ImageResponse } from 'next/og'
import { ComicIssue } from '@/models/comicIssue'
import { METADATA_IMAGE_SIZE } from '@/constants/general'
import Logo from 'public/assets/vector-icons/logo.svg'
import SunIcon from 'public/assets/vector-icons/sun.svg'
import { fetchComicIssue } from '@/app/lib/api/comicIssue/queries'
import { generateDefaultImage } from '@/constants/og'
import { getStatelessCoverFromComicIssue } from '@/utils/covers'

const textStyles: React.CSSProperties = {
  position: 'absolute',
  left: 470,
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
  const comicIssue = await fetchComicIssue({ id: params.id })

  if (!comicIssue) return generateDefaultImage()

  const statelessCover = getStatelessCoverFromComicIssue(comicIssue, rarity)
  const cover = statelessCover || comicIssue.cover

  return new ImageResponse(<OGClaimCard comicIssue={comicIssue} cover={cover} />, METADATA_IMAGE_SIZE)
}

interface OGClaimCardProps {
  comicIssue: ComicIssue
  cover: string
}

const OGClaimCard: React.FC<OGClaimCardProps> = ({ comicIssue, cover }) => (
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
    <img width='100%' src={cover} alt='' style={{ position: 'absolute', opacity: 0.05 }} />
    <img
      width='351px'
      height='507px'
      src={cover}
      alt=''
      style={{ position: 'absolute', top: 60, left: 60, borderRadius: 8 }}
    />
    <p style={{ ...textStyles, top: 100, color: '#c2c5ce' }}>{comicIssue.creator?.name || ''}</p>
    <p
      style={{
        ...textStyles,
        top: 184,
        fontSize: '58px',
        fontWeight: 'bolder',
      }}
    >
      {comicIssue.comic?.title || ''}
    </p>
    <p style={{ ...textStyles, top: 280 }}>
      {comicIssue.title || ''} (EP{comicIssue.number})
    </p>
    {comicIssue.collectibleInfo?.activeCandyMachineAddress && (
      <p
        style={{
          position: 'absolute',
          left: 470,
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
        <SunIcon style={{ marginRight: '8px', marginBottom: '2px' }} />
        MINTING LIVE
      </p>
    )}
    <Logo fill='white' color='white' width='41' height='40' style={{ position: 'absolute', bottom: 60, right: 60 }} />
  </div>
)
