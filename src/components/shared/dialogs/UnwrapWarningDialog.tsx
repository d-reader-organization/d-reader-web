'use client'

import { Text } from '@/components/ui'
import { Checkbox } from '@/components/ui/Checkbox'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
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
      <DialogContent
        aria-describedby=''
        className='flex flex-col justify-between gap-4 bg-grey-400 p-5 rounded-lg w-[95%] max-w-[400px]'
      >
        <div className='flex flex-col items-center gap-2'>
          <DialogTitle>Comic unwrapping</DialogTitle>
          <Text className='text-center' as='p' styleVariant='body-normal'>
            By unwrapping the comic, you&quot;ll be able to read it. This action is irreversible and will make the comic
            lose the mint condition.
          </Text>
        </div>
        <ConnectButton className='self-center w-full bg-important-color my-5 text-black' onClick={handleUnwrap}>
          {isLoading ? <LoaderIcon /> : 'Unwrap'}
        </ConnectButton>
        <div className='flex items-center justify-center space-x-2'>
          <Checkbox
            id='ask-again'
            checked={isDialogRead}
            onCheckedChange={(value) => {
              setIsDialogRead(!!value)
            }}
          />
          <label htmlFor='ask-again' className='text-base font-medium leading-5 cursor-pointer'>
            Accept terms and conditions
          </label>
        </div>
      </DialogContent>
    </Dialog>
  )
}
