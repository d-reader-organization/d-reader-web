import { cn } from '@/lib/utils'
import { RequireAuthWrapperButton, RequireAuthWrapperButtonProps } from '../shared/buttons/RequireAuthWrapperButton'
import { expressInterest } from '@/app/lib/api/invest/mutations'
import { ExpressInterest } from '@/models/project'
import { toast } from '../ui'
import { useRouter } from 'next/navigation'
import { useToggle } from '@/hooks'
import { LoaderIcon } from '../icons/theme/LoaderIcon'
import { fetchTwitterIntentExpressedInterest } from '@/app/lib/api/twitter/queries'

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
  const { data: twitterIntent } = fetchTwitterIntentExpressedInterest(slug)

  const handleExpressInterest = async () => {
    toggleLoader()

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

  const text = isUserInterested ? 'Share on 𝕏!' : 'Express interest'
  const href = twitterIntent || ''
  return (
    <RequireAuthWrapperButton
      onClick={
        isUserInterested
          ? () => {
              window.open(href, '_blank')
              return
            }
          : handleExpressInterest
      }
      className={cn(
        className,
        'flex flex-col w-full h-full max-h-[52px] p-[14px] justify-center items-center self-stretch rounded-xl md:p-4',
        isUserInterested
          ? 'text-white bg-grey-500 border-2 border-white'
          : 'text-grey-600 bg-green-genesis border-green-300 hover:brightness-100'
      )}
    >
      {showLoader ? <LoaderIcon /> : text}
    </RequireAuthWrapperButton>
  )
}
