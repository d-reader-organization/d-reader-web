import { redirect } from 'next/navigation'
import { RoutePath } from '@/enums/routePath'

type Props = {
  params: {
    slug: string
  }
}

export default async function ComicPage({ params: { slug } }: Props) {
  redirect(RoutePath.ComicEpisodes(slug))
}
