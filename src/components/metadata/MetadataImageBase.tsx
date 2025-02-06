import { HTMLAttributes } from 'react'
import { LogoSymbolIcon } from '../icons/logo/LogoSymbolIcon'

interface Props extends HTMLAttributes<HTMLDivElement> {
  image: string
  logo?: boolean
}

export const MetadataImageBase: React.FC<Props> = ({ image, logo, children, ...props }) => (
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
    {logo && (
      <LogoSymbolIcon
        style={{ color: 'white', fill: 'white', position: 'absolute', bottom: 60, right: 60, width: 40, height: 37.5 }}
      />
    )}
  </div>
)
