import React, { PropsWithChildren } from 'react'
type Props = {
  image: string
} & PropsWithChildren

export const BackgroundImageWithGradient: React.FC<Props> = ({ children, image }) => (
  <>
    <div
      className='bg-cover bg-no-repeat bg-center max-h-[535px] h-full absolute top-0 left-0 -z-[1] w-full opacity-10'
      style={{ backgroundImage: `url('${image}')` }}
    >
      <div className='absolute left-0 right-0 bottom-0 h-[535px] top-auto -z-[1] bg-0-top bg-repeat-x size-full bg-gradient-to-t from-grey-600 to-transparent' />
    </div>
    <div className='flex justify-center absolute w-full top-24'>{children}</div>
  </>
)
