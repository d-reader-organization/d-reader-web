import { ImageResponse } from 'next/og'
import { METADATA_IMAGE_SIZE } from '@/constants/general'
import { fetchCreator } from '@/app/lib/api/creator/queries'
import { generateDefaultImage } from '@/constants/og'
import Logo from 'public/assets/vector-icons/logo.svg'
import { defaultTextStyles } from '@/constants/og'

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const creator = await fetchCreator({ slug: params.slug })

  if (!creator) return generateDefaultImage()

  return new ImageResponse(
    <OGCreatorCard creatorName={creator.name} creatorBanner={creator.banner} creatorAvatar={creator.avatar} />,
    METADATA_IMAGE_SIZE
  )
}

interface OGCreatorCardProps {
  creatorName: string
  creatorBanner: string
  creatorAvatar: string
}

const OGCreatorCard: React.FC<OGCreatorCardProps> = ({ creatorName, creatorBanner, creatorAvatar }) => {
  return (
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
      <Logo fill='white' color='white' width='41' height='40' style={{ position: 'absolute', bottom: 60, right: 60 }} />
    </div>
  )
}
