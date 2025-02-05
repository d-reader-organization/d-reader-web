'use client'

import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/Dialog'
import { GiftIcon } from 'lucide-react'
import { SpinContent } from './SpinContent'
import { WinContent } from './WinContent'
import { LoseContent } from './LoseContent'
import { useDailyDropsStore } from '@/providers/DailyDropsStoreProvider'
import { DailyDropContentType } from '@/stores/daily-drops-store'

export const DailyDropButton: React.FC = () => {
  const activeContent = useDailyDropsStore((state) => state.activeContent)

  const content: Record<DailyDropContentType, React.ReactNode> = {
    lose: <LoseContent title='CONGRATS! YOU&#39;VE WON...ABSOLUTELY NOTHING!' />,
    spin: <SpinContent title='Daily drops' />,
    win: <WinContent title='WOOHOOO!' />,
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button iconOnly icon={GiftIcon}></Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className='max-w-screen-md rounded-2xl border border-grey-300 bg-grey-500 max-h-screen sm:max-h-[700px] xl:max-h-[1000px] overflow-x-hidden p-0 scrollbar-none'
      >
        <div className='absolute -z-10 inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,#2F333E_0%,rgba(47,51,62,0.00)_78.77%)]'></div>
        <DialogTitle className='sr-only'>Spin the wheel</DialogTitle>
        {content[activeContent]}
      </DialogContent>
    </Dialog>
  )
}
