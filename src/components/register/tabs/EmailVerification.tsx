import React from 'react'
import { Text } from '../../ui/Text'
import MailIcon from 'public/assets/vector-icons/mail-icon.svg'
import { Button } from '../../ui/Button'
import { ButtonLink } from '../../ui/ButtonLink'
import { toast } from '../../ui/toast'
import { RoutePath } from '@/enums/routePath'
import { requestUserEmailVerification } from '@/app/lib/api/user/mutations'

type Props = {
  redirectTo: string | null
}

export const EmailVerificationContent: React.FC<Props> = ({ redirectTo }) => (
  <main className='container mb-4 md:mb-8 sm:p-0 flex flex-col max-w-md gap-4 items-center'>
    <Text as='h3' styleVariant='primary-heading' fontWeight='semibold' className='text-center pt-4 sm:mb-4'>
      Check your mail
    </Text>
    <div className='flex justify-center'>
      <MailIcon className='h-auto w-10 md:w-14' />
    </div>
    <Text as='p' styleVariant='body-normal' className='text-center'>
      Follow the simple instructions within the email to verify and become eligible for rewards. It might take up to 5
      minutes to receive the mail
    </Text>
    <ButtonLink variant='primary' subVariant={1} className='w-fit' href={redirectTo ?? RoutePath.Home}>
      Next
    </ButtonLink>
    <div className='mt-4 flex flex-col gap-4 items-center'>
      <p className='text-sm text-grey-100 text-center'>
        Didn&apos;t get the email?
        <br />
        Check your spam folder{/* before resending */}
      </p>
      <Button
        variant='primary'
        size='md'
        className='w-fit'
        onClick={async () => {
          const error = await requestUserEmailVerification()
          toast({
            description: error || 'Verification email sent, check your inbox!',
            variant: error ? 'error' : 'success',
          })
        }}
      >
        Resend email confirmation link
      </Button>
    </div>
  </main>
)
