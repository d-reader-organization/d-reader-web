export interface ComicIssueCollectibleInfo {
  collectionAddress: string
  activeCandyMachineAddress?: string
  startsAt?: Date
  sellerFee: number
  // isPrimarySaleActive: boolean
  isSecondarySaleActive: boolean
  creatorAddress: string
}
