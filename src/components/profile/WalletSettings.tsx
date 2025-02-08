'use client'

import React, { useEffect, useState } from 'react'
import { getTokenPrice, shortenString } from '@/utils/helpers'
import { Button, Text } from '../ui'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { ConnectButton } from '../shared/buttons/ConnectButton'
import { disconnectUserWallet } from '@/app/lib/api/auth/mutations'
import { Wallet } from '@/models/wallet'
import { useRouter } from 'next/navigation'
import { PublicKey } from '@solana/web3.js'
import { useAuthorizeWalletContext } from '@/providers/AuthorizeWalletContextProvider'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/DropdownMenu'
import { CopyButton } from '../shared/CopyButton'
import { LoaderIcon } from '@/components/icons/theme/LoaderIcon'
import { DotsHorizontalIcon } from '@/components/icons/theme/DotsHorizontalIcon'
import { PlusIcon } from '@/components/icons/theme/PlusIcon'
import { CircleIcon } from '@/components/icons/theme/CircleIcon'

type Props = {
  wallets: Wallet[]
}

export const WalletSettings: React.FC<Props> = ({ wallets }) => {
  const { isAuthorizing } = useAuthorizeWalletContext()
  const { publicKey, connecting } = useWallet()
  const isLoading = isAuthorizing || connecting

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2 max-w-[617px]'>
        <Text as='h4' styleVariant='secondary-heading'>
          Linked Wallets
        </Text>
        <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-200'>
          If you use more than one wallet, you can link them below to see all your collectibles in one place.
        </Text>
      </div>
      <div className='flex flex-col gap-2'>
        {wallets.map((wallet, index) => (
          <WalletItem
            key={index}
            wallet={wallet}
            index={index + 1}
            isActive={publicKey?.toString() == wallet.address}
          />
        ))}
        <ConnectButton
          variant='secondary'
          size='md'
          Icon={isLoading ? LoaderIcon : PlusIcon}
          className={`flex gap-2 bg-grey-300 text-grey-100 ${isLoading ? 'cursor-not-allowed' : ''}`}
          disabled={isLoading}
          triggerReconnect
        >
          Link another wallet
        </ConnectButton>
      </div>
    </div>
  )
}

export const WalletItem: React.FC<{ index: number; wallet: Wallet; isActive: boolean }> = ({
  index,
  wallet,
  isActive,
}) => {
  const { disconnect } = useWallet()
  const { connection } = useConnection()
  const [balance, setBalance] = useState<number>()
  const { refresh } = useRouter()

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const publicKey = new PublicKey(wallet.address)
        const lamports = await connection.getBalance(publicKey)
        const solBalance = getTokenPrice(lamports, 9)

        setBalance(solBalance)
      } catch (error) {
        console.error('Error fetching wallet balance:', error)
        setBalance(0)
      }
    }

    fetchWalletBalance()
  }, [connection, wallet.address])

  const disconnectWallet = async () => {
    await Promise.all([disconnect(), disconnectUserWallet(wallet.address)])
    refresh()
  }

  return (
    <div className='flex justify-between items-center p-4 rounded-xl border border-grey-300'>
      <div className='flex gap-4'>
        <div className='flex flex-col gap-2 border-r border-r-grey-300 pr-4 justify-start'>
          <div className='flex items-center'>
            {isActive && <CircleIcon className='text-important-color size-2 mr-2' solid />}
            <Text as='p' styleVariant='body-normal' fontWeight='bold'>
              Wallet {index}
            </Text>
          </div>
          <div className='flex gap-4 text-grey-100'>
            <Text as='p' styleVariant='body-normal' className='w-[100px]'>
              {shortenString(wallet.address)}
            </Text>
            <CopyButton variant='inline' clipboard={wallet.address} />
          </div>
        </div>
        <Text as='p' styleVariant='body-normal' fontWeight='medium' className='self-center'>
          {balance} SOL
        </Text>
      </div>
      <WalletItemOptions disconnect={disconnectWallet} />
    </div>
  )
}

const WalletItemOptions: React.FC<{ disconnect: VoidFunction }> = ({ disconnect }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button Icon={DotsHorizontalIcon} iconOnly variant='ghost' />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button variant='ghost' onClick={disconnect} className='shadow-none'>
            Remove Wallet
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
