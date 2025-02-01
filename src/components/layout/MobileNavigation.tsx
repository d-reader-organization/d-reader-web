import React, { useState } from 'react'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { cn } from '@/lib/utils'
import { ButtonLink } from '../ui/ButtonLink'
import { Menu, Search } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet'
import { User } from '@/models/user'
import { ProfileWidget } from '../shared/ProfileWidget'
import { LogoutButton } from '../shared/buttons/LogoutButton'
import { ProductSocials } from '../shared/ProductSocials'
import { SearchInput } from '../shared/SearchInput'
import { NavConnectButton } from '../shared/buttons/ConnectButton'
import { useWallet } from '@solana/wallet-adapter-react'
import { NavigationItem } from './NavigationItem'
import { ConnectedWalletBox } from '../shared/sheets/profile/WalletSection'
import { LogoSymbolIcon } from '../icons/logo/LogoSymbolIcon'
import { CloseIcon } from '@/components/icons/theme/CloseIcon'

type Props = {
  user?: User | null
}

export const MobileNav: React.FC<Props> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { publicKey } = useWallet()

  return (
    <div
      className={cn(
        'fixed top-0 z-50 w-full md:hidden h-full bg-grey-600 bg-opacity-85 backdrop-blur-[25px]',
        isOpen ? 'max-h-full' : 'max-h-20'
      )}
    >
      {isSearchOpen ? (
        <div className={cn('flex items-center gap-6 h-20 px-4')}>
          <SearchInput className='w-full' />
          <button onClick={() => setIsSearchOpen(false)}>
            <CloseIcon className='w-[18px] h-[18px]' />
          </button>
        </div>
      ) : (
        <>
          <div className={cn('flex justify-between items-center px-4 h-20', isOpen && 'hidden')}>
            <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search size={24} />
            </button>
            <Link href={RoutePath.Home} prefetch={false}>
              <LogoSymbolIcon className='size-[22px] fill-white' />
            </Link>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <CloseIcon className='w-6 h-6' /> : <Menu size={24} />}
            </button>
          </div>

          <div className='md:hidden'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTitle className='sr-only'>Open menu</SheetTitle>
              <SheetContent aria-describedby={undefined} side='right' className='w-full bg-grey-600 p-4 border-l-0'>
                <nav className='flex flex-col justify-between size-full text-grey-100 text-2xl font-bold leading-[28.8px]'>
                  <div className='flex flex-col gap-3'>
                    <div className='flex justify-between w-full'>
                      {/* <Link href={RoutePath.Discover}>Discover</Link> */}
                      <NavigationItem href={RoutePath.Home} title='Home' />
                      <button onClick={() => setIsOpen(false)}>
                        <CloseIcon className='w-6 h-6 text-grey-100' />
                      </button>
                    </div>
                    <NavigationItem href={RoutePath.Discover} title='Discover' />
                    {/* <NavigationItem
                        href={RoutePath.Marketplace}
                        isComingSoon
                        disabled
                        title='Marketplace'
                      /> */}
                    {/* <NavigationItem
                        href={RoutePath.Invest}
                        isComingSoon
                        title='Invest'
                      /> */}
                    {!publicKey ? <NavConnectButton /> : null}
                  </div>
                  {user ? (
                    <div className='flex flex-col gap-6 border-t border-t-grey-400'>
                      <ProfileWidget user={user} />
                      <div className='flex flex-col gap-4'>
                        <NavigationItem href={RoutePath.Library} title='My Library' />
                        <NavigationItem href={RoutePath.Profile} title='Settings' />
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
        </>
      )}
    </div>
  )
}
