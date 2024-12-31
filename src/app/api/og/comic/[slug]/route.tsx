import { ImageResponse } from 'next/og'
import { METADATA_IMAGE_SIZE } from '@/constants/general'
import { fetchComic } from '@/app/lib/api/comic/queries'
import { Comic } from '@/models/comic'
import { generateDefaultImage } from '@/constants/og'
import Logo from 'public/assets/vector-icons/logo.svg'
import { defaultTextStyles } from '@/constants/og'

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const comic = await fetchComic({ slug: params.slug })

  if (!comic) return generateDefaultImage()

  return new ImageResponse(<OGComicImage comic={comic} />, METADATA_IMAGE_SIZE)
}

interface OGComicImageProp {
  comic: Comic
}

const OGComicImage: React.FC<OGComicImageProp> = ({ comic }) => (
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
    <Logo fill='white' color='white' width='41' height='40' style={{ position: 'absolute', bottom: 60, right: 60 }} />
  </div>
)
