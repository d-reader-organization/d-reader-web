'use client'

import { Project } from '@/models/project'
import { Button } from '../ui/Button'
import { ConfirmInterestButton } from './ConfirmInterestButton'
import { ExpressedInterestDialog } from '../shared/dialogs/ExpressedInterestDialog'
import { useToggle } from '@/hooks'
import { useSearchParams } from 'next/navigation'
import { REFERRAL_CODE_KEY } from '@/constants/general'

type Props = { project: Project; username: string }

export const PledgeActions: React.FC<Props> = ({ project, username }) => {
  const [showExpressedInterestDialog, toggleExpressedInterestDialog] = useToggle(false)
  const searchParams = useSearchParams()
  const ref = searchParams.get(REFERRAL_CODE_KEY)
  return (
    <>
      <div className='flex flex-col items-center gap-4 min-w-60 md:min-w-96'>
        <ConfirmInterestButton
          slug={project.slug}
          amount={10}
          referralCode={ref}
          toggleExpressedInterestDialog={toggleExpressedInterestDialog}
        />
        <Button variant='ghost' className='text-grey-100'>
          Cancel
        </Button>
      </div>
      <ExpressedInterestDialog
        slug={project.slug}
        username={username}
        open={showExpressedInterestDialog}
        toggleDialog={toggleExpressedInterestDialog}
      />
    </>
  )
}
