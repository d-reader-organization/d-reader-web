import { Text } from '../ui/Text'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { PrivacyConsentSwitch } from './ConsentSwitch'
import { USER_CONSENT } from '@/constants/general'
import { ConsentType } from '@/models/user'
import { ArrowRightIcon } from '../icons/theme/ArrowRightIcon'

type Props = {
  initialMarketingConsentGiven: boolean
  initialDataAnalyticsConsentGiven: boolean
}

export const PrivacySettings: React.FC<Props> = ({
  initialDataAnalyticsConsentGiven,
  initialMarketingConsentGiven,
}) => {
  return (
    <div className='flex flex-col gap-6 max-w-[750px]'>
      <div className='flex flex-col gap-2'>
        <Text as='h4' styleVariant='secondary-heading'>
          Safety & Privacy
        </Text>
        <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-200 font-medium'>
          Manage how we use data to personalise your dReader experience, and control how we can interact with you. To
          learn more, visit our Privacy Policy & Terms of Service.
        </Text>
      </div>
      <div className='flex flex-col gap-2'>
        <PrivacyConsentSwitch
          consentType={ConsentType.Marketing}
          defaultChecked={initialMarketingConsentGiven}
          name={USER_CONSENT.MARKETING}
          title='Marketing and Advertisement'
        />
        <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-200 font-medium'>
          Allow dReader to send promotional emails for upcoming sales and events.
        </Text>
      </div>
      <div className='flex flex-col gap-2'>
        <PrivacyConsentSwitch
          consentType={ConsentType.DataAnalytics}
          defaultChecked={initialDataAnalyticsConsentGiven}
          name={USER_CONSENT.DATA_ANALYTICS}
          title='Data Analytics'
        />
        <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-200 font-medium'>
          We don’t actually analyse user data, this button is pretty much useless at the moment.
        </Text>
      </div>
      <Link className='flex justify-between mt-2' href={RoutePath.PrivacyPolicy} target='_blank'>
        <Text as='h6' styleVariant='secondary-heading'>
          Revise Privacy Policy
        </Text>
        <ArrowRightIcon className='size-5' />
      </Link>
    </div>
  )
}
