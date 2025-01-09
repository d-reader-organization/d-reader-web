import { startTransition } from 'react'

export function onSubmitPreventFormListener(action: (payload: FormData) => void) {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    startTransition(() => {
      action(new FormData(event.currentTarget))
    })
  }

  return onSubmit
}
