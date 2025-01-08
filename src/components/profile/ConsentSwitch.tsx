import { Switch } from '../ui/Switch'
import { Text } from '../ui/Text'

type Props = {
  defaultChecked: boolean
  name: string
  title: string
}

export const PrivacyConsentSwitch: React.FC<Props> = ({ defaultChecked, name, title }) => {
  return (
    <div className='flex justify-between'>
      <Text as='h6' styleVariant='secondary-heading'>
        {title}
      </Text>
      <Switch name={name} defaultChecked={defaultChecked} />
    </div>
  )
}
