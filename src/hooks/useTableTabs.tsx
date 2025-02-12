import { JSX, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

type TableTabsHookResponse<T extends string> = {
  tab: T
  TableTabs: () => JSX.Element
}

export function useTableTabs<T extends string>(tabs: T[] = []): TableTabsHookResponse<T> {
  const [activeTab, setActiveTab] = useState(tabs[0])

  const TableTabs = () => (
    <div className='flex gap-1 border-grey-300 border-1 box-border rounded-xl px-1 items-center h-[42px]'>
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant={tab === activeTab ? 'secondary' : 'ghost'}
          onClick={() => setActiveTab(tab)}
          className={cn(tab === activeTab && 'text-white', 'h-8 font-bold w-[110px]')}
        >
          {tab}
        </Button>
      ))}
    </div>
  )

  return { tab: activeTab, TableTabs }
}
