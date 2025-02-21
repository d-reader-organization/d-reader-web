import { REDIRECT_TO_KEY, REFERRAL_CODE_KEY } from '@/constants/general'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Reconstruct the URL path string with an additional redirectTo parameter */
export function withRedirect(pathname: string, redirectUrl?: string) {
  // const url = new URL(pathname)
  // url.searchParams.set(REDIRECT_TO_KEY, redirectUrl || pathname)
  // return url.toString()
  const [path, query] = pathname.split('?')
  const redirectParam = `${REDIRECT_TO_KEY}=${redirectUrl || pathname}`

  if (!query) return path + `?${redirectParam}`
  return path + `?${query}&${redirectParam}`
}

/** Reconstruct the URL path string with an additional ref parameter */
export function linkWithRef(pathname: string, referralCode: string) {
  const [path, query] = pathname.split('?')
  const referralCodeParam = `${REFERRAL_CODE_KEY}=${referralCode}`
  // TODO (Luka): what if there is already a ref param present? override it?

  if (!query) return path + `?${referralCodeParam}`
  return path + `?${query}&${referralCodeParam}`
}
