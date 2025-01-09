'use server'

import { accessTokenKey, refreshTokenKey } from '@/constants/general'
// import { RoutePath } from '@/enums/routePath'
import { cookies } from 'next/headers'
// import { redirect, RedirectType } from 'next/navigation'

export const logoutAction = async () => {
  const initCookies = await cookies()
  initCookies.delete(accessTokenKey)
  initCookies.delete(refreshTokenKey)
  // redirect(RoutePath.Login, RedirectType.replace)
}
