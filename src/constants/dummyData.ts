import { TransactionSource } from '@/enums/transactionSource'
import { ProductType } from '@/enums/productType'
import { TransactionHistoryItem } from '@/models/transaction/transactionHistory'
import { PLACEHOLDER_AVATAR } from './general'
import { ComicRarity } from '@/enums/comicRarity'
import { SignatureRequestStatus } from '@/enums/signatureRequest'
import { SignatureRequest } from '@/models/comicIssue/signatureRequest'

export const transactions: TransactionHistoryItem[] = [
  {
    id: 'drea1sS7aLBCrbn4jDNSxLLJYRRnKbkqA5cu76aAzn',
    confirmedAt: '2025-01-25T12:00:00Z',
    buyer: {
      id: 1,
      username: 'studio_nx',
      displayName: 'Studio NX',
      avatar: PLACEHOLDER_AVATAR,
    },
    buyerAddress: '7aLBCrbn4jDNSxLLJYRRnKbkqA5cuaeaAzn74xS7eKPD',
    source: TransactionSource.Royalty,
    product: ProductType.Comic,
    amount: '200.67',
  },
  {
    id: 'drea2sS7aLBCrbn4jDNSxLLJYRRnKbkqA5cu7LoZy',
    confirmedAt: '2025-01-23T12:00:00Z',
    buyer: {
      id: 2,
      username: 'josipv',
      displayName: 'josipv',
      avatar: '/assets/images/invest/degen-apes-avatar.png',
    },
    buyerAddress: '7aLBCrbn4jDNSxLLJYRRnKbkqA5cuaeaAzn74xS7eKPD',
    source: TransactionSource.Royalty,
    product: ProductType.Comic,
    amount: '200.67',
  },
  {
    id: 'drea3sS7aLBCrbn4jDNSxLLJYRRnKbkqA5cu7GhT6',
    confirmedAt: '2025-01-11T12:00:00Z',
    buyer: {
      id: 3,
      username: 'athar',
      displayName: 'Athar',
      avatar: PLACEHOLDER_AVATAR,
    },
    buyerAddress: '7aLBCrbn4jDNSxLLJYRRnKbkqA5cuaeaAzn74xS7eKPD',
    source: TransactionSource.Sale,
    product: ProductType.Comic,
    amount: '200.67',
  },
  {
    id: 'drea4sS7aLBCrbn4jDNSxLLJYRRnKbkqA5cu76af1i',
    confirmedAt: '2024-12-22T12:00:00Z',
    buyer: undefined,
    buyerAddress: '7aLBCrbn4jDNSxLLJYRRnKbkqA5cuaeaAzn74xS7eKPD',
    source: TransactionSource.Sale,
    product: ProductType.DigitalArt,
    amount: '200.67',
  },
  {
    id: 'drea1sS7aLBCrbn4jDNSxLLJYRRnKbkqA5cu76aBz1',
    confirmedAt: '2025-01-25T12:00:00Z',
    buyer: {
      id: 4,
      username: 'studio_nx',
      displayName: 'Studio NX',
      avatar: PLACEHOLDER_AVATAR,
    },
    buyerAddress: '7aLBCrbn4jDNSxLLJYRRnKbkqA5cuaeaAzn74xS7eKPD',
    source: TransactionSource.Royalty,
    product: ProductType.Comic,
    amount: '200.67',
  },
  {
    id: 'drea2sS7aLBCrbn4jDNSxLLJYRRnKbkqA5cu7LF6ZW',
    confirmedAt: '2025-01-23T12:00:00Z',
    buyer: undefined,
    buyerAddress: '8rT9uC6zrM6W63r5HMK83hRbwkmtsDh7CQXSwVTxeXwQ',
    source: TransactionSource.Sale,
    product: ProductType.Comic,
    amount: '200.67',
  },
  {
    id: 'drea3sS7aLBCrbn4jDNSxLLJYRRnKbkqA5cu7Gki9',
    confirmedAt: '2025-01-11T12:00:00Z',
    buyer: {
      id: 6,
      username: 'athar',
      displayName: 'Athar',
      avatar: '/assets/logo.png',
    },
    buyerAddress: '7aLBCrbn4jDNSxLLJYRRnKbkqA5cuaeaAzn74xS7eKPD',
    source: TransactionSource.Sale,
    product: ProductType.Comic,
    amount: '200.67',
  },
  {
    id: 'drea4sS7aLBCrbn4jDNSxLLJYRRnKbkqA5cu76aUz1',
    confirmedAt: '2024-12-22T12:00:00Z',
    buyer: {
      id: 8,
      username: 'johndoe1',
      displayName: 'John Doe',
      avatar: PLACEHOLDER_AVATAR,
    },
    buyerAddress: '7aLBCrbn4jDNSxLLJYRRnKbkqA5cuaeaAzn74xS7eKPD',
    source: TransactionSource.Royalty,
    product: ProductType.DigitalArt,
    amount: '200.67',
  },
]

export const signatureRequests: SignatureRequest[] = [
  {
    asset: {
      address: '1',
      name: 'Into the Grasslands #1032',
      image:
        'https://d323dls9ny69nf.cloudfront.net/comics/the-farmer-1722522111521/issues/into-the-grasslands-1722879335442/cover-uncommon-1723141682738.jpg',
      comicTitle: 'The Farmer',
      comicIssueTitle: 'Into the Grasslands',
      episodeNumber: 1,
      isSigned: false,
      isUsed: false,
      rarity: ComicRarity.Legendary,
    },
    user: {
      id: 1,
      username: 'studionx',
      displayName: 'Studio NX',
      avatar: PLACEHOLDER_AVATAR,
    },
    status: SignatureRequestStatus.Approved,
    requestedAt: '2025-01-25T21:38:00Z',
    resolvedAt: '2025-01-26T21:38:00Z',
  },
  {
    asset: {
      address: '2',
      name: 'Into the Grasslands #1033',
      image:
        'https://d323dls9ny69nf.cloudfront.net/comics/the-farmer-1722522111521/issues/into-the-grasslands-1722879335442/cover-uncommon-1723141682738.jpg',
      comicTitle: 'The Farmer',
      comicIssueTitle: 'Into the Grasslands',
      episodeNumber: 1,
      isSigned: true,
      isUsed: true,
      rarity: ComicRarity.Rare,
    },
    user: {
      id: 2,
      username: 'studionx',
      displayName: 'Studio NX',
      avatar: PLACEHOLDER_AVATAR,
    },
    status: SignatureRequestStatus.Rejected,
    requestedAt: '2025-01-25T12:00:00Z',
    resolvedAt: '2025-01-26T12:00:00Z',
  },
  {
    asset: {
      address: '3',
      name: 'Into the Grasslands #1034',
      image:
        'https://d323dls9ny69nf.cloudfront.net/comics/the-farmer-1722522111521/issues/into-the-grasslands-1722879335442/cover-uncommon-1723141682738.jpg',
      comicTitle: 'The Farmer',
      comicIssueTitle: 'Into the Grasslands',
      episodeNumber: 1,
      isSigned: false,
      isUsed: false,
      rarity: ComicRarity.Rare,
    },
    user: {
      id: 3,
      username: 'johndoe',
      displayName: 'John Doe',
      avatar: PLACEHOLDER_AVATAR,
    },
    status: SignatureRequestStatus.Pending,
    requestedAt: '2025-01-20T12:00:00Z',
    resolvedAt: undefined,
  },
]
