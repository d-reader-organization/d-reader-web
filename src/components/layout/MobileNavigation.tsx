import React from 'react'
import Link from 'next/link'
import DReaderSymbol from 'public/assets/vector-icons/logo.svg'
import { RoutePath } from '@/enums/routePath'
import { cn } from '@/lib/utils'
import { ButtonLink } from '../ui/ButtonLink'
import { Menu, Search, X } from 'lucide-react'
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
import { GenesisMobileNavigation } from './GenesisMobileNavigation'
import { DailyDropButton } from '../daily-drops/Button'
import { DailyDropsStoreProvider } from '@/providers/DailyDropsStoreProvider'

type Props = {
  user?: User | null
}

export const MobileNav: React.FC<Props> = ({ user }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false)
  const { publicKey } = useWallet()
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isDiscover = pathname.startsWith(RoutePath.Discover)
  const isInvest = pathname.startsWith(RoutePath.Invest)
  // const isMarketplace = pathname.startsWith(RoutePath.Marketplace)
  const isLibrary = pathname.startsWith(RoutePath.Library)
  const isProfile = pathname.startsWith(RoutePath.Profile)
  const activeLinkColor = isInvest ? 'text-green-genesis' : 'text-yellow-300'

  if (isInvest) return <GenesisMobileNavigation user={user} />

  return (
    <>
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
              <X className='size-[18px]' />
            </button>
          </div>
        ) : (
          <>
            <div className={cn('flex justify-between items-center px-4 h-20', isOpen && 'hidden')}>
              <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search size={24} />
              </button>
              <DailyDropsStoreProvider>
                <DailyDropButton />
              </DailyDropsStoreProvider>
              <Link href={RoutePath.Home} prefetch={false}>
                <DReaderSymbol className='size-6 fill-white' />
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
                          activeColor={activeLinkColor}
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
                        activeColor={activeLinkColor}
                        as='h4'
                        href={RoutePath.Discover}
                        isActive={isDiscover}
                        title='Discover'
                      />
                      {/* <NavItemLink
                        activeColor={activeLinkColor}
                        as='h4'
                        href={RoutePath.Marketplace}
                        isActive={isMarketplace}
                        isComingSoon
                        disabled
                        title='Marketplace'
                      /> */}
                      {/* <NavItemLink
                        activeColor={activeLinkColor}
                        as='h4'
                        href={RoutePath.Invest}
                        isActive={isInvest}
                        isComingSoon
                        title='Invest'
                      /> */}
                      {!publicKey ? <NavConnectButton /> : null}
                    </div>
                    {user ? (
                      <div className='flex flex-col gap-6 border-t border-t-grey-400'>
                        <ProfileWidget user={user} />
                        <div className='flex flex-col gap-4'>
                          <NavItemLink
                            activeColor={activeLinkColor}
                            as='h4'
                            href={RoutePath.Library}
                            isActive={isLibrary}
                            title='My Library'
                          />
                          <NavItemLink
                            activeColor={activeLinkColor}
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
