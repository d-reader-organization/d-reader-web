'use client'

import React, { Suspense } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { useSearchParams } from 'next/navigation'
import { CreateAccountContent } from './tabs/CreateAccount'
import { ConnectWalletContent } from './tabs/ConnectWallet'
import { EmailVerificationContent } from './tabs/EmailVerification'
import { REDIRECT_TO_KEY } from '@/constants/general'
import { cn } from '@/lib/utils'

enum TabValue {
  createAccount = 'create-account',
  connectWallet = 'connect-wallet',
  verifyEmail = 'verify-email',
}

const defaultTabs = [
  { label: '01 Create account', value: TabValue.createAccount },
  { label: '02 Connect wallet', value: TabValue.connectWallet },
]

export const RegisterBody: React.FC = () => (
  <Suspense>
    <InnerRegisterBody />
  </Suspense>
)

const InnerRegisterBody: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>(TabValue.createAccount)
  const searchParams = useSearchParams()
  const isGoogleSignUp = (searchParams.get('sso') ?? '') === 'google'
  const redirectTo = searchParams.get(REDIRECT_TO_KEY)
  const tabs = [...defaultTabs, ...(isGoogleSignUp ? [] : [{ label: '03 Verify email', value: TabValue.verifyEmail }])]

  return (
    <Tabs defaultValue={defaultTabs.at(0)?.value} className='w-full' activationMode='manual' value={activeTab}>
      <TabsList className={`grid w-full grid-cols-${tabs.length} bg-transparent`}>
        {tabs.map((tab, index) => {
          return (
            <TabsTrigger
              className={cn(
                'cursor-default data-[state=active]:bg-transparent p-2 md:p-6 text-xs sm:text-base min-h-8 border-b border-b-grey-300 data-[state=active]:border-b data-[state=active]:border-b-grey-300',
                index !== tabs.length - 1 ? 'border-r border-r-grey-300' : ''
              )}
              key={tab.value}
              value={tab.value}
            >
              <span className={activeTab !== tab.value ? 'opacity-20 text-center w-full' : 'text-center w-full'}>
                {tab.label}
              </span>
            </TabsTrigger>
          )
        })}
      </TabsList>

      <TabsContent className='mt-0' value={TabValue.createAccount}>
        <CreateAccountContent isGoogleSignUp={isGoogleSignUp} onSuccess={() => setActiveTab(TabValue.connectWallet)} />
      </TabsContent>
      <TabsContent className='mt-0' value={TabValue.connectWallet}>
        <ConnectWalletContent isGoogleSignUp={isGoogleSignUp} onSkip={() => setActiveTab(TabValue.verifyEmail)} />
      </TabsContent>
      {tabs.length > 2 ? (
        <TabsContent className='mt-0' value={TabValue.verifyEmail}>
          <EmailVerificationContent redirectTo={redirectTo} />
        </TabsContent>
      ) : null}
    </Tabs>
  )
}
