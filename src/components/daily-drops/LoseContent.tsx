import { DailyDropContentTitle } from './ContentTitle'
import { Text } from '@/components/ui/Text'

type Props = {
  title: string
}

export const LoseContent: React.FC<Props> = ({ title }) => (
  <div className='flex flex-col items-center justify-center gap-6 overflow-hidden min-h-screen sm:min-h-[640px] p-4 sm:p-6'>
    <DailyDropContentTitle title={title} />
    <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100 text-center'>
      But hey, your dedication to spinning is truly inspiring.&nbsp;Spin again tomorrow — luck might show up then!
    </Text>
  </div>
)
