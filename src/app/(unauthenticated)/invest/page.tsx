import { fetchCampaigns } from '@/app/lib/api/campaign/queries'
// import { investSlides } from '@/app/lib/data/invest/carouselData'
// import { InvestCarousel } from '@/components/invest/Carousel'
import FaqSection from '@/components/invest/FaqSection'
import { ProjectsSection } from '@/components/invest/ProjectsSection'
import { InvestSection } from '@/components/invest/Section'
import { GenesisLayout } from '@/components/layout/GenesisLayout'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { InvestPageHero } from '@/components/invest/InvestPageHero'
import { GENESIS_FAQ_ITEMS } from '@/constants/faqs'
import { CAMPAIGNS } from '@/constants/projects'

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
    images: '/assets/images/metadata/metadata-invest.png',
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
    images: '/assets/images/metadata/metadata-invest.png',
  },
  manifest: '/manifest.json',
}

export default async function InvestPage() {
  const { data: campaings, errorMessage } = await fetchCampaigns({ take: 6, skip: 0 })

  const sliceIndex = Math.ceil(campaings.length / 2)
  const [firstHalf, secondHalf] = [campaings.slice(0, sliceIndex), campaings.slice(sliceIndex, campaings.length)]
  if (errorMessage) {
    notFound()
  }

  return (
    <>
      <InvestPageHero />
      <GenesisLayout showFooter>
        <div className='flex flex-col gap-10 max-w-screen-xl w-full'>
          <InvestSection data={firstHalf} title='Gauging Interest' />
          <ProjectsSection campaigns={CAMPAIGNS} title='Recent Successful Projects' />
          {/* <InvestCarousel slides={investSlides} /> */}
          <InvestSection data={secondHalf} title='You Might Like' />
          <FaqSection items={GENESIS_FAQ_ITEMS} />
        </div>
      </GenesisLayout>
    </>
  )
}
