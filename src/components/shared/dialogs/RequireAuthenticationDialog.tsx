'use client'

import { Text } from '@/components/ui/Text'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import { GoogleSignInButton } from '../buttons/GoogleSignInButton'
import { Mail } from 'lucide-react'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Divider } from '../Divider'
import { usePathname } from 'next/navigation'
import { withRedirect } from '@/lib/utils'

type Props = {
  showDialog?: boolean
  closeDialog: () => void
}

export const RequireAuthDialog: React.FC<Props> = ({ showDialog = false, closeDialog }) => {
  const pathname = usePathname()
  return (
    <Dialog
      open={showDialog}
      onOpenChange={(open) => {
        if (!open) {
          closeDialog()
        }
      }}
    >
      <DialogContent
        showCloseIcon={false}
        aria-describedby={undefined}
        className='py-6 px-4 flex flex-col items-center gap-4 sm:gap-6 bg-grey-500 border-t border-t-grey-300 rounded-2xl max-w-[360px]'
      >
        <DialogTitle className='sr-only'>Needs authentication dialog</DialogTitle>
        <Text as='h5' styleVariant='secondary-heading'>
          Sign up to continue!
        </Text>
        <div className='flex flex-col gap-6 w-full'>
          <div className='flex flex-col gap-4'>
            <GoogleSignInButton buttonText='Continue with Google' className='justify-start' />
            <ButtonLink
              className='justify-start'
              href={withRedirect(RoutePath.Register, pathname)}
              variant='outline'
              size='lg'
              icon={Mail}
            >
              Continue with Email
            </ButtonLink>
          </div>
          <div className='flex justify-center items-center'>
            <Text as='span' styleVariant='body-xsmall' fontWeight='medium' className='text-grey-200'>
              By signing up you agree to the&nbsp;
            </Text>
            <Link
              target='_blank'
              prefetch={false}
              className='text-xs font-medium text-grey-100 underline'
              href={RoutePath.TermsOfService}
            >
              terms
            </Link>
          </div>
        </div>
        <Divider />
        <div className='flex justify-center items-center'>
          <Text as='span' styleVariant='body-normal' fontWeight='bold' className='text-grey-100'>
            Already have an account?&nbsp;
          </Text>
          <Link className='underline text-white' href={withRedirect(RoutePath.Login, pathname)}>
            Log in
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
