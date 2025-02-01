'use client'
import React from 'react'
import { User } from '@/models/user'
import { ProfileWidget } from '../../ProfileWidget'
import { RoutePath } from '@/enums/routePath'
import { LogoutButton } from '../../buttons/LogoutButton'
import { ProductSocials } from '../../ProductSocials'
import { ConnectedWalletBox } from './WalletSection'
import { NavigationItem } from '@/components/layout/NavigationItem'
import { NavConnectButton } from '../../buttons/ConnectButton'
import { useWallet } from '@solana/wallet-adapter-react'

type AuthProfileContentProps = { user: User }

export const AuthProfileContent: React.FC<AuthProfileContentProps> = ({ user }) => {
  const { publicKey } = useWallet()

  return (
    <div className='flex flex-col justify-between h-full'>
      <div className='flex flex-col'>
        <ProfileWidget className='mb-[29px]' user={user} />
        <div className='flex flex-col gap-4 text-2xl font-bold leading-[28.8px] text-grey-100'>
          <NavigationItem href={RoutePath.Library} title='My Library' />
          <NavigationItem href={RoutePath.Profile} title='Settings' />
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
