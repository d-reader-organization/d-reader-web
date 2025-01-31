import React from 'react'
import { Text } from '../../ui/Text'
import { Button } from '../../ui/Button'
import { ButtonLink } from '../../ui/ButtonLink'
import { toast } from '../../ui/toast'
import { RoutePath } from '@/enums/routePath'
import { requestUserEmailVerification } from '@/app/lib/api/user/mutations'
import { Mail } from 'lucide-react'

type Props = {
  redirectTo: string | null
}

export const EmailVerificationContent: React.FC<Props> = ({ redirectTo }) => (
  <main className='container flex flex-col items-center max-w-md mb-8'>
    <Text as='h2' styleVariant='primary-heading' className='flex items-center text-center my-4 sm:my-8'>
      <Mail className='h-auto w-12 mr-2' />
      Check your mail
    </Text>
    <Text as='p' styleVariant='body-normal' className='text-center'>
      We&apos;ve sent you an email with instructions to verify and become eligible for rewards. Check your spam folder!
    </Text>
    <ButtonLink variant='primary' subVariant={1} className='w-fit mt-2' href={redirectTo ?? RoutePath.Home}>
      Next
    </ButtonLink>
    <div className='mt-4 flex flex-col items-center'>
      <p className='text-sm text-grey-100 text-center'>Didn&apos;t get the email?</p>
      <Button
        variant='ghost'
        size='md'
        className='w-fit text-important-color hover:brightness-150'
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
