import { redirect } from 'next/navigation'
import { RoutePath } from '@/enums/routePath'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function ComicPage(props: Props) {
  const params = await props.params

  const { slug } = params

  redirect(RoutePath.ComicEpisodes(slug))
}
