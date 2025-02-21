'use client'

import useToggle from '@/hooks/useToggle'
import { Button } from '../ui/Button'
import { ExpressedInterestDialog } from '../shared/dialogs/ExpressedInterestDialog'
import { track } from '@vercel/analytics/react'

type Props = { slug: string; username: string }

export const PledgeActions: React.FC<Props> = ({ slug, username }) => {
  const [showExpressedInterestDialog, toggleExpressedInterestDialog] = useToggle()
  return (
    <>
      <div className='flex flex-col items-center gap-4 min-w-60 md:min-w-96'>
        <Button
          variant='genesis'
          className='w-full'
          onClick={() => {
            track('Submit Button Click')
            toggleExpressedInterestDialog()
          }}
        >
          Submit
        </Button>
        <Button variant='ghost' className='text-grey-100' onClick={() => track('Cancel Button Click')}>
          Cancel
        </Button>
      </div>
      {showExpressedInterestDialog && (
        <ExpressedInterestDialog
          slug={slug}
          username={username}
          open={showExpressedInterestDialog}
          toggleDialog={toggleExpressedInterestDialog}
        />
      )}
    </>
  )
}
