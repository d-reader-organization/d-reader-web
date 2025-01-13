import { cn } from '@/lib/utils'
import { Text } from '../ui'

interface Props {
  label: string
  value: string | number | undefined
}

export const StatsContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div
    className={cn(
      'flex flex-col gap-5 p-4 border rounded-xl border-grey-300 w-full h-min sm:max-w-[282px] sm:p-6',
      className
    )}
    {...props}
  >
    {children}
  </div>
)

export const StatsItem: React.FC<Props> = ({ label, value }) => (
  <div className='flex justify-between'>
    <Text as='span' styleVariant='body-small' fontWeight='medium' className='text-grey-100 uppercase max-sm:text-xs'>
      {label}
    </Text>
    <Text as='span' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-sm'>
      {value}
    </Text>
  </div>
)
