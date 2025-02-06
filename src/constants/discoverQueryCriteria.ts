import { ComicFilterTag, ComicSortTag } from '@/models/comic/comicParams'
import { ComicIssueSortTag, ComicIssueFilterTag } from '@/models/comicIssue/comicIssueParams'
import { CreatorSortTag, CreatorFilterTag } from '@/models/creator/creatorParams'
import { DiscoverQueryParamsStore } from '@/stores/DiscoverQueryParamsStore'

export type DiscoverPageQueryCriteria<E extends Record<string, string>> = {
  label: string
  tags: E
  getSelectedTags: (store: DiscoverQueryParamsStore) => E[keyof E] | undefined
  updateSelectedTags: (store: DiscoverQueryParamsStore, tag: E[keyof E] | undefined) => void
}

function createDiscoverPageQueryCriteria<E extends Record<string, string>>(
  label: string,
  tags: E,
  getSelectedTags: (store: DiscoverQueryParamsStore) => E[keyof E] | undefined,
  updateSelectedTags: (store: DiscoverQueryParamsStore, tag: E[keyof E] | undefined) => void
): DiscoverPageQueryCriteria<E> {
  return { label, tags, getSelectedTags, updateSelectedTags }
}

export type ALL_DISCOVER_PAGE_QUERY_CRITERIA =
  | DiscoverPageQueryCriteria<typeof ComicFilterTag>
  | DiscoverPageQueryCriteria<typeof ComicSortTag>
  | DiscoverPageQueryCriteria<typeof ComicIssueFilterTag>
  | DiscoverPageQueryCriteria<typeof ComicIssueSortTag>
  | DiscoverPageQueryCriteria<typeof CreatorFilterTag>
  | DiscoverPageQueryCriteria<typeof CreatorSortTag>

// criteria
export const COMICS_FILTER_CRITERIA = createDiscoverPageQueryCriteria(
  'Filter by',
  ComicFilterTag,
  (store) => store.comicParams.filterTag,
  (store, tag) => store.updateComicParams({ filterTag: tag })
)

export const COMICS_SORT_CRITERIA = createDiscoverPageQueryCriteria(
  'Order by',
  ComicSortTag,
  //modifiedComicSortTags,
  (store) => store.comicParams.sortTag,
  (store, tag) => store.updateComicParams({ sortTag: tag })
)

export const COMIC_ISSUES_FILTER_CRITERIA = createDiscoverPageQueryCriteria(
  'Filter by',
  ComicIssueFilterTag,
  (store) => store.comicIssueParams.filterTag,
  (store, tag) => store.updateComicIssueParams({ filterTag: tag })
)

export const COMIC_ISSUES_SORT_CRITERIA = createDiscoverPageQueryCriteria(
  'Order by',
  ComicIssueSortTag,
  (store) => store.comicIssueParams.sortTag,
  (store, tag) => store.updateComicIssueParams({ sortTag: tag })
)

export const CREATORS_FILTER_CRITERIA = createDiscoverPageQueryCriteria(
  'Filter by',
  CreatorFilterTag,
  (store) => store.creatorParams.filterTag,
  (store, tag) => store.updateCreatorParams({ filterTag: tag })
)

export const CREATORS_SORT_CRITERIA = createDiscoverPageQueryCriteria(
  'Order by',
  CreatorSortTag,
  (store) => store.creatorParams.sortTag,
  (store, tag) => store.updateCreatorParams({ sortTag: tag })
)

// criteria arrays
export const QUERY_COMIC_CRITERIA = [COMICS_FILTER_CRITERIA, COMICS_SORT_CRITERIA]
export const QUERY_COMIC_ISSUE_CRITERIA = [COMIC_ISSUES_FILTER_CRITERIA, COMIC_ISSUES_SORT_CRITERIA]
export const QUERY_CREATOR_CRITERIA = [CREATORS_FILTER_CRITERIA, CREATORS_SORT_CRITERIA]
