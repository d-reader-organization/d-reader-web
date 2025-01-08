import LogoWithTextIcon from 'public/assets/vector-icons/logo-with-text.svg'
import { RoutePath } from '@/enums/routePath'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { verifyUserEmail } from '@/app/lib/api/user/mutations'
import { ArrowRight } from 'lucide-react'
import { Text } from '@/components/ui'

type Params = {
  verificationToken: string
}

export default async function VerifyEmailPage(props: { params: Promise<Params> }) {
  const params = await props.params
  const verificationToken = params?.verificationToken
  const user = verificationToken ? await verifyUserEmail(verificationToken) : null
  const name = user?.displayName || user?.username || ''

  return (
    <main className='flex flex-col w-full justify-center items-center mt-20 md:mt-16 p-4 md:p-6 lg:p-8'>
      <div className='flex flex-col items-center gap-4 max-w-[480px]'>
        <Text as='h1' styleVariant='primary-heading'>
          Welcome
        </Text>
        <Text as='span' styleVariant='body-xlarge' fontWeight='medium'>
          {name}
        </Text>
        {!name ? (
          <p className='text-xl font-medium leading-none tracking-[0.096px] text-center'>
            Something went wrong while while verifying your email
          </p>
        ) : (
          <p className='text-xl font-medium leading-none tracking-[0.096px] text-center'>
            Your email has been <span className='description--highlighted'>successfully verified</span>, you can now
            browse the app while enjoying full features!
          </p>
        )}
        <ButtonLink variant='primary' href={RoutePath.Home} className='w-fit'>
          Start exploring <ArrowRight className='size-6' />
        </ButtonLink>
      </div>
      <div className='absolute bottom-4 left-4 text-left max-w-[420px] flex flex-col items-start gap-5'>
        <LogoWithTextIcon className='h-6 w-auto' />
        <div className='flex flex-col'>
          <p className='text-xl font-medium'>
            dReader is a platform for discovering, reading, collecting, and trading digital comics.
          </p>
          <p className='text-xl font-medium'>
            Sign in & <span className='text-yellow-500'>start collecting</span>!
          </p>
        </div>
      </div>
    </main>
  )
}
