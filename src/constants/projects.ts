import { Project } from '@/models/project'

export const PROJECTS: Project[] = [
  {
    slug: 'the-recruits',
    title: 'The Recruits',
    subtitle: 'Celebrating the Degenerate Apes community',
    tags: ['Action', 'Comedy'],
    banner: 'https://d323dls9ny69nf.cloudfront.net/comics/the-recruits-1714399610806/banner-1714399885999.jpg',
    cover: 'https://d323dls9ny69nf.cloudfront.net/comics/the-recruits-1714399610806/cover-1714399885808.jpg',
    logo: 'https://d323dls9ny69nf.cloudfront.net/comics/the-recruits-1714399610806/logo-1714399886123.png',
    creator: {
      displayName: 'Degen Apes',
      handle: 'degen_apes',
      avatar: 'https://d323dls9ny69nf.cloudfront.net/creators/degen-apes-1714396919823/avatar-1714397500055.jpg',
      twitterHandle: 'DegenApeAcademy',
    },
    info: [
      {
        section: 'Overview',
        text: `The Recruits is a badass, fun filled adventure story about a ragtag group of rebel apes. Led by a gun-toting, foul mouthed kamikaze Drop Bear called Roach, these degens of fortune are hellbent on bringing justice to all the villains that plague Ape city.

        This is a 24 page fully animated comic, complete with professional voice acting, music and soundFX. Plus it will be jam packed with non stop laughs, accidental explosions and very questionable degens.
        `,
        image: '/assets/images/invest/the-recruits-details-overview.png',
      },
      {
        section: 'Team',
        text: `Art by StudioNX: the Emmy winning studio behind the animated comic 'Niko & the Sword of Light' www.studionx.com

               Written by Roach: OG Indie comics creator with multiple published comic series,  4 crowdfunding campaigns & his own YouTube channel.
        `,
      },
      {
        section: 'Offering',
        text: `• 30% of lifetime revenue of the animated comic will be distributed back to investors on a quarterly basis. (*% received will depend on investment tier)

               • Backers will also receive behind the scenes Discord access and more
        `,
      },
      {
        section: 'Roadmap',
        text: `• 6 months production to complete the fully animated comic.

               • The finished comic will be released on dReader with collectible covers.

               • 3 months later the comic will be packaged into an app and sold on the appstore/googleplay.

               • After 1 year the team will pitch the project as an animated series.`,
      },
    ],
    funding: {
      pledgedAmount: 0,
      raiseGoal: 300000,
      startDate: undefined,
      endDate: undefined,
      numberOfBackers: 1023,
      numberOfInterestedInvestors: 2,
    },
  },
  {
    slug: 'inner-demons',
    title: 'Inner Demons',
    subtitle: 'An original IP by dReader studios',
    tags: ['Animated Series', 'Action', 'Sci-fi', 'Drama'],
    banner: 'https://d323dls9ny69nf.cloudfront.net/genesis/inner-demons-banner.jpg',
    cover: '',
    logo: '',
    creator: {
      displayName: 'dReader Studios',
      handle: 'dreader_studios',
      avatar: '/assets/logo.png',
    },
    info: [
      {
        section: 'Overview',
        text: `Inner Demons is about Luna, a rebellious comic artist who is seriously down on her luck. She got fired from her job, her apartment burnt down and her boyfriend dumped her all in one night. To make matters worse, her comic characters have begun to come to life to haunt her. Can things get any worse...?

This is a 24 page fully animated comic, complete with professional voice acting, music and soundFX.`,
        image: 'https://d323dls9ny69nf.cloudfront.net/genesis/header.png',
      },
      {
        section: 'Team',
        text: `An original IP by dReader studios`,
      },
      {
        section: 'Offering',
        text: `• 30% of lifetime revenue of the animated comic will be distributed back to investors on a quarterly basis. (*% received will depend on investment tier)

               • Backers will also receive behind the scenes Discord access and more
        `,
      },
      {
        section: 'Roadmap',
        text: `• 6 months production to complete the fully animated comic.

               • The finished comic will be released on dReader with collectible covers.

               • 3 months later the comic will be packaged into an app and sold on the appstore/googleplay.

               • The team will then pitch the project as an animated series to Netflix and alike.`,
      },
    ],
    funding: {
      pledgedAmount: 0,
      raiseGoal: 30000,
      startDate: undefined,
      endDate: undefined,
      numberOfBackers: 1023,
      numberOfInterestedInvestors: 2,
    },
  },
  {
    // TODO: add youtube video https://www.youtube.com/embed/ld0EDoBmFSY?si=UI5cxhTkvSYI8Cl9
    slug: 'bonk-and-the-curse-of-the-bear-king',
    title: 'BONK and the curse of the Bear King',
    subtitle: 'A legendary tale of chaos and mischief',
    tags: ['Animated Series', 'Action', 'Superhero'],
    banner: '/assets/images/invest/bonk-banner.png',
    cover: '/assets/images/invest/bonk-cover.png',
    logo: '/assets/images/invest/mad-king-logo.png',
    creator: {
      displayName: 'Studio NX',
      handle: 'studio_nx',
      avatar: 'https://d323dls9ny69nf.cloudfront.net/genesis/mad-muse.jpg',
      twitterHandle: 'studionx',
    },
    info: [
      {
        section: 'Overview',
        text: `BONK and the curse of the Bear King is a 24 page fully animated comic, with voice acting, sound effects a cinematic score. It's a fantasy adventure story about a spirited young hound who leaves his village to become a great warrior like his father. He must brave the harsh winter lands to seek an elusive master who can teach him the ancient ways of the Samurai and defeat the evil king before he destroys all he loves.`,
        image: '',
      },
      {
        section: 'Team',
        text: 'Created by StudioNX, the Emmy winning team behind the highly rated animated comic Niko & the Sword of Light. They have produced series for Marvel, Disney & Amazon and written the Bafta winning game Endling, Exctinction is forever.',
      },
      {
        section: 'Offering',
        text: 'The chance to back an Emmy winning team as they develop the Bonk IP from comic series to a video game and beyond.',
      },
      {
        section: 'Roadmap',
        text: `
        Phase 1: 6 months for animated comic production.
        Phase 2: Animated comic mint on dReader.
        Phase 3: Physical distribution of the static comic.`,
      },
    ],
    funding: {
      pledgedAmount: 0,
      raiseGoal: 80000,
      startDate: undefined,
      endDate: undefined,
      numberOfBackers: 670,
      numberOfInterestedInvestors: 2,
    },
  },
  {
    slug: 'mad-lads',
    title: 'Mad Lads',
    subtitle: 'A tale of chaos and mischief',
    tags: ['Manga Series', 'Action', 'Superhero'],
    banner: 'https://d323dls9ny69nf.cloudfront.net/genesis/mad-lads-banner-3.jpg',
    cover: '/assets/images/invest/mad-lads-cover.png',
    logo: '/assets/images/invest/mad-king-logo.png',
    creator: {
      displayName: 'Mad Muse',
      handle: 'mad_muse',
      avatar: 'https://d323dls9ny69nf.cloudfront.net/genesis/mad-muse.jpg',
      twitterHandle: 'MadMuse_',
    },
    info: [
      {
        section: 'Overview',
        text: 'Follow the Mad Lads, a group of rogue adventurers who specialize in causing chaos. Whether it’s breaking into castles or confusing dragons, they somehow manage to survive... barely.',
        image: '',
      },
      {
        section: 'Team',
        text: 'The Mad Lads are led by their fearless (and completely unhinged) leader, Boon, who has a tendency to make decisions on impulse. His companions include Quirk, the magician who can barely control his spells, and Pug, a fighter who solves all problems with his fists... and sometimes his head.',
      },
      {
        section: 'Offering',
        text: 'Laughs, loot, and a lot of broken bones. Their adventures will leave you on the edge of your seat or rolling on the floor laughing.',
      },
      {
        section: 'Roadmap',
        text: `
        Phase 1: Survive the next quest.
        Phase 2: Steal something valuable.
        Phase 3: Run for your life... again.`,
      },
    ],
    funding: {
      pledgedAmount: 0,
      raiseGoal: 25000,
      startDate: undefined,
      endDate: undefined,
      numberOfBackers: 670,
      numberOfInterestedInvestors: 2,
    },
  },
  {
    slug: 'bonk',
    title: 'Bonk',
    subtitle: 'The wildest ride in the galaxy',
    tags: ['Animated Series', 'Adventure', 'Sci-fi', 'Comedy'],
    banner: '/assets/images/invest/bonk-banner.png',
    cover: '/assets/images/invest/bonk-cover.png',
    logo: '/assets/images/invest/transparent_800x450.png',
    creator: {
      displayName: 'Bonkers Inc.',
      handle: 'bonkers_inc',
      avatar: 'https://d323dls9ny69nf.cloudfront.net/creators/degen-apes-1714396919823/avatar-1714397500055.jpg',
    },
    info: [
      {
        section: 'Overview',
        text: 'Meet Bonk, a reckless space adventurer who doesn’t think before he acts. He’s always getting himself into insane situations, but somehow manages to escape... just barely. Join him as he hops from one crazy adventure to the next!',
        image: '',
      },
      {
        section: 'Team',
        text: 'Bonk and his quirky crew: Sizzle, the fast-talking, laser-gun wielding pilot, and Flux, a robot with a strange obsession for collecting junk. Together, they wreak havoc across the galaxy.',
      },
      {
        section: 'Offering',
        text: 'Explosions, fast ships, faster jokes, and plenty of "bonk" moments. If you like adrenaline-pumping sci-fi with a side of humor, Bonk is for you.',
      },
      {
        section: 'Roadmap',
        text: 'Phase 1: Find a treasure map. Phase 2: Accidentally blow something up. Phase 3: Make a daring escape while laughing at danger.',
      },
    ],
    funding: {
      pledgedAmount: 0,
      raiseGoal: 60000,
      startDate: undefined,
      endDate: undefined,
      numberOfBackers: 954,
      numberOfInterestedInvestors: 2,
    },
  },
  {
    slug: 'galactic-geckos',
    title: 'Galactic Geckos',
    subtitle: 'A space odyssey of epic proportions',
    tags: ['Comic Series', 'Adventure', 'Sci-fi', 'Superhero'],
    banner: '/assets/images/invest/galactic-geckos-banner.png',
    cover: '/assets/images/invest/galactic-geckos-cover.png',
    logo: '/assets/images/invest/galactic-geckos-logo.png',
    creator: {
      displayName: 'Gecko Studios',
      handle: 'gecko_studios',
      avatar: 'https://d323dls9ny69nf.cloudfront.net/creators/degen-apes-1714396919823/avatar-1714397500055.jpg',
      twitterHandle: 'GalacticGeckoSG',
    },
    info: [
      {
        section: 'Overview',
        text: `What if I told you there was more to the Geckos than their brutal galactic races?

        What if there were power hungry pirates out there, sailing through space, capturing & destroying ships that wander too far out into space?

        What if there were bounty hunters, making their living earning paid work on the outskirt of the galaxy?
        
        There are galactic mysteries all around us. And, soon, they will be discovered!
        This character drive, action-adventure series, follows a young girl and a team of mercenaries who narrowly escaped an evil space pirate -- only to be thrown into an epic adventure that will unlock the secrets of the galaxy and threaten life as they know it!`,
        image: 'https://d323dls9ny69nf.cloudfront.net/genesis/geckos-rarity.png',
      },
      {
        section: 'Team',
        text: `Created & written by Roach: OG Indie comics creator & Solana enjooyer.

              Created multiple published comic series, done 4+ successful crowdfunding campaigns, hosted a YouTube interview show about writing & creating comics.

              Artwork by Antonio: Newcomer artist who's style captures the OG Galactic Gecko artwork - bringing them to life.`,
      },
      {
        section: 'Offering',
        text: `• 30% of Lifetime Revenue generated will be distributed to Investors on an annual basis

               • % received will depend on Investment ammount (Investment Tier?).
               `,
      },
      {
        section: 'Roadmap',
        text: `• Multi-Series Comic Book

               • Issues/chapters building up towards a 150 page physical book.

               • Each individual issue will be released on dReader with collectible covers

               • The individual issues and/or collected edition book will be published physically by publishing partners (the goal will be to get the book published in physical editions, in multiple global regions).
              `,
      },
    ],
    funding: {
      pledgedAmount: 0,
      raiseGoal: 50000,
      startDate: undefined,
      endDate: undefined,
      numberOfBackers: 582,
      numberOfInterestedInvestors: 2,
    },
  },
  {
    slug: 'enter-the-tensorverse',
    title: 'Enter the Tensorverse',
    subtitle: 'Survive or Die: The First Adventure in Tensor City',
    tags: ['Animated Series', 'Action', 'Sci-fi'],
    banner: 'https://d323dls9ny69nf.cloudfront.net/comics/enter-the-tensorverse/banner-1704914829715.png',
    cover: 'https://d323dls9ny69nf.cloudfront.net/comics/enter-the-tensorverse/cover-1704914829469.jpg',
    logo: 'https://d323dls9ny69nf.cloudfront.net/comics/enter-the-tensorverse/logo-1704914830030.png',
    creator: {
      displayName: 'StudioNX',
      handle: 'StudioNX',
      avatar: 'https://d323dls9ny69nf.cloudfront.net/genesis/mad-muse.jpg',
      twitterHandle: 'StudioNx',
    },
    info: [
      {
        section: 'Overview',
        text: `Enter the Tensorverse is an action-packed, sci-fi crime story, and the first ever story set in the Tensorian universe!
        
        When a group of Raiders follow some leaked alpha to an abandoned building, they'll learn just how do-or-die the space truly is as they pull the curtain back on a major conspriacy that threatens to bring down the entire city!`,
      },
      {
        section: 'Team',
        text: `Created & written by Roach: OG Indie comics creator & Solana enjooyer. 
        
        Created multiple published comic series, done 4+ successful crowdfunding campaigns, hosted a YouTube interview show about writing & creating comics.
        
        Artwork by Ed Jimenez: OG comic artist who's worked with Funko, Hasbro, Paramount Pictures, and more.`,
      },
      {
        section: 'Offering',
        text: `• 30% of Lifetime Revenue generated will be distributed to Investors on an annual basis

               • % received will depend on Investment ammount (Investment Tier?).`,
      },
      {
        section: 'Roadmap',
        text: `• Multi-Series Comic Book
               • 5 Issues/chapters building up towards a 150 page physical book.

               • Each individual issue will be released on dReader with collectible covers

               • The individual issues and/or collected edition book will be published physically by publishing partners (the goal will be to get the book published in physical editions, in multiple global regions).
              `,
      },
    ],
    funding: {
      pledgedAmount: 4000,
      raiseGoal: 4000,
      startDate: undefined,
      endDate: undefined,
      numberOfBackers: 2,
      numberOfInterestedInvestors: 2,
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
    slug: 'apt-323',
    title: 'Apt 323',
    subtitle: 'Chaos, Parties, and Eviction: Life at Apartment 323',
    tags: ['Comedy'],
    banner:
      'https://d323dls9ny69nf.cloudfront.net/comics/apt-323-collectors-edition-1713288491154/banner-1713964884959.png',
    cover:
      'https://d323dls9ny69nf.cloudfront.net/comics/apt-323-collectors-edition-1713288491154/issues/collectors-edition-1713289013265/cover-common-1713289076229.jpg',
    logo: '/assets/images/invest/recent_succesful_project_logos/apt-323-logo.png',
    creator: {
      displayName: 'StudioNX',
      handle: 'StudioNX',
      avatar: 'https://d323dls9ny69nf.cloudfront.net/creators/studio-nx/avatar-1697021201713.png',
    },
    info: [
      {
        section: 'Overview',
        text: 'Apt 323 is a spine-chilling tale that dives into the mysteries lurking behind closed doors.',
      },
      {
        section: 'Team',
        text: 'Brought to life by a dedicated team of horror enthusiasts who specialize in creating thrilling narratives.',
      },
      {
        section: 'Offering',
        text: 'If you enjoy unraveling mysteries and experiencing a sense of dread, Apt 323 is the comic for you.',
      },
      {
        section: 'Roadmap',
        text: 'Phase 1: Release of the first issue. Phase 2: Launch interactive online content. Phase 3: Announce follow-up story arcs.',
      },
    ],
    funding: {
      pledgedAmount: 2000,
      raiseGoal: 2000,
      startDate: undefined,
      endDate: undefined,
      numberOfBackers: 4,
      numberOfInterestedInvestors: 2,
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
    slug: 'dream-city',
    title: 'Dream City',
    subtitle: 'Tales of Love, Mystery, and Sci-Fi in Dream City',
    tags: ['Action', 'Adventure', 'Romance', 'Comedy', 'Sci-fi', 'Fantasy', 'Crime'],
    banner: 'https://d323dls9ny69nf.cloudfront.net/comics/dream-city/banner.png',
    cover: 'https://d323dls9ny69nf.cloudfront.net/comics/dream-city/cover.png',
    logo: '/assets/images/invest/recent_succesful_project_logos/dream-city-logo.png',
    creator: {
      displayName: 'Brandon Mullins',
      handle: 'brandon_mullins',
      avatar: 'https://d323dls9ny69nf.cloudfront.net/creators/brandon-mullins/avatar-1695669858324.jpg',
    },
    info: [
      {
        section: 'Overview',
        text: 'Dream City is a fantastical journey through a world where reality and imagination collide.',
      },
      {
        section: 'Team',
        text: 'A creative group of fantasy writers and illustrators have joined forces to build this whimsical world.',
      },
      {
        section: 'Offering',
        text: 'Dive into a story that defies the ordinary, blending dreams and adventures into a visual spectacle.',
      },
      {
        section: 'Roadmap',
        text: 'Phase 1: Initial storyboards and character designs. Phase 2: Full launch of the comic series. Phase 3: Fan engagement and special editions.',
      },
    ],
    funding: {
      pledgedAmount: 1000,
      raiseGoal: 1000,
      startDate: undefined,
      endDate: undefined,
      numberOfBackers: 2,
      numberOfInterestedInvestors: 2,
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
    slug: 'liberty-square-originz',
    title: 'Liberty Square Originz',
    subtitle: "Surviving a Dystopian Wasteland: The Syndicate's Fight for Freedom",
    tags: ['Fantasy'],
    banner: 'https://d323dls9ny69nf.cloudfront.net/comics/liberty-square-originz/banner-1707999922284.png',
    cover:
      'https://d323dls9ny69nf.cloudfront.net/comics/liberty-square-originz/issues/embers/cover-common-1708002664074.png',
    logo: 'https://d323dls9ny69nf.cloudfront.net/comics/liberty-square-originz/logo-1707999922532.png',
    creator: {
      displayName: 'Liberty Square',
      handle: 'Liberty_Square',
      avatar: 'https://d323dls9ny69nf.cloudfront.net/creators/liberty-square/avatar-1707998020754.png',
    },
    info: [
      {
        section: 'Overview',
        text: 'Liberty Square Originz dives deep into the lives of vigilantes fighting for justice in a troubled city.',
      },
      {
        section: 'Team',
        text: 'The project is developed by action and drama storytellers dedicated to showcasing gripping narratives.',
      },
      {
        section: 'Offering',
        text: 'Experience an action-packed story with heart-pounding moments and complex characters that challenge the norm.',
      },
      {
        section: 'Roadmap',
        text: 'Phase 1: Initial character sketches and plot outline. Phase 2: Pilot issue release. Phase 3: Community expansion and series development.',
      },
    ],
    funding: {
      pledgedAmount: 6000,
      raiseGoal: 6000,
      startDate: undefined,
      endDate: undefined,
      numberOfBackers: 2,
      numberOfInterestedInvestors: 2,
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
  {
    slug: 'the-lump-sum-saga',
    title: 'The Lump Sum Saga',
    subtitle:
      'Two species; one mission - to plant a landing beacon that will guide the fleet to a rallying point on a new world full of hope and opportunity.',
    tags: ['Comic Series', 'Action', 'Sci-fi'],
    banner: 'https://d323dls9ny69nf.cloudfront.net/genesis/lump-sum-banner.jpg',
    cover:
      'https://d323dls9ny69nf.cloudfront.net/comics/the-lump-sum-saga-1717785540240/issues/prologue-only-the-fate-of-our-world-1717800670471/cover-common-1718125589989.png',
    logo: 'https://d323dls9ny69nf.cloudfront.net/comics/comics/the-lump-sum-saga-1717785540240/logo-1717785588371.png',
    creator: {
      displayName: 'Greg Tjosvold',
      handle: 'Greg_Tjosvold',
      avatar: 'https://d323dls9ny69nf.cloudfront.net/creators/greg-tjosvold/avatar-1697040090281.jpg',
      twitterHandle: 'gregtjosvold',
    },
    info: [
      {
        section: 'Overview',
        text: `Spiders and gerbils and poodles, oh my! In The Lump Sum Saga, we join a team of scientists from the planet "Home" on a daring mission to land a probe on an alien world capable of supporting life - Earth. 

              The eclectic cast of characters includes:
              • JoJo: an LWD (little white dog) who becomes the unexpected nexus between two worlds. 
              • The Commander: The spider-esque Darksider lead of the alien landing team is still alive. Stranded in a world of giants, can she use her cunning and intelligence to find a way to call Home?
              • The President: The profoundly intelligent leader of the rodent-like Lightsiders wants to save his only love, and his planet at the same time.

              What starts as an eclectic sci-fi adventure soon becomes a very familiar superhero epic that finally answers the question "What if the spider had a story?"`,
        image: 'https://d323dls9ny69nf.cloudfront.net/genesis/lump-sum-rarity.png',
      },
      {
        section: 'Team',
        text: `Writer Greg Tjosvold took early retirement from an award-winning teaching career to tackle his growing list of works-in-progress and creative to-dos. The Lump Sum Saga started as a classroom NaNoWriMo project that ignited his current obsession with comics and sequential art. Greg is also the editor of the Tech for Comics blog and the author of “Comic NFTs - An Ethical Approach.”

Artist Sergi Domènech studied comics & illustration at the prestigious Escola JOSO in Barcelona. He won several comic book contests and created several didactic comics as the artist and writer for the Spanish CSIC. He continues to work internationally. For the French market, he drew Jeanne d’Arc for Hachette in collaboration with Magma Studio. His previous work for the English market includes Sorority Babes for Full Moon as well as Money Clip and The Disciple in collaboration with Comics Experience. He is currently finishing the second instalment of The Lump Sum Saga. Lump Dog will be available to the public early in 2025. `,
      },
      {
        section: 'Offering',
        text: `• 80% of net revenue generated will be distributed to investors on an annual basis for five years.

               • % received will depend on investment amount (Investment Tier?).`,
      },
      {
        section: 'Roadmap',
        text: `• Multi-Series Comic Book

               • 3 additional issues/chapters building up towards a 176 page physical book. The first 56 pages are already in production or complete. The series is meant to be an ongoing series beyond this milestone should the series find an engaged audience and investors have be suitably compensated during the initial five year investment period.
               
               • Each individual issue will be released on dReader with collectible covers.
               
               • The individual issues and/or collected edition book will be published physically, initially distributed for sale via Kickstarter or other applicable crowd funding platform.
              `,
      },
    ],
    funding: {
      pledgedAmount: 6000,
      raiseGoal: 6000,
      startDate: undefined,
      endDate: undefined,
      numberOfBackers: 2,
      numberOfInterestedInvestors: 2,
    },
  },
]
