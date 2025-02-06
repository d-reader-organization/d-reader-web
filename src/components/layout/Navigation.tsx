'use client'

import React, { useState } from 'react'
import { RoutePath } from '@/enums/routePath'
import { Button } from '../ui'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { MobileNav } from './MobileNavigation'
import { ProfileSheet } from '../shared/sheets/profile/ProfileSheet'
import { SearchInput } from '../shared/SearchInput'
import { User } from '@/models/user'
import { NavigationItem } from './NavigationItem'
import { PLACEHOLDER_AVATAR } from '@/constants/general'
import { ChevronDownIcon } from '@/components/icons/theme/ChevronDownIcon'
import { LogoWithTextIcon } from '@/components/icons/logo/LogoWithTextIcon'

type Props = {
  me: User | null
  hideSearch?: boolean
}

export const Navigation: React.FC<Props> = ({ me, hideSearch = false }) => {
  const [isProfileSheetOpen, setOpenProfileSheet] = useState(false)

  return (
    <>
      <MobileNav user={me} />
      <div
        className={cn(
          'max-md:hidden max-h-20 bg-grey-600 bg-opacity-85 backdrop-blur-[25px] w-full flex justify-center',
          'fixed top-0 z-50',
          isProfileSheetOpen && 'z-10'
        )}
      >
        <div className='flex items-center justify-between p-4 max-w-screen-xl w-full'>
          <div className='flex items-center gap-8'>
            <Link href={RoutePath.Home} prefetch={false}>
              <LogoWithTextIcon className='h-8 w-auto fill-white ml-2' />
            </Link>
            {!hideSearch && <SearchInput />}
            <div className='flex items-center gap-10'>
              <NavigationItem as='p' activeColor='text-yellow-300' href={RoutePath.Discover} title='Discover' />
            </div>
          </div>
          {me ? (
            <div className='flex items-center gap-8'>
              <NavigationItem as='p' activeColor='text-yellow-300' href={RoutePath.Library} title='My Library' />
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
      <ProfileSheet
        isOpen={isProfileSheetOpen}
        user={me}
        triggerOpenChange={(open: boolean) => setOpenProfileSheet(open)}
      />
    </>
  )
}
