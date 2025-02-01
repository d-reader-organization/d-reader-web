'use client'

import { Box, CircleHelp, Home, LogOut, Plus, Settings, User, Wallet } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { StudioLogo } from '../icons/logo/StudioLogo'
import { Divider } from '../shared/Divider'
import { RoutePath } from '@/enums/routePath'
import { usePathname } from 'next/navigation'

export function CreatorDashboardSidebar() {
  const pathname = usePathname()
  const isHome = pathname.startsWith(RoutePath.Discover)

  return (
    <Sidebar variant='inset' className='bg-grey-500 p-3'>
      <SidebarHeader className='w-full max-w-[180px] h-auto'>
        <StudioLogo />
      </SidebarHeader>
      <SidebarContent className='py-4'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild className='text-grey-100 hover:bg-grey-600 hover:text-white'>
              <Link href={RoutePath.Dashboard}>
                <Home className='h-5 w-5' />
                <Text styleVariant='body-normal' fontWeight='medium' as='span'>
                  Home {isHome ? 'active' : 'inactive'}
                </Text>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className='text-grey-100 hover:bg-grey-600 hover:text-white'>
              <Link href='#'>
                <Box className='h-5 w-5' />
                <Text styleVariant='body-normal' fontWeight='medium' as='span'>
                  My Products
                </Text>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className='text-grey-100 hover:bg-grey-600 hover:text-white'>
              <Link href='#'>
                <Wallet className='h-5 w-5' />
                <Text styleVariant='body-normal' fontWeight='medium' as='span'>
                  Payments
                </Text>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className='text-grey-100 hover:bg-grey-600 hover:text-white'>
              <Link href='#'>
                <User className='h-5 w-5' />
                <Text styleVariant='body-normal' fontWeight='medium' as='span'>
                  Profile
                </Text>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className='text-grey-100 hover:bg-grey-600 hover:text-white'>
              <Link href='#'>
                <CircleHelp className='h-5 w-5' />
                <Text styleVariant='body-normal' fontWeight='medium' as='span'>
                  Help Center
                </Text>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <Divider className='my-6' />
        <Button
          icon={Plus}
          className='w-full bg-yellow-300 text-base font-bold text-black border-5 border-yellow-400 hover:bg-yellow-200 hover:border-yellow-300'
        >
          Create New
        </Button>
      </SidebarContent>

      <SidebarFooter className='mt-auto'>
        <SidebarMenu className='border-1 border-grey-300 rounded-lg'>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className='text-grey-100 hover:bg-grey-600 hover:text-white'>
              <Link href='#'>
                <Settings className='h-5 w-5' />
                <Text styleVariant='body-normal' fontWeight='medium' as='span'>
                  Settings
                </Text>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className='text-grey-100 hover:bg-grey-600 hover:text-white'>
              <Link href='#'>
                <LogOut className='h-5 w-5' />
                <Text styleVariant='body-normal' fontWeight='medium' as='span'>
                  Log Out
                </Text>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <Button variant='outline' className='w-full flex flex-row justify-start gap-2 rounded-lg hover:bg-grey-700'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/placeholder.svg' />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <Text styleVariant='body-small' as='span' fontWeight='bold' className='text-grey-100'>
            John Smith
          </Text>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

export default CreatorDashboardSidebar
