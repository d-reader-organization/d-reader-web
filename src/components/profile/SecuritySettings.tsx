import React from 'react'
import { UpdatePasswordForm } from '../form/UpdatePasswordForm'
import { Text } from '../ui'
import { fetchMe } from '@/app/lib/api/user/queries'
import { ResetPasswordButton } from '../shared/buttons/ResetPasswordButton'
import { LockKeyholeIcon } from 'lucide-react'

export const SecuritySettings: React.FC = async () => {
  const me = await fetchMe()
  if (!me) return null
  const { id, hasPassword } = me

  if (hasPassword) return <UpdatePasswordForm id={id} />

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <Text as='h4' styleVariant='secondary-heading'>
          Log in
        </Text>
        <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-200 font-medium'>
          How you log in into dReader
        </Text>
      </div>

      <div className='flex items-start border border-grey-300 p-5 rounded-xl gap-7 max-w-[607px]'>
        <div className='border border-grey-300 p-4 rounded-lg'>
          <LockKeyholeIcon className='size-5 text-white' />
        </div>

        <div className='flex flex-col gap-1'>
          <Text as='p' styleVariant='body-normal' fontWeight='bold' className='text-[18px] leading-[25.2px]'>
            Password
          </Text>
          <Text as='p' styleVariant='body-normal' className='text-grey-200 font-medium'>
            You don&apos;t have a password set up. To add a password to your account for the first time, use the&nbsp;
            <ResetPasswordButton />
            &nbsp;flow.
          </Text>
        </div>
      </div>
    </div>
  )
}
