'use client'

import { useToggle } from '@/hooks'
import { TokenIcon } from '../icons/logo/TokenIcon'
import { BunPointsInfoDialog } from '../shared/dialogs/BunPointsInfoDialog'
import { Button, Text } from '../ui'
import { ButtonLink } from '../ui/ButtonLink'
import { Card } from '../ui/card'
import { HelperIcon } from '../icons/theme/HelperIcon'
import { ShareIconV2 } from '../icons/theme/ShareIconV2'

export function ReferralCard({ twitterIntent }: { twitterIntent: string }) {
  const [showDialog, toggleDialog] = useToggle()

  return (
    <>
      <Card className='flex flex-col gap-4 bg-blue-300 rounded-xl border-none shadow-xl p-4'>
        <div className='flex flex-col bg-[#727CAC66] rounded-xl justify-center p-6 gap-4'>
          {/* Header */}
          <div className='flex justify-between'>
            <div className='flex gap-1'>
              <Text as='h2' styleVariant='primary-heading' className='text-white'>
                BUN POINTS
              </Text>

              <Button className='min-w-fit h-fit md:mt-1' variant='ghost' onClick={toggleDialog}>
                <HelperIcon className='text-grey-100 h-5 w-5 md:h-6 md:w-6 ' />
              </Button>
            </div>
            <div className='flex gap-2'>
              <Text as='h2' styleVariant='primary-heading' fontWeight='bold' className='text-important-color'>
                0
              </Text>
              <TokenIcon className='sm:h-10 sm:w-9 h-5 w-4' />
            </div>
          </div>

          {/* Description */}
          <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-white max-w-[354px]'>
            Spread the fun and get rewarded when new users join or show interest in Genesis campaigns.
          </Text>
        </div>
        {/* Share Button */}
        <ButtonLink variant='white' size='lg' href={twitterIntent || ''} target='_blank'>
          <ShareIconV2 className='w-5 h-5' />
          <Text as='span' styleVariant='body-normal' fontWeight='bold'>
            Share referral code
          </Text>
        </ButtonLink>
      </Card>
      <BunPointsInfoDialog toggleDialog={toggleDialog} open={showDialog} className='xl:left-[75%] top-[60%]' />
    </>
  )
}
