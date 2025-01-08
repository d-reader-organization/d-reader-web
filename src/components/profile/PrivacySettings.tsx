'use client'

import { Button } from '../ui/Button'
import { Text } from '../ui/Text'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { ArrowRightIcon } from 'lucide-react'
import { PrivacyConsentSwitch } from './ConsentSwitch'
import { toast } from '../ui/toast'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'
import { dataAnalyticsConsentSwitch, marketingConsentSwitch } from '@/constants/keys'
import { createConsentsAction } from '@/app/lib/actions/profile/create-consent'

type Props = {
  initialMarketingConsentGiven: boolean
  initialDataAnalyticsConsentGiven: boolean
}

export const PrivacySettings: React.FC<Props> = ({
  initialDataAnalyticsConsentGiven,
  initialMarketingConsentGiven,
}) => {
  const [state, action] = useFormState(
    createConsentsAction.bind(null, {
      isDataAnalyticsConsentGiven: initialDataAnalyticsConsentGiven,
      isMarketingConsentGiven: initialMarketingConsentGiven,
    }),
    null
  )
  const { refresh } = useRouter()

  useEffect(() => {
    if (!state) {
      return
    }
    if (state.status === 'INFO' && state.message) {
      toast({
        variant: 'default',
        description: state.message,
      })
      return
    }
    if (state.status === 'ERROR' && state.errorMessage) {
      toast({
        variant: 'error',
        description: state.errorMessage,
      })
    }
    if (state.status === 'SUCCESS' && state.message) {
      toast({
        variant: 'success',
        description: state.message,
      })
    }

    refresh()
  }, [state, refresh])

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
      <form className='flex flex-col gap-6' action={action}>
        <div className='flex flex-col gap-2'>
          <PrivacyConsentSwitch
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
        <div className='flex justify-end w-full gap-2 mt-2'>
          <Button variant='outline'>Cancel</Button>
          <SubmitButton />
        </div>
      </form>
    </div>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} type='submit'>
      Save
    </Button>
  )
}
