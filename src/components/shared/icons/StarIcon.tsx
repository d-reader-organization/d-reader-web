import StarOutlinedIcon from 'public/assets/vector-icons/star-outlined-icon.svg'
import StarSolidIcon from 'public/assets/vector-icons/star-solid-icon.svg'
import clsx from 'clsx'

interface Props extends React.SVGProps<SVGSVGElement> {
  solid?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const StarIcon: React.FC<Props> = ({ solid = false, size = 'md', className, ...props }) => {
  const sharedClasses = {
    'h-[14px]': size === 'xs',
    'h-4': size === 'sm',
    'h-[18px]': size === 'md',
    'h-5': size === 'lg',
    'h-[22px]': size === 'xl',
  }

  if (solid) return <StarSolidIcon className={clsx(className, 'text-yellow-300', sharedClasses)} {...props} />
  else return <StarOutlinedIcon className={clsx(className, 'star-icon--outlined', sharedClasses)} {...props} />
}
