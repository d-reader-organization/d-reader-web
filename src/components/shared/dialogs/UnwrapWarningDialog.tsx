'use client'

import { Text } from '@/components/ui'
import { Checkbox } from '@/components/ui/Checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { CommonDialogProps } from '@/models/common'
import { ConnectButton } from '../buttons/ConnectButton'
import { LoaderIcon } from '../../icons/theme/LoaderIcon'
import { LOCAL_STORAGE } from '@/constants/general'

type Props = { handleUnwrap: () => Promise<void>; isLoading: boolean } & CommonDialogProps

export const UnwrapWarningDialog: React.FC<Props> = ({ handleUnwrap, isLoading, open, toggleDialog }) => {
  const [isDialogRead, setIsDialogRead] = useLocalStorage(LOCAL_STORAGE.IS_UNWRAP_HINT_READ, false)
  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent aria-describedby='' className='max-w-md'>
        <DialogHeader>
          <DialogTitle asChild>
            <Text styleVariant='primary-heading' as='h3'>
              Comic unwrapping
            </Text>
          </DialogTitle>
          <DialogDescription>
            To read the comic, we need to break its digital seal (&apos;unwrap&apos; it). This action is irreversible
            and will make the comic lose the mint condition.
          </DialogDescription>
        </DialogHeader>

        <div className='flex items-center justify-center space-x-2'>
          <Checkbox
            id='ask-again'
            checked={isDialogRead}
            onCheckedChange={(value) => {
              setIsDialogRead(!!value)
            }}
          />
          <label htmlFor='ask-again' className='text-base font-medium leading-5 cursor-pointer'>
            I understand!
          </label>
        </div>

        <ConnectButton Icon={isLoading ? LoaderIcon : undefined} variant='primary' onClick={handleUnwrap}>
          Unwrap!
        </ConnectButton>
      </DialogContent>
    </Dialog>
  )
}
