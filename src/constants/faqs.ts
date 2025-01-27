import { SUPPORT_EMAIL } from '@/constants/general'

export interface FAQItemType {
  question: string
  answer: string
}

const FAQ = Object.freeze({
  WHERE_DO_I_START: {
    question: 'I love comics! Where do I start?',
    answer: 'Start by joining our community on Discord or looking into our social media channels!',
  },
  CAN_I_PUBLISH: {
    question: 'Can I publish my own comics?',
    answer: `Yes! In order to publish your comic or manga on dReader, find the 'Publish a comic' link in the footer or contact us at ${SUPPORT_EMAIL}.`,
  },
  WHERE_CAN_I_LEARN_MORE: {
    question: 'Where can I learn more about the platform?',
    answer: 'Best place to learn more about the platform is on the links provided on the Footer of the app.',
  },
  IS_THERE_A_MOBILE_APP: {
    question: 'Is there a mobile app I could use?',
    answer:
      'Yes! You can find our app on Google Play store and Solana dApp store. App store release is active development.',
  },
  WHY_DO_I_NEED_A_DIGITAL_WALLET: {
    question: 'Why do I need a digital wallet?',
    answer:
      "We rely on tokenization of digital assets through the blockchain technology. In order to store these assets, you need a digital wallet. You can either 'bring your own' wallet or rely on the digital wallet we've generated for you. True digital asset ownership enables for digital collecting.",
  },
  CAN_I_SELL_DIGITAL_ASSETS: {
    question: 'Can I sell the digital assets I own?',
    answer:
      'You can! The whole point of digital ownership is to reproduce the experience of physical ownership - including trading collectible assets. You can sell the comics or other artwork you collect within our platform or on any other platform which supports trading digital assets on Solana blockchain.',
  },
  WHAT_HAPPENS_IF_PLATFORM_DIES: {
    question: 'What happens if dReader shuts down?',
    answer:
      "If our platform shuts down, your digital assets will still remain in your digital wallet and you'll be able to keep collecting or trading them.",
  },
  WHAT_MAKES_YOUR_PLATFORM_UNIQUE: {
    question: 'What makes dReader unique?',
    answer:
      'We stand out for our focus on gamified digital collecting, enabling digital-only formats like animated comics.',
  },
  HOW_DOES_DIGITAL_COLLECTING_WORK: {
    question: 'How does digital collecting work?',
    answer:
      "You can collect and own digital comics as if they were real-world collectibles. Some of the collectible experiences include: comics have different rarity covers, collectors can request creators to sign their work, and comics can lose the mint condition as they're 'unwrapped'.",
  },
  ARE_D_READER_AND_GENESIS_SAME_COMPANY: {
    question: 'Are dReader and Genesis the same company?',
    answer: `Genesis is a crowdfunding portal which helps indie creators tokenize their Intellectual Property and distribute it to their desired audience. Genesis primarily works with comic creators, animation studios, game developers, and book writers that want to raise money to pursue their projects. 
  
Decentralized Reader LLC works with many of the same indie creators to distribute their comics once they have been produced. dReader is the platform responsible for distributing series like The Recruits, Tensorians, The Embers etc.`,
  },
  CAN_I_INVEST_MORE_THAN_ONCE: {
    question: 'Can I invest more than once?',
    answer:
      'You may invest as many times as you would like until you reach your investment limit under the crowdfunding regulations.',
  },
  WHAT_ARE_THE_LEGAL_IMPLICATIONS: {
    question: 'What are the legal implications?',
    answer:
      'We are currently exploring the legal framework for investing into Intellectual Properties. Currently, the platform DOES NOT OFFER INVESTMENT FEATURES. We only enable consumers to express interest to invest, but no investing or token issuance will take place until the legal framework has been established',
  },
  WHO_ARE_THE_CREATORS: {
    question: 'Who are the creators on the platform?',
    answer: `On Genesis you can find various indie creators and web3 brands working on crowdfunding their IP. Some creators base their story on existing web3 brands, with or without their endorsement.`,
  },
  WHAT_DOES_CONTRIBUTING_TO_FUNDRAISE_IMPLY: {
    question: 'What does contributing to the fundraise imply?',
    answer:
      "Currently, there are no implications to contributions since crowdfunding hasn't been enabled yet. The only active features on Genesis currently are discoverability and expressing interest to invest. People who express interest into stories are not committed to contributing.",
  },
  WILL_STORIES_BE_TOKENIZED: {
    question: 'Stories will be tokenized?',
    answer:
      'Indeed, stories will be tokenized. The goal is to enable creators to raise funds for their story and issue tokens which would act as a revenue share of their IP.',
  },
  I_WANT_TO_RAISE_FUNDS: {
    question: 'I want to raise funds for my story!',
    answer: `Connect with us!! Whether you're an animator, comic artist, or a writer - get in touch with us. Find us on any social media channels or email at ${SUPPORT_EMAIL}`,
  },
})

export const GENESIS_FAQ_ITEMS: FAQItemType[] = [
  FAQ.ARE_D_READER_AND_GENESIS_SAME_COMPANY,
  FAQ.CAN_I_INVEST_MORE_THAN_ONCE,
  FAQ.WHAT_ARE_THE_LEGAL_IMPLICATIONS,
  FAQ.WHO_ARE_THE_CREATORS,
  FAQ.WHAT_DOES_CONTRIBUTING_TO_FUNDRAISE_IMPLY,
  FAQ.WILL_STORIES_BE_TOKENIZED,
  FAQ.WHERE_CAN_I_LEARN_MORE,
  FAQ.I_WANT_TO_RAISE_FUNDS,
]

export const STANDARD_FAQ_ITEMS: FAQItemType[] = [
  // FAQ.WHERE_DO_I_START,
  FAQ.WHERE_CAN_I_LEARN_MORE,
  FAQ.CAN_I_PUBLISH,
  FAQ.I_WANT_TO_RAISE_FUNDS,
  FAQ.WHY_DO_I_NEED_A_DIGITAL_WALLET,
  FAQ.CAN_I_SELL_DIGITAL_ASSETS,
  FAQ.HOW_DOES_DIGITAL_COLLECTING_WORK,
  FAQ.WHAT_MAKES_YOUR_PLATFORM_UNIQUE,
  FAQ.WHAT_HAPPENS_IF_PLATFORM_DIES,
  FAQ.IS_THERE_A_MOBILE_APP,
]

export const PROFILE_FAQ_ITEMS: FAQItemType[] = [
  FAQ.WHERE_CAN_I_LEARN_MORE,
  FAQ.CAN_I_PUBLISH,
  FAQ.I_WANT_TO_RAISE_FUNDS,
  FAQ.WHY_DO_I_NEED_A_DIGITAL_WALLET,
  FAQ.CAN_I_SELL_DIGITAL_ASSETS,
  FAQ.HOW_DOES_DIGITAL_COLLECTING_WORK,
  FAQ.WHAT_MAKES_YOUR_PLATFORM_UNIQUE,
  FAQ.WHAT_HAPPENS_IF_PLATFORM_DIES,
  FAQ.IS_THERE_A_MOBILE_APP,
]
