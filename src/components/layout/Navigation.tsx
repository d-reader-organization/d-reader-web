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
import { useWallet } from '@solana/wallet-adapter-react'
import { ChevronDown } from '@/components/icons/theme/ChevronDown'
import { LogoWithTextIcon } from '@/components/icons/logo/LogoWithTextIcon'

type Props = {
  me: User | null
  hideSearch?: boolean
}

export const Navigation: React.FC<Props> = ({ me, hideSearch = false }) => {
  const [isProfileSheetOpen, setOpenProfileSheet] = useState(false)
  const { publicKey } = useWallet()

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
              <LogoWithTextIcon className='h-8 min-w-fit fill-white ml-2' />
            </Link>
            {!hideSearch && <SearchInput />}
            <div className='flex items-center gap-10'>
              <NavigationItem as='p' activeColor='text-yellow-300' href={RoutePath.Discover} title='Discover' />
            </div>
            {/* <div className='flex items-center gap-10'>
              <NavigationItem as='p' activeColor='text-yellow-300' href={RoutePath.Invest} title='Invest' />
              </div> */}
            {/* <div className='flex items-center gap-10'>
              <NavigationItem as='p' activeColor='text-yellow-300' href={RoutePath.Marketplace} title='Marketplace' isComingSoon disabled />
            </div> */}
          </div>
          {me ? (
            <div className='flex items-center gap-8'>
              <NavigationItem as='p' activeColor='text-yellow-300' href={RoutePath.Library} title='My Library' />
              <button
                className='flex items-center cursor-pointer'
                onClick={() => setOpenProfileSheet(!isProfileSheetOpen)}
              >
                <div className='bg-white bg-opacity-15 rounded-xl flex items-center justify-center gap-1.5 px-2 h-10'>
                  <Image
                    alt='avatar'
                    src={me.avatar || PLACEHOLDER_AVATAR}
                    width={28}
                    height={28}
                    className='size-7 object-cover rounded-full border border-black'
                  />
                  <ChevronDown className='w-6 h-6 text-grey-100' />
                </div>
              </button>
            </div>
          ) : (
            <Button variant='white' size='md' onClick={() => setOpenProfileSheet(!isProfileSheetOpen)}>
              {!!publicKey ? 'Sign in' : 'Connect'}
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
