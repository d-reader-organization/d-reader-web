import { cn } from '@/lib/utils'
import { Project, ProjectCreator } from '@/models/project'
import { AvatarImage } from '@/components/shared/AvatarImage'

type Props = {
  creator: ProjectCreator
  tags: Project['tags']
}

export const ProjectCreatorSection: React.FC<Props> = ({ creator, tags }) => {
  return (
    <section className='flex flex-col w-full justify-between gap-3 py-4 md:items-center md:flex-row md:py-6 md:gap-10'>
      <div className='flex items-center gap-2'>
        <AvatarImage src={creator.avatar} size='medium' alt={creator + ' Avatar'} className='' />
        <span className='text-white text-base font-bold leading-snug'>{creator.handle}</span>
      </div>
      <div className='flex flex-wrap gap-2 max-md:pl-[1px]'>
        {tags.map((tag, index) => (
          <div
            className={cn(
              'flex justify-center items-center h-[24px] md:h-[28px] p-2 rounded-lg bg-white bg-opacity-20 md:backdrop-blur-[25px]',
              index === 0 && 'bg-transparent border border-grey-100'
            )}
            key={`${tag}-${index}`}
          >
            <p className='text-[10px] leading-normal font-base md:text-base md:font-medium text-grey-100'>{tag}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
