import { accessTokenKey } from '@/constants/general'
import { cookies } from 'next/headers'
import { isTokenValid } from './jwt'

export const isAuthenticatedUser = (): boolean => isTokenValid(getAccessToken())
export const getAccessToken = () => cookies().get(accessTokenKey)?.value ?? ''
