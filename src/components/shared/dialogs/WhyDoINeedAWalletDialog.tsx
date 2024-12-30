import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { WHAT_IS_A_WALLET } from '@/constants/staticText'

export const WhyDoINeedAWalletDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='text-grey-100' variant='ghost'>
          Why do I need a wallet?
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[480px] max-h-[380px] p-2 whitespace-pre-wrap'>
        <strong className='mt-2'>What is a Digital Wallet?</strong>
        {WHAT_IS_A_WALLET}
      </DialogContent>
    </Dialog>
  )
}
