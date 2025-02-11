import { useDashboardStore } from '@/providers/DashboardStoreProvider'
import { Button } from '../ui/Button'
import { cn } from '@/lib/utils'

/* 
Changing tab should have different set of data
For example Comic has different sort options, while issues should have SORT_OPTIONS.Issues
*/

export const TableTabs: React.FC = () => {
  const { activeTab, tabs, handleTabChange } = useDashboardStore((state) => state)
  return (
    <div className='flex gap-1 border-grey-300 border-1 box-border rounded-xl px-1 items-center h-[42px]'>
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant={tab === activeTab ? 'secondary' : 'ghost'}
          onClick={() => handleTabChange(tab)}
          className={cn(tab === activeTab && 'text-white', 'h-8 font-bold w-[110px]')}
        >
          {tab}
        </Button>
      ))}
    </div>
  )
}
