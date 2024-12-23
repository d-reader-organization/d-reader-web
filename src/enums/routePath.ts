export const RoutePath = Object.freeze({
  Home: '/',
  Welcome: '/welcome',
  Profile: '/profile',
  FAQ: '/faq',
  Login: '/login',
  Register: '/register',
  RegisterEmailVerification: '/register/email-verification',
  RegisterConnectWallet: '/register/connect-wallet',
  Discover: '/discover',
  DiscoverComics: '/discover/comics',
  DiscoverComicIssues: '/discover/episodes',
  DiscoverCreators: '/discover/creators',
  Library: '/library',
  LibraryOwned: '/library/owned',
  LibraryFavorites: '/library/favorites',
  LibraryCreators: '/library/creators',
  Marketplace: '/marketplace',
  OwnedAssets: (slug: string) => `/library/${slug}`,
  Mint: (id: string | number) => `/mint/${id}`,
  Claim: (id: string | number) => `/claim/${id}`,
  Comic: (comicSlug: string) => `/comic/${comicSlug}`,
  ComicEpisodes: (comicSlug: string) => `/comic/${comicSlug}/episodes`,
  ComicCollectibles: (comicSlug: string) => `/comic/${comicSlug}/collectibles`,
  ReadComic: (comicSlug: string) => `/comic/${comicSlug}/read`,
  ComicIssue: (comicIssueId: string | number) => `/comic-issue/${comicIssueId}`,
  ReadComicIssue: (comicIssueId: string | number) => `/comic-issue/${comicIssueId}/read`,
  Creator: (creatorSlug: string) => `/creator/${creatorSlug}`,
  CreatorSeries: (creatorSlug: string) => `/creator/${creatorSlug}/series`,
  CreatorCollectibles: (creatorSlug: string) => `/creator/${creatorSlug}/collectibles`,
  PrivacyPolicy: '/privacy-policy',
  TermsOfService: '/terms-of-service',
  Invest: '/invest',
  InvestDetails: (slug: string) => `/invest/${slug}`,
  Payout: (slug: string) => `/invest/payout/${slug}`,
  ExpressInterest: (slug: string) => `/invest/${slug}/express-interest`,
  InvestCheckout: (slug: string) => `/invest/${slug}/check-out`,
})
