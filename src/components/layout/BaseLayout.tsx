import React from 'react'
import { Navigation } from './Navigation'
import { fetchMe } from '@/app/lib/api/user/queries'
import { Footer } from './Footer'
import { cn } from '@/lib/utils'
import { IntercomClient } from '../shared/IntercomClient'

type Props = React.PropsWithChildren & { mainClassName?: string; showFooter?: boolean; transparent?: boolean }

export const BaseLayout: React.FC<Props> = async ({ children, transparent, mainClassName, showFooter }) => {
  const me = await fetchMe()

  return (
    <div className='flex flex-col min-h-screen'>
      <Navigation me={me} transparent={transparent} />
      <main
        className={cn(
          'flex flex-col w-full h-full items-center mt-20 md:mt-16 p-4 md:p-6 lg:p-8 xs:pb-24 sm:pb-24 md:pb-24 lg:pb-24 flex-1',
          transparent && 'mt-0 md:mt-0 pt-0 md:pt-0 lg:pt-0',
          transparent ? '' : '',
          mainClassName
        )}
      >
        {children}
      </main>
      {showFooter ? <Footer /> : null}
      <IntercomClient user={me} />
    </div>
  )
}
