import { Text } from '@/components/ui/Text'
import { ShareOnX } from './ShareOnX'

type Props = {
  title: string
}

export const LoseContent: React.FC<Props> = ({ title }) => (
  <div className='flex flex-col items-center justify-center gap-6 overflow-hidden min-h-screen sm:min-h-[640px] p-4'>
    <ShareOnX />
    <div className='flex flex-col max-w-[667px]'>
      <h1 className='text-white text-[56px] sm:text-[90px] font-bold leading-none font-obviouslyNarrow uppercase mt-12 text-center'>
        {title}
      </h1>
      <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100 text-center'>
        But hey, your dedication to spinning is truly inspiring.&nbsp;Spin again tomorrow — luck might show up then!
      </Text>
    </div>
  </div>
)
