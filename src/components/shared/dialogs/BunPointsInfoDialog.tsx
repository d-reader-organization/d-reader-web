import { Button, Text } from '@/components/ui'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import { BunPointsCollectionIcon } from '@/components/icons/genesis/BunPointsCollectionIcon'
import { DialogProps } from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

type Props = DialogProps & {
  toggleDialog: VoidFunction
  className?: string
}

export const BunPointsInfoDialog: React.FC<Props> = ({ open, toggleDialog, className }) => {
  return (
    <Dialog open={open} modal={false}>
      <DialogContent
        className={cn('max-w-[424px] shadow-none rounded-3xl sm:rounded-3xl p-5', className)}
        hideCloseIcon
        aria-describedby={undefined}
      >
        <DialogTitle asChild>
          <Text as='h3' styleVariant='primary-heading' className='text-center'>
            What are the Bun Points ?
          </Text>
        </DialogTitle>

        <div className='flex flex-col text-center items-center'>
          <BunPointsCollectionIcon className='scale-90' />
          <div className='flex flex-col gap-2'>
            <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
              Think of them as your <span className='font-bold text-white'>golden tickets to epic rewards</span> – earn
              them, stack them, and unlock awesome surprises!
            </Text>
            <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
              <span className='font-bold text-white'>More info coming soon</span>,<br />
              so stay tuned and <span className='font-bold text-white'>keep collecting!</span>
            </Text>
          </div>
        </div>

        <Button size='lg' variant='secondary' className='w-full' onClick={toggleDialog}>
          Got it!
        </Button>
      </DialogContent>
    </Dialog>
  )
}
