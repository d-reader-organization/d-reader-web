'use client'

import { Button } from '@/components/ui'
import { CircleSdkProvider, useCircleSdk } from '@/providers/CircleSdkProvider'

export default function CirclePage() {
  const {
    deviceId,
    onLogin,
    onGoogleLogin,
    createWalletAction,
    requestAndSignMessage,
    userToken,
    activeWallet,
    fetchAndSignTransaction,
  } = useCircleSdk()

  return (
    <CircleSdkProvider>
      (
      <div className='flex flex-col justify-center items-center gap-6'>
        <h1> Circle integration testing</h1>
        {deviceId ? null : (
          <div className='flex flex-col gap-4'>
            <Button
              onClick={async () => {
                await onGoogleLogin?.()
              }}
            >
              Login with Google
            </Button>
            <Button
              onClick={async () => {
                await onLogin?.()
              }}
            >
              Login with Email
            </Button>
          </div>
        )}
        {userToken ? (
          <div className='flex flex-col gap-4'>
            {!activeWallet ? (
              <Button
                onClick={() => {
                  createWalletAction?.()
                }}
              >
                Create wallet
              </Button>
            ) : null}
            {!!activeWallet ? (
              <div className='flex flex-col gap-4'>
                <Button
                  onClick={async () => {
                    const { address, id } = activeWallet
                    await requestAndSignMessage?.({ address, walletId: id })
                  }}
                >
                  Sign message
                </Button>
                <Button
                  onClick={async () =>
                    await fetchAndSignTransaction?.({
                      address: activeWallet.address,
                      walletId: activeWallet.id,
                    })
                  }
                >
                  Sign transaction
                </Button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      )
    </CircleSdkProvider>
  )
}
