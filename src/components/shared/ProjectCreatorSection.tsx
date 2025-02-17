import { type Project, type ProjectCreator } from '@/models/project'
import { AvatarImage } from '@/components/shared/AvatarImage'
import { ButtonLink } from '../ui/ButtonLink'
import { RoutePath } from '@/enums/routePath'
import { Text } from '../ui/Text'
import { cn } from '@/lib/utils'

type Props = {
  creator: ProjectCreator
  tags?: Project['tags']
}

export const ProjectCreatorSection: React.FC<Props> = ({ creator, tags = [] }) => {
  return (
    <section className='flex flex-col w-full'>
      <ButtonLink href={RoutePath.Creator(creator.handle)} variant='ghost'>
        <AvatarImage src={creator.avatar} size='medium' alt={creator + ' Avatar'} />
        <Text as='span' styleVariant='body-normal' fontWeight='bold'>
          {creator.displayName}
        </Text>
      </ButtonLink>
      {tags.length ? (
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
      ) : null}
    </section>
  )
}
