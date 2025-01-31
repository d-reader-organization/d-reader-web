import { cn } from '@/lib/utils'
import { StarIcon } from 'lucide-react'

type Props = {
  solid?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const StarIconButton: React.FC<Props> = ({ solid = false, size = 'md', className, ...props }) => {
  const sharedClasses = {
    'h-[14px]': size === 'xs',
    'h-4': size === 'sm',
    'h-[18px]': size === 'md',
    'h-5': size === 'lg',
    'h-[22px]': size === 'xl',
  }

  return (
    <button {...props}>
      {solid ? (
        <StarIcon className={cn(className, 'text-yellow-300 fill-yellow-300', sharedClasses)} />
      ) : (
        <StarIcon className={cn(className, sharedClasses)} />
      )}
    </button>
  )
}
