'use client'

import { createUserConsent } from '@/app/lib/api/user/mutations'
import { Switch } from '../ui/Switch'
import { Text } from '../ui/Text'
import { ConsentType } from '@/models/user'
import { useRouter } from 'next/navigation'

type Props = {
  consentType: ConsentType
  defaultChecked: boolean
  name: string
  title: string
}

export const PrivacyConsentSwitch: React.FC<Props> = ({ consentType, defaultChecked, name, title }) => {
  const { refresh } = useRouter()
  return (
    <div className='flex justify-between'>
      <Text as='h6' styleVariant='secondary-heading'>
        {title}
      </Text>
      <Switch
        onCheckedChange={async (value) => {
          await createUserConsent({
            consentType,
            isConsentGiven: value,
          })
          refresh()
        }}
        name={name}
        defaultChecked={defaultChecked}
      />
    </div>
  )
}
