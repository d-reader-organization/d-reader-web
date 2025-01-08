import { RoutePath } from '@/enums/routePath'

export type EmptySectionState = {
  title: string
  subtitle: string
  buttonLinkText: string
  href: string
}

export const EMPTY_SECTION_STATES: Record<'owned' | 'favorites' | 'creators', EmptySectionState> = {
  creators: {
    title: "You don't follow any creators.",
    subtitle: 'Explore creators and mark some as favorite!',
    buttonLinkText: 'Discover Creators',
    href: RoutePath.DiscoverCreators,
  },
  favorites: {
    title: 'You have no comics bookmarked.',
    subtitle: 'Explore comics and mark some as favorite!',
    buttonLinkText: 'Discover Comics',
    href: RoutePath.DiscoverComics,
  },
  owned: {
    title: 'Your library is empty.',
    subtitle: 'Your collectibles will be shown here once you own any.',
    buttonLinkText: 'Discover Collectibles',
    href: RoutePath.DiscoverComicIssues,
  },
}
