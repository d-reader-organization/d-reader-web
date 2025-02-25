'use client'

import { RequireAuthWrapperButton, RequireAuthWrapperButtonProps } from '../shared/buttons/RequireAuthWrapperButton'
import { expressInterest } from '@/app/lib/api/campaign/mutations'
import { ExpressInterest } from '@/models/project'
import { toast } from '../ui'
import { useRouter } from 'next/navigation'
import { useToggle } from '@/hooks'
import { LoaderIcon } from '../icons/theme/LoaderIcon'
import { cn } from '@/lib/utils'

type Props = {
  slug: string
  amount: number
  toggleExpressedInterestDialog: VoidFunction
  isUserInterested?: boolean
  referralCode?: string | null
  className?: RequireAuthWrapperButtonProps['className']
}

export const ConfirmInterestButton: React.FC<Props> = ({
  slug,
  amount,
  referralCode,
  className,
  toggleExpressedInterestDialog,
}) => {
  const { refresh } = useRouter()

  const [showLoader, toggleLoader] = useToggle()

  const handleExpressInterest = async () => {
    toggleLoader()

    const request: ExpressInterest = { expressedAmount: amount, ref: referralCode }
    const { errorMessage } = await expressInterest({ slug, request })
    toggleLoader()

    if (errorMessage) {
      toast({ description: errorMessage, variant: 'error' })
      return
    }
    toggleExpressedInterestDialog()
    refresh()
  }

  return (
    <RequireAuthWrapperButton
      onClick={handleExpressInterest}
      Icon={showLoader ? LoaderIcon : undefined}
      variant='genesis'
      className={cn('w-full', className)}
    >
      {showLoader ? '' : 'Submit'}
    </RequireAuthWrapperButton>
  )
}
