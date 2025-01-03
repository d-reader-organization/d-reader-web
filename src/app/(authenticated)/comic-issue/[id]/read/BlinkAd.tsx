'use client'

import React from 'react'
import '@dialectlabs/blinks/index.css'
import { useActionSolanaWalletAdapter } from '@dialectlabs/blinks/hooks/solana'
import { Blink, useAction } from '@dialectlabs/blinks'
import { useConnection } from '@solana/wallet-adapter-react'

export const BlinkAd: React.FC<{ url: string }> = ({ url }) => {
  const { connection } = useConnection()
  const { adapter } = useActionSolanaWalletAdapter(connection)
  const { action, isLoading } = useAction({ url })

  if (isLoading || !action) return null

  return <Blink action={action} adapter={adapter} stylePreset='custom' />
}

export default BlinkAd
