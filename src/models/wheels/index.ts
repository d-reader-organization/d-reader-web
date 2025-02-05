import { ComicRarity } from '@/enums/comicRarity'

enum WheelType {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
}

enum WheelRewardType {
  CollectibleComic = 'CollectibleComic',
  PrintEdition = 'PrintEdition',
  OneOfOne = 'OneOfOne',
  Physicals = 'Physicals',
  Fungibles = 'Fungibles',
  None = 'None',
}

export type Wheel = {
  id: number
  name: string
  description: string
  type: WheelType
  startsAt?: Date
  expiresAt?: Date
  isActive: boolean
  winProbability: number
  rewards: WheelReward[]
}

export type WheelReward = {
  id: number
  name: string
  weight: number
  wheelId: number
  description?: string
  image: string
  icon: string
  type: WheelRewardType
}

type Trait = {
  name: string
  value: string
}

type Tag = {
  id: number
  value: string
}

type Genre = {
  name: string
  slug: string
}

export type WheelReceipt = {
  id: number
  isClaimed: boolean
  collectibleComicDrop?: {
    asset: {
      type: WheelRewardType.CollectibleComic
      rarity: ComicRarity
      isUsed: boolean
      isSigned: boolean
      comicIssueId: number
      isListed: boolean
      comicTitle: string
      comicIssueTitle: string
      address: string
      name: string
      description: string
      collectionAddress: string
      image: string
      ownerAddress: string
      royalties: 0
      isNSFW: boolean
    }
    id: 0
    isActive: true
  }
  printEditionDrop?: {
    id: number
    isActive: boolean
    asset: {
      type: WheelRewardType
      traits: Trait[]
      tags: Tag[]
      genres: Genre[]
      number: number
      address: string
      name: string
      description: string
      collectionAddress: string
      image: string
      ownerAddress: string
      royalties: number
      isNSFW: boolean
    }
  }
  oneOfOneDrop?: {
    id: number
    isActive: boolean
    asset: {
      type: WheelRewardType
      traits: Trait[]
      tags: Tag[]
      genres: Genre[]
      address: string
      name: string
      description: string
      collectionAddress: string
      image: string
      ownerAddress: string
      royalties: number
      isNSFW: boolean
    }
  }
  fungibleDrop?: {
    name: string
    address: string
    decimals: number
    symbol: string
    image: string
    amount: number
    id: number
    isActive: boolean
  }
  physicalDrop?: {
    name: string
    itemId: string
    image: string
    id: number
    isActive: boolean
  }
  reward: {
    type: WheelRewardType
    id: number
    name: string
    weight: number
    wheelId: number
    description: string
    image: string
    icon: string
  }
}
