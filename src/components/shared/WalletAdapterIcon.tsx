import type { Wallet } from '@solana/wallet-adapter-react'
import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from 'react'
import React from 'react'

export interface WalletIconProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  adapter: Pick<Wallet['adapter'], 'icon' | 'name'> | null
}

export const WalletAdapterIcon: FC<WalletIconProps> = ({ adapter, ...props }) => {
  if (!adapter) return null
  return <img src={adapter.icon} alt={`${adapter.name} icon`} {...props} />
}
