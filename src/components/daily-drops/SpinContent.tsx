import { DailyDropContentTitle } from './ContentTitle'
import { Text } from '@/components/ui/Text'
import { HorizontalSpinner } from './HorizontalSpinner'
import { Circle } from 'lucide-react'
import { useFetchActiveWheel } from '@/api/wheel/queries/useFetchActiveWheel'

type Props = {
  title: string
}

export const SpinContent: React.FC<Props> = ({ title }) => {
  const { data: activeWheel } = useFetchActiveWheel()
  return (
    <div className='flex flex-col items-center gap-6 overflow-hidden'>
      <DailyDropContentTitle title={title} />
      <Text as='span' styleVariant='body-normal' fontWeight='medium' className='text-grey-100 text-center'>
        Spin It to Win It - Your Daily Dose of Fortune!
        <br /> You can claim your daily drop once
        <Text as='span' styleVariant='body-normal' fontWeight='bold' className='text-white'>
          &nbsp;every 24 hours.
        </Text>
      </Text>
      <HorizontalSpinner />
      <LastClaimRow />
    </div>
  )
}

const Trophy: React.FC = () => (
  <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4.34521 0.584281L4.29276 0.584138C4.11014 0.5834 3.88515 0.58249 3.68693 0.65464C3.36287 0.772588 3.10759 1.02786 2.98964 1.35192C2.94303 1.47997 2.92691 1.61919 2.92154 1.75094L2.02888 1.75094C1.90636 1.75092 1.78699 1.75091 1.68544 1.75784C1.57439 1.76542 1.44272 1.78319 1.3062 1.83975C1.02033 1.95815 0.793211 2.18527 0.674801 2.47114C0.618251 2.60767 0.600474 2.73934 0.592897 2.85039C0.585969 2.95194 0.585981 3.0713 0.585993 3.19383L0.585965 3.58119C0.585714 4.04517 0.585527 4.38972 0.6655 4.68818C0.881257 5.4934 1.5102 6.12234 2.31542 6.3381C2.5374 6.39758 2.78489 6.41272 3.08804 6.41647C3.53596 7.92314 4.83001 9.0656 6.41927 9.29293V9.9176H6.16001C4.69237 9.9176 3.5026 11.1074 3.5026 12.575C3.5026 13.0404 3.87985 13.4176 4.3452 13.4176H9.66001C10.1254 13.4176 10.5026 13.0404 10.5026 12.575C10.5026 11.1074 9.31284 9.9176 7.8452 9.9176H7.58594V9.29293C9.17521 9.06561 10.4693 7.92314 10.9172 6.41647C11.2204 6.41272 11.4679 6.39758 11.6898 6.3381C12.4951 6.12234 13.124 5.4934 13.3398 4.68818C13.4197 4.38972 13.4196 4.04517 13.4193 3.58119L13.4193 3.19382C13.4193 3.0713 13.4193 2.95194 13.4124 2.85039C13.4048 2.73934 13.387 2.60767 13.3305 2.47114C13.2121 2.18527 12.9849 1.95815 12.6991 1.83975C12.5625 1.78319 12.4309 1.76542 12.3198 1.75784C12.2183 1.75091 12.0989 1.75092 11.9764 1.75094L11.0837 1.75094C11.0783 1.61919 11.0622 1.47997 11.0156 1.35192C10.8976 1.02786 10.6424 0.772588 10.3183 0.65464C10.1201 0.58249 9.89509 0.5834 9.71247 0.584138L9.66002 0.584281H4.34521ZM2.91928 3.38427C2.91928 3.22092 2.91928 3.13925 2.88749 3.07686C2.85953 3.02198 2.81491 2.97736 2.76003 2.94939C2.69764 2.9176 2.61597 2.9176 2.45262 2.9176L2.18633 2.9176C2.03224 2.9176 1.95519 2.9176 1.89447 2.94735C1.84177 2.97317 1.79647 3.01617 1.76793 3.06745C1.73506 3.12653 1.73116 3.20113 1.72336 3.35032C1.70499 3.70203 1.70686 4.06694 1.79241 4.38623C1.90029 4.78883 2.21476 5.10331 2.61737 5.21118C2.68666 5.22975 2.76906 5.23983 2.91928 5.24518V3.38427ZM11.0859 3.38618C11.0859 3.22223 11.0859 3.14025 11.1179 3.07773C11.146 3.02274 11.1908 2.97809 11.2459 2.95021C11.3086 2.91851 11.3906 2.91885 11.5545 2.91952L11.816 2.92058C11.9694 2.92121 12.0462 2.92152 12.1066 2.95133C12.1591 2.97721 12.2041 3.02009 12.2325 3.07123C12.2653 3.13013 12.2692 3.20449 12.2771 3.35321C12.2959 3.70543 12.2956 4.07749 12.2129 4.38623C12.105 4.78883 11.7905 5.10331 11.3879 5.21118C11.3186 5.22975 11.2362 5.23983 11.0859 5.24518V3.38618Z'
      fill='#EBEDF3'
    />
  </svg>
)

const LastClaimRow: React.FC = () => (
  <div className='p-4 w-full'>
    <div className='bg-grey-600 rounded-xl border border-grey-300 p-3.5 relative flex justify-between items-center w-full'>
      <div className='flex gap-3'>
        <Circle className='size-11 max-sm:hidden' />
        <div className='flex flex-col justify-center'>
          <Text as='span' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-sm'>
            mega_mattan
          </Text>
          <Text as='span' styleVariant='body-xsmall' fontWeight='medium' className='text-grey-200 max-sm:text-xxs'>
            2025-01-07
          </Text>
        </div>
      </div>
      <div className='flex gap-1.5 sm:gap-5 items-center flex-row-reverse sm:flex-row'>
        <div className='flex flex-col'>
          <Text as='h5' styleVariant='primary-heading' fontWeight='semibold' className='uppercase max-sm:text-base'>
            Free collectible
          </Text>
          <Text as='span' styleVariant='body-small' fontWeight='medium' className='text-grey-200 max-sm:text-xs'>
            The Recruits 1 of 1 Cover
          </Text>
        </div>
        <div className='size-9 sm:size-16 flex justify-center items-center rounded-xl border border-grey-300 bg-grey-400'>
          A
        </div>
      </div>
      <div className='absolute -top-3 -left-[1px] inline-flex py-1.5 px-2.5 max-h-[30px] items-center gap-2 bg-grey-600 border border-grey-300 rounded-t-lg rounded-br-lg'>
        <Trophy />
        <Text as='span' styleVariant='body-small' fontWeight='bold' className='text-grey-50'>
          Last claim
        </Text>
      </div>
    </div>
  </div>
)
