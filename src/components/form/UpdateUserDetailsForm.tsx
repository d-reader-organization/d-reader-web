import React, { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { updateUserValidationSchema } from '@/constants/schemas'
import { updateUser } from '@/app/lib/api/user/mutations'
import { Input, Text, toast } from '../ui'
import { useToggle } from '@/hooks'
import { useRouter } from 'next/navigation'
import { Divider } from '../shared/Divider'
import { Loader } from '../shared/Loader'

type Props = {
  id: number | string
  name: string
  username: string
  email: string
}

export const UpdateUserDetailsForm: React.FC<Props> = ({ id, name, email, username }) => {
  return (
    <div className='flex flex-col gap-4'>
      {['Display Name', 'Username', 'Email'].map((title, index) => {
        const value = title === 'Email' ? email : title === 'Username' ? username : name

        return (
          <React.Fragment key={title}>
            <UserDetailsFormItem title={title} value={value} id={id} />
            {index < 2 && <Divider />}
          </React.Fragment>
        )
      })}
    </div>
  )
}

type FormItemProps = {
  title: string
  value: string
  id: string | number
}

const UserDetailsFormItem: React.FC<FormItemProps> = ({ value, title, id }) => {
  const [showLoader, toggleLoader] = useToggle()
  const [showEditItem, toggleEditItem] = useToggle()
  const [item, setItem] = useState<string>()

  const { refresh } = useRouter()

  useEffect(() => {
    setItem(value)
  }, [value])

  const field = title === 'Email' ? 'email' : title === 'Username' ? 'username' : 'name'
  const handleItemUpdate = async () => {
    toggleLoader()

    const data = { [field]: item }
    updateUserValidationSchema.parse(data)
    const { errorMessage } = await updateUser(id, data)
    if (errorMessage) {
      toast({ description: errorMessage, variant: 'error' })
    } else {
      toast({ description: 'Profile details updated !', variant: 'success' })
      refresh()
    }
    toggleLoader()
    toggleEditItem()
  }

  const isUsername = title === 'Username'
  return (
    <div className='flex flex-col gap-[10px]'>
      <Text as='p' styleVariant='body-normal' className='font-bold'>
        {title}
      </Text>

      {showEditItem ? (
        <div className='flex gap-2 w-full'>
          <Input
            onChange={(e) => setItem(e.target.value)}
            value={item}
            type='default'
            placeholder={value}
            className='w-full max-w-full'
          />

          <Button variant='secondary' size='md' onClick={toggleEditItem}>
            Cancel
          </Button>
          <Button variant='white' size='md' onClick={handleItemUpdate}>
            {showLoader ? <Loader /> : 'Save'}
          </Button>
        </div>
      ) : (
        <div className='flex justify-between items-center'>
          <Text as='p' styleVariant='body-normal' className='break-all'>
            {isUsername ? `@${value}` : value}
          </Text>

          <Button variant='secondary' size='md' onClick={toggleEditItem}>
            Edit
          </Button>
        </div>
      )}
    </div>
  )
}
