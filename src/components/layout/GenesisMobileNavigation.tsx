'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { cn } from '@/lib/utils'
import { ButtonLink } from '../ui/ButtonLink'
import { Menu, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet'
import { User } from '@/models/user'
import { ProfileWidget } from '../shared/ProfileWidget'
import { LogoutButton } from '../shared/buttons/LogoutButton'
import { ProductSocials } from '../shared/ProductSocials'
import { NavConnectButton } from '../shared/buttons/ConnectButton'
import { useWallet } from '@solana/wallet-adapter-react'
import { NavigationItem } from './NavigationItem'
import { ConnectedWalletBox } from '../shared/sheets/profile/WalletSection'
import { GenesisLogoIcon } from '../icons/logo/GenesisLogoIcon'

type Props = {
  user?: User | null
  background: 'bg-green-genesis' | 'bg-grey-600'
}

export const GenesisMobileNavigation: React.FC<Props> = ({ user, background }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { publicKey } = useWallet()

  return (
    <div
      className={cn(
        'fixed top-0 z-50 w-full md:hidden h-full bg-opacity-85 backdrop-blur-[25px]',
        isOpen ? 'max-h-full' : 'max-h-20',
        background
      )}
    >
      <div className={cn('flex justify-between items-center px-4 h-20', isOpen && 'hidden')}>
        <Link href={RoutePath.Invest} prefetch={false}>
          <GenesisLogoIcon className='w-auto h-full fill-white' />
        </Link>
        <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </div>

      <div className='md:hidden'>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTitle className='sr-only'>Open menu</SheetTitle>
          <SheetContent aria-describedby={undefined} side='right' className='w-full bg-grey-600 p-4 border-l-0'>
            <nav className='flex flex-col justify-between size-full text-grey-100 text-2xl font-bold leading-[28.8px]'>
              <div className='flex flex-col gap-3'>
                <div className='flex justify-between w-full'>
                  <NavigationItem activeColor='text-green-genesis' href={RoutePath.Home} title='Home' />
                  <button onClick={() => setIsOpen(false)}>
                    <X className='size-6 text-grey-100' />
                  </button>
                </div>
                <NavigationItem
                  activeColor='text-green-genesis'
                  href={RoutePath.Discover}
                  isComingSoon
                  title='Discover'
                />
                <NavigationItem activeColor='text-green-genesis' href={RoutePath.Invest} title='Invest' />
                {!publicKey ? <NavConnectButton /> : null}
              </div>
              {user ? (
                <div className='flex flex-col gap-6 border-t border-t-grey-400'>
                  <ProfileWidget user={user} />
                  <div className='flex flex-col gap-4'>
                    <NavigationItem activeColor='text-green-genesis' href={RoutePath.Library} title='Library' />
                    <NavigationItem activeColor='text-green-genesis' href={RoutePath.Profile} title='Settings' />
                  </div>
                  {publicKey ? <ConnectedWalletBox address={publicKey.toBase58()} /> : null}
                  <LogoutButton />
                  <ProductSocials />
                </div>
              ) : (
                <div className='flex flex-col gap-4'>
                  {publicKey ? <ConnectedWalletBox address={publicKey.toBase58()} /> : null}

                  <ButtonLink
                    href={RoutePath.Login}
                    variant='white'
                    size='lg'
                    subVariant={1}
                    className='w-fit max-md:h-[42px]'
                  >
                    Sign in
                  </ButtonLink>
                </div>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
