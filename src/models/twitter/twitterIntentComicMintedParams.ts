export type TwitterIntentComicMintedParams = {
  comicAddress: string
  utmSource?: UtmSource
}

export type TwitterIntentCampaignInterestParams = {
  username: string
  utmSource?: UtmSource
}

export enum UtmSource {
  WEB = 'web',
  MOBILE = 'mobile',
}
