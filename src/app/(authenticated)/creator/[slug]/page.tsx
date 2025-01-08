import { redirect } from 'next/navigation'
import { RoutePath } from '@/enums/routePath'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function CreatorPage(props: Props) {
  const params = await props.params

  const { slug } = params

  redirect(RoutePath.CreatorSeries(slug))
}
