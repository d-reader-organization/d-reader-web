import { cn } from '@/lib/utils'
import { RequireAuthWrapperButton, RequireAuthWrapperButtonProps } from '../shared/buttons/RequireAuthWrapperButton'
import { expressInterest } from '@/app/lib/api/invest/mutations'
import { ExpressInterest } from '@/models/project'
import { toast } from '../ui'
import { useRouter } from 'next/navigation'
import { useToggle } from '@/hooks'
import { LoaderIcon } from '../icons/theme/LoaderIcon'

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
  className,
  isUserInterested,
  amount,
  referralCode,
  toggleExpressedInterestDialog,
}) => {
  const { refresh } = useRouter()

  const [showLoader, toggleLoader] = useToggle()

  const handleExpressInterest = async () => {
    toggleLoader()

    // TODO: why are we passing the referral code here? are these referrals campaign-scoped?
    const request: ExpressInterest = { expressedAmount: amount, referralCode }
    const { errorMessage } = await expressInterest({ slug, request })
    toggleLoader()

    if (errorMessage) {
      toast({ description: errorMessage, variant: 'error' })
      return
    }
    toggleExpressedInterestDialog()
    refresh()
  }

  const text = isUserInterested ? '👍 Selected' : 'Express interest'
  return (
    <RequireAuthWrapperButton
      onClick={handleExpressInterest}
      Icon={showLoader ? LoaderIcon : undefined}
      variant={isUserInterested ? 'secondary' : 'primary'}
      className={cn(
        className,
        'flex flex-col w-full p-[14px] justify-center items-center self-stretch rounded-xl md:p-4',
        !isUserInterested && 'text-grey-600 bg-green-genesis border-green-300 hover:brightness-100'
      )}
    >
      {text}
    </RequireAuthWrapperButton>
  )
}
