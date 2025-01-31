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
  logo?: boolean
  isMinting?: boolean
}

export const DefaultMetadataImage: React.FC<Props> = ({
  title,
  body,
  caption,
  image,
  backgroundImage,
  logo,
  isMinting,
}) => (
  <MetadataImageBase image={backgroundImage} logo={logo}>
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
    <p style={{ ...textStyles, top: 290 }}>{body}</p>
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
        <svg viewBox='0 0 44 44' fill='none' xmlns='http://www.w3.org/2000/svg'>
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
  </MetadataImageBase>
)
export { MetadataImageBase }
