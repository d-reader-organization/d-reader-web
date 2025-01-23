import { fetchComicIssue, fetchOwnedComicIssues } from '@/app/lib/api/comicIssue/queries'
import { fetchMe } from '@/app/lib/api/user/queries'
import { EmptyLibrarySection } from '@/components/library/EmptySection'
import { OwnedIssuesContent } from '@/components/library/OwnedIssuesContent'
import { LibraryTabsWrapper } from '@/components/library/TabsWrapper'
import { RoutePath } from '@/enums/routePath'
import { SlugParamsProps } from '@/lib/types'
import { TabsContent } from '@radix-ui/react-tabs'

export default async function OwnedIssuesPage(props: SlugParamsProps) {
  const params = await props.params

  const { slug: comicSlug } = params

  const me = await fetchMe()

  if (!me) {
    return null
  }

  const ownedIssues = await fetchOwnedComicIssues({ params: { skip: 0, take: 20, comicSlug }, userId: me.id })
  const comicIssueId = ownedIssues.at(0)?.collectibles.at(0)?.comicIssueId
  const comicIssue = await fetchComicIssue({ id: comicIssueId ?? '' })

  return (
    <LibraryTabsWrapper userId={me.id}>
      <TabsContent className='mt-0 pt-4 border-t border-grey-300' value='owned'>
        {comicIssue && ownedIssues.length ? (
          <OwnedIssuesContent comicIssue={comicIssue} ownedIssues={ownedIssues} />
        ) : (
          <EmptyLibrarySection
            title='Your library is empty'
            subtitle='Your collectibles will be shown here once you own any.'
            href={RoutePath.DiscoverComicIssues}
            buttonLinkText='Discover Collectibles'
          />
        )}
      </TabsContent>
    </LibraryTabsWrapper>
  )
}
