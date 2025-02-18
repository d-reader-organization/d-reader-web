import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { fetchMe, fetchUserWallets } from '@/app/lib/api/user/queries'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { Text } from '@/components/ui'
import { WalletSettings } from '@/components/profile/WalletSettings'
import { AccountSettings } from '@/components/profile/AccountSettings'
import { SecuritySettings } from '@/components/profile/SecuritySettings'
import { FaqSettings } from '@/components/profile/FaqSettings'
import { PrivacySettingsWrapper } from '@/components/profile/PrivacySettingsWrapper'
import { ReferralSettings } from '@/components/profile/ReferralSettings'

async function ProfilePage() {
  const me = await fetchMe()
  if (!me?.id) {
    return null
  }
  const wallets = await fetchUserWallets(me.id)
  const tabTriggerClass =
    'text-start text-grey-200 font-bold text-sm sm:text-base border-none data-[state=active]:text-white md:p-0 p-0'

  return (
    <BaseLayout>
      <div className='flex flex-col justify-start w-full max-w-[1200px] gap-5'>
        <Text as='h1' styleVariant='primary-heading' className=''>
          Settings
        </Text>
        <Tabs defaultValue='1' className='flex justify-end max-sm:flex-col max-sm:gap-10'>
          <TabsList className='flex gap-7 w-full sm:max-w-52 items-start justify-start flex-col text-left max-sm:flex-row max-sm:gap-4 overflow-x-scroll scrollbar-none'>
            <TabsTrigger value='1' className={tabTriggerClass}>
              <Text as='h4' styleVariant='secondary-heading'>
                Account
              </Text>
            </TabsTrigger>
            <TabsTrigger value='5' className={tabTriggerClass}>
              <Text as='h4' styleVariant='secondary-heading'>
                Referrals
              </Text>
            </TabsTrigger>
            <TabsTrigger value='2' className={tabTriggerClass}>
              <Text as='h4' styleVariant='secondary-heading'>
                Wallet
              </Text>
            </TabsTrigger>
            <TabsTrigger value='3' className={tabTriggerClass}>
              <Text as='h4' styleVariant='secondary-heading'>
                Security
              </Text>
            </TabsTrigger>
            <TabsTrigger value='4' className={tabTriggerClass}>
              <Text as='h4' styleVariant='secondary-heading'>
                Privacy
              </Text>
            </TabsTrigger>
            <TabsTrigger value='6' className={tabTriggerClass}>
              <Text as='h4' styleVariant='secondary-heading'>
                FAQ
              </Text>
            </TabsTrigger>
          </TabsList>

          <div className='w-full'>
            <TabsContent value='1' className='m-0'>
              <AccountSettings />
            </TabsContent>
            <TabsContent value='2' className='m-0'>
              <WalletSettings wallets={wallets} />
            </TabsContent>
            <TabsContent value='3' className='m-0'>
              <SecuritySettings />
            </TabsContent>
            <TabsContent value='4' className='m-0'>
              <PrivacySettingsWrapper />
            </TabsContent>
            <TabsContent value='5' className='m-0'>
              <ReferralSettings />
            </TabsContent>
            <TabsContent value='6' className='m-0'>
              <FaqSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </BaseLayout>
  )
}

export default ProfilePage
