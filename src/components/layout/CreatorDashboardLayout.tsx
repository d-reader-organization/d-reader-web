import React from 'react'
import { fetchMe } from '@/app/lib/api/user/queries'
import { Footer } from './Footer'
import { cn } from '@/lib/utils'
import { IntercomClient } from '../shared/IntercomClient'
import { SidebarProvider } from '@/components/ui/sidebar'
import CreatorDashboardSidebar from './CreatorDashboardSidebar'
import { cookies } from 'next/headers'
import { Text } from '@/components/ui/Text'

type Props = React.PropsWithChildren & {
  title?: string
  mainClassName?: string
  showFooter?: boolean
  activePath?: string
}

export const CreatorDashboardLayout: React.FC<Props> = async ({
  children,
  title,
  mainClassName,
  activePath,
  showFooter = false,
}) => {
  const me = await fetchMe()
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

  if (!me) return null

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <CreatorDashboardSidebar activePath={activePath} />
      <main
        className={cn(
          'flex flex-col min-h-screen h-full w-full gap-8 p-4 md:p-6 lg:p-8 flex-1 relative',
          mainClassName
        )}
      >
        <Text as='h4' styleVariant='secondary-heading' className='w-full'>
          {title}
        </Text>

        {children}
      </main>
      {showFooter ? <Footer /> : null}
      <IntercomClient user={me} />
    </SidebarProvider>
  )
}
