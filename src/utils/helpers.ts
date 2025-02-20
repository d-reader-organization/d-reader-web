import { generateReferralLink, generateUserInviteReferralLink } from '@/constants/general'
import { PROJECTS } from '@/constants/projects'
import { RoutePath } from '@/enums/routePath'
import { CarouselSlide } from '@/models/carousel/carouselSlide'
import { PartialGenre } from '@/models/genre'
import { Project } from '@/models/project'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * @param string string to shorten
 * @param slice size of a slice
 * @returns short version of the string in a format '[slice]...[slice]'
 */
export const shortenString = (string: string, slice = 4): string => {
  if (string.length < slice * 2 + 3) return string
  return `${string.slice(0, slice)}...${string.slice(-slice)}`
}

export const getUnixTimeInSeconds = () => {
  return new Date().getTime() / 1000
}

export function getRandomInt(min: number, max: number) {
  return min + Math.floor(Math.random() * max)
}

export function getRandomFloat(min: number, max: number) {
  return (min + Math.random() * max).toFixed(1)
}

export function formatPrice(price: number) {
  return price ? price / LAMPORTS_PER_SOL : price
}

export function prependHttps(string?: string) {
  if (string) {
    return 'https://' + string
  } else return ''
}

export function prependTwitter(string?: string) {
  if (string) {
    return prependHttps('twitter.com/') + string
  } else return ''
}

export function prependInstagram(string?: string) {
  if (string) {
    return prependHttps('instagram.com/') + string
  } else return ''
}

export function prependTikTok(string?: string) {
  if (string) {
    return prependHttps('tiktok.com/@') + string
  } else return ''
}

export function prependYouTube(string?: string) {
  if (string) {
    return prependHttps('youtube.com/@') + string
  } else return ''
}

export function prependLinktreefire(string?: string) {
  if (string) {
    return prependHttps('linktree.com/') + string
  } else return ''
}

export function removeHttps(string?: string) {
  if (string?.startsWith('https://')) {
    return string.substring(8)
  } else return ''
}

export function removeTwitter(string?: string) {
  if (string?.startsWith('https://twitter.com/')) {
    return string.substring(20)
  } else return ''
}

export function removeInstagram(string?: string) {
  if (string?.startsWith('https://instagram.com/')) {
    return string.substring(22)
  } else return ''
}

export function removeTikTok(string?: string) {
  if (string?.startsWith('https://tiktok.com/@')) {
    return string.substring(20)
  } else return ''
}

export function removeYouTube(string?: string) {
  if (string?.startsWith('https://youtube.com/@')) {
    return string.substring(21)
  } else return ''
}

export function removeLinktree(string?: string) {
  if (string?.startsWith('https://linktree.com/')) {
    return string.substring(21)
  } else return ''
}

export function isBrave() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (window.navigator.brave != undefined) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return window.navigator.brave.isBrave.name == 'isBrave'
  } else {
    return false
  }
}

export function genresToSlugs(genres: PartialGenre[]): string[] {
  return genres.map((genre) => genre.slug)
}

export const pluralizeString = (value: string, count?: number) => {
  if (typeof count !== 'number') return ''
  return count === 1 ? value : `${value}s`
}

export const shortenSolanaAddress = ({ address, slice = 4 }: { address: string; slice?: number }) =>
  address.slice(0, slice) + '...' + address.slice(-slice)

export const shortenAssetName = (name: string): string => {
  const splitted = name.split('#')
  const last = splitted.at(splitted.length - 1)
  return `#${last}`
}

export const getSlideFallbackUrl = (slide: CarouselSlide): string => {
  if (slide.comicIssueId) return RoutePath.Mint(slide.comicIssueId)
  else if (slide.creatorId) return RoutePath.Creator(slide.creatorId)
  else if (slide.comicSlug) return RoutePath.Comic(slide.comicSlug)
  else return slide.externalLink ?? ''
}

export const findProjectBySlug = (slug: string) => {
  const project = PROJECTS.find((project) => project.slug === slug)
  return project
}

export const getTwitterIntentExpressedInterest = ({ project, username }: { project: Project; username: string }) => {
  // const title = project.title
  const referralLink = generateReferralLink({ slug: project.slug, username })
  const creatorTwitter = project.creator.twitterHandle
    ? `@${project.creator.twitterHandle}`
    : project.creator.displayName
  const twitterIntentPrefix = 'https://x.com/intent/tweet?text='

  const headline = `Can't wait to see the new ${creatorTwitter} story come to life! 🔥`
  const content = 'Want to see more original stories?'

  const shoutOutLine = '@GenesisDotApp is cooking 🍳'
  const genesisLinkText = '🔗👇 Express your interest and get exciting rewards'

  const tweetText = encodeURI(
    `${twitterIntentPrefix}${headline}\n\n${content}\n${shoutOutLine}\n\n${genesisLinkText}\n${referralLink}`
  )
  return tweetText
}

export const getTokenPrice = (basePrice: number, decimals: number) => {
  const denominator = Math.pow(10, decimals)
  const price = parseFloat((basePrice / denominator).toFixed(3))

  return price
}

export const getTwitterIntentInviteUser = (username: string) => {
  const referralLink = generateUserInviteReferralLink(username)
  const twitterIntentPrefix = 'https://x.com/intent/tweet?text='

  const headline = `DON'T MISS OUT 🫵`
  const shoutOutLine = '@GenesisDotApp is cooking 🍳, join the platform and earn exciting rewards'
  const genesisLinkText = '🔗👇 Register with my referral link to get discounts'

  const tweetText = encodeURI(
    `${twitterIntentPrefix}${headline}\n\n${shoutOutLine}\n\n${genesisLinkText}\n${referralLink}`
  )
  return tweetText
}
