import { SadFaceIcon } from '../icons/theme/SadFaceIcon'
import { Button, Text } from '../ui'
import { ButtonLink } from '../ui/ButtonLink'

type Props = {
  redirectPath?: string
  href?: string
}

export const EmptyReferral: React.FC<Props> = async ({ redirectPath, href }) => {
  return (
    <div className='flex gap-4 p-4 justify-between bg-grey-500 rounded-xl'>
      <div className='flex items-center gap-2'>
        <div className='pt-2 pl-2 flex items-center rounded-md bg-grey-400 p-1 h-10 w-10'>
          <SadFaceIcon className='size-7 text-grey-200' />
        </div>
        <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
          No referrals yet...{' '}
        </Text>
      </div>
      {redirectPath ? (
        <Button size='md' variant='outline'>
          Show campaigns
        </Button>
      ) : href ? (
        <ButtonLink size='md' variant='outline' href={href}>
          Share Referral link
        </ButtonLink>
      ) : null}
    </div>
  )
}
