import React from 'react'
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
import { SearchInput } from '../shared/SearchInput'
import { usePathname } from 'next/navigation'
import { NavConnectButton } from '../shared/buttons/ConnectButton'
import { useWallet } from '@solana/wallet-adapter-react'
import { NavItemLink } from './NavItemLink'
import { ConnectedWalletBox } from '../shared/sheets/profile/WalletSection'
import { LogoSymbolIcon } from '../icons/logo/LogoSymbolIcon'
import { GenesisLogoIcon } from '../icons/logo/GenesisLogoIcon'

type Props = {
  user?: User | null
}

export const GenesisMobileNavigation: React.FC<Props> = ({ user }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false)
  const { publicKey } = useWallet()
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isLibrary = pathname.startsWith(RoutePath.Library)
  const isProfile = pathname.startsWith(RoutePath.Profile)
  const isInvest = pathname.endsWith(RoutePath.Invest)

  return (
    <>
      <div
        className={cn(
          'fixed top-0 z-50 w-full md:hidden h-full bg-opacity-85 backdrop-blur-[25px]',
          isOpen ? 'max-h-full' : 'max-h-20',
          isInvest ? 'bg-green-genesis' : 'bg-grey-600'
        )}
      >
        {isSearchOpen ? (
          <div className={cn('flex items-center gap-6 h-20 px-4')}>
            <SearchInput className='w-full' />
            <button onClick={() => setIsSearchOpen(false)}>
              <X className='size-[18px]' />
            </button>
          </div>
        ) : (
          <>
            <div className={cn('flex justify-between items-center px-4 h-20', isOpen && 'hidden')}>
              <Link href={RoutePath.Home} prefetch={false}>
                <LogoSymbolIcon className='size-6 fill-white' />
              </Link>
              <Link href={RoutePath.Invest} prefetch={false}>
                <GenesisLogoIcon className='size-6 fill-white' />
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
                        {/* <Link href={RoutePath.Discover}>Discover</Link> */}
                        <NavItemLink
                          activeColor='text-green-genesis'
                          as='h4'
                          href={RoutePath.Home}
                          isActive={isHome}
                          title='Home'
                        />
                        <button onClick={() => setIsOpen(false)}>
                          <X className='size-6 text-grey-100' />
                        </button>
                      </div>
                      <NavItemLink
                        activeColor='text-green-genesis'
                        as='h4'
                        href={RoutePath.Discover}
                        isActive={false}
                        isComingSoon
                        title='Discover'
                      />
                      <NavItemLink
                        activeColor='text-green-genesis'
                        as='h4'
                        href={RoutePath.Invest}
                        isActive={false}
                        title='Invest'
                      />
                      {!publicKey ? <NavConnectButton /> : null}
                    </div>
                    {user ? (
                      <div className='flex flex-col gap-6 border-t border-t-grey-400'>
                        <ProfileWidget user={user} />
                        <div className='flex flex-col gap-4'>
                          <NavItemLink
                            activeColor='text-green-genesis'
                            as='h4'
                            href={RoutePath.Library}
                            isActive={isLibrary}
                            title='Library'
                          />
                          <NavItemLink
                            activeColor='text-green-genesis'
                            as='h4'
                            href={RoutePath.Profile}
                            isActive={isProfile}
                            title='Settings'
                          />
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
    </>
  )
}
