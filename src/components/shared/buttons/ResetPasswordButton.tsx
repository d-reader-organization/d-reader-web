'use client'

import { Button, Text } from '@/components/ui'
import useToggle from '@/hooks/useToggle'
import { ResetPasswordDialog } from '../dialogs/ResetPasswordDialog'

export const ResetPasswordButton: React.FC = () => {
  const [open, toggleDialog] = useToggle()

  return (
    <>
      <Button
        className='inline text-grey-100 !p-0 h-min w-fit hover:brightness-150'
        variant='ghost'
        onClick={toggleDialog}
      >
        <Text
          as='span'
          styleVariant='body-normal'
          className='text-important-color underline underline-offset-4 font-medium'
        >
          password reset
        </Text>
      </Button>
      <ResetPasswordDialog open={open} toggleDialog={toggleDialog} />
    </>
  )
}
