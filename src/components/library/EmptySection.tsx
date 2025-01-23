import { Text } from '@/components/ui/Text'
import { ButtonLink } from '@/components/ui/ButtonLink'

interface Props {
  title: string
  subtitle: string
  href: string
  buttonLinkText: string
}

export const EmptyLibrarySection: React.FC<Props> = ({ title, subtitle, href, buttonLinkText }) => (
  <div className='flex flex-col gap-4 justify-center items-center h-full pt-20 md:pt-24 text-center'>
    <Text as='h4' styleVariant='secondary-heading' className='max-sm:text-base'>
      {title}
    </Text>
    <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-200 max-sm:text-xs'>
      {subtitle}
    </Text>
    <ButtonLink href={href} variant='outline' size='lg' className='max-sm:w-fit max-sm:h-[42px]'>
      <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
        {buttonLinkText}
      </Text>
    </ButtonLink>
  </div>
)
