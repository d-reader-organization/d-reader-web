import { fetchComicIssue, fetchOwnedComicIssues } from '@/app/lib/api/comicIssue/queries'
import { fetchMe } from '@/app/lib/api/user/queries'
import { EmptyLibrarySection } from '@/components/library/EmptySection'
import { OwnedIssuesContent } from '@/components/library/OwnedIssuesContent'
import { LibraryTabsWrapper } from '@/components/library/TabsWrapper'
import { EMPTY_SECTION_STATES } from '@/constants/library'
import { SlugParamsProps } from '@/lib/types'
import { TabsContent } from '@radix-ui/react-tabs'

export default async function OwnedIssuesPage({ params: { slug: comicSlug } }: SlugParamsProps) {
  const me = await fetchMe()

  if (!me) return null

  const ownedIssues = await fetchOwnedComicIssues({ params: { skip: 0, take: 20, comicSlug }, userId: me.id })
  const comicIssueId = ownedIssues.at(0)?.collectibles.at(0)?.comicIssueId
  const comicIssue = await fetchComicIssue({ id: comicIssueId ?? '' })

  return (
    <LibraryTabsWrapper>
      <TabsContent className='mt-0 border-t border-grey-300 w-full' value='owned'>
        {comicIssue && ownedIssues.length ? (
          <OwnedIssuesContent comicIssue={comicIssue} ownedIssues={ownedIssues} />
        ) : (
          <EmptyLibrarySection emptySectionState={EMPTY_SECTION_STATES.owned} />
        )}
      </TabsContent>
    </LibraryTabsWrapper>
  )
}
