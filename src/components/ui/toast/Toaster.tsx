'use client'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast/Toast'
import { useToast } from '@/components/ui/toast/use-toast'

const TOAST_DURATION_IN_MILISECONDS = 4000

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider duration={TOAST_DURATION_IN_MILISECONDS}>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className='grid gap-1'>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport className='translate-y-[-100%]' />
    </ToastProvider>
  )
}
