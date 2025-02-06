'use client'

import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { User } from '@/models/user'
import React from 'react'
import { AuthProfileContent } from './AuthProfileContent'
import { GuestProfileContent } from './GuestProfileContent'
import { cn } from '@/lib/utils'

type ProfileSheetProps = {
  isOpen: boolean
  user?: User | null
  triggerOpenChange: (open: boolean) => void
}

// TODO: kill this and use the MobileNavigation Sheet approach
export const ProfileSheet: React.FC<ProfileSheetProps> = ({ isOpen, user, triggerOpenChange }) => (
  <div className='max-md:hidden'>
    <Sheet open={isOpen} onOpenChange={triggerOpenChange}>
      <SheetTitle className='sr-only'>Open menu</SheetTitle>
      <SheetContent
        aria-describedby={undefined}
        side='right'
        className='p-6 flex flex-col h-full w-full bg-grey-600 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)] max-w-[420px]'
        onInteractOutside={() => {
          triggerOpenChange(false)
        }}
      >
        {!!user ? <AuthProfileContent user={user} /> : <GuestProfileContent />}
      </SheetContent>
    </Sheet>
    <div
      className={cn(
        'fixed inset-0 bg-transparent  backdrop-blur-[25px] z-40 transition-all duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      aria-hidden='true'
    />
  </div>
)
