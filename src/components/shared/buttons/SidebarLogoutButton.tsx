'use client'

import { logoutAction } from '@/app/lib/actions/auth/logout'
import { Text } from '@/components/ui/Text'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import React from 'react'
import { SidebarMenuButton } from '@/components/ui/sidebar'

export const SidebarLogoutButton: React.FC = () => {
  const { refresh } = useRouter()

  return (
    <SidebarMenuButton asChild className='text-grey-100 hover:bg-grey-600 hover:text-white'>
      <button
        onClick={() => {
          logoutAction()
          refresh()
        }}
      >
        <LogOut className='size-5' />
        <Text styleVariant='body-normal' fontWeight='medium' as='span'>
          Log out
        </Text>
      </button>
    </SidebarMenuButton>
  )
}
