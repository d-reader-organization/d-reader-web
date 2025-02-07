import { cn } from '@/lib/utils'
import { StarIcon } from 'lucide-react'

type Props = {
  solid?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

// TODO: instead use <Button Icon={StarIcon} iconOnly />
export const StarIconButton: React.FC<Props> = ({ solid = false, size = 'md', className, ...props }) => {
  return (
    <button {...props}>
      <StarIcon
        className={cn(className, solid && 'text-yellow-300 fill-yellow-300', {
          'h-[14px]': size === 'xs',
          'h-4': size === 'sm',
          'h-4.5': size === 'md',
          'h-5': size === 'lg',
          'h-[22px]': size === 'xl',
        })}
      />
    </button>
  )
}
