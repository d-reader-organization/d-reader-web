export type InstantBuyParams = {
  buyerAddress: string
  assetAddress: string
}

export type MultipleBuyParams = {
  instantBuyParamsArray: InstantBuyParams[]
}
