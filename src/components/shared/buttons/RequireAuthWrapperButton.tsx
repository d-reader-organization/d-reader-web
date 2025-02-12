'use client'

import { fetchMe } from '@/app/lib/api/user/queries'
import { Button, type ButtonProps } from '@/components/ui/Button'
import { useState, useTransition, type MouseEvent } from 'react'
import { RequireAuthDialog } from '../dialogs/RequireAuthenticationDialog'

export type RequireAuthWrapperButtonProps = React.PropsWithChildren &
  ButtonProps & { onClick: (event: MouseEvent<HTMLButtonElement>) => Promise<void> | void }

//TODO: can we kill this component and instead have a 'requireAuth' prop flag on the Button component?
export const RequireAuthWrapperButton: React.FC<RequireAuthWrapperButtonProps> = ({ children, onClick, ...props }) => {
  const [showRequireAuthDialog, setShowRequireAuthDialog] = useState(false)
  const [pending, startTransition] = useTransition()
  const submitWrapper = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!onClick || pending) {
      return
    }
    startTransition(async () => {
      const me = await fetchMe()
      if (!me) {
        setShowRequireAuthDialog(true)
        return
      }
      await onClick(event)
    })
  }

  return (
    <>
      <Button {...props} onClick={submitWrapper}>
        {children}
      </Button>
      <RequireAuthDialog
        closeDialog={() => {
          setShowRequireAuthDialog(false)
        }}
        open={showRequireAuthDialog}
      />
    </>
  )
}
