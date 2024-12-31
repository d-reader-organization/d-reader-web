import { Button } from '@/components/ui'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import { CommonDialogProps } from '@/models/common'
import { Loader } from '../Loader'

type Props = { removePhoto: () => Promise<void>; isLoading: boolean } & CommonDialogProps

export const RemovePhotoWarningDialog: React.FC<Props> = ({ removePhoto, isLoading, open, toggleDialog }) => {
  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent
        showCloseIcon={false}
        aria-describedby=''
        className='flex flex-col justify-between gap-2 bg-grey-400 p-2 rounded-lg max-w-[500px]'
      >
        <DialogTitle>Are you sure you want to remove your bun ?</DialogTitle>
        <Button className='self-center bg-important-color my-5 text-black w-fit' onClick={removePhoto}>
          {isLoading ? <Loader /> : 'Remove'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
