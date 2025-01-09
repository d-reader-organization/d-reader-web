import { Text } from '../ui/Text'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { ArrowRightIcon } from 'lucide-react'
import { PrivacyConsentSwitch } from './ConsentSwitch'
import { dataAnalyticsConsentSwitch, marketingConsentSwitch } from '@/constants/keys'
import { ConsentType } from '@/models/user'

type Props = {
  initialMarketingConsentGiven: boolean
  initialDataAnalyticsConsentGiven: boolean
}

export const PrivacySettings: React.FC<Props> = ({
  initialDataAnalyticsConsentGiven,
  initialMarketingConsentGiven,
}) => {
  return (
    <div className='flex flex-col gap-6'>
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
          name={marketingConsentSwitch}
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
          name={dataAnalyticsConsentSwitch}
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
        <ArrowRightIcon size={20} />
      </Link>
    </div>
  )
}
