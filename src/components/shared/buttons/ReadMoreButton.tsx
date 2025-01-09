'use client'

import { useRouter } from 'next/navigation'
import { RequireAuthWrapperButton } from './RequireAuthWrapperButton'
import { cn } from '@/lib/utils'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  isBookmarked?: boolean
}

export const ReadMoreButton: React.FC<Props> = ({ className }) => {
  const { refresh } = useRouter()

  const handleSubmit = () => {
    refresh()
  }

  return (
    <RequireAuthWrapperButton
      variant='primary'
      subVariant={1}
      size='lg'
      onClick={handleSubmit}
      className={cn('w-full', className)}
    >
      Read more
    </RequireAuthWrapperButton>
  )
}
