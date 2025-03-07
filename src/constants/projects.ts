import { Campaign } from '@/models/campaign'
import { ProjectFunding, ProjectPayout } from '@/models/project'

export type SuccessfulCampaign = Campaign & { payout: ProjectPayout } & { funding: ProjectFunding } & { logo: string }

export const CAMPAIGNS: SuccessfulCampaign[] = [
  {
    id: 22,
    slug: 'enter-the-tensorverse',
    description: '',
    videoUrl: '',
    title: 'Enter the Tensorverse',
    subtitle: 'Survive or Die: The First Adventure in Tensor City',
    banner: 'https://d323dls9ny69nf.cloudfront.net/comics/enter-the-tensorverse/banner-1704914829715.png',
    cover: 'https://d323dls9ny69nf.cloudfront.net/comics/enter-the-tensorverse/cover-1704914829469.jpg',
    logo: 'https://d323dls9ny69nf.cloudfront.net/comics/enter-the-tensorverse/logo-1704914830030.png',
    creator: {
      id: 1,
      handle: 'studio_nx',
      displayName: 'StudioNX',
      isVerified: true,
      avatar: 'https://d323dls9ny69nf.cloudfront.net/creators/studio-nx/avatar-1697021201713.png',
      banner: 'https://d323dls9ny69nf.cloudfront.net/creators/studio-nx/banner-1697021201844.jpg',
      description:
        'StudioNX is an Emmy award winning visual development house that creates character driven IP for feature film, TV & games.',
      tippingAddress: 'G6ouxSY6BuazSyrtGYPrqxF7bWcznkUfUTayaFaHfxFn',
      website: 'https://studionx.com',
      twitter: 'https://twitter.com/StudioNX',
      instagram: 'https://instagram.com/jim_bryson/',
      linktree: '',
      userId: 0,
    },
    startDate: undefined,
    endDate: undefined,
    info: '',
    raiseGoal: 2000,
    funding: {
      pledgedAmount: 2000,
      numberOfBackers: 4,
    },
    payout: {
      revenue: 22000,
      roiPercent: 550,
      daysForRoi: 46,
      numberOfBuyers: 682,
      summary:
        "Surviving in Tensor City is damn near impossible. When a group of Raiders follow some leaked alpha to an abandoned building, they'll learn just how do-or-die the space truly is. Emphasis on the DIE part. Because, shit's about to go down in this action-packed, sci-fi adventure -- the first ever story set in the Tensorian universe!",
    },
  },
  {
    id: 23,
    slug: 'apt-323',
    title: 'Apt 323',
    description: '',
    videoUrl: '',
    subtitle: 'Chaos, Parties, and Eviction: Life at Apartment 323',
    banner:
      'https://d323dls9ny69nf.cloudfront.net/comics/apt-323-collectors-edition-1713288491154/banner-1713964884959.png',
    cover:
      'https://d323dls9ny69nf.cloudfront.net/comics/apt-323-collectors-edition-1713288491154/issues/collectors-edition-1713289013265/cover-common-1713289076229.jpg',
    logo: 'https://d323dls9ny69nf.cloudfront.net/comics/apt-323-collectors-edition-1713288491154/logo-1713964885062.png',
    creator: {
      id: 1,
      handle: 'studio_nx',
      displayName: 'StudioNX',
      isVerified: true,
      avatar: 'https://d323dls9ny69nf.cloudfront.net/creators/studio-nx/avatar-1697021201713.png',
      banner: 'https://d323dls9ny69nf.cloudfront.net/creators/studio-nx/banner-1697021201844.jpg',
      description:
        'StudioNX is an Emmy award winning visual development house that creates character driven IP for feature film, TV & games.',
      tippingAddress: 'G6ouxSY6BuazSyrtGYPrqxF7bWcznkUfUTayaFaHfxFn',
      website: 'https://studionx.com',
      twitter: 'https://twitter.com/StudioNX',
      instagram: 'https://instagram.com/jim_bryson/',
      linktree: '',
      userId: 0,
    },
    info: '',
    raiseGoal: 2000,
    startDate: undefined,
    endDate: undefined,
    funding: {
      pledgedAmount: 2000,
      numberOfBackers: 4,
    },
    payout: {
      revenue: 5600,
      roiPercent: 280,
      daysForRoi: 48,
      numberOfBuyers: 290,
      summary:
        'Join college dropouts Breeson & Jenkins, the dumbest degens in town, on their whacky adventures at Apartment 323. Every day they do super-important stuff like eating junk food, getting wasted, throwing parties and trying to hold down a job while constantly receiving eviction threats from the stoopid landlord.',
    },
  },
  {
    id: 24,
    slug: 'dream-city',
    title: 'Dream City',
    description: '',
    videoUrl: '',
    subtitle: 'Tales of Love, Mystery, and Sci-Fi in Dream City',
    banner: 'https://d323dls9ny69nf.cloudfront.net/comics/dream-city/banner.png',
    cover: 'https://d323dls9ny69nf.cloudfront.net/comics/dream-city/cover.png',
    logo: 'https://d323dls9ny69nf.cloudfront.net/comics/dream-city/logo.png',
    creator: {
      id: 11,
      handle: 'brandon_mullins',
      displayName: 'Brandon Mullins',
      isVerified: true,
      avatar: 'https://d323dls9ny69nf.cloudfront.net/creators/brandon-mullins/avatar-1695669858324.jpg',
      banner: 'https://d323dls9ny69nf.cloudfront.net/creators/brandon-mullins/banner-1695669858499.png',
      description:
        'A veteran in the design industry with over 20 years of experience branching out into my passion of creating indie comics.',
      tippingAddress: '',
      website: 'https://brandonmullins.me/links',
      twitter: 'https://twitter.com/wakeupbrandon',
      instagram: 'https://instagram.com/wakeupbrandon',
      linktree: '',
      userId: 0,
    },
    info: '',
    raiseGoal: 1000,
    startDate: undefined,
    endDate: undefined,
    funding: {
      pledgedAmount: 1000,
      numberOfBackers: 2,
    },
    payout: {
      revenue: 2000,
      roiPercent: 200,
      daysForRoi: 72,
      numberOfBuyers: 174,
      summary:
        "Dive into Dream City's vibrant tapestry! This short comic anthology weaves tales of love, mystery, sci-fi, and more, all set against the backdrop of the dystopian metropolis of Dream City. Explore many genres in one captivating collection!",
    },
  },
  {
    id: 25,
    slug: 'liberty-square-originz',
    videoUrl: '',
    description: '',
    title: 'Liberty Square Originz',
    subtitle: "Surviving a Dystopian Wasteland: The Syndicate's Fight for Freedom",
    banner: 'https://d323dls9ny69nf.cloudfront.net/comics/liberty-square-originz/banner-1707999922284.png',
    cover:
      'https://d323dls9ny69nf.cloudfront.net/comics/liberty-square-originz/issues/embers/cover-common-1708002664074.png',
    logo: 'https://d323dls9ny69nf.cloudfront.net/comics/liberty-square-originz/logo-1707999922532.png',
    creator: {
      id: 109,
      handle: 'liberty_square',
      displayName: 'Liberty Square',
      isVerified: true,
      avatar: 'https://d323dls9ny69nf.cloudfront.net/creators/liberty-square/avatar-1707998020754.png',
      banner: 'https://d323dls9ny69nf.cloudfront.net/creators/liberty-square/banner-1707998020935.png',
      description: 'Creative studio behind The Sinister Squirrel Syndicate, The Hallowed, and Legendz',
      tippingAddress: '',
      website: 'https://libertysquare.io',
      twitter: 'https://twitter.com/LibertySquareHQ',
      instagram: 'https://instagram.com/libertysquarehq',
      linktree: '',
      userId: 0,
    },
    info: '',
    raiseGoal: 6000,
    startDate: undefined,
    endDate: undefined,
    funding: {
      pledgedAmount: 6000,
      numberOfBackers: 2,
    },
    payout: {
      revenue: 25000,
      roiPercent: 410,
      daysForRoi: 94,
      numberOfBuyers: 502,
      summary:
        'After the conclusion of "The Plague Wars," Liberty has dwindled to a mere shell of its former self. Under the rule of B.E.G., the once thriving metropolis has deteriorated into a dystopian wasteland, where corruption thrives and hope has faded. This speculative fiction series follows the lives of a group of individuals, collectively known as The Syndicate, displaced by the war and now navigating the challenges of this new world. Through the dark & shadowy streets and the barren outskirts, each character confronts their own struggles, their stories intertwining as they reunite, their bonds strengthened by adversity, to confront the challenges of the present while facing the demons of their past. Staring down the reality of extinction, they come to understand that their battle extends beyond challenging the oppressive regime to confronting their own inner conflicts. "Originz" offers a grounded exploration of resilience amidst adversity where every step forward carries the weight of history.',
    },
  },
]
