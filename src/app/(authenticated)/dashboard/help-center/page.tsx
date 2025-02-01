import { fetchMe } from '@/app/lib/api/user/queries'
import { CreatorDashboardLayout } from '@/components/layout/CreatorDashboardLayout'
import BunBunUnderConstruction from 'public/assets/images/site-under-construction.png'
import Image from 'next/image'
import React from 'react'
import { RoutePath } from '@/enums/routePath'

export const HelpCenter: React.FC = async () => {
  const me = await fetchMe()

  if (!me) return null

  return (
    <CreatorDashboardLayout title='Help Center' activePath={RoutePath.DashboardHelpCenter}>
      🚧 Site under construction, coming up soon
      <Image
        src={BunBunUnderConstruction.src}
        alt='Page not found'
        className='w-[240px] h-auto pointer-events-none'
        width={400}
        height={430}
      />
    </CreatorDashboardLayout>
  )
}

export default HelpCenter
