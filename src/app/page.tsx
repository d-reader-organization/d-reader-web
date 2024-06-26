import { CarouselSlide } from '@/models/carousel/carouselSlide'
import { CAROUSEL_QUERY_KEYS } from '@/api/carousel/carouselKeys'
import { COMIC_QUERY_KEYS } from '@/api/comic/comicKeys'
import { ComicFilterTag, ComicParams, ComicSortTag } from '@/models/comic/comicParams'
import { Comic } from '@/models/comic'
import { ComicIssueFilterTag, ComicIssueParams, ComicIssueSortTag } from '@/models/comicIssue/comicIssueParams'
import { ComicIssue } from '@/models/comicIssue'
import { COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'
import { CREATOR_QUERY_KEYS } from '@/api/creator/creatorKeys'
import { CreatorParams } from '@/models/creator/creatorParams'
import { Creator } from '@/models/creator'
import { Navigation } from '@/components/layout/Navigation'
import { HeroCarousel } from '@/components/ui/carousel/HeroCarousel'
import { ComicList } from '@/components/comic/ComicList'
import { ComicIssueList } from '@/components/comicIssue/ComicIssueList'
import { CreatorList } from '@/components/creator/CreatorList'
import { Section } from '@/components/shared/Section'
import { RoutePath } from '@/enums/routePath'

const { COMIC, GET: GET_COMICS } = COMIC_QUERY_KEYS
const { COMIC_ISSUE, GET } = COMIC_ISSUE_QUERY_KEYS
const { CREATOR, GET: GET_CREATOR } = CREATOR_QUERY_KEYS
const { CAROUSEL, SLIDES, GET: GET_SLIDES } = CAROUSEL_QUERY_KEYS

const TAKE_COMICS = 18
const TAKE_ISSUES = 18
const TAKE_CREATORS = 8

const generateQuery = (params: ComicParams | ComicIssueParams | CreatorParams) =>
  Object.entries(params).reduce((prev, [key, value]) => {
    const current = `${key}=${value}`
    return prev.length ? `${prev}&${current}` : current
  }, '')

const fetchComics = async (params: ComicParams): Promise<Comic[]> => {
  const queryParams = generateQuery(params)
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${COMIC}/${GET_COMICS}?${queryParams}`)
  return response.json()
}

const fetchComicIssues = async (params: ComicIssueParams): Promise<ComicIssue[]> => {
  const queryParams = generateQuery(params)
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${COMIC_ISSUE}/${GET}?${queryParams}`)
  return response.json()
}

const fetchCreators = async (params: CreatorParams): Promise<Creator[]> => {
  const queryParams = generateQuery(params)
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${CREATOR}/${GET_CREATOR}?${queryParams}`)
  return response.json()
}

async function fetchCarouselSlides() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${CAROUSEL}/${SLIDES}/${GET_SLIDES}`)
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return response.json()
}

export default async function HomePage() {
  const carouselSlides: CarouselSlide[] = await fetchCarouselSlides()
  const [promotedComics, popularComics, newComics, newEpisodes, freeEpisodes, topCreators] = await Promise.all([
    fetchComics({ skip: 0, take: TAKE_COMICS, sortTag: ComicSortTag.Rating }),
    fetchComics({ skip: 0, take: TAKE_COMICS, filterTag: ComicFilterTag.Popular }),
    fetchComics({ skip: 0, take: TAKE_COMICS, sortTag: ComicSortTag.Published }),
    fetchComicIssues({ skip: 0, take: TAKE_ISSUES, sortTag: ComicIssueSortTag.Latest }),
    fetchComicIssues({
      skip: 0,
      take: TAKE_ISSUES,
      filterTag: ComicIssueFilterTag.Free,
      sortTag: ComicIssueSortTag.Likes,
    }),
    fetchCreators({ skip: 0, take: TAKE_CREATORS }),
  ])

  return (
    <>
      <Navigation />
      <main className='flex flex-col w-full h-full items-center'>
        <HeroCarousel carouselSlides={carouselSlides} />
        <div className='max-w-screen-xl w-full flex flex-col md:mb-10'>
          <Section
            id='promoted-comics'
            title='Get started'
            actionProps={{ title: 'See All', href: RoutePath.DiscoverComics }}
          >
            <ComicList comics={promotedComics} />
          </Section>

          <Section
            id='popular-comics'
            title='Popular comics'
            actionProps={{ title: 'See All', href: RoutePath.DiscoverComics }}
          >
            <ComicList comics={popularComics} />
          </Section>

          <Section
            id='new-episodes'
            title='New episodes'
            actionProps={{ title: 'See All', href: RoutePath.DiscoverComicIssues }}
          >
            <ComicIssueList comicIssues={newEpisodes} />
          </Section>

          <Section
            id='free-comic-issues'
            title='Free episodes'
            actionProps={{ title: 'See All', href: RoutePath.DiscoverComicIssues }}
          >
            <ComicIssueList comicIssues={freeEpisodes} />
          </Section>

          <Section
            id='top-creators'
            title='Top creators'
            actionProps={{ title: 'See All', href: RoutePath.DiscoverCreators }}
          >
            <CreatorList creators={topCreators} animate={false} />
          </Section>

          <Section
            id='new-comics'
            title='New comics'
            actionProps={{ title: 'See All', href: RoutePath.DiscoverComics }}
          >
            <ComicList comics={newComics} />
          </Section>
        </div>
      </main>
    </>
  )
}
