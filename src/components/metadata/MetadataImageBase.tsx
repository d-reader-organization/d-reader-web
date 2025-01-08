import { HTMLAttributes } from 'react'
import Logo from 'public/assets/vector-icons/logo.svg'

interface Props extends HTMLAttributes<HTMLDivElement> {
  image: string
  withLogo?: boolean
}

export const MetadataImageBase: React.FC<Props> = ({ image, withLogo, children, ...props }) => (
  <div
    {...props}
    style={{
      backgroundColor: 'rgb(21, 23, 28)',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      ...props.style,
    }}
  >
    <img
      src={image}
      alt=''
      width='100%'
      height='100%'
      style={{ position: 'absolute', opacity: 0.1, objectFit: 'cover' }}
    />
    {children}
    {withLogo && (
      <Logo fill='white' color='white' width='41' height='40' style={{ position: 'absolute', bottom: 60, right: 60 }} />
    )}
  </div>
)
