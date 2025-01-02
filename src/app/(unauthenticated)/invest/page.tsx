import { fetchHighInterestProjects, fetchSuccessfulProjects } from '@/app/lib/api/invest/queries'
// import { investSlides } from '@/app/lib/data/invest/carouselData'
// import { InvestCarousel } from '@/components/invest/Carousel'
import FaqSection from '@/components/invest/FaqSection'
import { ProjectsSection } from '@/components/invest/ProjectsSection'
import { InvestSection } from '@/components/invest/Section'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { InvestPageHero } from '@/components/invest/InvestPageHero'
import { ceil } from 'lodash'
import { GENESIS_FAQ_ITEMS } from '@/constants/faqs'

export const metadata: Metadata = {
  title: 'Genesis',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  description:
    'Vote on new talent. Kickstart upcoming IP! Support creators which you feel have the potential to produce, direct & sell a captivating story.',
  keywords: 'NFT, asset, dReader, dPublisher, Comic, Solana, SOL, mint, collection, manga, manwha',
  openGraph: {
    type: 'website',
    title: 'Genesis',
    description:
      'Vote on new talent. Kickstart upcoming IP! Support creators which you feel have the potential to produce, direct & sell a captivating story.',
    images: '/assets/images/metadata-invest.png',
    url: process.env.NEXT_PUBLIC_SITE_URL + '/invest',
    siteName: 'Genesis',
  },
  appleWebApp: {
    title: 'Genesis',
    startupImage: '/assets/apple-touch-icon.png',
  },
  twitter: {
    title: 'Genesis',
    description:
      'Vote on new talent. Kickstart upcoming IP! Support creators which you feel have the potential to produce, direct & sell a captivating story.',
    card: 'summary_large_image',
    site: '@GenesisApp',
    creator: '@GenesisApp',
    images: '/assets/images/metadata-invest.png',
  },
  manifest: '/manifest.json',
}

export default async function InvestPage() {
  const { data: successfulProjects } = await fetchSuccessfulProjects()
  const { data: interestProjects, errorMessage } = await fetchHighInterestProjects()

  const sliceIndex = ceil(interestProjects.length / 2)
  const [firstHalf, secondHalf] = [
    interestProjects.slice(0, sliceIndex),
    interestProjects.slice(sliceIndex, interestProjects.length),
  ]

  if (errorMessage) {
    notFound()
  }

  return (
    <>
      <InvestPageHero />
      <BaseLayout showFooter>
        <div className='flex flex-col gap-10 max-w-screen-xl w-full'>
          <InvestSection data={firstHalf} title='Gauging Interest' />
          <ProjectsSection projects={successfulProjects} title='Recent Successful Projects' />
          {/* <InvestCarousel slides={investSlides} /> */}
          <InvestSection data={secondHalf} title='You Might Like' />
          <FaqSection items={GENESIS_FAQ_ITEMS} />
        </div>
      </BaseLayout>
    </>
  )
}
