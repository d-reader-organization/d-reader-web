import { cn } from '@/lib/utils'
import { RequireAuthWrapperButton, RequireAuthWrapperButtonProps } from '../shared/buttons/RequireAuthWrapperButton'
import { expressInterest } from '@/app/lib/api/invest/mutations'
import { ExpressInterest } from '@/models/project'
import { toast } from '../ui'
import { useRouter } from 'next/navigation'

type Props = {
  slug: string
  amount: number
  isUserInterested?: boolean
  referralCode?: string | null
  className?: RequireAuthWrapperButtonProps['className']
}

export const ConfirmInterestButton: React.FC<Props> = ({ slug, className, isUserInterested, amount, referralCode }) => {
  const { refresh } = useRouter()

  const handleExpressInterest = async () => {
    const request: ExpressInterest = { expressedAmount: amount, referralCode }
    const { errorMessage } = await expressInterest({ slug, request })

    if (errorMessage) {
      toast({ description: errorMessage, variant: 'error' })
      return
    }

    refresh()
  }

  return (
    <RequireAuthWrapperButton
      onClick={handleExpressInterest}
      className={cn(
        isUserInterested
          ? 'text-white bg-grey-500 border-2 border-white pointer-events-none'
          : 'text-grey-600 bg-green-genesis border-green-300 hover:brightness-100',
        className
      )}
    >
      {isUserInterested ? 'Interested!' : 'Express interest'}
    </RequireAuthWrapperButton>
  )
}
