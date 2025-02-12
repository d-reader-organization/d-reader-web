'use client'

import React from 'react'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { cn } from '@/lib/utils'
import { ButtonLink } from '../ui/ButtonLink'
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
import { CloseIcon } from '@/components/icons/theme/CloseIcon'
import { MenuIcon } from '@/components/icons/theme/MenuIcon'
import useToggle from '@/hooks/useToggle'

type Props = {
  user?: User | null
  background: 'bg-green-genesis' | 'bg-grey-600'
}

export const GenesisMobileNavigation: React.FC<Props> = ({ user, background }) => {
  const [isOpen, toggleOpen] = useToggle(false)
  const { publicKey } = useWallet()
  const Icon = isOpen ? CloseIcon : MenuIcon

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
          <GenesisLogoIcon className='h-6 w-auto fill-white' />
        </Link>
        <button onClick={toggleOpen}>
          <Icon className='size-6' />
        </button>
      </div>

      <div className='md:hidden'>
        <Sheet open={isOpen} onOpenChange={toggleOpen}>
          <SheetTitle className='sr-only'>Open menu</SheetTitle>
          <SheetContent aria-describedby={undefined} side='right' className='w-full bg-grey-600 p-4 border-l-0'>
            <nav className='flex flex-col justify-between size-full text-grey-100 text-2xl font-bold leading-[28.8px]'>
              <div className='flex flex-col gap-3'>
                {user && <ProfileWidget user={user} />}
                <NavigationItem activeColor='text-green-genesis' href={RoutePath.Home} title='Home' />
                <NavigationItem activeColor='text-green-genesis' href={RoutePath.Discover} title='Discover' />
                <NavigationItem activeColor='text-green-genesis' href={RoutePath.Invest} title='Invest' />
                <NavigationItem
                  activeColor='text-green-genesis'
                  href={RoutePath.Profile}
                  title='Settings'
                  className={!user ? 'hidden' : ''}
                />
                {!publicKey && <NavConnectButton />}
              </div>
              <div className='flex flex-col gap-3'>
                {publicKey && <ConnectedWalletBox address={publicKey.toBase58()} />}
                {user && <LogoutButton />}
                {user && <ProductSocials />}
                {!user && (
                  <ButtonLink href={RoutePath.Login} variant='white' size='lg' subVariant={1} className='w-full'>
                    Sign in
                  </ButtonLink>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
