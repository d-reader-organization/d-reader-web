import { SortOrder } from '@/enums/sort'
import { ComicSortTag } from '@/models/comic/comicParams'
import { ComicIssueSortTag } from '@/models/comicIssue/comicIssueParams'
import { TransactionHistorySortTag } from '@/models/transaction/transactionHistory'
import { WalletName } from '@solana/wallet-adapter-base'
import { PublicKey } from '@solana/web3.js'

export const baseApiUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`
export const accessTokenKey = 'access_token'
export const refreshTokenKey = 'refresh_token'
export const googleAccessTokenKey = 'google_access_token'
export const SUCC_RESPONSE_STATUS_CODES = [200, 201]
export const REDIRECT_TO_KEY = 'redirectTo'
export const REFERRAL_CODE_KEY = 'ref'

export const jwtCookieProps = {
  httpOnly: true,
  secure: true,
  maxAge: 100 * 24 * 60 * 60,
}

export const LOCAL_STORAGE = Object.freeze({
  IS_UNWRAP_HINT_READ: 'is-unwrap-hint-read',
  IS_INVESTMENT_DISCLAIMER_READ: 'is-investment-disclaimer-read',
  IS_PROJECT_INVEST_DISCLAIMER_READ: 'is-project-invest-disclaimer-read',
  IS_PROJECT_PAYOUT_DISCLAIMER_READ: 'is-project-payout-disclaimer-read',
  IS_MINT_PAGE_VISITED: 'is-mint-page-visited',
  IS_CLAIM_HINT_READ: 'is-claim-hint-read',
  IS_CLAIM_WALKTHROUGH_COMPELETE: 'is-claim-walkthrough-compelete',
})

export const SUPPORT_EMAIL = 'support@dreader.io'

export const LINK = Object.freeze({
  TWITTER: 'https://x.com/dReaderApp',
  DISCORD: 'https://discord.gg/PBW84NaEE2',
  GOOGLE_PLAY: 'https://play.google.com/store/apps/details?id=io.app.dreader',
  INSTAGRAM: 'https://www.instagram.com/d_reader_app',
  TENSOR: 'https://www.tensor.trade/creator/dreader',
  GOOGLE_PLAY_APP: 'https://play.google.com/store/apps/details?id=io.app.dreader',
  LINKTREE: 'https://dreader.io/links',
  D_PUBLISHER: 'https://www.dpublisher.app',
  D_READER: 'https://www.dreader.app',
  MAIL_TO_SUPPORT: 'mailto:' + SUPPORT_EMAIL,
})

// user consents
export const USER_CONSENT = Object.freeze({
  MARKETING: 'marketing-consent-switch',
  DATA_ANALYTICS: 'data-analytics-consent-switch',
})

export const PLACEHOLDER_AVATAR = `/assets/images/default-avatar.png`

// metadata
export const USED_TRAIT = 'used'
export const SIGNED_TRAIT = 'signed'
export const DEFAULT_COMIC_ISSUE_USED = 'false'
export const DEFAULT_COMIC_ISSUE_IS_SIGNED = 'false'
export const RARITY_TRAIT = 'rarity'

// open graph metadata
export const METADATA_IMAGE_SIZE = { width: 1200, height: 630 }

// image aspect ratios
export const ASPECT_RATIO = Object.freeze({
  COMIC_COVER: { width: 900, height: 1000 },
  COMIC_BANNER: { width: 1920, height: 900 },
  COMIC_ISSUE_COVER: { width: 1024, height: 1484 },
  CREATOR_BANNER: { width: 1920, height: 900 },
  CREATOR_AVATAR: { width: 500, height: 500 },
})

// wallet
export const WALLET_LABELS = {
  'change-wallet': 'Change wallet',
  connecting: 'Connecting',
  'copy-address': 'Copy address',
  copied: 'Copied',
  disconnect: 'Disconnect',
  'has-wallet': 'Connect',
  'no-wallet': 'Connect',
} as const

export const LEDGER_ADAPTERS = {
  SOLFLARE: {
    NAME: 'Solflare Ledger' as WalletName<'Solflare'>,
    URL: 'https://docs.solflare.com/solflare/onboarding/mobile/connect-a-ledger-wallet',
  },
  PHANTOM: {
    NAME: 'Phantom Ledger' as WalletName<'Phantom'>,
    URL: 'https://help.phantom.app/hc/en-us/articles/4406388670483-How-to-use-your-Ledger-Nano-hardware-wallet',
  },
} as const

export const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr')

export const MONSTER_CLAIM_QR_SLUG = 'mark-spears-monsters'
export const SOLANA_EXPLORER_BASE_LINK = 'https://explorer.solana.com'
export const SOL_ADDRESS = 'So11111111111111111111111111111111111111112'

export enum ProductsTab {
  Series = 'Series',
  Releases = 'Releases',
  DigitalArt = 'Digital Art',
}
export const DASHBOARD_TABS = [ProductsTab.Series, ProductsTab.Releases, ProductsTab.DigitalArt]

export const SORT_OPTIONS = Object.freeze({
  TRANSACTION_HISTORY: [
    { value: TransactionHistorySortTag.Date, order: SortOrder.ASC, label: 'Newest' },
    { value: TransactionHistorySortTag.Date, order: SortOrder.DESC, label: 'Oldest' },
    { value: TransactionHistorySortTag.Amount, order: SortOrder.ASC, label: 'Amount high -> low' },
    { value: TransactionHistorySortTag.Amount, order: SortOrder.DESC, label: 'Amount low -> high' },
  ],
  COMICS: [
    { value: ComicSortTag.Published, order: SortOrder.ASC, label: 'Newest' },
    { value: ComicSortTag.Published, order: SortOrder.DESC, label: 'Oldest' },
    { value: ComicSortTag.Title, order: SortOrder.ASC, label: 'Title A -> Z' },
    { value: ComicSortTag.Title, order: SortOrder.DESC, label: 'Title Z -> A' },
    { value: ComicSortTag.Rating, order: SortOrder.DESC, label: 'Top rated' },
    { value: ComicSortTag.Likes, order: SortOrder.DESC, label: 'Most liked' },
    { value: ComicSortTag.Readers, order: SortOrder.DESC, label: 'Most readers' },
    { value: ComicSortTag.Viewers, order: SortOrder.DESC, label: 'Most viewers' },
  ],
  COMIC_ISSUES: [
    { value: ComicIssueSortTag.Latest, order: SortOrder.ASC, label: 'Newest' },
    { value: ComicIssueSortTag.Latest, order: SortOrder.DESC, label: 'Oldest' },
    { value: ComicIssueSortTag.Title, order: SortOrder.ASC, label: 'Title A -> Z' },
    { value: ComicIssueSortTag.Title, order: SortOrder.DESC, label: 'Title Z -> A' },
    { value: ComicIssueSortTag.Rating, order: SortOrder.DESC, label: 'Top rated' },
    { value: ComicIssueSortTag.Likes, order: SortOrder.DESC, label: 'Most liked' },
    { value: ComicIssueSortTag.Readers, order: SortOrder.DESC, label: 'Most readers' },
    { value: ComicIssueSortTag.Viewers, order: SortOrder.DESC, label: 'Most viewers' },
  ],
  DIGITAL_ARTWORK: [
    { value: 'Newest', order: SortOrder.ASC, label: 'Newest' },
    { value: 'Oldest', order: SortOrder.DESC, label: 'Oldest' },
  ],
  PENDING_SIGNATURE_REQUESTS: [
    { value: 'RequestedDate', order: SortOrder.ASC, label: 'Newest' },
    { value: 'RequestedDate', order: SortOrder.DESC, label: 'Oldest' },
  ],
  RESOLVED_SIGNATURE_REQUESTS: [
    { value: 'ResolvedDate', order: SortOrder.ASC, label: 'Newest' },
    { value: 'ResolvedDate', order: SortOrder.DESC, label: 'Oldest' },
  ],
})

export const SELECT_OPTIONS = Object.freeze({
  CHART_DATE: [
    { value: 'Last 7 days', label: 'Last 7 days' },
    { value: 'Last 30 days', label: 'Last 30 days' },
    { value: 'Last 3 months', label: 'Last 3 months' },
    { value: 'Last 6 months', label: 'Last 6 months' },
  ],
})

export const SOCKET = Object.freeze({
  JOIN_ROOM: 'join-room',
  LEAVE_ROOM: 'leave-room',
})

export const REFERRAL_REWARDING_PROJECT = 'bonk-and-the-curse-of-the-bear-king'

export const generateReferralLink = ({ slug, username }: { slug: string; username: string }) => {
  return `${process.env.NEXT_PUBLIC_SITE_URL}/invest/${slug}?${REFERRAL_CODE_KEY}=${username}`
}

export const generateUserInviteReferralLink = (username: string) => {
  return `${process.env.NEXT_PUBLIC_SITE_URL}/register?${REFERRAL_CODE_KEY}=${username}`
}
