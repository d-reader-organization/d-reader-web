import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { fetchMe, fetchUserWallets } from '@/app/lib/api/user/queries'
import { UserWalletSection } from '@/components/profile/UserWalletSection'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { AccountSettingSection } from '@/components/profile/AccountSettingSection'
import FAQ from '@/components/profile/FAQ'
import { Text } from '@/components/ui'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'

async function ProfilePage() {
  const me = await fetchMe()
  if (!me?.id) {
    return null
  }
  const wallets = await fetchUserWallets(me.id)

  return (
    <BaseLayout>
      <main className='w-full max-w-[1200px] mx-auto'>
        <Tabs defaultValue='1'>
          <TabsList className='border-b-2 border-grey-300 w-full flex gap-4 justify-start'>
            <TabsTrigger value='1' className='tab-button text-white font-bold text-sm sm:text-base'>
              Account
            </TabsTrigger>
            <TabsTrigger value='2' className='tab-button text-white font-bold text-sm sm:text-base'>
              Wallets
            </TabsTrigger>
            <TabsTrigger value='3' className='tab-button text-white font-bold text-sm sm:text-base'>
              Security
            </TabsTrigger>
            <TabsTrigger value='4' className='tab-button text-white font-bold text-sm sm:text-base'>
              FAQ
            </TabsTrigger>
            <TabsTrigger value='5' className='tab-button text-white font-bold text-sm sm:text-base'>
              On/Off Ramp
            </TabsTrigger>
          </TabsList>
          <TabsContent value='1'>{me && <AccountSettingSection user={me} />}</TabsContent>
          <TabsContent value='2'>{me && <UserWalletSection wallets={wallets} />}</TabsContent>
          <TabsContent value='3'>
            <div className='px-2'>
              <div className='py-8'>
                <h2 className='text-2xl font-bold'>Security & Privacy</h2>
                <Text as='p' styleVariant='body-normal' className='text-gray-400 italic'>
                  Change your security settings and review the privacy policy{' '}
                  <Link target='_' href={RoutePath.PrivacyPolicy} className='text-important-color underline font-bold'>
                    here
                  </Link>
                </Text>
              </div>
            </div>
          </TabsContent>
          <TabsContent value='4'>
            <FAQ />
          </TabsContent>
          <TabsContent value='5'>
            <iframe src='/ramp' className='w-full h-[700px] border-0'></iframe>
          </TabsContent>
        </Tabs>
      </main>
    </BaseLayout>
  )
}

export default ProfilePage
