import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { WHAT_IS_A_WALLET } from '@/constants/staticText'

export const WhyDoINeedAWalletDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='text-grey-100' variant='ghost'>
          Why do I need a wallet?
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-md'>
        <DialogHeader className='p-4'>
          <DialogTitle asChild>
            <Text styleVariant='primary-heading' as='h3'>
              What is a Digital Wallet?
            </Text>
          </DialogTitle>
          <DialogDescription className='text-left whitespace-pre-wrap'>{WHAT_IS_A_WALLET} </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
