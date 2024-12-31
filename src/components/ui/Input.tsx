import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    {...props}
    className={cn(
      'flex items-center max-h-10 rounded-[10px] bg-white bg-opacity-15 gap-2 p-3 font-medium placeholder:text-grey-200 placeholder:text-sm placeholder:font-medium',
      props.type === 'password' && 'placeholder:translate-y-1',
      className
    )}
    ref={ref}
  />
))

Input.displayName = 'Input'

export { Input }
