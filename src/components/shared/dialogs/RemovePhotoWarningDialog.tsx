import {
  Dialog,
  DialogButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { Text } from '@/components/ui/Text'
import { CommonDialogProps } from '@/models/common'

type Props = { removePhoto: () => Promise<void>; isLoading: boolean } & CommonDialogProps

export const RemovePhotoWarningDialog: React.FC<Props> = ({ removePhoto, isLoading, open, toggleDialog }) => {
  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle asChild>
            <Text styleVariant='primary-heading' as='h3'>
              Remove avatar
            </Text>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>Are you sure you want to completely remove your profile picture?</DialogDescription>

        <DialogFooter>
          <DialogButton variant='secondary' onClick={toggleDialog}>
            Cancel
          </DialogButton>
          <DialogButton type='submit' disabled={isLoading} onClick={removePhoto}>
            Remove
          </DialogButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
