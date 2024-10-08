export type TwitterIntentComicMintedParams = {
  comicAddress: string
  utmSource?: UtmSource
}

export enum UtmSource {
  WEB = 'web',
  MOBILE = 'mobile',
}
