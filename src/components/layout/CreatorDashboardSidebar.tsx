import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Divider } from '../shared/Divider'
import { RoutePath } from '@/enums/routePath'
import { SidebarMenuLink } from './SidebarMenuLink'
import { StudioLogoIcon } from '@/components/icons/logo/StudioLogoIcon'
import { HomeIcon } from '@/components/icons/sidebar/HomeIcon'
import { ProductIcon } from '@/components/icons/sidebar/ProductIcon'
import { WalletIcon } from '@/components/icons/sidebar/WalletIcon'
import { ProfileIcon } from '@/components/icons/sidebar/ProfileIcon'
import { HelpCenterIcon } from '@/components/icons/sidebar/HelpCenterIcon'
import { SettingsIcon } from '@/components/icons/sidebar/SettingsIcon'
import { SidebarLogoutButton } from '../shared/buttons/SidebarLogoutButton'
import { fetchMe } from '@/app/lib/api/user/queries'
import { PlusIcon } from '../icons/theme/PlusIcon'

type Props = {
  activePath?: string
}

export async function CreatorDashboardSidebar({ activePath }: Props) {
  const me = await fetchMe()

  if (!me) return null

  return (
    <Sidebar variant='inset' className='bg-grey-500 p-3'>
      <SidebarHeader className='w-full max-w-[180px] h-auto'>
        <StudioLogoIcon />
      </SidebarHeader>
      <SidebarContent className='py-6'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuLink
              isActive={activePath === RoutePath.Dashboard}
              href={RoutePath.Dashboard}
              title='Home'
              Icon={HomeIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink
              isActive={activePath === RoutePath.DashboardProducts}
              href={RoutePath.DashboardProducts}
              title='My Products'
              Icon={ProductIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink
              isActive={activePath === RoutePath.DashboardPayments}
              href={RoutePath.DashboardPayments}
              title='Payments'
              Icon={WalletIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink
              isActive={activePath === RoutePath.DashboardProfile}
              href={RoutePath.DashboardProfile}
              title='Profile'
              Icon={ProfileIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink
              isActive={activePath === RoutePath.DashboardHelpCenter}
              href={RoutePath.DashboardHelpCenter}
              title='Help Center'
              Icon={HelpCenterIcon}
            />
          </SidebarMenuItem>
        </SidebarMenu>

        <Divider className='my-6' />
        <Button
          Icon={PlusIcon}
          className='w-full bg-yellow-300 text-base font-bold text-black border-5 border-yellow-400 hover:bg-yellow-200 hover:border-yellow-300'
        >
          Create New
        </Button>
      </SidebarContent>

      <SidebarFooter className='mt-auto'>
        <SidebarMenu className='border-1 border-grey-300 rounded-lg'>
          <SidebarMenuItem>
            <SidebarMenuLink
              isActive={activePath === RoutePath.DashboardSettings}
              href={RoutePath.DashboardSettings}
              title='Settings'
              Icon={SettingsIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarLogoutButton />
          </SidebarMenuItem>
        </SidebarMenu>

        <Button variant='outline' className='w-full flex flex-row justify-start gap-2 rounded-lg hover:bg-grey-700'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={me.avatar} />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <Text styleVariant='body-small' as='span' fontWeight='bold' className='text-grey-100'>
            {me.displayName}
          </Text>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

export default CreatorDashboardSidebar
