'use client'

import { WalletName } from '@solana/wallet-adapter-base'
import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui'
import { Wallet } from '@solana/wallet-adapter-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, ButtonProps } from '../../ui/Button'
import { WalletListItem } from '../WalletListItem'
import { cn } from '@/lib/utils'
import { Text } from '../../ui/Text'
import { useAuthorizeWalletContext } from '@/providers/AuthorizeWalletContextProvider'
import { useToggle } from '@/hooks'
import '@solana/wallet-adapter-react-ui/styles.css'

type Props = {
  text?: string
  onClick?: () => Promise<void>
  triggerReconnect?: boolean
} & ButtonProps

/**
 * Making custom wallet buttons sucks af on Solana...
 * Why can't we have wallet sessions like on Mobile Wallet Adapter?
 * https://github.com/solana-labs/wallet-adapter/tree/master/packages/core/react */
export const ConnectButton: React.FC<Props> = ({ onClick, triggerReconnect, text, children, className, ...props }) => {
  const [actionTriggered, setActionTriggered] = useState(false)
  const [isReconnectClicked, toggleReconnectClick] = useToggle()

  useAuthorizeWalletContext()

  const [walletModalConfig, setWalletModalConfig] = useState<Readonly<{
    onSelectWallet(walletName: WalletName): void
    wallets: Wallet[]
  }> | null>(null)

  const { buttonState, onConnect, onSelectWallet, onDisconnect } = useWalletMultiButton({
    onSelectWallet: setWalletModalConfig,
  })

  const label = useMemo(() => {
    if (text) return text
    else {
      switch (buttonState) {
        case 'connected':
          return 'Disconnect'
        case 'connecting':
          return 'Connecting'
        case 'disconnecting':
          return 'Disconnecting'
        case 'has-wallet':
          return 'Connect'
        case 'no-wallet':
          return 'Select Wallet'
      }
    }
  }, [buttonState, text])

  const handleClick = useCallback(async () => {
    switch (buttonState) {
      case 'connected':
        if (onClick) {
          await onClick()
        } else if (onDisconnect) {
          onDisconnect()
          if (triggerReconnect) {
            toggleReconnectClick()
          }
        }
        break
      case 'has-wallet':
        if (onConnect) onConnect()
        setActionTriggered(true)
        break
      case 'no-wallet': {
        if (onSelectWallet) onSelectWallet()
        setActionTriggered(true)
        break
      }
    }
  }, [buttonState, onClick, onConnect, onDisconnect, onSelectWallet, toggleReconnectClick, triggerReconnect])

  useEffect(() => {
    if (isReconnectClicked && buttonState == 'no-wallet' && onSelectWallet) {
      onSelectWallet()
      setActionTriggered(true)
      toggleReconnectClick()
    }
  }, [buttonState, onSelectWallet, isReconnectClicked, toggleReconnectClick])

  useEffect(() => {
    if (buttonState == 'has-wallet' && onConnect) {
      onConnect()
      setActionTriggered(true)
    }
  }, [buttonState, onConnect])

  const handleAsyncAction = useCallback(async () => {
    try {
      if (onClick) await onClick()
    } finally {
      setActionTriggered(false)
    }
  }, [onClick])

  useEffect(() => {
    if (buttonState === 'connected' && actionTriggered) {
      handleAsyncAction()
    }
  }, [actionTriggered, buttonState, handleAsyncAction])

  return (
    <>
      <Button className={cn('py-5', className)} variant='outline' size='md' onClick={handleClick} {...props}>
        {children || <span className='leading-[22.4px]'>{label}</span>}
      </Button>
      {/* This dialog will break af if the user clicks the "close" icon on the wallet selection menu
			This is due to the fact that wallet-adapter has a few poorly exported states/components and we can't do anything about it */}
      {/* {walletModalConfig ? <WalletModal /> : null} */}

      {walletModalConfig ? (
        <div className='wallet-adapter-modal wallet-adapter-modal-fade-in wallet-dialog'>
          <div
            className='wallet-adapter-modal-container'
            onClick={(e) => e.currentTarget === e.target && setWalletModalConfig(null)}
          >
            <div className='wallet-adapter-modal-wrapper'>
              <button
                onClick={() => {
                  setWalletModalConfig(null)
                }}
                className='wallet-adapter-modal-button-close'
              >
                <svg width='14' height='14'>
                  <path d='M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z' />
                </svg>
              </button>
              <h1 className='wallet-adapter-modal-title'>Connect a wallet</h1>
              <ul className='wallet-adapter-modal-list'>
                {walletModalConfig.wallets.map((wallet) => (
                  <WalletListItem
                    key={wallet.adapter.name}
                    handleClick={() => {
                      walletModalConfig.onSelectWallet(wallet.adapter.name)
                      setWalletModalConfig(null)
                    }}
                    wallet={wallet}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export const NavConnectButton: React.FC = () => (
  <ConnectButton
    className='p-0 sm:p-0 justify-start border-none text-20 sm:text-24 font-bold leading-tight font-satoshi tracking-normal h-7 sm:h-7 py-0 sm:py-0'
    text='Connect wallet'
  >
    <Text as='h4' styleVariant='secondary-heading' className='hover:text-white'>
      Connect wallet
    </Text>
  </ConnectButton>
)
