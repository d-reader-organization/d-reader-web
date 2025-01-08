import { accessTokenKey } from '@/constants/general'
import { cookies } from 'next/headers'
import { isTokenValid } from './jwt'

export const isAuthenticatedUser = async (): Promise<boolean> => isTokenValid(await getAccessToken())
export const getAccessToken = async () => (await cookies()).get(accessTokenKey)?.value ?? ''
