import React from 'react'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { LogoWithTextIcon } from '../icons/logo/LogoWithTextIcon'

const UnauthenticatedNavigation: React.FC = () => (
  <Link href={RoutePath.Home} className='flex justify-between w-full border-b border-grey-300 p-6' prefetch={false}>
    <LogoWithTextIcon className='h-8 w-auto' />
  </Link>
)

export { UnauthenticatedNavigation }
