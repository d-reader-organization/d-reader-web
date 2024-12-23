import { AudienceType } from '@/enums/audienceType'
import React from 'react'
import { Text } from '../ui'

type Props = {
  audience: AudienceType
}

const agePerAudience = (audience: AudienceType) => {
  switch (audience) {
    case AudienceType.Everyone:
      return '12'
    case AudienceType.Teen:
      return '13'
    case AudienceType.TeenPlus:
      return '16'
    case AudienceType.Mature:
      return '18'
    default:
      return '12'
  }
}

export const AudienceWidget: React.FC<Props> = ({ audience }) => (
  <div className='flex items-center justify-center p-1 rounded-full border-2 border-orange-400 size-6'>
    <Text as='span' styleVariant='body-xsmall' fontWeight='bold' className='text-orange-400'>
      {agePerAudience(audience)}
    </Text>
  </div>
)
