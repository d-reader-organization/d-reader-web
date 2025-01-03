import { fetchComicIssue, fetchOwnedComicIssues } from '@/app/lib/api/comicIssue/queries'
import { fetchMe } from '@/app/lib/api/user/queries'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { LibraryTabs } from '@/components/library/Tabs'
import { SlugParamsProps } from '@/lib/types'

export default async function OwnedIssuesPage({ params: { slug: comicSlug } }: SlugParamsProps) {
  const me = await fetchMe()

  if (!me) {
    return null
  }

  const ownedIssues = await fetchOwnedComicIssues({ params: { skip: 0, take: 20, comicSlug }, userId: me.id })
  const comicIssueId = ownedIssues.at(0)?.collectibles.at(0)?.comicIssueId
  const comicIssue = await fetchComicIssue({ id: comicIssueId ?? '' })

  return (
    <BaseLayout showFooter>
      <LibraryTabs comicIssue={comicIssue} ownedIssues={ownedIssues} />
    </BaseLayout>
  )
}
