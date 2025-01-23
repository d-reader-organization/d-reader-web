import SunIcon from 'public/assets/vector-icons/sun.svg'
import { MetadataImageBase } from './MetadataImageBase'

const textStyles: React.CSSProperties = {
  position: 'absolute',
  left: 470,
  padding: 0,
  margin: 0,
  width: 680,
  color: 'white',
  fontSize: '50px',
  lineHeight: '1.2',
  fontWeight: 500,
  display: 'flex',
  flexWrap: 'wrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

interface Props {
  title?: string
  body?: string
  caption?: string
  image: string
  backgroundImage: string
  withLogo?: boolean
  isMinting?: boolean
  altBodyColor?: boolean
}

export const DefaultMetadataImage: React.FC<Props> = ({
  title,
  body,
  caption,
  image,
  backgroundImage,
  withLogo,
  isMinting,
  altBodyColor,
}) => (
  <MetadataImageBase image={backgroundImage} withLogo={withLogo}>
    <img
      src={image}
      alt=''
      width='351px'
      height='507px'
      style={{ position: 'absolute', top: 60, left: 60, borderRadius: 8, objectFit: 'cover' }}
    />
    <p style={{ ...textStyles, top: 110, color: '#c2c5ce' }}>{caption}</p>
    <p
      style={{
        ...textStyles,
        top: 194,
        fontSize: '58px',
        fontWeight: 'bolder',
      }}
    >
      {title}
    </p>
    <p style={{ ...textStyles, top: 290, color: altBodyColor ? '#c2c5ce' : 'white' }}>{body}</p>
    {isMinting && (
      <p
        style={{
          position: 'absolute',
          left: 470,
          top: 380,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#fceb54',
          color: 'black',
          fontSize: '32px',
          fontWeight: 'bold',
          padding: `24px 34px`,
          borderRadius: '10px',
          backdropFilter: 'blur(25px)',
        }}
      >
        <SunIcon />
        MINTING LIVE
      </p>
    )}
  </MetadataImageBase>
)
export { MetadataImageBase }
