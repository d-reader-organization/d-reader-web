import { MetadataImageBase } from './MetadataImageBase'

export const textStyles: React.CSSProperties = {
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
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

interface Props {
  name: string
  banner: string
  avatar: string
  withLogo?: boolean
}

export const CreatorMetadataImage: React.FC<Props> = ({ name, banner, avatar, withLogo }) => (
  <MetadataImageBase image={banner} withLogo={withLogo}>
    <img
      src={avatar}
      alt=''
      style={{
        width: '244px',
        height: '244px',
        borderRadius: '9999px',
        bottom: '50px',
      }}
    />
    <p style={{ ...textStyles }}>{name}</p>
  </MetadataImageBase>
)
