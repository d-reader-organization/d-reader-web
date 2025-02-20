'use client'

import { Text } from '@/components/ui/Text'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import { GoogleSignInButton } from '../buttons/GoogleSignInButton'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Divider } from '../Divider'
import { usePathname, useSearchParams } from 'next/navigation'
import { withRedirect } from '@/lib/utils'
import { MailIcon } from '@/components/icons/theme/MailIcon'
import { track } from '@vercel/analytics/react'

type Props = {
  open?: boolean
  closeDialog: () => void
}

export const RequireAuthDialog: React.FC<Props> = ({ open = false, closeDialog }) => {
  const params = useSearchParams()
  const pathname = usePathname() + (params ? `?${params.toString()}` : '')

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          closeDialog()
        }
      }}
    >
      <DialogContent
        hideCloseIcon
        aria-describedby={undefined}
        className='flex flex-col items-center sm:gap-6 max-w-[360px]'
      >
        <DialogTitle className='sr-only'>Needs authentication dialog</DialogTitle>
        <Text as='h5' styleVariant='secondary-heading'>
          Sign up to continue!
        </Text>
        <div className='flex flex-col gap-6 w-full'>
          <div className='flex flex-col gap-4'>
            <GoogleSignInButton
              buttonText='Continue with Google'
              className='justify-start'
              onClick={() => track('Auth Dialog - Google Click')}
            />
            <ButtonLink
              className='justify-start'
              href={withRedirect(RoutePath.Register, pathname)}
              variant='outline'
              size='lg'
              Icon={MailIcon}
              solid
              onClick={() => track('Auth Dialog - Register Click')}
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
              terms of service
            </Link>
          </div>
        </div>
        <Divider />
        <div className='flex justify-center items-center'>
          <Text as='span' styleVariant='body-normal' fontWeight='bold' className='text-grey-100'>
            Already have an account?&nbsp;
          </Text>
          <Link
            className='underline text-white'
            href={withRedirect(RoutePath.Login, pathname)}
            onClick={() => track('Auth Dialog - Login Click')}
          >
            Log in
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
