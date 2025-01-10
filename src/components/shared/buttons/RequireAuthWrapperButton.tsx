'use client'

import { fetchMe } from '@/app/lib/api/user/queries'
import { Button, type ButtonProps } from '@/components/ui/Button'
import { useState, useTransition, type MouseEvent } from 'react'
import { RequireAuthDialog } from '../dialogs/RequireAuthenticationDialog'
import { useRouter } from 'next/navigation'
import { followCreator } from '@/app/lib/api/creator/mutations'

type Props = React.PropsWithChildren &
  ButtonProps & { onClick: (event: MouseEvent<HTMLButtonElement>) => Promise<void> | void } & {
    disabled?: boolean
    slug: string
  }

export const RequireAuthWrapperButton: React.FC<Props> = ({ children, onClick, slug, ...props }) => {
  const [showRequireAuthDialog, setShowRequireAuthDialog] = useState<boolean>(false)
  const [pending, startTransition] = useTransition()
  const { refresh } = useRouter()
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
      //await onClick(event)
      onClick(event)
      await followCreator(slug)
      refresh()
    })
  }

  return (
    <>
      <Button {...props} onClick={submitWrapper} disabled={pending}>
        {children}
      </Button>
      <RequireAuthDialog
        closeDialog={() => {
          setShowRequireAuthDialog(false)
        }}
        showDialog={showRequireAuthDialog}
      />
    </>
  )
}
