import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Text } from './Text'

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <div className='w-full flex'>
    {props.prefix && (
      <div className='bg-grey-500 text-grey-200 py-[10px] pl-[14px] pr-3 rounded-tl-lg rounded-bl-lg max-h-[60px]'>
        <Text as='p' styleVariant='body-normal' className='font-bold'>
          {props.prefix}
        </Text>
      </div>
    )}
    <input
      {...props}
      className={cn(
        'flex items-center w-full max-h-[42px] rounded-[10px] bg-grey-300 bg-opacity-30 gap-2 p-3 font-medium placeholder:text-grey-200 placeholder:text-sm placeholder:font-medium',
        props.type === 'password' && 'placeholder:translate-y-1',
        props.prefix && 'rounded-l-none',
        className
      )}
      ref={ref}
    />
  </div>
))

Input.displayName = 'Input'

export { Input }
