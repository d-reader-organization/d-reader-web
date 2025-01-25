import React from 'react'
import { fetchMe } from '@/app/lib/api/user/queries'
import { Footer } from './Footer'
import { cn } from '@/lib/utils'
import { IntercomClient } from '../shared/IntercomClient'

type Props = React.PropsWithChildren & { mainClassName?: string; showFooter?: boolean }

export const CreatorDashboardLayout: React.FC<Props> = async ({ children, mainClassName, showFooter = false }) => {
  const me = await fetchMe()

  return (
    <div className='flex flex-col min-h-screen bg-[#121212]'>
      {/* <Navigation me={me} /> */}
      <main
        className={cn(
          'flex flex-col w-full h-full items-center mt-20 md:mt-16 p-4 md:p-6 lg:p-8 xs:pb-24 sm:pb-24 md:pb-24 lg:pb-24 flex-1',
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
