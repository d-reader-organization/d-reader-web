type Props = {
  message?: string
}

export const FormErrorMessage: React.FC<Props> = ({ message }) => {
  if (!message) return null

  return <p className='text-red-600'>{message}</p>
}
