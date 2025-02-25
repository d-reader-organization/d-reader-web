export type TwitterIntentComicMintedParams = {
  comicAddress: string
  utmSource?: UtmSource
}

export type TwitterIntentCampaignInterestParams = {
  username: string
  campaignSlug: string
  utmSource?: UtmSource
}

export enum UtmSource {
  WEB = 'web',
  MOBILE = 'mobile',
}
