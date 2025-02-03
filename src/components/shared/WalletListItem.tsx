import { WalletReadyState } from '@solana/wallet-adapter-base'
import type { Wallet } from '@solana/wallet-adapter-react'
import type { FC, MouseEventHandler } from 'react'
import React from 'react'
import { WalletAdapterButton } from './buttons/WalletAdapterButton'
import { WalletAdapterIcon } from './WalletAdapterIcon'

export interface WalletListItemProps {
  handleClick: MouseEventHandler<HTMLButtonElement>
  tabIndex?: number
  wallet: Wallet
}

export const WalletListItem: FC<WalletListItemProps> = ({ handleClick, tabIndex, wallet }) => {
  return (
    <li>
      <WalletAdapterButton
        onClick={handleClick}
        startIcon={<WalletAdapterIcon adapter={wallet.adapter} />}
        tabIndex={tabIndex}
      >
        {wallet.adapter.name}
        {wallet.readyState === WalletReadyState.Installed && <span>Detected</span>}
      </WalletAdapterButton>
    </li>
  )
}
