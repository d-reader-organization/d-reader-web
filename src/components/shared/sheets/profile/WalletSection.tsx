'use client'

import React from 'react'
import { Power } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { ConnectButton } from '../../buttons/ConnectButton'
import { shortenSolanaAddress } from '@/utils/helpers'
import { WalletsIcon } from '@/components/icons/WalletsIcon'
import { WalletIcon } from '@/components/icons/sidebar/WalletIcon'
import { CopyButton } from '../../CopyButton'

export const WalletSection: React.FC = () => {
  const { publicKey } = useWallet()

  return publicKey ? (
    <ConnectedWalletBox address={publicKey.toBase58()} />
  ) : (
    <div className='rounded-xl bg-grey-500 flex flex-col items-center gap-6 p-4'>
      <div className='text-2xl font-normal leading-[28.8px]'>
        <span className='font-bold'>Quick connect&nbsp;</span>
        <span>your wallet.</span>
      </div>
      <WalletsIcon />
      <ConnectButton />
    </div>
  )
}

type ConnectedWalletBoxProps = { address: string }

export const ConnectedWalletBox: React.FC<ConnectedWalletBoxProps> = ({ address }) => {
  return (
    <div className='bg-grey-500 rounded-xl p-4 flex flex-col gap-2'>
      <span className='text-grey-200 text-base font-medium leading-[22.4px]'>Connected wallet</span>
      <div className='h-10 flex items-center justify-between'>
        <div className='flex gap-2'>
          <WalletIcon className='w-6 h-6' />
          <span className='text-base font-medium leading-[22.4px] text-white'>{shortenSolanaAddress({ address })}</span>
        </div>
        <div className='flex gap-1.5'>
          <CopyButton variant='button' clipboard={address} />
          <ConnectButton variant='outline' iconOnly Icon={Power} />
        </div>
      </div>
    </div>
  )
}
