import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/Button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
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
import { ChevronDownIcon } from '../icons/theme/ChevronDownIcon'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { LogoSymbolIcon } from '../icons/logo/LogoSymbolIcon'

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
        {/* TODO (Josip & Luka): finalize these styles. Sidebar is not shown on Mobile?!?! */}
        <SidebarTrigger className='absolute top-0 -right-6 shadow-none bg-grey-500 rounded-l-none' />

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
          <SidebarMenuItem>
            <SidebarMenuLink
              isActive={activePath === RoutePath.Home}
              href={RoutePath.Home}
              title='Back to App'
              Icon={LogoSymbolIcon}
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
        <Collapsible>
          <CollapsibleContent animate={false}>
            <SidebarMenu className='border-1 border-grey-300 rounded-lg mb-2'>
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
          </CollapsibleContent>

          <CollapsibleTrigger asChild>
            <Button
              Icon={ChevronDownIcon}
              iconPosition='right'
              size='lg'
              variant='outline'
              className='w-full flex flex-row justify-between gap-2 rounded-lg h-12 hover:bg-grey-700'
            >
              <div className='flex flex-row items-center gap-2'>
                <Avatar className='size-8'>
                  <AvatarImage src={me.avatar} />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                {me.displayName}
              </div>
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </SidebarFooter>
    </Sidebar>
  )
}

export default CreatorDashboardSidebar
