import { Button } from '../ui/Button'
import { cn } from '@/lib/utils'

type Props<T extends string> = {
  activeTab: T
  tabs: T[]
  onTabChange: (tab: T) => void
}

export const TableTabs = <T extends string>({ activeTab, onTabChange, tabs }: Props<T>) => {
  return (
    <div className='flex gap-1 border-grey-300 border-1 box-border rounded-xl px-1 items-center h-[42px]'>
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant={tab === activeTab ? 'secondary' : 'ghost'}
          onClick={() => {
            onTabChange(tab)
          }}
          className={cn(tab === activeTab && 'text-white', 'h-8 font-bold w-[110px]')}
        >
          {tab}
        </Button>
      ))}
    </div>
  )
}
