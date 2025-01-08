import { DefaultCreatorCard } from '../creator/cards/DefaultCard'
import { Creator } from '@/models/creator'

interface Props {
  creators: Creator[]
}

export const CreatorsContent: React.FC<Props> = ({ creators }) => (
  <>
    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8 sm:pt-3'>
      {creators.map((creator) => (
        <DefaultCreatorCard key={creator.slug} creator={creator} />
      ))}
    </div>
  </>
)
