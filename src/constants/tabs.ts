import { RoutePath } from '@/enums/routePath'

export type Tab = {
  name: string
  url: string
  disabled?: boolean
}

export const DISCOVER_PAGE_TABS: Tab[] = [
  {
    name: 'Comics',
    url: RoutePath.DiscoverComics,
  },
  {
    name: 'Episodes',
    url: RoutePath.DiscoverComicIssues,
  },
  {
    name: 'Creators',
    url: RoutePath.DiscoverCreators,
  },
]

export const creatorPageTabs = (slug: string): Tab[] => [
  {
    name: 'Series',
    url: RoutePath.CreatorSeries(slug),
  },
  {
    name: 'Collectibles',
    url: RoutePath.CreatorCollectibles(slug),
    disabled: true,
  },
]

export const comicPageTabs = (slug: string): Tab[] => [
  {
    name: 'Episodes',
    url: RoutePath.ComicEpisodes(slug),
  },
  {
    name: 'Collectibles',
    url: RoutePath.ComicCollectibles(slug),
    disabled: true,
  },
]
