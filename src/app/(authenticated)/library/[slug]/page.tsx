import { fetchComicIssue, fetchOwnedCollectibleComics } from '@/app/lib/api/comicIssue/queries'
import { fetchMe } from '@/app/lib/api/user/queries'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { LibraryTabs } from '@/components/library/Tabs'
import { SlugParamsProps } from '@/lib/types'

export default async function OwnedIssuesPage(props: SlugParamsProps) {
  const params = await props.params

  const { slug: comicSlug } = params

  const me = await fetchMe()

  if (!me) {
    return null
  }

  const ownedCollectibles = await fetchOwnedCollectibleComics({
    params: { skip: 0, take: 20, comicSlug },
    userId: me.id,
  })
  const comicIssueId = ownedCollectibles.at(0)?.collectibles.at(0)?.comicIssueId
  const comicIssue = await fetchComicIssue({ id: comicIssueId ?? '' })

  return (
    <BaseLayout showFooter>
      <LibraryTabs comicIssue={comicIssue} ownedCollectibles={ownedCollectibles} />
    </BaseLayout>
  )
}
