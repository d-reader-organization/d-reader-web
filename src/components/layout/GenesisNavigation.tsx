'use client'

import React, { useState } from 'react'
import { RoutePath } from '@/enums/routePath'
import { Button } from '../ui'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { GenesisMobileNavigation } from './GenesisMobileNavigation'
import { ProfileSheet } from '../shared/sheets/profile/ProfileSheet'
import { User } from '@/models/user'
import { usePathname } from 'next/navigation'
import { PLACEHOLDER_AVATAR } from '@/constants/general'
import { GenesisLogoIcon } from '@/components/icons/logo/GenesisLogoIcon'
import { LogoWithTextIcon } from '@/components/icons/logo/LogoWithTextIcon'
import { ArrowLeftIcon } from '@/components/icons/theme/ArrowLeftIcon'
import { ChevronDownIcon } from '@/components/icons/theme/ChevronDownIcon'

type Props = {
  me: User | null
}

export const GenesisNavigation: React.FC<Props> = ({ me }) => {
  const [isProfileSheetOpen, setOpenProfileSheet] = useState(false)
  const pathname = usePathname()
  const isInvest = pathname.endsWith(RoutePath.Invest)
  const backgroundColor = isInvest ? 'bg-green-genesis' : 'bg-grey-600'

  return (
    <>
      <GenesisMobileNavigation background={backgroundColor} user={me} />
      <div
        className={cn(
          'max-md:hidden max-h-20 bg-opacity-85 backdrop-blur-[25px] w-full flex justify-center',
          'fixed top-0 z-50',
          backgroundColor,
          isProfileSheetOpen && 'z-10'
        )}
      >
        <div className='flex items-center justify-between p-4 max-w-screen-xl w-full'>
          <Link href={RoutePath.Invest}>
            <GenesisLogoIcon className='h-8 w-auto fill-white ml-4' />
          </Link>
          <div className='flex items-center gap-2'>
            <Link
              className='flex items-center border border-white rounded-xl p-2'
              href={RoutePath.Home}
              prefetch={false}
            >
              <ArrowLeftIcon className='size-5' />
              <LogoWithTextIcon className='h-6 w-auto fill-white ml-2' />
            </Link>
            {me ? (
              <div className='flex items-center gap-8'>
                <Button
                  variant='secondary'
                  onClick={() => setOpenProfileSheet(!isProfileSheetOpen)}
                  Icon={ChevronDownIcon}
                  iconPosition='right'
                  className='!p-2'
                >
                  <Image
                    alt='avatar'
                    src={me.avatar || PLACEHOLDER_AVATAR}
                    width={28}
                    height={28}
                    className='size-7 object-cover rounded-full border border-black'
                  />
                </Button>
              </div>
            ) : (
              <Button variant='white' onClick={() => setOpenProfileSheet(!isProfileSheetOpen)}>
                Sign in
              </Button>
            )}
          </div>
        </div>
      </div>
      <ProfileSheet
        isOpen={isProfileSheetOpen}
        user={me}
        triggerOpenChange={(open: boolean) => setOpenProfileSheet(open)}
      />
    </>
  )
}
