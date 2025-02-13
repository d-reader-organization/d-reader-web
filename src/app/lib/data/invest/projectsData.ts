export type InterestProject = {
  image: string
  title: string
  slug: string
  stats: {
    likes: number
  }
  tags: string[]
}

export const highInterestProjects: InterestProject[] = [
  {
    image: '/assets/images/invest/bonk-cover.jpg',
    slug: 'bonk-and-the-curse-of-the-bear-king',
    stats: { likes: 0 },
    tags: ['Animated Series', 'Action', 'Superhero'],
    title: 'BONK and the curse of the Bear King',
  },
  {
    image: '/assets/images/invest/mad-lads-cover.png',
    slug: 'mad-lads',
    stats: {
      likes: 0,
    },
    tags: ['Manga Series', 'Action', 'Superhero'],
    title: 'Mad Lads',
  },
  {
    image: 'https://d323dls9ny69nf.cloudfront.net/comics/the-recruits-1714399610806/cover-1714399885808.jpg',
    slug: 'the-recruits',
    stats: {
      likes: 0,
    },
    tags: ['Animated Series', 'Adventure', 'Sci-fi', 'Comedy'],
    title: 'The Recruits',
    // title: 'The Recruits - animated series',
  },
  {
    image: '/assets/images/invest/galactic-geckos-cover.png',
    slug: 'galactic-geckos',
    stats: {
      likes: 0,
    },
    tags: ['Animated Series', 'Adventure', 'Sci-fi', 'Superhero'],
    title: 'Galactic Geckos',
  },
  {
    image: 'https://d323dls9ny69nf.cloudfront.net/comics/enter-the-tensorverse/banner-1704914829715.png',
    slug: 'enter-the-tensorverse',
    stats: {
      likes: 0,
    },
    tags: ['Animated Series', 'Action', 'Sci-fi'],
    title: 'Tensorverse',
  },
  {
    image: 'https://d323dls9ny69nf.cloudfront.net/genesis/lump-sum-cover.jpg',
    slug: 'the-lump-sum-saga',
    stats: {
      likes: 0,
    },
    tags: ['Comic Series', 'Action', 'Sci-fi'],
    title: 'The Lump Sum Saga',
  },
  {
    image: 'https://d323dls9ny69nf.cloudfront.net/genesis/inner-demons-banner.jpg',
    slug: 'inner-demons',
    stats: {
      likes: 0,
    },
    tags: ['Animated Series', 'Action', 'Sci-fi', 'Drama'],
    title: 'Inner Demons',
  },
]
