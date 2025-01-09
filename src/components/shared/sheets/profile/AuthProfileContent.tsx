'use client'

import { User } from '@/models/user'
import React from 'react'
import { ProfileWidget } from '../../ProfileWidget'
import { RoutePath } from '@/enums/routePath'
import { LogoutButton } from '../../buttons/LogoutButton'
import { ProductSocials } from '../../ProductSocials'
import { ConnectedWalletBox } from './WalletSection'
import { NavItemLink } from '@/components/layout/NavItemLink'
import { usePathname } from 'next/navigation'
import { NavConnectButton } from '../../buttons/ConnectButton'
import { useWallet } from '@solana/wallet-adapter-react'

type AuthProfileContentProps = { user: User }

export const AuthProfileContent: React.FC<AuthProfileContentProps> = ({ user }) => {
  const pathname = usePathname()
  const isLibrary = pathname.startsWith(RoutePath.Library)
  const isProfile = pathname.startsWith(RoutePath.Profile)
  const isInvest = pathname.startsWith(RoutePath.Invest)
  const activeLinkColor = isInvest ? 'text-green-genesis' : 'text-yellow-300'
  const { publicKey } = useWallet()

  return (
    <div className='flex flex-col justify-between h-full'>
      <div className='flex flex-col'>
        <ProfileWidget className='mb-[29px]' user={user} />
        <div className='flex flex-col gap-4 text-2xl font-bold leading-[28.8px] text-grey-100'>
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
          {publicKey ? null : <NavConnectButton />}
        </div>
      </div>
      <div className='flex flex-col gap-6'>
        {publicKey ? <ConnectedWalletBox address={publicKey.toBase58()} /> : null}
        <LogoutButton />
        <ProductSocials />
      </div>
    </div>
  )
}
