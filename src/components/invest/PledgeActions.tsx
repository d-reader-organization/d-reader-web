import { Button } from '../ui/Button'

export const PledgeActions: React.FC = () => {
  return (
    <div className='flex flex-col items-center gap-4 min-w-60 md:min-w-96'>
      <Button variant='genesis' className='w-full'>
        Submit
      </Button>
      <Button variant='ghost' className='text-grey-100'>
        Cancel
      </Button>
    </div>
  )
}
