import React from 'react'
import Image from 'next/image'
import { ComicPage } from '@/models/comic/comicPage'
// import BlinkAd from '@/app/(authenticated)/comic-issue/[id]/read/BlinkAd'

type Props = { pages: ComicPage[] }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GALACTIC_GECKO_PAGES = [
  {
    id: 2307,
    pageNumber: 1,
    isPreviewable: true,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-1-1729622890393.jpg',
    height: 1484,
    width: 1024,
  },
  {
    id: 2308,
    pageNumber: 2,
    isPreviewable: true,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-2-1729622890396.jpg',
    height: 1484,
    width: 1024,
  },
  {
    id: 2309,
    pageNumber: 3,
    isPreviewable: true,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-3-1729622890396.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2310,
    pageNumber: 4,
    isPreviewable: true,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-4-1729622890397.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2311,
    pageNumber: 5,
    isPreviewable: true,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-5-1729622890398.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2312,
    pageNumber: 6,
    isPreviewable: true,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-6-1729622890399.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2313,
    pageNumber: 7,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-7-1729622890400.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2314,
    pageNumber: 8,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-8-1729622890401.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2315,
    pageNumber: 9,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-9-1729622890401.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2316,
    pageNumber: 10,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-10-1729622890405.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2317,
    pageNumber: 11,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-11-1729622890406.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2318,
    pageNumber: 12,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-12-1729622890407.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2319,
    pageNumber: 13,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-13-1729622890407.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2320,
    pageNumber: 14,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-14-1729622890408.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2321,
    pageNumber: 15,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-15-1729622890409.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2322,
    pageNumber: 16,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-16-1729622890409.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2323,
    pageNumber: 17,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-17-1729622890410.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2324,
    pageNumber: 18,
    isPreviewable: false,
    image: 'https://dial.to/?action=solana-action:https://blinkman.sendarcade.fun/api/actions/blinkman&cluster=mainnet',
    height: 1448,
    width: 1024,
  },
  {
    id: 2325,
    pageNumber: 19,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-18-1729622890410.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2326,
    pageNumber: 20,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-19-1729622890411.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2327,
    pageNumber: 21,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-20-1729622890411.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2328,
    pageNumber: 22,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-21-1729622890412.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2329,
    pageNumber: 23,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-22-1729622890412.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2330,
    pageNumber: 24,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-23-1729622890412.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2331,
    pageNumber: 25,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-24-1729622890413.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2332,
    pageNumber: 26,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-25-1729622890413.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2333,
    pageNumber: 27,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-26-1729622890414.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2334,
    pageNumber: 28,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-27-1729622890415.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2335,
    pageNumber: 29,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-28-1729622890415.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2336,
    pageNumber: 30,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-29-1729622890415.jpg',
    height: 1448,
    width: 1024,
  },
  {
    id: 2337,
    pageNumber: 31,
    isPreviewable: false,
    image:
      'https://d323dls9ny69nf.cloudfront.net/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/pages/page-30-1729622890420.jpg',
    height: 1484,
    width: 1024,
  },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DUMMY_BLINK_URL =
  'https://dial.to/?action=solana-action:https://blinkman.sendarcade.fun/api/actions/blinkman&cluster=mainnet'

export const ComicIssuePages: React.FC<Props> = ({ pages }) => {
  return pages.map((page) => {
    // if (page.pageNumber === 18) return <BlinkAd key={page.image} url={DUMMY_BLINK_URL} />

    return (
      <Image
        key={page.image}
        sizes='(max-width: 1200px) 100vw, 1200px'
        width={page.width ?? 600}
        height={page.height ?? 600}
        src={page.image}
        alt={`Page ${page.pageNumber}`}
        style={{ width: '100%', height: 'auto' }}
      />
    )
  })
}
