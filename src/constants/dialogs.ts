import { ReactNode } from 'react'

export type DialogStep = {
  title: string
  items: DialogContentItem[]
  buttonLabel: string
}

export type DialogContentItem = {
  icon: ReactNode
  title: string
  text: string
  video?: string
}

export const INVEST_DISCLAIMER_DIALOG_STEPS: DialogStep[] = [
  {
    // title: 'Join the community changing entertainment!',
    title: '',
    buttonLabel: 'Next!',
    items: [
      {
        icon: '🔎',
        title: 'Scout for talent',
        text: '',
      },
      {
        icon: '💵',
        title: 'Invest into best stories',
        text: '',
      },
      {
        icon: '▶️',
        title: `Join the movement`,
        text: '',
        video: 'https://www.youtube.com/embed/QjdGuCf6n08',
      },
    ],
  },
  {
    title: 'Did you know?!',
    buttonLabel: `OMG I'm blown away`,
    items: [
      {
        icon: '✍️',
        title: 'Big stories start small',
        text: 'Umbrella Academy, One Punch Man, One Piece, Walking Dead... all started as a comic or manga. Walking Dead generated $1B in revenue.',
      },
    ],
  },
]

export const PROJECT_INVEST_DIALOG_STEPS: DialogStep[] = [
  {
    title: 'Back stories on Genesis!',
    buttonLabel: 'Got it!',
    items: [
      {
        icon: '🪙',
        title: 'Back a creator & earn future royalties',
        text: '',
      },
      {
        icon: '🤑',
        title: 'Imagine investing into The Walking Dead before it became a $1b franchise',
        text: '',
      },
      {
        icon: '🎁',
        title: 'Early bird benefits & Referral rewards!',
        text: '',
      },
    ],
  },
]
