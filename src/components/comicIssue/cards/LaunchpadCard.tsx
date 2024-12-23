import { Text } from '@/components/ui'
import { RoutePath } from '@/enums/routePath'
import { LaunchpadModel } from '@/models/candyMachine'
import { abbreviateNumber } from '@/utils/numbers'
import { calculateRemaningSeconds, formatTime } from '@/utils/time'
import { Circle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  launchpadItem: LaunchpadModel
}

export const LaunchpadCard: React.FC<Props> = ({ launchpadItem }) => {
  return (
    <Link
      href={RoutePath.Mint(launchpadItem.id)}
      className='flex flex-col gap-4 min-w-[242px] max-w-[488px] w-full p-2 rounded-2xl border border-grey-300  hover:brightness-110'
    >
      <Image
        src={launchpadItem.image}
        alt={`Launchpad ${launchpadItem.issueTitle}`}
        width={470}
        height={220}
        className='rounded-xl max-h-[220px] h-auto w-full aspect-comic-banner'
      />
      <Text
        as='h4'
        title={launchpadItem.issueTitle}
        styleVariant='secondary-heading'
        className='line-clamp-1 text-ellipsis text-base sm:text-base md:text-24 px-2 sm:px-4'
      >
        {launchpadItem.issueTitle}
      </Text>
      <div className='flex justify-between items-center px-2 sm:px-4'>
        <InfoStats value={launchpadItem.price} name='price' suffix='SOL' />
        <InfoStats value={abbreviateNumber(launchpadItem.supply)} name='supply' />
        <InfoStats value={`${launchpadItem.minted}%`} name='minted' />
      </div>
      <LaunchpadState startsAt={launchpadItem.startsAt} />
    </Link>
  )
}

type InfoStatsProps = {
  name: string
  value: string | number
  suffix?: string
}
const InfoStats: React.FC<InfoStatsProps> = ({ name, value, suffix }) => (
  <div className='flex flex-col items-center gap-2'>
    <Text as='span' styleVariant='body-small' fontWeight='medium' className='text-grey-100 uppercase text-xs'>
      {name}
    </Text>
    <div className='flex items-center'>
      <Text as='span' styleVariant='body-normal' fontWeight='bold' className='text-sm'>
        {value}
      </Text>
      {!!suffix ? (
        <Text as='span' styleVariant='body-normal' fontWeight='bold' className='text-sm text-grey-100'>
          &nbsp;{suffix}
        </Text>
      ) : null}
    </div>
  </div>
)

type StateProps = {
  startsAt?: Date
}

const LaunchpadState: React.FC<StateProps> = ({ startsAt }) => {
  const { isDue, days, hours, minutes, seconds } = formatTime(
    calculateRemaningSeconds(startsAt?.toString()),
    startsAt?.toString()
  )

  const startsInString = () => {
    let startsInString = ''
    if (days) {
      startsInString = `${days}d `
    }
    if (hours) {
      startsInString += `${hours}h `
    }
    if (minutes) {
      startsInString += `${minutes}m `
    }
    if (!days && seconds) {
      startsInString += `${seconds}s`
    }
    return startsInString
  }

  return (
    <div className='h-[42px] p-2 flex justify-center items-center rounded-xl bg-black'>
      {isDue ? (
        <div className='flex justify-center items-center gap-2'>
          <Circle className='size-2 text-green-100 fill-green-100' />
          <Text as='span' styleVariant='body-normal' fontWeight='bold' className='text-green-100'>
            MINTING LIVE
          </Text>
        </div>
      ) : (
        <div className='flex items-center'>
          <Text as='span' styleVariant='body-small' fontWeight='medium' className='text-grey-100 text-xs'>
            Start&nbsp;
          </Text>
          <Text as='span' styleVariant='body-normal' fontWeight='bold' className='text-sm'>
            {startsInString()}
          </Text>
        </div>
      )}
    </div>
  )
}
