import { TwitterIntentComicMintedParams } from '@/models/twitter/twitterIntentComicMintedParams'

export const TWITTER_QUERY_KEYS = Object.freeze({
  TWITTER: 'twitter',
  INTENT: 'intent',
  COMIC_MINTED: 'comic-minted',
  EXPRESSED_INTEREST: 'expressed-interest',
})

export const twitterKeys = Object.freeze({
  get: (params: TwitterIntentComicMintedParams) => [
    TWITTER_QUERY_KEYS.TWITTER,
    TWITTER_QUERY_KEYS.INTENT,
    TWITTER_QUERY_KEYS.COMIC_MINTED,
    params.comicAddress,
    params.utmSource,
  ],
})
